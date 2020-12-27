---
layout: note.njk
tags: notes
number : 3
title: Миграции в php
description: Используем миграции базы данных в php на примере библиотеки phinx
date: 2020-12-27 12:30:00 +3
themes: php sql
image: /assets/images/notes/3/main.png
---

В более или менее крупном проекте если над ним работают несколько человек, нужно каким-то образом поддерживать схему базы данных в актуальном состоянии.

Для этого удобно использовать подход с миграциями.

Миграции представляют собой список изменений в схеме базы данных.

В простейшем случае это каталог `migrations` с набором файлов с sql командами которые нужно выполнить.

```text
/migrations
    0001.php
    0002.php
    0003.php
    0004.php
    0005.php
    0006.php
```

Чаще всего их представляют в виде классов, с методами:
1. up() - запускает миграцию
2. down() - откатывает миграцию

Например.

```php
<?php
// migrations/0001.php

class Migration0001
{
    public function up()
    {
        $sql = 'CREATE TABLE IF NOT EXISTS `tree` (
          `id` INT NOT NULL AUTO_INCREMENT,
          `parent_id` INT NULL,
          `text` VARCHAR(255) NOT NULL,
          PRIMARY KEY (`id`),
        ) CHARACTER SET utf8 COLLATE utf8_general_ci;';

        $this->db->execute($sql);
    }

    public function down()
    {
        $sql = 'DROP TABLE `tree`';
        $this->db->execute($sql);
    }
}
```

Запустить миграции можно командой `migrate up`, а откатить `migrate down`

Таким образом работать намного приятнее, чем заходить через phpmyadmin и вручную править схему базу данных.

Можно написать велосипед самому, но лучше для этих целей использовать уже написанный инструмент такой как [phinx](https://phinx.org/)

## Установка и настройка phinx

Phinx - это библиотека для работы с миграциями, которая не привязана к определенному фреймворку.

Ее можно использовать и прикрутить к любому проекту.

Устанавливаем библиотеку стандартно через `composer`

```shell
composer require robmorgan/phinx
```

Теперь стала доступна команда `vendor/bin/phinx`.

Прежде чем создавать миграции нужно создать конфигурационный файл, делается это командой `phinx init`.

При этом можно указать один из форматов конфигурационного файла, в результате будет сгенерирован шаблон по умолчанию.

```shell
phinx init --format yml
phinx init --format yaml
phinx init --format php
phinx init --format json
```
Выглядит он следующим образом.

```php
<?php
return
[
    'paths' => [
        'migrations' => '%%PHINX_CONFIG_DIR%%/db/migrations',
        'seeds' => '%%PHINX_CONFIG_DIR%%/db/seeds'
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_environment' => 'development',
        'production' => [
            'adapter' => 'mysql',
            'host' => 'localhost',
            'name' => 'production_db',
            'user' => 'root',
            'pass' => '',
            'port' => '3306',
            'charset' => 'utf8',
        ],
        'development' => [
            'adapter' => 'mysql',
            'host' => 'localhost',
            'name' => 'development_db',
            'user' => 'root',
            'pass' => '',
            'port' => '3306',
            'charset' => 'utf8',
        ],
        'testing' => [
            'adapter' => 'mysql',
            'host' => 'localhost',
            'name' => 'testing_db',
            'user' => 'root',
            'pass' => '',
            'port' => '3306',
            'charset' => 'utf8',
        ]
    ],
    'version_order' => 'creation'
];
```

Phinx поддерживает работу с разными окружениями, для всех типов окружений желательно иметь по отдельной базе данных:

```sql
CREATE DATABASE IF NOT EXISTS template;
CREATE DATABASE IF NOT EXISTS template_test;
CREATE DATABASE IF NOT EXISTS template_dev;
```
Заполняем параметры подключения, либо всех окружений, или какого-нибудь одного. В процессе использования можно выбрать в каком окружении запускать миграции.

Проверяем конфигурационный файл на валидность `phinx test`

## Создание миграций

Для создания миграций используется команда `create`, которая создает файлы формата `YYYYMMDDHHMMSS_name.php`.

По дефолту в них будет создан метод `change()`, он нужен для одновременного [накатывания и откатывания миграций](https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method)

```shell
phinx create # db/migrations/20201226133424.php
phinx create CreateTableTree # db/migrations/20201226133635_create_table_tree.php
```

> Важно не изменять старые миграции, нужно всегда создавать новые, это убережет от проблем в будущем.

### Метод up

Phinx имеет свой собственный Query Buider, который позволяет конструировать sql запросы через php код.
В [документации](https://book.cakephp.org/phinx/0/en/migrations.html#writing-migrations) по этому вопросу все расписано.

Но мы будем делать все руками и писать чистый sql.

Метод up выполняет накатывание миграций, в данном случае создание таблицы `tree`

```php
<?php
public function up()
    {
        $sql = 'CREATE TABLE IF NOT EXISTS `tree` (
          `id` INT NOT NULL AUTO_INCREMENT,
          `parent_id` INT NULL,
          `text` VARCHAR(255) NOT NULL,
          `description` VARCHAR(255) NOT NULL,
          `type` INT NOT NULL,
          PRIMARY KEY (`id`),
          FOREIGN KEY (parent_id) REFERENCES tree (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
        ) CHARACTER SET utf8 COLLATE utf8_general_ci;';

        $this->execute($sql);
    }
```

Запускаем миграции

```shell
phinx migrate # По умолчанию будут выполнены миграции в окружении по умолчанию из конфига
phinx migrate -e development # Указываем конкретное окружение
phinx migrate -e development -e testing -e production # Либо все три окружения
phinx migrate -t 20201226144507 # Выполняем все миграции до указанной временной метки
phinx migrate --dry-run # Показывать все запросы которые будут выполнены в базе данных, используется для проверок
```

Будут выполнены все еще не выполненные миграции в порядке их создания. 

Информация о выполненных миграциях будет храниться в таблице `phinxlog`.

### Метод down

Теперь научимся откатывать миграции.

При откатывании миграции будет запущен метод `down`. В нашем случае - это удаление таблицы `tree`.

```php
<?php
public function down()
    {
        $sql = 'DROP TABLE `tree`';

        $this->execute($sql);
    }
```

```shell
phinx rollback # Будет откатана последняя примененная миграция
phinx rollback -e development # Указываем окружение где откатывать миграции
phinx rollback -t 20201226144507 # Откатить миграции после указанной временной метки
phinx rollback -t 0 # Откатить все миграции
phinx rollback -e development -d 2020 # Откатить все миграции за 2020 год
phinx rollback -e development -d 202001 # Указываем определенную временную метку
phinx rollback -e development -d 20200103
phinx rollback -e development -d 2020010312
phinx rollback -e development -d 202001031205
phinx rollback -e development -d 20200103120530
phinx rollback -e development --dry-run # Просмотреть какие запросы будут выполнены при откате миграции
```

## Статус миграций

Наглядно отобразить список выполненных миграций можно командой

```shell
phinx status -e development

Status  [Migration ID]  Started              Finished             Migration Name 
----------------------------------------------------------------------------------
     up  20201226133635  2020-12-26 15:30:52  2020-12-26 15:30:52  CreateTableTree
     up  20201226144507  2020-12-26 15:30:52  2020-12-26 15:30:52  CreateTableTree2
   down  20201226144512                                            CreateTableTree3
   down  20201226144516                                            CreateTableTree4
```

## Блокируем попытки отката миграций

Бывает необходимость запретить возможность откатывать миграции, для этого существует команда `breakpoint`

```shell
phinx breakpoint # Поставим breakpoint последней примененной миграции
phinx breakpoint -t 20201226144512 # Поставить breakpoint по временной метке
phinx breakpoint -r # Удалить breakpoint у всех миграций
```

## Вставка данных

Phinx поддерживает не только изменение структуры базы данных, но и вставку данных, здесь это называется `seeds`

Создать файл можно командой.

```shell
phinx seed:create TestData # Создать класс
```
Их можно запускать несколько раз.

Будет создан файл `/db/seeds/TestData.php` с методом `run()`. Там и нужно писать весь код по добавлению данных.

Теперь запустим файл.

```shell
phinx seed:run # Запустить все найденные классы, что не очень
phinx seed:run -s TestData # Запустить определенный файл или файлы
```

Данный механизм удобно использовать для добавления тестовых и фейковый данных.

## Полезные ссылки

1. [Сайт библиотеки](https://phinx.org/)
2. [Документация](https://book.cakephp.org/phinx/0/en/index.html)
3. [Репозиторий](https://github.com/cakephp/phinx)