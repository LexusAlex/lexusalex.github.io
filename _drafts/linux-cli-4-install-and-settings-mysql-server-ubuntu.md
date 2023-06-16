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

Сейчас нам интересна базовая установка mysql последней версии из репозиториев на ubuntu server 22.04

Официальная документация [https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/#repo-qp-apt-install-from-source](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/#repo-qp-apt-install-from-source)

Нам нужно установить пакет `mysql-server`

> Перед установкой пакета возможно удаление пакетов других баз данных, например mariadb

```shell
sudo apt update
# Информационные команды с информацией о mysql server
apt search mysql-server
apt-cache search mysql-server
apt info -a mysql-server-8.0
# Установка mysql сервера
sudo apt install mysql-server
```

Проверяем корректность установки:

```shell
systemctl status mysql
mysql --version
mysqld --version
```

Команды управления сервером

````shell
sudo systemctl start mysql.service # Стартануть сервер
sudo systemctl stop mysql.service  # Остановить сервер 
sudo systemctl restart mysql.service # Перезапустить сервер
sudo systemctl status mysql.service # Статус сервера
sudo systemctl is-enabled mysql.service # Проверим что сервер запускается при старте системы
sudo journalctl -u mysql.service -xe # Просмотр журнала службы
sudo tail -f /var/log/mysql/error.log # Просмотр непосредственно файла с ошибками
mysqld --help --verbose --skip-networking 1>/dev/null # Проверка конфига
````

По умолчанию пароль для пользователя root не установлен, это небезопасно, зайдем в консоль командой `sudo mysql` и установим пароль


```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SuperPass2_@A';
```

Выйдем командой `exit`

Далее нужно выполнить скрипт `sudo mysql_secure_installation`

Скрипт не пропустит если пароль будет легким, к примеру он может быть таким 'SuperPass2_@A'

```text
Enter password for user root:
Change the password for root ? ((Press y|Y for Yes, any other key for No) : Y
New password:
Re-enter new password:
Remove anonymous users? (Press y|Y for Yes, any other key for No) : Y
Disallow root login remotely? (Press y|Y for Yes, any other key for No) : Y
Remove test database and access to it? (Press y|Y for Yes, any other key for No) : Y
Reload privilege tables now? (Press y|Y for Yes, any other key for No) : Y
```

Пробуем зайти на сервер под пользователем root

```shell
mysql -u root -p
mysql -u root -h 127.0.0.1 -p
```

Информационные команды 

```sql
STATUS; # Информация о mysql сервере
SHOW VARIABLES LIKE "%version%"; # Переменные сервера
```

Создадим пользователя

```sql
CREATE DATABASE demo;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'aa95C72_5355a345errtDFG';
GRANT SELECT, INSERT, UPDATE, DELETE ON demo.* TO 'demouser'@'%';  # GRANT ALL PRIVILEGES ON demo.* TO 'demouser'@'%';
SELECT USER,host FROM mysql.user;
SHOW GRANTS FOR demouser;
```

https://www.cyberciti.biz/faq/installing-mysql-server-on-ubuntu-22-04-lts-linux/