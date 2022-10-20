---
layout: default
nav_order: 35
permalink: 35-settings-new-system
title: Настройка новой системы
parent: Заметки
description: Как быстро продолжить работать на новой системе 
date: 2022-10-20 12:10:00 +3
last_modified_date: 2022-10-20 12:10:00 +3
tags:
- linux
---

# Настройка новой системы
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

Когда система схлопнулась, очень важно быстро все поднять и создать рабочее окружение и продолжить работу.

Для меня это складывается в несколько инструкций:

- Устанавливаем систему из образа [https://mirror.yandex.ru/ubuntu-cdimage/xubuntu/releases/22.04.1/release/](https://mirror.yandex.ru/ubuntu-cdimage/xubuntu/releases/22.04.1/release/)\
- Установка нормальной версии firefox. Весь нужный код одной командой:

```shell
sudo snap remove firefox && sudo add-apt-repository ppa:mozillateam/ppa && echo '
Package: *
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 1001
' | sudo tee /etc/apt/preferences.d/mozilla-firefox && echo 'Unattended-Upgrade::Allowed-Origins:: "LP-PPA-mozillateam:${distro_codename}";' | sudo tee /etc/apt/apt.conf.d/51unattended-upgrades-firefox && sudo apt install -y firefox
```
Если по какой-то причинам нужно более подробно разобрать что происходит выше [https://omgubuntu.ru/how-to-install-firefox-deb-apt-ubuntu-22-04/](https://omgubuntu.ru/how-to-install-firefox-deb-apt-ubuntu-22-04/)

- Общие обновление и upgrade
```shell
sudo apt update && sudo apt upgrade && sudo apt full-upgrade && sudo apt autoremove && sudo apt --purge autoremove
```

Если было много обновлений рекомендуется перезагрузиться.

- Установка нужного ПО

```shell
sudo apt install -y xfce4-xkb-plugin libreoffice libreoffice-gnome vlc ark network-manager-openvpn-gnome && sudo add-apt-repository -y ppa:git-core/ppa && sudo apt-get update && sudo apt install git -y
```

- Настройка git, делать в уже с клонированном репозитории.

```shell
git config --global core.excludesfile ~/.gitignore
echo '.idea/' >> ~/.gitignore
git config --global user.name "Alexey Shmelev"
git config --global user.email alexsey_89@bk.ru
git config --global init.defaultBranch main
```

- Перенести строку пуска вниз, добавить иконку переключения языка, добавить русский язык.
- docker docker compose

```shell
sudo apt-get update && sudo apt-get install -y ca-certificates curl gnupg lsb-release && sudo mkdir -p /etc/apt/keyrings && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

- ansible

```shell
sudo apt update && sudo apt install -y software-properties-common && sudo add-apt-repository --yes --update ppa:ansible/ansible && sudo apt install -y ansible
```

продолжить...

