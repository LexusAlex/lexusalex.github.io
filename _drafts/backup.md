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

Сперва-наперва сделаем копию системы которую нужно впоследствии восстановить.

Делать бэкап будем из самой системы. Для этого нам подойдет утилита `tar`.

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

## Загрука с live cd

Скачаем какой-нибудь образ live-cd, и загрузимся с него. Я использую debian.

Скачать можно с ftp яндекса `https://mirror.yandex.ru/debian-cd/current-live/amd64/iso-hybrid/debian-live-11.0.0-amd64-standard.iso`

Зайдем под суперпользователяем `root`

```shell
sudo su
```

## Logical Volume Management

Размечать диск мы будем при помощи менеджера логических томов LVM.
LVM вводит новые уровни абстракции, что позволяем работать с логическими томами не привязываясь к реальной конфигурации физических дисков.

В терминалогии LVM работа с дисками идет на 3-х уровнях абстракции:

- PV, Physical volume, физический уровень

Это физический диск или раздел диска.

- VG, Volume group, группа томов

Группа томов объединяющая в себе физические тома в единое пространство, которое может быть размечено на логические разделы.

- LV, Logical volume, логический том

Раздел в группе томов, представляющий из себя блочное устрайство на которое пишутся данные.


## Разметка диска

В нашем live cd утилиты для работы с lvm должны быть в комплекте, если утилыты не установлена, то поставим пакет `apt-get install lvm2`.

Итак, сейчас команда `lsblk` показывает чистый диск `sda`. Создадим физический том, при этом естественно если там были какие-либо дапнные, они будут потеряны.


```shell
pvcreate /dev/sda
```


Проверим что диск может использоваться под LVM можно командой:

```shell
pvdisplay
```


Далее нужно для созданных дисков создать группу томов

```shell
vgcreate vgtest /dev/sda
```

Посмотрим информацию о созданных группах томов

```shell
vgdisplay
```

Пришло время создать логический том

```shell
lvcreate -l 100%FREE -n lvtest vgtest
```

Посмотрим информацию об этом

```shell
lvdisplay
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
