---
layout: default
nav_order: 15
permalink: javascript-15-next-js-routing
title: Next.js. Маршруты
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Маршруты в next.js
date: 2024-04-06 12:00:00 +3
last_modified_date: 2024-04-07 13:00:00 +3
tags:
- javascript
- next-js
- questions-and-solutions
---

# Next.js. Маршруты
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

Важной темой понимания next.js - это маршрутизация.
 
Дерево строится иерархией каталогов.

В базовом варианте у нас есть корневая папка `app` всех маршрутов с папками маршрутами с обязательными файлами `page` в каждой.

Бывают клиентские и серверных компоненты. Но об этом отдельно.

В базовом варианте берется страница соотвествующая последнему сегменту пути.

## Базовое использование
 
Статичные страницы

Создадим такое дерево маршрутов:

````text
/page1/page2/page3
````
 
Как это выглядит:

````text
/app - Корень
/app/page.jsx - Главная страница
/app/page1/page.jsx- Корневая страница
/app/page1/page2/page.jsx- Лист 2 уровня
/app/page1/page2/page3/page.jsx- Лист 3 уровня
````

Таким образом строят любые уровни вложенности страниц. Все что только мы сами хотим.
 
Можно так же сделать страницу без отображения, которая будет открываться по пути

```text
/lists/list1
````
 
Структура каталогов:

````text
/app/lists/list1/page.jsx
````

## Группы маршрутов

Иногда бывает нужно объединить маршруты в группы, но чтобы папка не учавствовала в парсинге url.
Для этого папку оборачивают в `()`, для более удобной группировки.

Например, нужно разделить приложение на модули с адресами

````text
/payments
/education
/blog
````

Структура будет такой:

````text
/app/(modules)/(blog)/blog/page.jsx
/app/(modules)/(education)/education/page.jsx
/app/(modules)/(payments)/payments/page.jsx
````

Каждый модуль лежит в своей папке, что очень удобно.

## Динамический маршрут

Если нужно например вывести определенную сущность для этого нам поможет динамический маршрут.

Например, вывести что-то по id

````text
/dynamic/1
/dynamic/456456546
/dynamic/id-from-table
````

Структура будет такой

````text
/app/dynamic/[id]/page.jsx
````

Сама страница `page.jsx`
 
> Экспорт должен быть именно default

````jsx
//page.jsx
// params - это объект
export default function Dinamic({params}) {
  return <h1>dynamic {params.id}</h1>
}
//{"id":"1"}
// или вот так, что более удобно
export default function Dinamic({params: {id}}) {
    return <h1>dynamic {id}</h1>
}
````

Но, что делать если у нас несколько динамических параметров.

````text
/d/123/567/dfg/wet/5678/234
````

Структура:

````text
/app/d/[...params]/page.jsx
````

> Удобно распечатать что пришло {JSON.stringify(params)}

````jsx
// page.jsx
export default function Params({params}) {
    return <h1>params {JSON.stringify(params)}</h1>
}
//Получам массив {"params":["123","567","dfg","wet","5678","234"]}
````
 
Но если перейти просто в `d` мы увидим 404 ошибку, чтобы этого избежать нужно добавить дополнительные скобки в путь

````text
/app/d/[[...params]]/page.jsx
````

Теперь ошибки не будет, получим страницу без параметров.
 
## Параллельные маршруты

Есть такая штука как параллельные маршруты. Два или более маршрута выводятся параллельно на странице.
 
Структура

 ````text
/app/@par1/page.jsx
/app/@par2/page.jsx
````

И в layout выводим эти маршруты

````jsx
export default function RootLayout({ children, par1, par2}) {
  return (
    <html lang="en">
      <body>
      {par1}
      {par2}
      {children}
      </body>
    </html>
  )
}
````
 
Получается, что на всех страницах будет выводиться информация с этих маршрутов.
Мне правда пришлось перезапустить dev server

## Навигация

Для более удобной навигации по страницам добавим меню.

Навигация в клиентской части идет с помощью компонента `Link`

````jsx
import Link from "next/link";

export default function Page() {
  return <>
    <ul>
      <li><Link href="/">main page</Link></li>
      <li><Link href="/page1">page 1</Link></li>
      <li><Link href="/page1/page2">page 2</Link></li>
      <li><Link href="/page1/page2/page3">page 3</Link></li>
      <li><Link href="/lists/list1">list1</Link></li>
      <li><Link href="/dynamic/1">d 1</Link></li>
      <li><Link href="/dynamic/456456">d 3453454</Link></li>
      <li><Link href="/d/123/123/456/546">Динамические параметры</Link></li>
      <li><Link href="/blog">blog</Link></li>
      <li><Link href="/education">education</Link></li>
      <li><Link href="/payments">payments</Link></li>
    </ul>
  </>
}
````

## Игнор в роутинге

````text
/_lib -  такая папка полностью игнорируется в роутинге
````




