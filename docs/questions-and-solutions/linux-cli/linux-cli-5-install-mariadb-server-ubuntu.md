---
layout: default
nav_order: 5
permalink: linux-cli-5-install-mariadb-server-ubuntu
title: Установка mariadb сервера в ubuntu
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Как установить mariadb сервер в ubuntu
date: 2023-06-17 19:00:00 +3
last_modified_date: 2024-03-19 09:00:00 +3
tags:
- linux
- mariadb
- questions-and-solutions
---

# Установка mariadb сервера в ubuntu
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

Выполним ряд команд для подготовки к установке сервера

````shell
sudo apt update
sudo apt upgrade
sudo apt-get install wget software-properties-common dirmngr ca-certificates apt-transport-https
````

Ставим версию из репозиториев ubuntu

```shell
sudo apt install mariadb-server
```

Проверяем корректность установки

````shell
systemctl status mariadb
mariadb --version
mariadbd --version
````

Выполняем скрипт установки настроек безопасности

````shell
sudo mysql_secure_installation
````

Отвечаем на вопросы заданные скриптом, по большому счету там все интуитивно понятно.

Пробуем заходить под root

```shell
mysql -u root -p
```

Пользователя можно создать аналогичным способом указанным в статье [https://lexusalex.ru/47-ubuntu-lamp#mariadb](https://lexusalex.ru/47-ubuntu-lamp#mariadb)

Для удаленного подключения под пользователем root, нужно создать учетку удаленного подключения. В идеале точечно указать ip

````sql
CREATE USER 'root'@'1.1.1.1' IDENTIFIED BY 'superpass'; 
GRANT ALL PRIVILEGES ON *.* TO 'root'@'1.1.1.1';
FLUSH PRIVILEGES;
````

Ну и естественно разрешить запуск со всех хостов.