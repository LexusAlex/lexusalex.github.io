---
layout: default
nav_order: 14
permalink: javascript-14-next-js-directories
title: Next.js. Директории
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Типы директорий в next.js
date: 2024-04-03 23:00:00 +3
last_modified_date: 2024-04-04 23:00:00 +3
tags:
- javascript
- next-js
- questions-and-solutions
---

# Next.js. Директории
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

В статье [https://lexusalex.ru/javascript-13-next-js-install](https://lexusalex.ru/javascript-13-next-js-install) иы поставили и запустили next.js.

На данный момент (03.04.24) актуальная версия next.js `14.1.4`. 

В 13 версии добавился новый `app router`, до этого существовал `pages router`  

Маршруты определяются структурой директорий и файлов.

## Директория app

app router

Это директория `app` с файлами:

````jsx
// app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>{children}</body>
    </html>
  )
}

// app/page.jsx
export default function Page() {
    return <h1>Hello</h1>
}
````

## Директория pages
 
pages router

````jsx
// pages/index.jsx
export default function Index() {
    return <h1>index</h1>
}
````

Выбор роутера за вами, но предпочтительней app router
