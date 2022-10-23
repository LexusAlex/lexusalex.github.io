---
layout: default
nav_order: 37
permalink: 37-media-queries
title: Медиа выражения
parent: Заметки
description: Разберемся, что это и как это писать 
date: 2022-10-24 00:30:00 +3
last_modified_date: 2022-10-24 00:30:00 +3
tags:
- html
- css
---

# Медиа выражения
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

## meta viewport

В общем смысле viewport - это видимая область веб-страницы, то что видно пользователю не прибегая к прокрутке.

Существует специальный meta тэг, который позволяет отображать веб страницу в ее фактическом размере,
а затем адаптировать разметку для привычного нам отображения.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Параметры атрибута content:

- `width=device-width` - ширина видимой области страницы равнялась css ширине устройства, это зависит от плотности пикселей устройства
- `initial-scale=1` - масштаб веб-страницы отображаемый на мобильном устройстве, 1 значит 100% по умолчанию.

Так же можно ограничить масштабирование страницы. Здесь мы можем увеличить масштаб до 3 раз и уменьшать до половины
ширины экрана устройства.

```html
<meta name="viewport" content="width=device-width, maximum-scale=3,minimum-scale=0.5" />
```

Так же можно запретить возможность масштабирования 

```html
<meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>
```

Например, здесь мы не разрешаем масштабировать страницу и показываем в 100% масштабе, наверно это то что нужно,
но все конечно зависит от задачи.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no, user-scalable=0">
```

Для большинства случаем отзывчевого дизайна подойдет мета тег

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
```

## Медиа запросы

В общем виде медиа запрос выглядит так:

```css
@media screen and (min-width: 320px) {}
```

Его можно писать непосредственно в стилевом файле, подключать соответсвующий стилевой файл в теге `link` или использовать
правила `@import`. В одной строке может быть сразу несколько медиа выражений.

```html
<link rel="stylesheet" media="screen and (orientation: portrait)"  href="portrait-screen.css" />
```
```css
@import url("portrait-screen.css") screen and (orientation: portrait);
```

При любых обстоятельствах, кроме исключительных, рекомендуется добавлять медиа запросы в существующие 
таблицы стилей наряду с обычными правилами.

Примеры:

```css
@media screen and (min-width: 320px) {
      body {
        background-color: green;
      }
    }
@media screen and (min-width: 550px) {
  body {
    background-color: yellow;
  }
}

@media screen and (min-width: 320px) and (max-width: 959px){
    body {
        background-color: green;
    }
}
```

В примере выше цвет фона зеленый будет при ширине от 320px до 959px

Для вёрстки от мобильных (mobile first) лучше использовать медиа выражения с min-width и располагать их в порядке увеличения ширины экрана; 
для вёрстки от десктопа (desktop first) — max-width, и располагать выражения в обратном порядке.