---
layout: default
nav_order: 4
permalink: linux-cli-4-install-and-settings-mysql-server-ubuntu
title: Установка mysql сервера в ubuntu
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Как установить и предварительно настроить mysql сервер в ubuntu
date: 2023-06-11 15:30:00 +3
last_modified_date: 2023-06-11 15:30:00 +3
tags:
- linux
- docker
- questions-and-solutions
---

# Установка mysql сервера в ubuntu
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

Сейчас нам интересна базовая установка mysql из репозиториев на ubuntu server 22.04

Официальная документация [https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/#repo-qp-apt-install-from-source](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/#repo-qp-apt-install-from-source)

Нам нужно установить два мета-пакета 

- `mysql-server`
- `mysql-client`

```shell
sudo apt update
sudo apt install mysql-server mysql-client
```

Проверяем корректность установки:

```shell
systemctl status mysql
mysql --version
mysqld --version
```

По умолчанию пароль для пользователя root не установлен, зайдем в консоль

`sudo mysql`

https://www.cyberciti.biz/faq/installing-mysql-server-on-ubuntu-22-04-lts-linux/