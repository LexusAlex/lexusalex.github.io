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

MBR поддерживает создание только 4 разделов, 3 первичных и один расширенный

```bash
Command (m for help): n # создаем раздел
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p # создаем первичный раздел
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
/dev/sdb5       618496 4194303 3575808  1,7G 83 Linux
```

Список доступных типов разделов

```bash
sudo fdisk /dev/sdb

Welcome to fdisk (util-linux 2.33.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): l
 0  Empty           24  NEC DOS         81  Minix / old Lin bf  Solaris        
 1  FAT12           27  Hidden NTFS Win 82  Linux swap / So c1  DRDOS/sec (FAT-
 2  XENIX root      39  Plan 9          83  Linux           c4  DRDOS/sec (FAT-
 3  XENIX usr       3c  PartitionMagic  84  OS/2 hidden or  c6  DRDOS/sec (FAT-
 4  FAT16 <32M      40  Venix 80286     85  Linux extended  c7  Syrinx         
 5  Extended        41  PPC PReP Boot   86  NTFS volume set da  Non-FS data    
 6  FAT16           42  SFS             87  NTFS volume set db  CP/M / CTOS / .
 7  HPFS/NTFS/exFAT 4d  QNX4.x          88  Linux plaintext de  Dell Utility   
 8  AIX             4e  QNX4.x 2nd part 8e  Linux LVM       df  BootIt         
 9  AIX bootable    4f  QNX4.x 3rd part 93  Amoeba          e1  DOS access     
 a  OS/2 Boot Manag 50  OnTrack DM      94  Amoeba BBT      e3  DOS R/O        
 b  W95 FAT32       51  OnTrack DM6 Aux 9f  BSD/OS          e4  SpeedStor      
 c  W95 FAT32 (LBA) 52  CP/M            a0  IBM Thinkpad hi ea  Rufus alignment
 e  W95 FAT16 (LBA) 53  OnTrack DM6 Aux a5  FreeBSD         eb  BeOS fs        
 f  W95 Ext'd (LBA) 54  OnTrackDM6      a6  OpenBSD         ee  GPT            
10  OPUS            55  EZ-Drive        a7  NeXTSTEP        ef  EFI (FAT-12/16/
11  Hidden FAT12    56  Golden Bow      a8  Darwin UFS      f0  Linux/PA-RISC b
12  Compaq diagnost 5c  Priam Edisk     a9  NetBSD          f1  SpeedStor      
14  Hidden FAT16 <3 61  SpeedStor       ab  Darwin boot     f4  SpeedStor      
16  Hidden FAT16    63  GNU HURD or Sys af  HFS / HFS+      f2  DOS secondary  
17  Hidden HPFS/NTF 64  Novell Netware  b7  BSDI fs         fb  VMware VMFS    
18  AST SmartSleep  65  Novell Netware  b8  BSDI swap       fc  VMware VMKCORE 
1b  Hidden W95 FAT3 70  DiskSecure Mult bb  Boot Wizard hid fd  Linux raid auto
1c  Hidden W95 FAT3 75  PC/IX           bc  Acronis FAT32 L fe  LANstep        
1e  Hidden W95 FAT1 80  Old Minix       be  Solaris boot    ff  BBT
```

https://www.alv.me/Nakopiteli-v-linux-modeli-imenovaniya/

### Сектор / Блок

Диск разделяется на блоки

### Файловая система

Находиться внутри тома

### Индексный дескриптор

### Дерево каталогов

### Сколько реально фаил занимает места на диске

### Монтирование



Файловая система
Внешний носитель iso 9660 CDFS NFS - сетевая файловая система
Дерево каталогов - для обеспечения доступа к информации, единая структура
Псевдофайловая система
Корневая фс
Монтирование

blockdev 
udev
https://itsecforu.ru/2018/11/26/%D0%BA%D0%B0%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-udev-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%B1%D0%BD%D0%B0%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B8-%D1%83/
sysfs
http://mydebianblog.blogspot.com/2013/02/sysfs-linux.html

https://debianinstall.ru/tipy-fajlov-linux/
https://habr.com/ru/company/flant/blog/354802/
https://linux-notes.org/kak-ispol-zovat-komandu-fdisk-na-linux/
https://4admin.info/linux-superblock/
https://habr.com/ru/company/otus/blog/446614/

https://habr.com/ru/post/462849/



