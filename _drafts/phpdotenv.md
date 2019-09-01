---
layout: post
title: Библиотеки php - phpdotenv
permalink: php-phpdotenv
tags: php environment linux
comments: true
subtitle: Переменные окружения в php
summary:  Переменные окружения в php
cover_url: "/images/jekyll/jekyll.jpg"
is_navigate: true
---

### Переменные окружения в linux

Переменные кружения в linux представляют собой пары `ИМЯ_ПЕРЕМЕННОЙ=ЗНАЧЕНИЕ`.
Ими активно пользуются запущенные программы, скрипты и демоны.

Для просмотра списка переменных окружения установленных для данной рабочей среды и данного пользователя
спользуются команды `env` или `printenv`, например : 

~~~bash
HOSTNAME=9df533cf61f3
COMPOSER_ALLOW_SUPERUSER=1
PWD=/php-tests
HOME=/root
TERM=xterm
SHLVL=1
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
_=/usr/bin/env
~~~

