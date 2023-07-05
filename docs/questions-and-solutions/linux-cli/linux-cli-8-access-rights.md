---
layout: default
nav_order: 8
permalink: linux-cli-8-access-rights
title: Права доступа (обзор)
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Разберемся с правами доступа в linux
date: 2023-07-04 17:30:00 +3
last_modified_date: 2023-07-05 17:00:00 +3
tags:
- linux
- questions-and-solutions
---

# Права доступа (обзор)
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

## umask

При создании файла или директории, ос создает права по умолчанию исходя из umask, которая определяет конечные права на объект

При этом каждый объект в linux имеет владельца, группу владельцев и права доступа к нему (rwx).

```shell
# Текущий umask
umask # для обычного пользователя 0002, для root 0022

```
Базовые права файл 0666, директория 0777

Определяем итоговые права для обычного пользователя (0002):

- Фаил 0666 - 0002 = 0664
- Директория 0777 - 0002 = 0775

Определяем итоговые права для пользователя root (0022)

- Фаил 0666 - 0022 = 0644
- Директория 0777 - 0022 = 0755

Проверяем 

```shell
# root
-rw-r--r-- # фаил
drwxr-xr-x # директория

# Обычный пользователь
-rw-rw-r-- # фаил
drwxrwxr-x # директория

# Исправим umask и создадим файлы
umask 0000 # Действует только в текущем сеансе
-rw-rw-rw- # фаил
drwxrwxrwx # директория

# https://handynotes.ru/tools/umask-kalkulyator - Калькулятор umask
```

## Атрибуты

### Фаил

- `r` - содержимое файла можно читать
- `w` - запись в файл
- `x` - фаил можно исполнять, то есть запускать

### Директория

- `r` - просмотр списка элементов директории
- `w` - создание и удаление других файлов и директорий
- `x` - переход в директорию

Эти же атрибуты дублируются на:

- Владельца файла
- Участников группы
- Всех остальных

### Флаги прав

- 0 --- - все запрещено
- 1 --x - запуск файла,зайти в директорию
- 2 -w- - запись файла, создать и удалить файл в директории
- 3 -wx - запуск и запись
- 4 r-- - чтение файла, содержимое директории
- 5 r-x - чтение и запуск
- 6 rw- - чтение и запись
- 7 rwx - чтение, запись, запуск

Проверяем как работает смена прав на файлы и директории

```shell
# меняем права на файл и директорию
chmod 000 file2 #---------- С файлом ничего нельзя делать
chmod 000 dir2 #d--------- С директорией ничего нельзя делать

# директория
chmod 100 dir2 # cd dir2
chmod 400 dir2 # ls dir2
chmod 500 dir2 # ls dir2 cd dir2
chmod 700 dir2 # ls dir2 cd dir2 touch file

# фаил
chmod 200 file2 echo 'text' >> file2
chmod 600 file2 echo 'text' >> file2 cat file2

# Так же можно делать так для всех трех групп
chmod u+r file2
chmod u-r file2
chmod u+rwx file2
chmod ug+r file2
chmod ugo+rwx file2 # Полные права, что равно 777
chmod ugo-x file2 # Убрать выполнение у всех
chmod ugo=x file2 # Установить у всех x
chmod u=r file2 # Владелец может читать 
chmod u+r,g+w,o+x file2
chmod u=r,g=w,o=x file2 # Четкие права для файла
chmod -R u=rwx dir2 # Рекурсивная смена атрибутов
```

Стандартные права.

- 664 - Владелец и группа владельцев может читать и писать, все остальные только читать
- 775 - Владелец и группа владельцев может читать, заходить в каталог, создавать файлы, все остальные смотреть содержимое и заходить в папку

## Группы

Пользователь может быть в первичной группе, она создается по умолчанию при создании пользователя.
Так же пользователь может быть участником сразу нескольких вторичных групп

````shell
# В каких группах состоит пользователь
groups alex # alex : alex adm cdrom sudo dip plugdev lpadmin lxd sambashare
groups root #root : root

# Или так
id alex #uid=1000(alex) gid=1000(alex) groups=1000(alex),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),122(lpadmin),132(lxd),133(sambashare)
id -nG alex #alex adm cdrom sudo dip plugdev lpadmin lxd sambashare

# Список пользователей
sed 's/:.*//' /etc/passwd

# Список групп
getent group

# Создать группу
sudo groupadd test_group
# Добавить пользователя alex в дополнительную группу test_group
sudo usermod -a -G test_group alex
# Удалить пользователя alex из группы test_group
sudo gpasswd -d alex test_group
# Создать тестового пользователя
sudo useradd -m test_user

TODO разобраться с группой владельцем

## Создадим файл от alex -rw-rw-r-- alex alex testfile
## Теперь нужно пользователю test_user разрешить редактировать фаил, для этого пользователя test_user добавить в группу alex;l;

#sudo usermod -a -G alex test_user
#sudo usermod -a -G test_user alex


# После изменения нужно выйти из cli и заново зайти
````


