---
layout: default
nav_order: 49
permalink: 49-install-gitlab
title: Установка gitlab
parent: Заметки
description: Ставим gitlab на свой сервер
date: 2023-03-26 12:00:00 +3
last_modified_date: 2023-03-26 12:00:00 +3
tags:
- linux
- gitlab
- git
---

# Установка gitlab
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

## Подготовка системы

Подготовим систему в локальной сети либо в облаке.

[Системные требования для gitlab](https://docs.gitlab.com/ee/install/requirements.html)

Я буду ставить локально.

Специально для этого написал [заметку и создал ansible role](https://lexusalex.ru/43-linux-commands#ubuntu-server)

## Зависимости

```shell
sudo apt install curl openssh-server ca-certificates tzdata perl postfix
```

В процессе установки нужно настроить postfix, выбрав internet-site и указав его имя например `git.local.ya`

## DNS

Для корректного получения сертификата нужно добавить A запись в ваш DNS

## Установка

Скачиваем скрипт установки

```shell
sudo curl -LO https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh
sudo bash script.deb.sh
```

Запускаем поиск, смотрим какая версия будет установлена:

```shell
sudo apt search gitlab-ce
# На текущий момент это 15.10.0
```

Ставим ее: 

```shell
sudo apt install gitlab-ce
```

В результате должен появится логотип gitlab, что говорит о том что установка завершена

```shell
       *.                  *.
      ***                 ***
     *****               *****
    .******             *******
    ********            ********
   ,,,,,,,,,***********,,,,,,,,,
  ,,,,,,,,,,,*********,,,,,,,,,,,
  .,,,,,,,,,,,*******,,,,,,,,,,,,
      ,,,,,,,,,*****,,,,,,,,,.
         ,,,,,,,****,,,,,,
            .,,,***,,,,
                ,*,.
  


     _______ __  __          __
    / ____(_) /_/ /   ____ _/ /_
   / / __/ / __/ /   / __ `/ __ \
  / /_/ / / /_/ /___/ /_/ / /_/ /
  \____/_/\__/_____/\__,_/_.___/
```

Смотрим текущую версию:

```shell
sudo cat /opt/gitlab/version-manifest.txt | head -n 1
```

## Включаем ufw

Далее нужно включить брандмауэр, и открыть порты.

```shell
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
````

## Конфигурирование

Самый важный пункт перед запуском процесса конфигурирования правка конфига:
 
Самые основные опции

```shell
sudo vim /etc/gitlab/gitlab.rb
```

```text
external_url 'https://git.test.local'
letsencrypt['enable'] = true
letsencrypt['contact_emails'] = ['info@hhbb.me']
letsencrypt['auto_renew'] = true
letsencrypt['auto_renew_hour'] = "12"
letsencrypt['auto_renew_minute'] = "30"
letsencrypt['auto_renew_day_of_month'] = "*/7"
```
 
Теперь нужно сконфигурировать и перечитать параметры

```shell
sudo gitlab-ctl reconfigure
```

В конце конфигурирования будет записан пароль учетной записи администратора в файл `/etc/gitlab/initial_root_password`

Теперь перейдя по адресу который указывали выше, попадаем в gitlab. Вводим туда пароль из файла выше и логин root.
 
Установка на этом завершена.