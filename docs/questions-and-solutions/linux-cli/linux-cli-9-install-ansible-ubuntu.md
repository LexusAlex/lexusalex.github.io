---
layout: default
nav_order: 9
permalink: linux-cli-9-install-ansible-ubuntu
title: Установка ansible в ubuntu
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Ставим ansible на ubuntu 22.04
date: 2023-07-08 15:00:00 +3
last_modified_date: 2023-07-08 14:45:00 +3
tags:
- linux
- ansible
- questions-and-solutions
---

# Установка ansible в ubuntu
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

Установка ansible происходит стандартным образом и не вызывает особых трудностей.

Актуальная документация [https://docs.ansible.com/ansible/latest/installation_guide/installation_distros.html#installing-ansible-on-ubuntu](https://docs.ansible.com/ansible/latest/installation_guide/installation_distros.html#installing-ansible-on-ubuntu)
 
Ставим на свою хост машину. На управляемых серверах ansible важное условие - это наличие python.

```shell
sudo apt update # Обновляем пакеты
sudo apt install software-properties-common #  Пакет для управления ppa
sudo add-apt-repository --yes --update ppa:ansible/ansible # Добавляем репозиторий
sudo apt install ansible # Ставим ansible
ansible --version # Проверяем что все поставилось
```

Альтернативным способом установки ansible является установка через pip [https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#selecting-an-ansible-package-and-version-to-install](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#selecting-an-ansible-package-and-version-to-install)