---
layout: post 
title: Лучшие практики php. Часть 1
permalink: php-best-practices-part-1
tags: php
--- 

В интернете порой можно встретить много противоречивой информации о php.
В этой статье хочу объединить основы языка с его лучшими практиками которые приняты в сообществе.

## Содержание
1. [Отступы](#отступы)
2. [Переносы строк](#переносы-строк)

### Отступы

Кто-то использует табы, а кто-то пробелы.
В стандарте [PSR-2][php-psr-2] для отступов рекомендуют использовать 4 пробела.
Важно не смешивать табы с пробелами.

> Чтобы как то унять разброс и шатание придумали [editorconfig][editorconfig]. 
Это специальный фаил `.editorconfig`, в котором указываются настройки для редактора [подробнее на хабре](editor-editorconfig)

Настройки для файла `.editorconfig`
~~~editorconfig
root = true # указание что это корневой фаил настроек
[*.php]
indent_style = space # tab или spase
indent_size = 4 # если tab то ширина таба, если space то количество пробелов
tab_width = 4 # этот параметр имеет смысл если использует tab, он может быть не указан, тогда берем значение из indent_size
~~~

### Переносы строк

Каждый символ в файле кодируется одним (латинские) или двумя байтами (русские). 
Существуют так же невидимые символы которые отвечают за перевод строки:

- `LF \n` Line Feed - 1 байт - Linux (предпочтительней)
- `CRLF \r\n` Carriage Return Line Feed - 2 байта - Windows

Для нормализации переводов строк в системе контроля версий [git](git) есть настройка `core.autocrlf`, которая
автоматические преобразует переводы строк по принципу:

~~~text
     Windows CRLF -> LF Git
     Windows CRLF <- LF Git
~~~ 

Настройки для файла `.editorconfig` для переноса строк
~~~editorconfig

[*.php]
end_of_line = lf # возможные значения crlf, lf, cr
~~~

В строках php в двойных кавычках для перевода строки используется управляющая последовательность `\n`



### Полезные ссылки

- [Стандарты PSR](https://www.php-fig.org/psr/ "Стандарты PSR")
- [Editorconfig](https://editorconfig.org)


[php-psr-2]: https://www.php-fig.org/psr/psr-2/ "PSR-2: Coding Style Guide"
[editorconfig]: https://editorconfig.org "EditorConfig helps maintain consistent coding styles for multiple developers"
[editor-editorconfig]: https://habr.com/ru/post/220131/ "EditorConfig — Одни Настройки для всех Редакторов/IDE"
[git]: https://git-scm.com/ "GIT"
