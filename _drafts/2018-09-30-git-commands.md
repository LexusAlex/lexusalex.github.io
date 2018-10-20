--- 
layout: post 
title: команды git
permalink: git-commands
tags: git github

---

# Команды git
- Инициализация
    - [init](#init)
    - [clone](#clone)
- Текущие изменения
    - [add](#add)
    - [rm](#rm)
    - [mv](#mv)

###init

Создание пустого репозитория в текущей директории
~~~bash
git init
Инициализирован пустой репозиторий Git в /home/alex/git-test/test/.git/
~~~

Создание пустого репозитория в указанной директории
~~~bash
git init test2/
Инициализирован пустой репозиторий Git в /home/alex/git-test/test2/.git/
~~~

Инициализация репозитория без рабочего каталога, это и есть хранилище, такой репозиторий содержит только каталог `.git`
~~~bash
git init --bare hub.git
Инициализирован пустой репозиторий Git в /home/alex/git-test/hub.git/
~~~

Краткий вывод команды, указываются только ошибки и предупреждения
~~~bash
git init -q test3
~~~

###clone

Клонирование локального репозитория в указанную папку

~~~bash
git clone hub.git/ test4
Клонирование в test4
warning: Похоже, что вы клонировали пустой репозиторий.
готово.
~~~
Еще вариант клонирования 

~~~bash
git clone file:///home/alex/git-test/hub.git/ test5
Клонирование в test5
warning: Похоже, что вы клонировали пустой репозиторий.
~~~

Поддерживаются так же протоколы http и ssh (чаще имеено ssh)

~~~bash
git clone https://example.com/gitproject.git
git clone ssh://user@server:project.git # так же доступен вариант без протокола git clone user@server:project.git, git по умолчению понимает что это ssh
~~~

Склонируем пустой репозиторий без рабочей папки

~~~bash
git clone --bare hub.git/ hub2.git # что важно bare репозиторий должен имень расширение .git
Клонирование в голый репозиторий hub2.git
warning: Похоже, что вы клонировали пустой репозиторий.
готово.
~~~

###add

В git файлы могут принадлежать к двум группам, отслеживаемые(tracked) и неотслеживаемые(untracked).
По умолчанию все файлы становятся "Неотслеживаемыми", это значит что гит никак не будет реагировать на изменения в этих файлах

git add занимается тем что добавляет файлы в индекс для последующего коммита.

Состояние файлов:

1. ' ' = unmodified - зафиксирован в репозитории
2.   M = modified - модифицирован
3.   A = added - добавлен
4.   D = deleted - удален
5.   R = renamed - переименован
6.   C = copied - скопирован
7.   U = updated but unmerged - обновлен не не слит


Добавить в индекс указанный фаил который был, добавлен, удален или это новый фаил

~~~bash
git add file2
~~~

Добавить в индекс несколько файлов или директории

~~~bash
git add file2 file4 /src /test # git не видит пустые директории
~~~

Добавить в индекс все файлы в текущей директории и во всех ее поддиреториях

~~~bash
git add .
~~~

Добавить в индекс фаил который есть в файле `.gitignore`

~~~bash
git add -f /log/file.log
~~~

Добавить в индекс все файлы кроме новых

~~~bash
git add -u
~~~

Показать новые/изменённые файлы по очереди с указанием их изменений и вопросом об отслеживании/индексировании

~~~bash
git add -p
~~~

###rm

Рекурсивное удаление файлов и директорий и добавление файлов в индекс

~~~bash
git rm -r /src # что равносильно rm -rf /src, но без добавления в индекс
~~~

Удалить фаил и добавить его в индекс

~~~bash
git rm text.txt 
~~~

Удалить любой ценой фаил, даже если он проиндексирован и там есть изменения

~~~bash
git rm -f text.txt
~~~

Так же есть возможность удаления файлов по маске

~~~bash
git rm test*
~~~

Если случайно добавили файл в индекс, его нужно убрать из индекса, но сам фаил не удалиться

~~~bash
git rm --cached file6
~~~


###mv

Переместить или переименовать фаил или каталог. Такого понятия не существует , гит воспринимает это как удаление старого
файла и создание нового

~~~bash
git mv README.txt README_test.txt
~~~

Перемещение файла

~~~bash
git mv README.txt folder/
~~~






Prompt Structure

By default, the general appearance of the prompt is::

(<branch> <upstream branch> <branch tracking>|<local status>)

The symbols are as follows:

    Local Status Symbols
        ✔: repository clean
        ●n: there are n staged files
        ✖n: there are n files with merge conflicts
        ✖-n: there are n staged files waiting for removal
        ✚n: there are n changed but unstaged files
        …n: there are n untracked files
        ⚑n: there are n stash entries
    Upstream branch
        Shows the remote tracking branch
        Disabled by default
        Enable by setting GIT_PROMPT_SHOW_UPSTREAM=1
    Branch Tracking Symbols
        ↑n: ahead of remote by n commits
        ↓n: behind remote by n commits
        ↓m↑n: branches diverged, other by m commits, yours by n commits
        L: local branch, not remotely tracked
    Branch Symbol:
    When the branch name starts with a colon :, it means it's actually a hash, not a branch (although it should be pretty clear, unless you name your branches like hashes :-)



https://github.com/nicothin/web-development/tree/master/git


https://ru.stackoverflow.com/questions/431839/%D0%92-%D1%87%D0%B5%D0%BC-%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-git-add-add-a-add-u-%D0%B8-add

git remote add local_proj /opt/git/project.git
Придумать пример с одним локальным центральным репозитрием и двумя которые в него сливают

Важно чтобы каждый коммист делал одну вещь, то есть атомарный коммит
В одном коммите только связанные изменения

Стандартные команды Git используемые в различных ситуациях:


работа с текущими изменениями (смотрите также: git help everyday)
   add        Добавление содержимого файла в индекс
   mv         Перемещение или переименование файла, каталога или символьной ссылки
   reset      Сброс текущего состояния HEAD на указанное состояние
   rm         Удаление файлов из рабочего каталога и индекса

просмотр истории и текущего состояния (смотрите также: git help revisions)
   bisect     Выполнить двоичный поиск изменения, которое вносит ошибку
   grep       Вывод строк, соответствующих шаблону
   log        Вывод истории коммитов
   show       Вывод различных типов объектов
   status     Вывод состояния рабочего каталога

выращивание, отметка и настройка вашей общей истории
   branch     Вывод списка веток,  их создание или удаление
   checkout   Переключение веток или восстановление файлов в рабочем каталоге
   commit     Запись изменений в репозиторий
   diff       Вывод разницы между коммитами, коммитом и рабочим каталогом и т.д.
   merge      Объединение одной или нескольких историй разработки вместе
   rebase     Повторно применить коммиты над верхушкой другой ветки
   tag        Создание метки, вывод списка, удаление или проверка метки, подписанной с помощью GPG

совместная работа (смотрите также: git help workflows)
   fetch      Загрузка объектов и ссылок из другого репозитория
   pull       Извлечение изменений и объединение с другим репозиторием или локальной веткой
   push       Обновление внешних ссылок и связанных объектов

----

