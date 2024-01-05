---
layout: default
nav_order: 3
permalink: linux-cli-3-install-docker-ubuntu
title: Установка docker и docker-compose в ubuntu
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Как установить docker и docker-compose в ubuntu 
date: 2023-06-09 14:30:00 +3
last_modified_date: 2024-01-05 15:30:00 +3
tags:
- linux
- docker
- questions-and-solutions
---

# Установка docker и docker-compose в ubuntu
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

docker-compose c V2 поставляется вместе с docker в виде плагина.

Самая актуальная и полная инструкция - это официальная [https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

````shell
sudo apt-get update # Обновляем пакеты
sudo apt-get install ca-certificates curl gnupg # Установка сертификатов системы, curl, gnupg программа для шифрования данных
sudo install -m 0755 -d /etc/apt/keyrings # Директория для ключей
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg # Качаем ключ
sudo chmod a+r /etc/apt/keyrings/docker.gpg # Выставляем нужные права для ключа
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null # Добавляем репозиторий 
sudo apt-get update # Обновляем пакеты
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin # Устанавливаем пакеты docker
````

Далее нужно настроить запуск докера не от root.

Актуальные команды [https://docs.docker.com/engine/install/linux-postinstall/](https://docs.docker.com/engine/install/linux-postinstall/)

```shell
sudo groupadd docker 
sudo usermod -aG docker $USER
newgrp docker
```

И все это одной командой для удобства копирования:

```shell
sudo apt-get update && sudo apt-get install ca-certificates curl gnupg && sudo install -m 0755 -d /etc/apt/keyrings && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg && sudo chmod a+r /etc/apt/keyrings/docker.gpg && echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin && sudo groupadd docker && sudo usermod -aG docker $USER && newgrp docker
```

При возникновении проблем запуска сокета, возможно поможет команда

```shell
sudo chmod 666 /var/run/docker.sock
```

## update 05.01.24

Как оказалось docker compose так просто не обновляется, его надо обновлять вручную по мануалу [https://docs.docker.com/compose/install/linux/#install-the-plugin-manually](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually)

Только тогда получим самую последнюю версию. С обычным docker при этом все в порядке.

