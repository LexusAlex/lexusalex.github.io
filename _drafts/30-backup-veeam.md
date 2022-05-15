---
layout: default
nav_order: 30
permalink: 30-backup-veeam
title: Backup и восстановление с veeam agent for linux
parent: Заметки
description: Эффективно бэкакпим linux
date: 2022-04-30 23:00:00 +3
tags:
- linux
---

# Backup и восстановление с veeam agent for linux
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

Потребность в бэкапах есть всегда. Их нужно и важно делать всегда.

Остановимся на одном из удобных и бесплатных продуктов для бекапов - это [Veeam Agent for Linux](https://www.veeam.com/ru/linux-backup-free-download.html)

## Установка

Скачать Veeam Agent for Linux можно с официального сайта, зарегистрировавшись на нем

Скачаем его последнюю на данный момент версию (май 2022) для debian/ubuntu

Остальные версии лежат в репозитории `http://repository.veeam.com/backup/linux/agent/`

```shell
cd /root
wget https://download2.veeam.com/veeam-release-deb_1.0.8_amd64.deb
```

Установим

```shell
sudo dpkg -i ./veeam-release-deb_1.0.8_amd64.deb 
sudo apt update
sudo apt install veeam
```

После установки программа полностью готова к работе

Запускаем `sudo veeam`, прощелкаем ввод лицензии, в итоге откроется главное окно программы

<figure>
  <img src="/assets/images/notes/30/main_page.png" alt="veeam main page"  data-action="zoom">
</figure>