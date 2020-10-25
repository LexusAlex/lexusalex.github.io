---
layout: note.njk
tags: notes
number : 1
title: HTML
description: Мысли про постановку задачи
date: 2020-10-18 22:35:00 +3
image: /assets/images/notes/1/main.png
---

## 1. Какие категории тегов существуют

```text
1. Metadata content.
Метаданные в теге head
base;     link; 
meta;     noscript; 
script;   style; 
template; title

2. Flow content.
Потоковый контент - это элементы, которые находятся в элементе `<body>`.
a;       abbr;     address;  article;    aside;    audio; 
b;       bdi;      bdo;      blockquote; br;       button; 
canvas;  cite;     code;     data;       datalist; del; 
details; dfn;      dialog;   div;        dl;       em; 
embed;   fieldset; figure;   footer;     form;     h1;      
h2;      h3;       h4;       h5;         h6;       header;
hr;      i;        iframe;   img;        input;    ins; 
kbd;     label;    map;      mark;       math;     menu; 
meter;   nav;      noscript; object;     ol;       output; 
p;       picture;  pre;      progress;   q;        ruby; 
s;       samp;     script;   section;    select;   slot; 
small;   span;     strong;   sub;        sup;      svg; 
table;   template; textarea; time;       u;        ul; 
var;     video;    wbr;      Text

3. Sectioning content
article; aside; 
nav; section

4. Heading content
h1; h2; h3; h4; h5; h6;

5. Phrasing content.
Фразовый контент
Элементы для оформления текста входят в группу `Phrasing content`. Она содержит элементы
размечающие текст элементы на уровне абзаца.
a;        abbr;    audio;    b;     bdi;      bdo; 
br;       button;  canvas;   cite;  code;     data; 
datalist; del;     dfn;      em;    embed;    i; 
iframe;   img;     input;    ins;   kbd;      label; 
map;      mark;    math;     meter; noscript; object; 
output;   picture; progress; q;     ruby;     s; 
samp;     script;  select;   slot;  small;    span; 
strong;   sub;     sup;      svg;   template; textarea; 
time;     u;       var;      video; wbr;      Text

6. Embedded content
audio; canvas; embed; iframe; img; 
math; object; picture; svg; video

7. Interactive content
button; details; embed; iframe; label; select; textarea

8. Sectioning roots
blockquote; body; details; dialog; fieldset; figure; td

9. Form-associated elements
button; fieldset; input; label; object; 
output; select; textarea; img;

10. Listed elements
button; fieldset; input; object; 
output; select; textarea;

11. Submittable elements
button; input; object; select; textarea;

12. Resettable elements
input; output; select; textarea;

13. Autocapitalize-inheriting elements
button; fieldset; input; output; select; textarea

14. Labelable elements
button;   input;  meter; output;
progress; select; textarea;

15. Palpable content.
Явный контент.
Означает, что элемент должен быть заполнен контентом. 
Это не обязательное условие, так как этот элемент может быть подготовлен пустым для последующего заполнения дочерними 
элементами или заполнением через скрипты, но рекомендуется не оставлять его пустым. 
a;        abbr;     address;    article; aside;    b; 
bdi;      bdo;      blockquote; button;  canvas;   cite; 
code;     data;     details;    dfn;     div;      em; 
embed;    fieldset; figure;     footer;  form;     h1; 
h2;       h3;       h4;         h5;      h6;       header; 
i;        iframe;   img;        ins;     kbd;      label; 
main;     map;      mark;       math;    meter;    nav; 
object;   output;   p;          pre;     progress; q; 
ruby;     s;        samp;       section; select;   small; 
span;     strong;   sub;        sup;     svg;      table; 
textarea; time;     u;          var;     video;

16.Script-supporting elements
script; template
```

https://html.spec.whatwg.org/multipage/indices.html#element-content-categories

## 2. Глобальные атрибуты
## 3. Заголовки h1, h2, h3, h4, h5, h6

Существует шесть уровней заголовков от общего `h1` до специфичного `h6`.
Они нужны для группировки контента на логические части.

Заголовок `h1` на странице должен быть один и описывать основную идею содержания
страницы
https://web-standards.ru/articles/heading-levels/

