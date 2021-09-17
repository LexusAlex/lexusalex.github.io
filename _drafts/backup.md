---
layout: default
nav_order: 23
permalink: 23-restoring-from-backup-linux
title: Восстановление linux из резервной копии
parent: Заметки
description: Пытаемся восстановить linux из резервной копии
date: 2021-09-14 18:00:00 +3
tags:
- linux
- backup
---

# Восстановление linux из резервной копии
{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>
---

Возникла необходимость восcтановить lunux из полного бекапа. Задача не тревиальная,
поэтому решил написать заметку на эту тему.

## Копия системы

Сперва сделаем копию системы которую возможно впоследствии нужно восстановить.

Делать бэкап будем из самой системы находясь подключенным по ssh. Для этого нам подойдет утилита `tar`.

```shell
tar -cvpzf /mnt/backup/`date +%Y_%m_%d_%H_%M`.tgz --exclude=/proc --exclude=/dev --exclude=/lost+found --exclude=/mnt --exclude=/media --exclude=/sys --ignore-failed-read /
```

Создаем архив, где указываем директорию куда копировать, в данном случае это `/mnt/backup`, это может быть любое место в сети или даже на флешке. Так же прописываем следующиеключи :

- c - создать новый архив
- v - выводить информацию на экран о происходящем
- p - сохранять все права на файлы и каталоги
- z - вывод перенаправить в команду `gzip`
- f - сохранить результат в файл
- exclude - исключить файлы и директории из архива
- ignore-failed-read - игнорировать ошибки чтения

После окончания процедуры, должен создатся архив с полным бэкапом сервера.

## Загрука с live cd

Скачаем какой-нибудь образ live-cd. Загрузимся с него. Я использую для этого debian live-cd.

Скачать можно с ftp яндекса `https://mirror.yandex.ru/debian-cd/current-live/amd64/iso-hybrid/debian-live-11.0.0-amd64-standard.iso`

Зайдем под суперпользователяем `root`

```shell
sudo su
```

Теперь можно приступать к зазметке диска, но сначала немного про LVM.

## Logical Volume Management

Размечать диск мы будем при помощи менеджера логических томов LVM.
LVM вводит новые уровни абстракции, что позволяем работать с логическими томами не привязываясь к реальной конфигурации физических дисков.

В терминалогии LVM работа с дисками идет на 3-х уровнях абстракции:

- PV, Physical volume, физический уровень

Это непосредственоо физический диск или раздел физического диска.

- VG, Volume group, группа томов

Группа томов объединяющая в себе физические тома в единое пространство, которое может быть размечено на логические разделы.

- LV, Logical volume, логический том

Наконец раздел в группе томов, представляющий из себя блочное устрайство которое содержит файловую систему.

При таком разделении у нас появилась дополительная абстракция в виде группы томов (VG), которая изанимается всей работой по объединению физических дисков в одно пространство.

Большим плюсом LVM является то, что в группу том можно добавлять новые устройства, удалять старые, изменять размеры и расположение, при этом не останавливая сервер.

## Разметка диска

В нашем live cd утилиты для работы с lvm должны быть в комплекте, если утилиты не установлены,то нужно поставить пакет `apt-get install lvm2`.

Cейчас команда `lsblk` показывает чистый диск `sda`, размером 20G

```shell
lsblk
NAME  MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
loop0   7:0    0 687.3M  1 loop /usr/lib/live/mount/rootfs/filesystem.squashfs
sda     8:0    0    20G  0 disk
sr0    11:0    1   903M  0 rom  /usr/lib/live/mount/medium
```


Создадим физический том, и пометим его, что он будет использоться для LVM, при этом естественно если там были какие-либо дапнные, они будут потеряны.


```shell
pvcreate /dev/sda
Physical volume "/dev/sda" successfully created.
```


Сразу проверим диск командой:

```shell
pvdisplay
 "/dev/sda" is a new physical volume of "20.00 GiB"
 --- NEW Physical volume ---
 PV Name               /dev/sda
 VG Name
 PV Size               20.00 GiB
 Allocatable           NO
 PE Size               0
 Total PE              0
 Free PE               0
 Allocated PE          0
 PV UUID               TFH7eV-iyli-imo0-2aw6-MeNX-4c7p-ZTvYCo
```

Далее нужно для созданных дисков или в нашем случае одного диска создать группу томов.

```shell
vgcreate vg01 /dev/sda
Volume group "vg01" successfully created
```

Посмотрим информацию о созданных группах томов

```shell
vgdisplay
--- Volume group ---
VG Name               vg01
System ID
Format                lvm2
Metadata Areas        1
Metadata Sequence No  1
VG Access             read/write
VG Status             resizable
MAX LV                0
Cur LV                0
Open LV               0
Max PV                0
Cur PV                1
Act PV                1
VG Size               <20.00 GiB
PE Size               4.00 MiB
Total PE              5119
Alloc PE / Size       0 / 0
Free  PE / Size       5119 / <20.00 GiB
VG UUID               jIYtHn-6GJD-ikuc-hWDU-JUHA-2UVP-sA3y17
```

Теперь наконец можно создать логический том, куда непосредственно будем разворачивать систему.

```shell
lvcreate -l 100%FREE -n lv01 vg01
Logical volume "lv01" created.
```

Запись выше означает, что создать логический том lv01 используя все свободное пространство группы томов vg01.


Посмотрим информацию о созданном томе.

```shell
lvdisplay
--- Logical volume ---
LV Path                /dev/vg01/lv01
LV Name                lv01
VG Name                vg01
LV UUID                FG6S7H-614U-S3N7-u3Z6-9yoK-Vu0c-QCmQAB
LV Write Access        read/write
LV Creation host, time debian, 2021-09-17 11:12:09 +0000
LV Status              available
# open                 0
LV Size                <20.00 GiB
Current LE             5119
Segments               1
Allocation             inherit
Read ahead sectors     auto
- currently set to     256
Block device           253:0
```

## Создание файловой системы

Перед созданием файловой системы посмотрим на вывод `lsblk`

```shell
lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
loop0         7:0    0 687.3M  1 loop /usr/lib/live/mount/rootfs/filesystem.squashfs
sda           8:0    0    20G  0 disk
└─vg01-lv01 253:0    0    20G  0 lvm
sr0          11:0    1   903M  0 rom  /usr/lib/live/mount/medium
```

Видим наш созданный том.


Процесс создания файловой системы на томах LVM ничем не отличается от работы с любыми другими разделами.


```shell
mkfs.ext4 /dev/vg01/lv01

mke2fs 1.46.2 (28-Feb-2021)
Creating filesystem with 5241856 4k blocks and 1310720 inodes
Filesystem UUID: 7943e74f-802f-43b5-b7a7-32c3e0d779ba
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
        4096000

Allocating group tables: done
Writing inode tables: done
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done

```

## Монтирование источника

Теперь нам нужно загрузить и распаковать файлы бэкапа в нашу файловую систему.

Установим утилиты для рыботы 

```shell
apt install cifs-utils
```

Создадим директорию куда будет монтировать бэкап

```shell
mkdir /backup
``` 

Смонтируем архив

```shell
mount.cifs -v //SRV6BACKUP/linux/backup /backup/  --verbose -o username="test",password="test",file_mode=0777,dir_mode=0777,iocharset=utf8
```

Теперь разово смонируем наш том в директрию `/mnt`

```shell
mount /dev/vg01/lv01 /mnt
```
--ignore-failed-read

Делаем резервное копирование системы с возможностью восстановления из бекапа.

Необходимо восстановить систму на другом железе

https://mirror.yandex.ru/debian-cd/current-live/amd64/iso-hybrid/

## Резервное копирование системы

Необходимо создать архив, где то в локальной сети

sudo mkdir /mnt/192.168.88.252
sudo mkdir /mnt/usb

Например смонтируем флешку, здесь может быть любой носитель

sudo mount /dev/sdb /mnt/usb

//sudo mount 192.168.88.252/backup /mnt/192.168.88.252 -o guest,rw,iocharset=utf8

sudo tar -cvpzf /media/alex/5b055601-cdfb-418b-8712-c4502f18429b/backup/xubuntu2021/`date +%Y_%m_%d_%H_%M`.tgz --exclude=/proc --exclude=/dev --exclude=/lost+found --exclude=/mnt --exclude=/cdrom --exclude=/media --exclude=/sys --ignore-failed-read /

sudo tar -cvpzf /mnt/usb/`date +%Y_%m_%d_%H_%M`.tgz --exclude=/proc --exclude=/dev --exclude=/lost+found --exclude=/mnt --exclude=/media --exclude=/sys --ignore-failed-read /

sudo tar -cvpzf /media/alex/5b055601-cdfb-418b-8712-c4502f18429b/backup/`date +%Y_%m_%d_%H_%M`.tgz --exclude=/proc --exclude=/dev --exclude=/lost+found --exclude=/mnt --exclude=/cdrom --exclude=/media --exclude=/sys --ignore-failed-read /

service smbd restart
Восстановление

sudo su
fdisk -l
fdisk /dev/sda
n
p
a

mkfs.ext4 /dev/sda1

sudo apt install cifs-utils
yum install cifs-utils

1. mount /dev/sda1 /mnt/

mount -t cifs -o username=guest,password=,uid=1000,iocharset=utf8 //192.168.88.252/share /media
mount.cifs -v //BACKUP/linux /mnt/share  --verbose -o username="",password="",file_mode=0777,dir_mode=0777,iocharset=utf8

sudo tar -cvpzf /media/test_debian/`date +%Y_%m_%d_%H_%M`.tgz --exclude=/proc --exclude=/dev --exclude=/lost+found --exclude=/mnt --exclude=/cdrom --exclude=/media --exclude=/sys --ignore-failed-read /

2.
Восстановление centos

1.
sudo su
fdisk -l
fdisk /dev/sda
n
p
a
w

apt-get install xfsprogs
mkfs -t xfs /dev/sdb1
mount /dev/sda1 /mnt/

2.

sudo mount -t cifs //192.168.88.252/share /media -o username=guest

Распаковываем
tar --same-owner -xvpf /media/centos/backupYYYYMMDD.tgz -C /mnt/

mount /dev/mapper/centos-root /mnt/sysimage

mkdir /mnt/dev /mnt/sys /mnt/proc /mnt/media

mount --bind /dev /mnt/dev
mount --bind /proc /mnt/proc
mount --bind /sys /mnt/sys
mount  /dev/sda1 /mnt/boot

chroot /mnt

vim /etc/fstab

cd /boot
dracut -f [initramfs-версия ядра.img] [версия ядра]

grub-install /dev/sda
update-grub

gfub2-install /dev/sda
grub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg
grub2-mkconfig -o /boot/grub2/grub.cfg


umount /mnt/dev
umount /mnt/proc
umount /mnt/sys
umount /mnt

sudo tar -cvpzf /media/alex/5b055601-cdfb-418b-8712-c4502f18429b/backup/xubuntu2021/`date +%Y_%m_%d_%H_%M`.tgz --exclude=/proc --exclude=/dev --exclude=/lost+found --exclude=/mnt --exclude=/cdrom --exclude=/media --exclude=/sys --ignore-failed-read /
https://habr.com/ru/post/251659/
https://aleksandr0105.ru/2015/04/13/rezervnoe-kopirovanie-ubuntu.html
https://xhop.ru/nix-sistemyi/centos-7-dracut-boot-recovery/

sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload
