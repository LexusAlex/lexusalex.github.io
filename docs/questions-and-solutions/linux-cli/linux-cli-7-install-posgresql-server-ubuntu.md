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
last_modified_date: 2023-07-01 23:30:00 +3
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

Добавляем репозиторий из которого будем ставить postgres:

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

Ставим postgres, поставится последняя стабильная версия на данный момент

````shell
sudo apt install postgresql
````

Включаем и стартуем postgres

````shell
sudo systemctl enable postgresql
sudo systemctl start postgresql
````

````shell
# Проверяем версию
sudo psql --version  # psql (PostgreSQL) 15.3 (Ubuntu 15.3-1.pgdg22.04+1)
# Или так
sudo -u postgres psql -c "SELECT version();"
# Заходим под пользователем postgres и попадаем в консоль
sudo -u postgres psql
# Выйти из консоли
postgres=# exit  или \q
# Переключаемся под пользователем postgres
sudo -i -u postgres
# И заходим уже без проблем, так как мы подключились под пользователем postgres
psql
# Но заходить без пароля является плохой практикой, поэтому задаем пароль
ALTER USER postgres PASSWORD 'SuperPass2_@A';
# Теперь можем зайти используя пароль
sudo -u postgres psql -h localhost -U postgres
````

