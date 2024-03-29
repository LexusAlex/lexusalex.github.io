---
layout: default
nav_order: 36
permalink: 36-semantic-html
title: Семантический html
parent: Заметки
description: Правильная структура html кода
date: 2022-10-22 23:00:00 +3
last_modified_date: 2022-10-22 23:00:00 +3
tags:
- html
---

# Семантический html
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

## Базовый шаблон страницы

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Заголовок страницы</title>
</head>
<body>

</body>
</html>
```

О чем нужно помнить 

1. Doctype должен быть, иначе браузеры будут работать в режиме совместимости
2. lang="ru" должен быть указан обязательно, и указывает на каком языке написан текст на странице. Это очень важно.
3. В теге `title`, должен быть только текст
4. У тега body имеются стили по умолчанию "margin: 8px"

## Семантические элементы

Далее в примерах буду указывать, то что внутри `body`

### main

В теге `main` указывается уникальный контент на странице.

```html
<main>
  <h1>О команде</h1>
  <p>Какой-то важный тест</p>
</main>
```

1. Желательно оборачивать весь уникальный контент в тег `main`
2. Меню, ссылки боковые панели оставить за пределами этого тега
3. Наличие этого тега очень важно для мобильных браузеров. Благодаря ему можно на телефоне можно включить "Режим чтения"
4. На странице разрешено использовать только один тег `main`
5. Содержимое не должно нигде больше повторятся на сайте

Например, 2 страницы с разным содержимым

```html
<!-- Страница с товаром 1-->
<main>
  <h1>Товар 1</h1>
  <p>Какой-то важный тест о товаре 1</p>
</main>

<!-- Страница с товаром 2-->
<main>
    <h1>Товар 2</h1>
    <p>Какой-то важный тест о товаре 2</p>
</main>
```

### section

Элемент `section` используется для выделения раздела документа

```html
<section>
  <h1>Карточка 1</h1>
  <p>Съешь ещё этих мягких французских булок, да выпей чаю.</p>
</section>

<section>
    <h1>Карточка 2</h1>
    <p>Съешь ещё этих мягких французских булок, да выпей чаю.</p>
</section>

<section>
    <h1>Карточка 3</h1>
    <p>Съешь ещё этих мягких французских булок, да выпей чаю.</p>
</section>
```

1. Внутри `section` должен быть заголовок
2. Элементы `section` можно вкладывать друг в друга
3. Раздел `section` предназначен для информации, а не для стилизации, если нужно стилизовать используйте `div`
4. Если в секции по какой-то причине нет заголовка, то используйте `div`
5. Элементы `section` делят контент на логические части и оборачивают большие логические блоки на странице
6. Не рекомендуется размещать на странице больше одного заголовка `h1`, хотя это не запрещено спецификацией

```html
<main>
    <p>Общая информация</p>
    <section>
        <h2></h2>
    </section>
    <section>
        <h2></h2>
    </section>
    <section>
        <h2></h2>
    </section>
    <section>
        <h2></h2>
    </section>
    <section>
        <h2></h2>
    </section>
</main>
```

### nav

Контейнер для элементов навигации

```html
<nav class="menu">
  <ul>
    <li><a href="#">Главная</a></li>
    <li><a href="#">О нас</a></li>
    <li><a href="#">Контакты</a></li>
  </ul>
</nav>
```

1. На странице возможно использовать несколько элементов `nav`
2. По спецификации достаточно обернуть в `nav` только основной блок навигации, а не все ссылки на странице
3. Важно выделить функциональный блок ссылок

### article

Описывает самодостаточный раздел документа, который без проблем можно разместить на другом сайте

```html
<article>
  <h1>Уникальная статья</h1>
</article>
```

1. Содержимое тега `article` это какая-то конкретная законченная сущность, например товар, статья, карточка пользователя
2. Важно отличать `section` (часть раздела) от `article` (самодостаточный элемент документа)
3. Можно вкладывать друг в друга

```html
<article class="forecast">
    <h1>Погода в Москве</h1>
    <article class="day-forecast">
        <h2>03 March 2018</h2>
        <p>Rain.</p>
    </article>
    <article class="day-forecast">
        <h2>04 March 2018</h2>
        <p>Periods of rain.</p>
    </article>
    <article class="day-forecast">
        <h2>05 March 2018</h2>
        <p>Heavy rain.</p>
    </article>
</article>
```

### aside

Используется для части содержимого, которое связано с основным контентом лишь косвенно.

```html
<aside class="doc__feedback-form"> 
    <h2>Форма обратной связи</h2>
    <form> 
    </form> 
</aside>
```

1. Это все, что не имеет прямого отношения к основному содержимому сайта.
2. Может использоваться для боковой колонки сайта(но не обязательно), последний комментарий, поиск, форма обратной связи, список тегов
3. Рекомендуется писать его на одном уровне с `main` и `article`


### header

Нужен для создания шапки чего-либо

```html
<header>
  <nav>
    <a href="#">Мои работы</a>
    <a href="#">Мои навыки</a>
    <a href="#">Контакты</a>
  </nav>
</header>
```

1. На странице может быть несколько элементов `header`, но их нельзя помещать в другие элементы `header`
2. По-хорошему, шапка должна быть единой для всего сайта.

### footer

"Подвал сайта"

```html
<article>
  <h1>Название раздела</h1>
  <p></p>
  <footer>
    <p>Автор</p>
    <p>Почта:</p>
  </footer>
</article>
```

1. В "подвале" чаще всего отображают ссылки на другие страницы на сайте, название компании и прочее
2. `footer` может быть не только у всего сайта целиком, но и у отдельного блока или секции.
3. Финальная часть сайта или блока

## Другие элементы

### h1-h6

Просто уровни заголовков на сайте

1. Не пропускайте уровни заголовков после `h1` идет `h2` и тд...
2. Поисковики часто смотрят на уровни заголовков во всем документе
3. С помощью заголовков создают оглавления и именно так и нужно для поисковых машин
4. Стараться `h1` не использовать более одного раза на сайте
5. Выбирайте какой уровень заголовка использовать по смыслу, а не по внешнему виду
6. Главное придерживаться иерархии
7. Теги заголовков должны соответствовать ключевым запросам пользователя
8. В боковых меню и колонках не стоит использовать `h1` - `h6`

```html
<h1>Заголовок 0</h1>
<section>
    <h2>Заголовок 1</h2>
</section>
<section>
    <h2>Заголовок 2</h2>
</section>
<section>
    <h2>Заголовок 3</h2>
    <section>
        <h3>Заголовок 3.1</h3>
        <section>
            <h4>Заголовок 3.2</h4>
            <section>
                <h5>Заголовок 3.3</h5>
                <section>
                    <h6>Заголовок 3.4</h6>
                </section>
            </section>
        </section>
    </section>
</section>
<section>
    <h2>Заголовок 4</h2>
</section>
```

### div

`div` - это элемент группировки, универсальный элемент.

1. Подходит только в том случае, если не нашелся подходящий семантический элемент, лучше используйте другие элементы
2. `<div` — это универсальный блок, не несущий семантического смысла

### p

Используется для разметки абзаца

1. Внутри блока может находиться любой текстовый контент.
2. Абзац - это логическая единица текста.
3. Оборачивайте в `p`, законченную мысль или несколько предложений, но не одно слово

### blockquote

Разметка цитат

```html
<blockquote>
  <p>
    Ваша работа заполнит большую часть жизни и единственный способ быть
    полностью довольным — делать то, что по-вашему является великим делом.
    И единственный способ делать великие дела — любить то, что вы делаете.
  </p>
</blockquote>
```

1. Сам элемент `blockquote` не размечает текст
2. Поисковики понимают что это блок с цитатой

### span

Используется для стилизации части текста, но для выделения текста лучше использовать семантические элементы предназначенные для этого

1. Удобен для выделения одного слова, или буквы

### b

Используется для выделения текста, или слова исключительно для оформления и не более

1. Важно понимать что `b` просто оформляет текст соответствующим образом, напротив `strong` выделяет важное.

### strong

Семантически выделяет важный фрагмент текста.

1. Не используйте `strong` для визуального выделения текста
2. Элемент `strong` можно использовать в заголовке, комментарии или абзаце, чтобы отличить действительно важную информацию от других частей: подробностей, отступлений или шаблонов
3. Элемент `strong` можно использовать для обозначения предупреждения или предостережения.
4. Элемент `strong` можно использовать для обозначения содержимого, которое пользователь должен увидеть раньше, чем другие части документа.

### em

Смысловое выделение куска текста

### i

Отрывок текста, выделяемый, в том числе интонационно, или выпадающий из общего ряда повествования.

1. Подойдет для разметки в тексте какого-то необычного названия

## Пример семантической верстки

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Заголовок страницы</title>
</head>
<body>
    <header>
        <nav>
            <a href="">
                <img src="" alt="Логотип">
            </a>
            <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            </ul>
        </nav>
    </header>
    <main>
        <section>
            <h2>Заголовок секции</h2>
        </section>
        <section>
            <h2>Заголовок секции</h2>
        </section>
        <section>
            <h2>Заголовок секции</h2>
        </section>
        <section>
            <h2>Заголовок секции</h2>
            <article></article>
            <article></article>
            <article></article>
            <article></article>
        </section>
    </main>
    <aside>Боковая часть сайта</aside>
    <footer></footer>
</body>
</html>
```