---
layout: default
nav_order: 32
permalink: 32-deploy-github-actions
title: Деплой сайта с github actions
parent: Заметки
description: Автоматический деплой сайта при пуше в репозиторий
date: 2022-08-28 11:30:00 +3
last_modified_date: 2022-08-28 11:30:00 +3
tags:
- ssh
- github
- git
---

# Деплой сайта с github actions
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

Итак, мы хотим при коммите,пуше в репозиторий, заливать измененный код так же на наш сервер, автоматически.

С этим нам поможет [github actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

Кратко это будет происходить примерно так: когда код пушится в основную ветку репозитория, срабатывает действие github actions.
В котором написано подключись к серверу и сделай там pull, или еще какие действия.

## Порядок действий

Что нужно сделать, что это все заработало:

1. У себя на локальном компьютере создать [пару ключей](https://lexusalex.ru/linux-ssh-keys#%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82), они добавятся в домашнюю папку
2. Теперь на наш сервер с сайтом нужно добавить публичный ключ, который мы создали выше примерно такой командой `ssh-copy-id -i ~/.ssh/id_rsa.pub user@127.0.0.1`, либо через интерфейс
3. Теперь нужно в репозитории на github перейти в settings далее в secrets далее в actions и добавить туда наш приватный ключ, github это все шифрует.
4. Добавляем так же туда в секреты, реквизиты нашего сервера и под кем туда заходить HOST, PATH,PORT,USER.
5. Пишем задачу для деплоя, выглядеть она будет примерно так:

```yaml
name: my deploy
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-20.04
    steps:
    - name: checkout project
      uses: actions/checkout@v1
    - name: push
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        port: ${{ secrets.PORT }}
        username: ${{ secrets.USER }}
        key: ${{ secrets.SSH_KEY }}
        script_stop: true
        script: |
          git -C ${{ secrets.PATH }} pull
```

Здесь мы делаем по пушу в ветку main, в докере контейнере будет поднята ubuntu-20.04. Далее с помощью плагина appleboy/ssh-action@master
мы подключимся к нашему серверу и выполним там `git pull`. 
После этого контейнер удалиться. Такие действия будут происходить после каждого пуша на сервер.

Файл должен лежать здесь `[REPO]/.github/workflows/workflow.yml`

После пуша сразу можно перейти во вкладку actions вашего репозитория и вживую посмотреть, как все команды из yml файла выполняются прямо там.
Все наглядно видно.







