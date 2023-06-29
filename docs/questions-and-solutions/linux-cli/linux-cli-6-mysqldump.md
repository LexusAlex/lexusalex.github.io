---
layout: default
nav_order: 6
permalink: linux-cli-6-mysqldump
title: Бэкап mysql c помощью mysqldump
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Команда mysqldump для бэкапа базы данных mysql
date: 2023-06-29 16:10:00 +3
last_modified_date: 2023-06-29 16:10:00 +3
tags:
- linux
- mariadb
- mysql
- questions-and-solutions
---

# Бэкап mysql c помощью mysqldump
{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>
---

Бэкапы очень нужны и очень важны!

Для создания дампа базы данных используется команда `mysqldump`. Ее можно использовать локально прямо на сервере где запущен mysql, либо удаленно.


```shell
# Базовый пример использования данные+структура
mysqldump -v -h127.0.0.1 -uroot empty -p > /tmp/dump.sql
# -v выводим детальную информацию о ходе выполнения скрипта
# -h хост куда требуется подключится
# -u пользователь от имени которого будет делаться бэкап
# -p пароль пользователя, лучше прям здесь не вводить

# Бэкап нескольких БД
mysqldump -v -h127.0.0.1 -uroot -B crm_empty risk_empty -p > /tmp/2.sql

# Бэкап всех имеющихся баз на сервере в один файл кроме системных
mysqldump -v -h127.0.0.1 -uroot --all-databases -p > /tmp/all.sql

# Бэкап только структуры базы данных
mysqldump -v -h127.0.0.1 -uroot --no-data empty -p > /tmp/no-data.sql

# Выгрузка определенных таблиц базы данных 
# данные + структура
mysqldump -v -h127.0.0.1 -uroot empty Alerts user -p > /tmp/one1.sql
# структура
mysqldump -v -h127.0.0.1 -uroot --no-data empty Alerts user -p > /tmp/no-data_one.sql

# Бэкап системной таблицы с пользователями 
mysqldump -v -h127.0.0.1 -uroot mysql user -p > /tmp/mysql-user.sql

# Временная метка в названии файла
mysqldump -v -h127.0.0.1 -uroot empty Alerts -p > /tmp/$(date +"%Y-%m-%d-%H-%M-%S").sql

# Архив с бэкапом
mysqldump -v -h127.0.0.1 -uroot empty Alerts -p | gzip -c >/tmp/$(date +"%Y-%m-%d-%H-%M-%S").sql.gz

# Игнорировать определенную таблицу
mysqldump -v -h127.0.0.1 -uroot --ignore-table=empty.Alerts empty Alerts -p > /tmp/$(date +"%Y-%m-%d-%H-%M-%S").sql

# Выгрузить только данные, иногда может потребоваться
mysqldump -v -h127.0.0.1 -uroot --no-create-info empty Alerts -p > /tmp/$(date +"%Y-%m-%d-%H-%M-%S").sql

# Бэкап оборачивает в транзакцию 
mysqldump -v -h127.0.0.1 -uroot --single-transaction empty Alerts -p > /tmp/$(date +"%Y-%m-%d-%H-%M-%S").sql

# Создать под каждую таблицу два файла TABLE.sql - CREATE TABLE TABLE.txt - Данные таблицы
mysqldump -v -h127.0.0.1 -uroot empty -p --tab=/tmp > /tmp/$(date +"%Y-%m-%d-%H-%M-%S").sql

# Перенос данных с одного сервера на другой
mysqldump --opt database | mysql --host=remote-host -C database
```