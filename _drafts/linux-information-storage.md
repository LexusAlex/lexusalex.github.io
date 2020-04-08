---
layout: post
title: Linux. Хранение информации
permalink: linux-Information-storage
tags: linux unix
comments: true
subtitle: Linux. Хранение информации
summary:  Linux. Хранение информации
is_navigate: true
---

### Драйверы и файлы устройств в Linux

Каждому устройству в системе linux соотвествует специальный фаил этого устройства. 
Прикладные программы взаимодействуют с драйверами устройств через специальные фаилы этого устройства.
Драйвер устройства - это программа которая выполняет роль связующего между устройством и программой пользователя.

Управление устройством из программы пользователя осуществляется по следующей схеме.

1. Программа пользователя
2. Специальный фаил (указатель на драйвер)
3. Драйвер устройства (модуль программного кода ядра)
4. Ядро
5. Устройство

Такая схема обеспечивает единый подход к управлению устройствами через обычные файлы.

Устройства бывают :

1. Реальные. Устройства которые физически сущесвуют например жесткий диск, мышь, клавиатура.
2. Виртуальные.  Устройства которым не соответсвуют ни одно из подключенных аппаратных средств. 
Вместо этого ядро предоставяляет абстрактное устройство с таким же API как у реального

Файлы устройств подразделяют на два класса.

1. Блочные (b). Устройства передают данные блоками. Размер блока зависит от типа устройства, но обычно кратен 512 байт. Например жесткий диск.
2. Символьные (c). Устройства обрабатывают данные побайтно, например терминал, мышь.

### Каталог dev

Файлы устройств располагаются внутри файловой системы в каталоге `/dev`.

В ранних версиях linux этот каталог содержал все возможные типы устройств, их было буквально тысячи.
Проблему решили с помощью программы-менеджера `udev` которая опирается на виртуальную файловую систему `sysfs` (это файловая система находящиеся в памяти). 
Благодаря `udev` сейчас в каталоге находятся только те файлы тех устройств которые в настоящий момент подключены к системе.

При отключении устройства фаил удаляется. 
Соотвественно при каждом запуске системы файлы устройств создаются заново.

TODO `udev on /dev type devtmpfs (rw,nosuid,relatime,size=994260k,nr_inodes=248565,mode=755)`

### Номер устройства

Каждое устройство имеет свои номера (идентификаторы)

1. Старший идентификатор (Major) - общий класс или устройства, используется для поиска драйвера. 
Список старших идентификаторов которые известны ядру можно вывести выполнив команду `cat /proc/devices`
2. Младший идентификатор (Minor) - номер уникально идентифицирующий устройство внутри класса.

Посмотреть старшие и младшие идентификаторы а так же типы различных устройств в настоящее время подключенных к системе можно заглянув в каталог dev

```bash
ls -l /dev/sd* /dev/input/mouse* /dev/snd/pcm*
crw-rw---- 1 root input  13, 32 апр  6 09:42 /dev/input/mouse0
crw-rw---- 1 root input  13, 33 апр  6 09:42 /dev/input/mouse1
crw-rw---- 1 root input  13, 34 апр  6 09:42 /dev/input/mouse2
brw-rw---- 1 root disk    8,  0 апр  6 09:42 /dev/sda
brw-rw---- 1 root disk    8,  1 апр  6 09:42 /dev/sda1
brw-rw---- 1 root disk    8, 16 апр  6 09:42 /dev/sdb
brw-rw---- 1 root disk    8, 32 апр  6 09:42 /dev/sdc
crw-rw---- 1 root audio 116,  3 апр  6 09:42 /dev/snd/pcmC0D0c
crw-rw---- 1 root audio 116,  2 апр  6 09:42 /dev/snd/pcmC0D0p
crw-rw---- 1 root audio 116,  4 апр  6 09:42 /dev/snd/pcmC0D1p
```
Где первый символ это тип устройства символьное (с) или блочное (b)

```bash
file /dev/input/mouse0
/dev/input/mouse0: character special (13/32)

file /dev/sda
/dev/sda: block special (8/0)
```
А числа через запятую это и есть номера устройства.

>> В ранних версиях linux количество подключенных устройств к системе было ограничено, тем самым что номера описаны 8 битами.
>В современных версиях linux это ограничение стало менее строгим за счет увеличения кол-ва битов для хранения номеров (12 и 20 бит) 

Номера устройств также удобно смотреть командой `lsblk`

```bash
lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0    5G  0 disk 
└─sda1   8:1    0    5G  0 part /
sdb      8:16   0    2G  0 disk 
sdc      8:32   0    2G  0 disk 
sr0     11:0    1  335M  0 rom 
```
или так 

```bash
cat /proc/partitions
major minor  #blocks  name
  11        0     343040 sr0
   8        0    5242880 sda
   8        1    5240832 sda1
   8       16    2097152 sdb
   8       48    1048576 sdd
   8       64    1048576 sde
   8       80    1048576 sdf
   8       32    2097152 sdc
   8       96    1048576 sdg
   8      112    1048576 sdh
```

Права на устройства устанавливаются путем добавления соотвествующих групп пользователям.

Теперь переходим конкректно к дисковым устройствам

### Нумерация жеских дисков

>> Ранее диски именовались в зависимости от типа их интерфейса и могли иметь имена hd*, vd*, сейчас все зависимости
>от типа интерфеса они все имеют название sd*

Каждому подключенному жесткому диску присваеватся буква латинского алфавита

```bash
ls -1 /dev/sd*
/dev/sda
/dev/sda1
/dev/sdb
/dev/sdc
/dev/sdd
/dev/sde
/dev/sdf
/dev/sdg
/dev/sdh
```
Порядок присвоение букв дисков определен в порядке подключения к дисковому контроллеру сначала внутренние SATA, потом все внешние USB.

Просмотреть список дисков можно командой `fdisk -l`

### Таблица разделов / Загрузка ОС

Все компьютеры независимо от операционной системы при загрузке могут использовать два метода структур разделов

1. BIOS-MBR - Master Boot Record
2. UEFI-GPT - GUID Partition Table

До того как BIOS определит загрузочное устройство, происходит инициализация различных устройств и тестирование системы.

#### Диск таблицей разделов MBR

1. Запись MBR занимает первые 512 байт в первом секторе на диске.
2. Ограничение на объем диска до 2.2 ТБ.
3. Максимально можно создать только 4 первичных разделов.
4. Информация о разделе хранится в главной загрузочной записи, при его повреждении диск становится нечитаемым.
5. Необходимо высталять флаг с какого раздела грузится.

#### Диск таблицей разделов GPT

1. Размер диска может быть до 10 093 173 145,6 Тб.
2. GPT допускает 128 основных разделов, но по факту бывает достаточно 3
3. GPT хранит копию загрузочных данных, с возможностью их восстановления.
4. Запись GPT занимает первые 2048 секторов (1 Мб) на диске и включает в себя резерв - отступ для MBR 512 байт.

### Разметка диска

Для экспериментов буду использовать два диска (sdb и sdc) объемом 2 ГБ каждый

Создадим таблицу разделов MBR DOS
```bash
sudo fdisk /dev/sdb

Command (m for help): o # разметить диск как DOS
Created a new DOS disklabel with disk identifier 0x33283b77.

Command (m for help): w # сохранить изменения и выйти
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```
>> В Linux таблица разделов называется disklabel

После этого диску будет присвоен идентификатор и диск будет размечен

```bash
sudo fdisk /dev/sdb -l
Disk /dev/sdb: 2 GiB, 2147483648 bytes, 4194304 sectors
Disk model: VMware Virtual S
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x33283b77
```

Теперь создадим разметку GPT , для ее создания воспользуемся утилитой `gdisk`

```bash
sudo gdisk /dev/sdc
GPT fdisk (gdisk) version 1.0.3

Partition table scan:
  MBR: not present
  BSD: not present
  APM: not present
  GPT: not present

Creating new GPT entries.

Command (? for help): o
This option deletes all partitions and creates a new protective MBR.
Proceed? (Y/N): Y

Command (? for help): w

Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
PARTITIONS!!

Do you want to proceed? (Y/N): Y
Your option? (Y/N): Y
OK; writing new GUID partition table (GPT) to /dev/sdc.
The operation has completed successfully.
```

Проверяем

```bash
sudo gdisk /dev/sdc -l
GPT fdisk (gdisk) version 1.0.3

Partition table scan:
  MBR: protective
  BSD: not present
  APM: not present
  GPT: present

Found valid GPT with protective MBR; using GPT.
Disk /dev/sdc: 4194304 sectors, 2.0 GiB
Model: VMware Virtual S
Sector size (logical/physical): 512/512 bytes
Disk identifier (GUID): 54DCF470-42CC-4AA5-8102-67C65E6283D5
Partition table holds up to 128 entries
Main partition table begins at sector 2 and ends at sector 33
First usable sector is 34, last usable sector is 4194270
Partitions will be aligned on 2048-sector boundaries
Total free space is 4194237 sectors (2.0 GiB)

Number  Start (sector)    End (sector)  Size       Code  Name
```
>> Вначале диска с разметкой GPT есть фейковая MBR запись, она нужна для того чтобы утилиты не определили что диск чистый и не отформатировали его

Диски размечены.

### Раздел диска

Каждый диск может иметь один или несколько разделов. Каждый раздел воспринимается ядром как отдельное устройство.

На разделе диска может быть :

1. Файловая система
2. Область данных
3. Область подкачки

Разберемся пока как создавать пустые разделы в разметке дисков созданных выше

MBR поддерживает создание только 4 разделов, 3 первичных и один расширенный. В расширенном можно создавать сколько угодно разделов

```bash
Command (m for help): n # создаем раздел
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p # создаем первичный или расширенный раздел
Partition number (1-4, default 1): 1 # выбираем его номер
First sector (2048-4194303, default 2048): 2048 # выбираем первый сектор начала раздела
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-4194303, default 4194303): +100M # Создадим раздел на 100 МБ
Created a new partition 1 of type 'Linux' and of size 100 MiB.
```
Количество секторов определяется как 2147483648 байт / 512 байт = 4 194 304 сектора ( -1 сектор так как это запись MBR)

Проверяем доступное свободное место

```bash
sudo fdisk /dev/sdb

Welcome to fdisk (util-linux 2.33.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): F
Unpartitioned space /dev/sdb: 1,9 GiB, 2041577472 bytes, 3987456 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes

Start     End Sectors  Size
206848 4194303 3987456  1,9G
```

Таким же образом создадим еще 2 раздела и 1 расширенный раздел на все доступное место

В итоге у нас получится 

```bash
Device     Boot  Start     End Sectors  Size Id Type
/dev/sdb1         2048  206847  204800  100M 83 Linux
/dev/sdb2       206848  411647  204800  100M 83 Linux
/dev/sdb3       411648  616447  204800  100M 83 Linux
/dev/sdb4       616448 4194303 3577856  1,7G  5 Extended
```

Тоже самое создадим для диска с разметкой GPT, на все доступное пространство

```bash
Disk /dev/sdc: 4194304 sectors, 2.0 GiB
Model: VMware Virtual S
Sector size (logical/physical): 512/512 bytes
Disk identifier (GUID): 54DCF470-42CC-4AA5-8102-67C65E6283D5
Partition table holds up to 128 entries
Main partition table begins at sector 2 and ends at sector 33
First usable sector is 34, last usable sector is 4194270
Partitions will be aligned on 2-sector boundaries
Total free space is 0 sectors (0 bytes)

Number  Start (sector)    End (sector)  Size       Code  Name
   1            2048          206847   100.0 MiB   8300  Linux filesystem
   2          206848          411647   100.0 MiB   8300  Linux filesystem
   3          411648          616447   100.0 MiB   8300  Linux filesystem
   4          616448         4194270   1.7 GiB     8300  Linux filesystem
   5              34            2047   1007.0 KiB  8300  Linux filesystem
```
Другие возможные действия с разделами :

- a поставить флаг загрузочного раздела
- b редактирование вложенной метки диска BSD
- c переключение флага dos-совместимости
- d удалить раздел
- F показать свободное неразмеченное пространство
- l список известных типов разделов
- t изменение типа раздела
- v проверка таблицы разделов
- i вывести информацию о разделе
- u переключение показ на цилинды / секторы

### Сектор и Блок

Наименьший адресуемый элемент блочного устройства это сектор. Размер сектора это число степень двойки.
Самый частый размер сектора 512 байт. Сектор (аппаратный сектор) - это оснополагающий элемент блочного устройства.

Блок (блок файловой системы) — это абстракция файловой системы, то есть все обращения к файловым системам могут выполняться только с данными, кратными размеру блока.

Получается физические устройства адресуются на уровне секторов, а ядро операционной системы выполняет все операции в блоках.
Размер блока не может быть меньше размера сектора, и должен быть кратен размеру сектора.
Наиболее часто встречающиеся размер блока 512 б, 1024 б, 2048 б, 4096 б. Ядро так же требует чтобы размер блока был не больше чем размер страницы памяти 

В итоге операции на блоках являются надстройками над секторами.

Определим размер блока файловой системы для уже созданных разделов c файловой системой :

```bash
sudo tune2fs -l /dev/sda1 | grep -i 'block size'
Block size:               4096 # ext4

sudo tune2fs -l /dev/sdb1 | grep -i 'block size'
Block size:               1024 # ext2
```
Размер сектора :

```bash
sudo fdisk /dev/sdb1 -l
Disk /dev/sdb1: 100 MiB, 104857600 bytes, 204800 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

Раздел `/dev/sdb1 ` у нас объемом 100 MБ (104857600 байт) в нем создана файловая система `ext2` с размером блока 1024 байта.
Получаем 104857600 / 1024 = 102400 возможных блоков на файловой системе и 104857600 / 512 = 204800 секторов на жестком диске
 
### Файловая система

Для того, чтобы на раздел можно было записать данные, нужно создать в нем файловую систему. 
Для этого используется одна из утилит `mkfs.*.`

Файловая система состоит из следующих частей :

1. Блок начальной загрузки - блок содержит информацию применяемую для загрузки операционной системы. Самой файловой системой он не используется.
2. Суперблок - единичный блок содержит информацию о параметрах файловой системы.
3. Таблица индексных дескрипторов - список файлов и информации о них.
4. Блоки данных - пространсво файловой системы для хранения файлов и каталогов.

Размер блока как описано выше бывает разный. Это зависит от типа файловой системы.

>> Если вы планируете хранить на диске файлы большого размера имеет смысл задать блок большего размера

Файловая система ext2 разбивает все доступное пространство раздела на блоки равного размера. 
В каждой группе блоков содержится копия суперблока (теперь через одну группу), таблица индексных дескрипторов, и блоки данных для группы блоков.

В качестве примера имеем том на 50М

```bash
Device     Boot  Start    End Sectors Size Id Type
/dev/sdd1         2048 104447  102400  50M 83 Linux
```
То есть 

- 50 мегабайт = 52428800 байт
- допустим 1 блок = 1024 байта, тогда (52428800 / 1024) = 51200 блоков
- 8 * 1024 = 8192 блоков в группе
- 51200 / 8192 = 6.26 ~ 7 групп блоков 


#### Суперблок
#### Таблица индексных дескрипторов

1 файл содержит 1 запись в таблице индексных дескрипторов
#### Блоки данных




Создадим файловую систему `ext2` на первом разделе диска

```bash
sudo mkfs -L ext2-filesystem -v /dev/sdd1
mke2fs 1.44.5 (15-Dec-2018)
fs_types for mke2fs.conf resolution: 'ext2', 'small'
Filesystem label=ext2-filesystem
OS type: Linux
Block size=1024 (log=0)
Fragment size=1024 (log=0)
Stride=0 blocks, Stripe width=0 blocks
12824 inodes, 51200 blocks
2560 blocks (5.00%) reserved for the super user
First data block=1
Maximum filesystem blocks=52428800
7 block groups
8192 blocks per group, 8192 fragments per group
1832 inodes per group
Filesystem UUID: d1dc116e-0d0f-40ec-9d58-eb0b7f8f18d9
Superblock backups stored on blocks: 
        8193, 24577, 40961

Allocating group tables: done                            
Writing inode tables: done                            
Writing superblocks and filesystem accounting information: done

sudo tune2fs -l /dev/sdd1
[sudo] пароль для alex: 
tune2fs 1.44.5 (15-Dec-2018)
Filesystem volume name:   ext2-filesystem
Last mounted on:          <not available>
Filesystem UUID:          d1dc116e-0d0f-40ec-9d58-eb0b7f8f18d9
Filesystem magic number:  0xEF53
Filesystem revision #:    1 (dynamic)
Filesystem features:      ext_attr resize_inode dir_index filetype sparse_super large_file
Filesystem flags:         signed_directory_hash 
Default mount options:    user_xattr acl
Filesystem state:         clean
Errors behavior:          Continue
Filesystem OS type:       Linux
Inode count:              12824
Block count:              51200
Reserved block count:     2560
Free blocks:              48764
Free inodes:              12813
First block:              1
Block size:               1024
Fragment size:            1024
Reserved GDT blocks:      199
Blocks per group:         8192
Fragments per group:      8192
Inodes per group:         1832
Inode blocks per group:   229
Filesystem created:       Wed Apr  8 18:59:51 2020
Last mount time:          n/a
Last write time:          Wed Apr  8 18:59:51 2020
Mount count:              0
Maximum mount count:      -1
Last checked:             Wed Apr  8 18:59:51 2020
Check interval:           0 (<none>)
Reserved blocks uid:      0 (user root)
Reserved blocks gid:      0 (group root)
First inode:              11
Inode size:               128
Default directory hash:   half_md4
Directory Hash Seed:      7af3622b-1305-43f5-b69e-aa4b4919cfe4

```


В расширяемом разделе не хорошо создавать файловую систему.




https://www.linux16.ru/notes/nastrojka-zhestkix-diskov-cherez-tune2fs-v-linux.html

Находиться внутри тома

### Индексный дескриптор

### Дерево каталогов

### Сколько реально фаил занимает места на диске

### Монтирование

### Тип фаил

### Тип директория

### Тип символьная ссылка

### Тип именованный канал



Файловая система
Внешний носитель iso 9660 CDFS NFS - сетевая файловая система
Дерево каталогов - для обеспечения доступа к информации, единая структура
Псевдофайловая система
Корневая фс
Монтирование



https://debianinstall.ru/tipy-fajlov-linux/
https://habr.com/ru/company/flant/blog/354802/
https://linux-notes.org/kak-ispol-zovat-komandu-fdisk-na-linux/
https://4admin.info/linux-superblock/
https://habr.com/ru/company/otus/blog/446614/

https://habr.com/ru/post/462849/


