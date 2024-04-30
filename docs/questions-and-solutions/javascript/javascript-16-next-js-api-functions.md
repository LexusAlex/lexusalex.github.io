---
layout: default
nav_order: 16
permalink: javascript-16-next-js-api-functions
title: Next.js. Функции api
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Разбираем функции api в next.js
date: 2024-04-06 16:00:00 +3
last_modified_date: 2024-04-06 16:00:00 +3
tags:
- javascript
- next-js
- questions-and-solutions
---

# Next.js. Функции api
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

## generateStaticParams

Функция используется для статической генерации маршрутов совместно с динамической генерацией сегмента маршрута.
 
Пример страницы:

````jsx
export async function generateStaticParams() {
  const films = await fetch('https://swapi.dev/api/films/').then((res) => res.json())
  return films.results.map((film) => ({
    slug: film.title.replace(/\s+/g, '-'),
  }))
   
}
export default function Post({ params: {slug} }) {
  return <h1>post {slug}</h1>
}
````

## Получение и вывод данных с сервера

````typescript jsx
async function getData(){
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
export default async function Test() {
  const data = await getData();
   return (<>{data.map(function(d){ return d.body; })}</>)
}
````




