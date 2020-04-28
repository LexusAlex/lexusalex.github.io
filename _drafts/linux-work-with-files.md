---
layout: post
title: Linux. Работа с файлами и пользователями
permalink: linux-expanding-partition
tags: linux
comments: true
subtitle: Linux. Работа с файлами
summary:  Linux. Работа с файлами
is_navigate: false
cover_url: "/assets/images/articles/linux/part.png"
---

[Часть 1 - Linux. Хранение информации](https://lexusalex.ru/linux-Information-storage)

Основная абстракция linux - все есть файл, что позволяет использовать один интерфейс для работы с
любыми объектами системы через файлы. Любой объект в linux имеет своего владельца, то есть пользователя.

Классический механизм разграничения прав доступа в linux представляет из себя объекты, то есть файлы доступ к которым разграничивается и
субъекты, то есть пользователи доступ которых разграничивается.

О субъектах сейчас и пойдет речь.

Каждый пользователь характеризуется следующими обязательными параметрами :
1. Уникальное имя пользователя
2. UID - уникальный идентификатор пользователя
3. GID - уникальный идентификатор группы пользователя

и некоторыми необязательными, но о них позже.

### Пользователи

Пользователи могут хранится в двух хранилищах :
1. Локальное ("Из коробки" в файлах)
2. Сетевое (NIS, LDAP)

Пользователи могут быть двух типов :
1. Системные (псеводо) пользователи.
2. Реальные пользователи.

Исторически сложилось что локально пользователи в системе хранятся в двух таблицах (файлах), где каждый пользователь представлен одной строкой.

#### /etc/passwd

`/etc/passwd` - это системный файл паролей, в нем каждый пользователь представлен одной строкой и его параметры записаны в 7 полях разделенных символом ` : ` в следующем порядке :

1. name
2. passwd 
3. uid
4. gid
5. gecos
6. dir
7. shell

Пример : `root:x:0:0:root:/root:/bin/bash`

##### name

Имя пользователя для входа в систему.

Символьное имя пользователя которое соответствует его числовуому идентификатору.

- регулярное выражение которое соответсвует символам которые могут быть в имени пользователя `[a-z_][a-z0-9_-]*[$]?`
- имена пользователей могут быть длиной не более 32 знаков.

*В старых версиях unix существовало ограничение на длину логина в 8 символов*

##### UID

Числовой идентификатор пользователя
UID_MIN			 1000
UID_MAX			60000

SYS_UID_MIN		  100
SYS_UID_MAX		  999



##### passwd

##### gid
##### gecos
##### dir
##### shell

useradd  /etc/login.defs

https://www.youtube.com/watch?v=xHCxaF2qbyQ&t=518s

https://ru.wikipedia.org/wiki//etc/passwd

#### /etc/shadow

`/etc/shadow` - теневой файл паролей.
    Здесь параметры пользователя записаны в 9 полях разделенных символом ` : ` в следующем порядке
    1. name
    2. passwd
    3. latching
    4. min
    5. max
    6. warn
    7. inactive
    8. expire
    9. flag

Эти таблицы между собой взаимосвязаны

### Создание пользователя

Попытка создать пользователя в debian больше 32 символов

### Типы пользователей

https://codetown.ru/category/linux-bash/

### Группы

### Создание пользователя

Рекомендуется создавать пользоваетля командой `adduser`, нежели `useradd`

adduser
deluser
addgroup
delgroup
Обычный пользователь


centos

ссылка на одну команду 

ls -la /usr/sbin/useradd /usr/sbin/adduser
lrwxrwxrwx. 1 root root      7 ноя  9 02:05 /usr/sbin/adduser -> useradd
-rwxr-xr-x. 1 root root 241752 ноя  9 02:05 /usr/sbin/useradd


cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
nobody:x:65534:65534:Kernel Overflow User:/:/sbin/nologin
dbus:x:81:81:System message bus:/:/sbin/nologin
systemd-coredump:x:999:997:systemd Core Dumper:/:/sbin/nologin
systemd-resolve:x:193:193:systemd Resolver:/:/sbin/nologin
tss:x:59:59:Account used by the trousers package to sandbox the tcsd daemon:/dev/null:/sbin/nologin
polkitd:x:998:996:User for polkitd:/:/sbin/nologin
libstoragemgmt:x:997:994:daemon account for libstoragemgmt:/var/run/lsm:/sbin/nologin
cockpit-ws:x:996:993:User for cockpit-ws:/nonexisting:/sbin/nologin
sssd:x:995:991:User for sssd:/:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
chrony:x:994:990::/var/lib/chrony:/sbin/nologin
alex:x:1000:1000:alex:/home/alex:/bin/bash

debian

cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
systemd-timesync:x:101:102:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
systemd-network:x:102:103:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:103:104:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:104:110::/nonexistent:/usr/sbin/nologin
sshd:x:105:65534::/run/sshd:/usr/sbin/nologin
alex:x:1000:1000:alex,,,:/home/alex:/bin/bash
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
test:x:1001:1001:,,,:/home/test:/bin/bash
Debian-exim:x:106:112::/var/spool/exim4:/usr/sbin/nologin

ubuntu

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd/netif:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd/resolve:/usr/sbin/nologin
syslog:x:102:106::/home/syslog:/usr/sbin/nologin
messagebus:x:103:107::/nonexistent:/usr/sbin/nologin
_apt:x:104:65534::/nonexistent:/usr/sbin/nologin
lxd:x:105:65534::/var/lib/lxd/:/bin/false
uuidd:x:106:110::/run/uuidd:/usr/sbin/nologin
dnsmasq:x:107:65534:dnsmasq,,,:/var/lib/misc:/usr/sbin/nologin
landscape:x:108:112::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:109:1::/var/cache/pollinate:/bin/false
alex:x:1000:1000:alex:/home/alex:/bin/bash
sshd:x:110:65534::/run/sshd:/usr/sbin/nologin




Вот теперь мы подошли к основополагающему понятию файловой системы в linux - это фаил. 

Файлы в linux различают по их типу :

1. Обычный файл (regular file)
2. Каталог (directory)
3. Символическая ссылка (symbolic link)
4. Файл устройства (device file)
5. Именованный канал (named pipe)
6. Сокет (socket)

Как мы выяснили ранее метаданные (атрибуты) файла хранятся в индексном дескрипторе, так же там хранятся дисковые блоки файла, который есть у каждого файла.
Набор атрибутов файла зависит от его типа.

### Тип фаил (Regular file) (-)

Файл - это именованная область данных на внешнем носителе. Фаил может содержать любую
пользовательскую информацию в виде набора байт при этом операционная система не накладывает
никаких ограничений на содержимое.

Счетчик имен файла.
Жесткая ссылка . Разные имена могут быть только в той же файловой системе что и сами файлы


### Механизм разграничения доступа

Субъекты (пользователь, служба учетная запись)
Владелец объекта
Группа владельца
Все остальные
read write exec
Базовые разрешения R W X
Дополнительные атрибуты Set - S Sticky - T

Объекты

### Атрибуты файла

1. Идентификатор устройства на котором расположен файл
2. Номер inode
3. Права доступа
4. Кол-во жёстких ссылок
5. ID пользователя-владельца файла
6. ID группы-владельца файла
7. ID устройства (если это спец. файл)
8. Полный размер в байтах
9. размер блока ввода-вывода файловой системы
10. Кол-во выделенных блоков по 512Б
11. Время последнего доступа
12. Время последнего изменения
13. Время последней смены состояния


http://ru.manpages.org/stat/2


### Тип директория

Служебный файл, его содержимое волнует ос.

Список имен других файлов

. сам каталог
.. его родитель

### Тип символьная ссылка

Для ссылок на файл

### Тип именованный канал

IPC средство межпроцессное взаимодействие
В нем нет данных, в нем есть статическая информация.
Нужен для общения программ находящихся в разных процессах.
Общение только в одну сторону!
init halt reboot poweroff
halp перезагрузка

### Тип cокет

Обшение в обе стороны

syslogd cron cups

Пока речь о локальном сокете

Это все носит название UFS