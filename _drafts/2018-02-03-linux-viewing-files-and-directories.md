---
layout: post
title:  Linux - просмотр файлов и директорий
date:   2018-01-29
author: Алексей Шмелев
categories: linux
comments: true
cover:  "/assets/hello/hello.jpg"
---

Что бы просматривать каталоги используется команда ls, наверное самая известная в linux. У этой команды множество ключей

~~~
ls options file
~~~

Посмотреть содержимое каталога, включая скрытые файлы c точкой (-a)

~~~
ls -a

.   assets      _config.yml  doc            feed.xml  Gemfile.lock  .gitignore  _includes   js        LICENSE.md         _posts      README.md  .sass-cache
..  circle.yml  css          .editorconfig  Gemfile   .git          .idea       index.html  _layouts  package-lock.json  posts.html  _sass      _site

~~~

Теперь отобразим все файлы в директории включая скрытые, но кроме ссылок . и .. (-A)

~~~
ls -A
assets      _config.yml  doc            feed.xml  Gemfile.lock  .gitignore  _includes   js        LICENSE.md         _posts      README.md  .sass-cache
circle.yml  css          .editorconfig  Gemfile   .git          .idea       index.html  _layouts  package-lock.json  posts.html  _sass      _site
~~~

Это все конечно хорошо, но хотелось бы посмотреть расширенный список с характеристиками объектов c inode файла(-li)

~~~
ls -li

6698807 -rw-rw-r-- 1 alex alex    0 янв 28 16:25 analytics.html

6698807 - inode файла
-rw-rw-r-- - права доступа и тип файла
1 - колличесво жестких ссылок на фаил
alex - имя владельца файла
alex - имя группы владельца файла
0 - размер файла в байтах
янв 28 16:25 - дата создания файла
analytics.html  - название

~~~

Узнаем автора файла --author, эта колонка идет после группы владельца файла

~~~
ls -li --author

6698807 -rw-rw-r-- 1 alex alex alex    0 янв 28 16:25 analytics.html
6698872 -rwxrwxr-x 1 alex alex alex 2481 янв 28 17:34 footer.html
6698758 -rwxrwxr-x 1 alex alex alex  810 янв 28 15:54 header.html
6698757 -rwxrwxr-x 1 alex alex alex 5602 янв 28 15:54 head.html
6698759 -rwxrwxr-x 1 alex alex alex   92 янв 28 15:54 page_divider.html

~~~

  


