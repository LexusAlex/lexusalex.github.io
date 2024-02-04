---
layout: default
nav_order: 10
permalink: linux-cli-10-ansible-preparing-server
title: ansible. Подготовка сервера
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Готовим сервер для работы из ansible
date: 2024-02-04 20:00:00 +3
last_modified_date: 2024-02-04 20:00:00 +3
tags:
- linux
- ansible
- questions-and-solutions
---

# ansible. Подготовка сервера
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

## Шаг 1

Скачать или арендовать систему.

Скачать тут [https://mirror.yandex.ru/ubuntu-releases/22.04/](https://mirror.yandex.ru/ubuntu-releases/22.04/)

Устанавливаем сколько нам нужно серверов.

## Шаг 2

Заходим на настраиваемый сервер под своим созданным при установке пользователем или если у нас уже есть root, 
то пропускаем этот шаг

```shell
ssh alex@192.168.88.129
```

## Шаг 3

Проверка работы службы `ssh`

````
service sshd status
````

## Шаг 4

Задаем пароль пользователю root и заходим под ним, если пароль уже задан, то пропускаем этот шаг

````shell
sudo passwd root
su root
````

## Шаг 5

Настройки для ssh

````shell
sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/g' /etc/ssh/sshd_config && sed -i 's/#Port 22/Port 60022/g' /etc/ssh/sshd_config && systemctl restart ssh
# Выход из сервера
exit exit
````

## Шаг 6

Копирование ключа

````shell
ssh-copy-id -i ~/.ssh/id_ed25519.pub -p 60022 root@192.168.88.129
````

Пробуем заходить без пароля

````shell
ssh -p 60022 root@192.168.88.129
````

## Итог

Мы подготовили сервер к работе с ansible.

Команды одним списком:

````shell
ssh alex@192.168.88.129
service sshd status
sudo passwd root
su root
sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/g' /etc/ssh/sshd_config && sed -i 's/#Port 22/Port 60022/g' /etc/ssh/sshd_config && systemctl restart ssh
exit exit
ssh-copy-id -i ~/.ssh/id_ed25519.pub -p 60022 root@192.168.88.129
ssh -p 60022 root@192.168.88.129
````

Далее управление на себя берет ansible.





