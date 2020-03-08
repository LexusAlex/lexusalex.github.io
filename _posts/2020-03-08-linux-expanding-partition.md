---
layout: post
title: Linux. Расширение раздела диска
permalink: linux-expanding-partition
tags: linux
comments: true
subtitle: Столкнулся с проблемой расширения корневого раздела сервера linux работающего в облаке.
summary:  Как расширить раздел linux на уже работающем боевом сервере без его остановки
is_navigate: false
cover_url: "/assets/images/articles/linux/part.png"
---

Имеем раздел `/dev/sda1` c файловой системой `ext4` на котором точка монтирования файловой системы :

```bash
df -h -T /dev/sda1
Файловая система Тип  Размер Использовано  Дост Использовано% Cмонтировано в
/dev/sda1        ext4   2,9G         977M  1,8G           36% /
```

Необходимо расширить этот раздел до 6G, при этом не останавливая сервер, сервер должен работать.

В настройках виртуальной машины добавляем + 3G места. Проверяем командой `fdisk -l`:

```bash
sudo fdisk -l
Disk /dev/sda: 6 GiB, 6442450944 bytes, 12582912 sectors
Disk model: VMware Virtual S
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xbfb02ac1

Device     Boot Start     End Sectors Size Id Type
/dev/sda1  *     2048 6289407 6287360   3G 83 Linux
```
или командой `lsblk`:

```bash
lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0    6G  0 disk 
└─sda1   8:1    0    3G  0 part /
sr0     11:0    1  335M  0 rom  
```
Как видим размер диска увеличился и составляет 6G, но размер раздела остался по прежнему 3G.

Задачу решает утилита [growpart](https://manpages.debian.org/jessie/cloud-utils/growpart.1.en.html), которая заполняет таблицу разделов всем доступным пространством.

Для Debian программа находится в пакете `cloud-utils` , устанавливаем:

```bash
apt-get install cloud-utils
```
### Внимание перед дальнейшими действиями сделайте бекап сервера, действия по расширению раздела выполняете на свой страх и риск!!!

Теперь нужно указать диск и номер раздела, например :

```bash
growpart /dev/sda 1
CHANGED: partition=1 start=2048 old: size=6287360 end=6289408 new: size=12580831,end=12582879
```
Программа напишет новый размер диска.

Теперь уже расширяем файловую систему на все пространство увеличенного раздела для этого используем утилиту `resize2fs` :

```bash
sudo resize2fs /dev/sda1
resize2fs 1.44.5 (15-Dec-2018)
Filesystem at /dev/sda1 is mounted on /; on-line resizing required
old_desc_blocks = 1, new_desc_blocks = 1
The filesystem on /dev/sda1 is now 1572603 (4k) blocks long.
```
Проверяем размер раздела :

```bash
df -h -T /dev/sda1
Файловая система Тип  Размер Использовано  Дост Использовано% Cмонтировано в
/dev/sda1        ext4   5,9G         980M  4,7G           18% /
```
В итоге мы на лету расширили раздел. 
Я не призываю делать так, и это всего лишь один из вариантов решения данной задачи.

Еще один вариант расширения раздела опубликован в статье [https://habr.com/ru/post/450444/](https://habr.com/ru/post/450444/)