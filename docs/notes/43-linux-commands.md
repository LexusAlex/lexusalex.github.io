---
layout: default
nav_order: 43
permalink: 43-linux-commands
title: Часто используемые команды в linux
parent: Заметки
description: Просто список команд
date: 2023-01-15 01:00:00 +3
last_modified_date: 2023-04-26 18:50:00 +3
tags:
- linux
---

# Часто используемые команды в linux
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

Просто список команд, часто используемых команд в linux.
Так же типовые настройки серверов и рабочих станций.
Собираем все в одном месте.

## Работа с пакетами

```shell
# Обновить кеш пакетов
sudo apt update
# Какие пакеты могут быть обновлены
sudo apt list --upgradable
# Обновление всех пакетов
sudo apt upgrade
# Обновить тоже все пакеты + удалить пакеты если это требуется
sudo apt full-upgrade
# Пакеты которые можно удалить
sudo apt autoremove
# Найти доступный пакет
sudo apt search php
# Установка пакета
sudo apt install php
# Удаление пакета
sudo apt remove php
# Удалить полностью вместе с конфигурацией
sudo apt purge php
```

## Поиск

### Поиск по содержимому файлов

```shell
# В самом простом виде, когда нужно просто найти что-то в файлах
grep -rnw /var/www -e "строка поиска"
```

### Поиск самых больших файлов и каталогов

```shell
# Поиск больших файлов и каталогов на сервере + сортировка 
du -sh /var/www/* | sort -hr
```
 
## Копирование файлов

```shell
# Прямое копирование файлов с сервера на сервер через промежуточный сервер
# srv1 - сервер где лежит фаил
# srv2 - сервер куда надо загрузить фаил
# srv_host - промежуточный сервер
# 1. На srv_host генерируем ключи
# 2. Копируем поочередно ключ на каждый из серверов 
# ssh-copy-id -i ~/.ssh/id_rsa.pub root@srv1
# ssh-copy-id -i ~/.ssh/id_rsa.pub root@srv2
#3. Копируем фаил находясь на srv_host
scp root@srv1:/var/log.txt root@srv2:/tmp
```

## Docker

```shell
# Элементы докера
docker system df
# Очистить тома
docker volume prune -a
# Удалить контейнеры
docker container prune
# Удалить образы
docker image prune
# Удалить сети
docker network prune
 # Удалить все полностью
docker system prune -a
```

## Настройка новых рабочих станций

### Xubuntu desktop

Качаем операционку

[https://mirror.yandex.ru/ubuntu-cdimage/xubuntu/releases/22.04.1/release/](https://mirror.yandex.ru/ubuntu-cdimage/xubuntu/releases/22.04.1/release/)

Готовим загрузочную флешку с помощью [https://unetbootin.github.io/](https://unetbootin.github.io/). 

Если ставим на виртуалку, то ставим как есть.

#### VMware

Последняя версия с ключом, удаляем старую версию и запускаем новую
[https://nnmclub.to/forum/viewtopic.php?t=1593057](https://nnmclub.to/forum/viewtopic.php?t=1593057)

#### Разбираемся c firefox

```shell
sudo snap remove firefox && sudo add-apt-repository ppa:mozillateam/ppa && echo '
Package: *
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 1001
' | sudo tee /etc/apt/preferences.d/mozilla-firefox && echo 'Unattended-Upgrade::Allowed-Origins:: "LP-PPA-mozillateam:${distro_codename}";' | sudo tee /etc/apt/apt.conf.d/51unattended-upgrades-firefox && sudo apt install -y firefox
```

#### Внешний вид и общие настройки

- Переносим пуск вниз
- Система возможно предложит скачать языковой пакет
- Обновление всего 
  ```shell
  sudo apt update && sudo apt upgrade && sudo apt full-upgrade && sudo apt autoremove && sudo apt --purge autoremove
  ```
- Ставим ПО 
  ```shell
  sudo apt install -y xfce4-xkb-plugin libreoffice libreoffice-gnome vlc ark network-manager-openvpn-gnome make && sudo add-apt-repository -y ppa:git-core/ppa && sudo apt-get update && sudo apt install git -y
  ```
- Добавить иконку переключения языка (panel -> add new items) + установить русский язык (settings -> keyboard alt+shift)

#### Настройка git

Установка значений для всех моих репозиториев, где установим автора коммита и общий gitignore
```shell
git config --global core.excludesfile ~/.gitignore && echo '.idea/' >> ~/.gitignore && git config --global user.name "Alexey Shmelev" && git config --global user.email alexsey_89@bk.ru && git config --global init.defaultBranch main
```

#### docker и docker-compose
      
Актуальная инструкция [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
 
Или все одной командой

```shell
sudo apt-get update && sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release && sudo mkdir -m 0755 -p /etc/apt/keyrings && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg && echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin && sudo chmod 666 /var/run/docker.sock
```

#### ansible

Актуальная инструкция [https://docs.ansible.com/ansible/latest/installation_guide/installation_distros.html#installing-ansible-on-ubuntu](https://docs.ansible.com/ansible/latest/installation_guide/installation_distros.html#installing-ansible-on-ubuntu)

Или все одной командой

```shell
sudo apt update && sudo apt install software-properties-common && sudo add-apt-repository --yes --update ppa:ansible/ansible && sudo apt install ansible
```

После установки основного ПО у меня занято 14 Gb

#### phpstorm

1. Качаем [https://www.jetbrains.com/ru-ru/phpstorm/](https://www.jetbrains.com/ru-ru/phpstorm/)
2. Распаковываем помощью архиватора arc в корень домашней папки
3. Скачиваем [https://cloud.mail.ru/public/XfYk/uD5yj7eE4](https://cloud.mail.ru/public/XfYk/uD5yj7eE4) и распаковываем архив
4. Переносим папку ja-netfilter-all в директорию phpstorm и запускаем ja-netfilter-all/scripts/install.sh
5. log out в системе
6. Запускам phpstorm bin/phpstorm.sh и вводим key

#### Настройка ключей

1. Генерируем ключ на локальной машине `ssh-keygen -t ed25519 -C "alexsey_89@bk.ru" cat ~/.ssh/id_ed25519.pub`
2. Копируем его на github
3. `ssh -T git@github.com` проверяем, что все работает

### Ubuntu server

Скачиваем [https://mirror.yandex.ru/ubuntu-releases/22.04/](https://mirror.yandex.ru/ubuntu-releases/22.04/)

Ставим и обращаем внимание на разметку диска lvm, чтобы не оставалось свободного пространства.

#### Первоначальная настройка

1. `ssh alex@192.168.88.136` - Заходим на свежеустановленный сервер
2. `service sshd status` - Проверяем ssh
3. `sudo passwd root` - Задаем пароль root
4. `su root` - Заходим под root
5. `sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/g' /etc/ssh/sshd_config && sed -i 's/#Port 22/Port 60022/g' /etc/ssh/sshd_config && systemctl restart ssh` - Меняем настройки ssh
6. `exit exit` - Выходим с сервера
7. `ssh-copy-id -i ~/.ssh/id_ed25519.pub -p 60022 root@192.168.88.136` - Находясь на хосте с ansible копируем ключ на сервер, для доступа root пользователю
8. `ssh -p 60022 root@192.168.88.136` - Пробуем заходить
9. Далее все делаем с помощью ansible

#### Ansible

Создал репозиторий с первоначальным набором ролей [https://github.com/LexusAlex/ansible-start](https://github.com/LexusAlex/ansible-start)

Для разворачивания проектов нужно добавлять свои роли