---
layout: default
nav_order: 13
permalink: linux-cli-nginx-location
title: Nginx.location
parent: linux-cli
grand_parent: Вопросы и решения
has_children: true
description: Понимаем как nginx определяет location
date: 2024-04-22 12:00:00 +3
last_modified_date: 2024-04-22 12:00:00 +3
tags:
- linux
- nginx
- questions-and-solutions
---

# Nginx.location
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

Директива `location` определяется в контексте `server` их может быть несколько и они могут быть вложенными.

```text
server {
    location {
    
    }
       
    location {
        
    }
    
    location {
            
    }
}
```

## Типы location

- Префикс - в блоке нет модификатора, это значит что сравнение идет по url запроса
- `=` - точное соответствие указанному location и uri
- `~` - регулярное выражение с учетом регистра
- `~*` - регулярное без учета регистра
- `^~` - поиск без регулярного выражения


````text
location / url

// = При нахождениие url дальше поиск идти не будет
= /                             /
= /test                         /test
= /test/test-123-678/.file/try  /test/test-123-678/.file/try

// Префикс
/                               /
/                               /4 
/                               /4/123/test/777/
/site                           /site
/site                           /site/rwqrewr/124124/13241424

^~ ищет по точному соответствию,без регулярного выражения, при этом дальнейший поиск останавливается
^~ /site/                       /site/123/jghjhgjhgj
^~ /c                           /с

~* - регулярное выражение без учета регистра
~* \.(png|ico|gif|jpg|jpeg)$     .png
~* \.(png|ico|gif|jpg|jpeg)$     .PNG
~* \.(png|ico|gif|jpg|jpeg)$     .PnG

~ - регулярное выражение с учетом регистра
~ \.(jpe?g|png|gif|ico)$         .jpeg
~ \.(PNG)$                       .PNG
~ \.[1-9]$                       .7
~ \.php$                         /file.php
````

## Выбор блока location

Алгоритм действий nginx:

- Проверка всех префиксных блоков и сравнение их с текущим url
- Поиск точного совпадения с =
- Далее ищет префикс ^~
- Далее идет расчет регулярных выражений


> location нельзя дублировать в рамках одного виртуального хоста.