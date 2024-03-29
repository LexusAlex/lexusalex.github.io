---
layout: default
nav_order: 7
permalink: linux-cli-7-install-posgresql-server-ubuntu
title: Установка PostgreSQL сервера в ubuntu 22.04
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Процесс установки postresql на ubuntu сервер
date: 2023-07-01 23:30:00 +3
last_modified_date: 2024-01-14 14:00:00 +3
tags:
- linux
- postgresql
- questions-and-solutions
---

# Установка PostgreSQL сервера в ubuntu 22.04
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

````shell
# Обновляем пакеты
sudo apt update
# Ищем подходящие пакеты для установки
sudo apt-cache search postgresql | grep postgresql # Доступна 14 версия, но мы будем ставить версию по свежее
````

Актуальная документация на [официальном сайте](https://www.postgresql.org/download/linux/ubuntu/)

Добавляем репозиторий из которого будем ставить postgres для нашей версии ubuntu:

````shell
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
````

Импорт ключа

````shell
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
````

Обновляем репозитории

````shell
sudo apt update
````

Проверяем доступность свежих версий
````shell
sudo apt-cache search postgresql | grep postgresql
````

Ставим postgres, поставится последняя стабильная версия на данный момент

````shell
sudo apt install postgresql
````

Включаем и стартуем postgres

````shell
sudo systemctl enable postgresql
sudo systemctl start postgresql
````

При запуске СУБД роли сервиса привязываются к одноименным аккаунтам в Unix-системах.

````shell
# Проверяем версию
sudo psql --version  # psql (PostgreSQL) 16.1 (Ubuntu 16.1-1.pgdg22.04+1)
# Или так
sudo -u postgres psql -c "SELECT version();" # PostgreSQL 16.1 (Ubuntu 16.1-1.pgdg22.04+1) on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0, 64-bit
# Заходим под пользователем postgres и сразу зайдем в консоль
sudo -u postgres psql
# Выйти из консоли
postgres=# exit  или \q
# Статус подключения
postgres=# \conninfo # You are connected to database "postgres" as user "postgres" via socket in "/var/run/postgresql" at port "5432".
 # Переключаемся под пользователем postgres
sudo -i -u postgres
# И заходим уже без проблем, так как мы подключились под пользователем postgres
psql
# Но заходить без пароля является плохой практикой, поэтому задаем пароль
ALTER USER postgres PASSWORD 'SuperPass2_@A';
# Теперь можем зайти используя пароль
sudo -u postgres psql -h localhost -U postgres
````

Базовая установка и настройка на этом завершена.

