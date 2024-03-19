---
layout: default
nav_order: 10
permalink: javascript-10-react-components
title: React. Компоненты
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Рассмотрим базовое использование react компонентов
date: 2024-03-19 23:00:00 +3
last_modified_date: 2024-03-19 23:00:00 +3
tags:
- javascript
- react
- questions-and-solutions
---

# React. Компоненты
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

React использует компонентный подход. 
Это значит, что можно строить сложные интерактивные интерфейсы затрачивая на это меньше усилий.

## Преимущества компонентов

- Переиспользуемость
- Сокращение кодовой базы
- Удобное тестирование
- Разделение ответственности
- Комбинировать компоненты как угодно

По сути компонент это функция.

## Пример 10.1

Создадим простой компонент в react и отрендерим его.

````jsx
function App() {
    return <h1>Hello, world test!</h1>;
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
      <App />
);
````

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/10/10.1-react.html" height="152" width="100%"></iframe>

[Открыть пример 10.1 в новой вкладке](/assets/demo/qs/javascript/10/10.1-react.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}
