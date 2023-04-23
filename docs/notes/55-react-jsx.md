---
layout: default
nav_order: 55
permalink: 55-react-jsx
title: jsx в react
parent: Заметки
description: Что такое jsx
date: 2023-04-23 20:00:00 +3
last_modified_date: 2023-04-23 20:00:00 +3
tags:
- js
- react
---

# jsx в react
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

JSX - это некое расширение javascript синтаксиса, позволяющее писать html код.

Такой некий синтаксический сахар над js, например:

```jsx
function Application(props) {
  return (
    <div>
      <h1>Заголовок 1</h1>
      <div className="container">
        <div className="row">
          <div className="col-3">
              Первая часть контента
          </div>
          <div className="col-3">
            Вторая часть контента
          </div>
          <div className="col-3">
            Третья часть контента
          </div>
          <div className="col-3">
            Четвертая часть контента
          </div>
        </div>
      </div>
    </div>
  );
}
```
 
Заметили какой лаконичный код получился, типа html вшитый в js, но что же там под капотом react происходит:

```javascript
function Application(props) {
    return React.createElement('div',{},
        React.createElement('h1',{}, 'Заголовок 1'),
        React.createElement('div',{'className': 'container'},
            React.createElement('div', {'className': 'row'},
                React.createElement('div', {'className': 'col-3'}, 'Первая часть контента'),
                React.createElement('div', {'className': 'col-3'}, 'Вторая часть контента'),
                React.createElement('div', {'className': 'col-3'}, 'Третья часть контента'),
                React.createElement('div', {'className': 'col-3'}, 'Четвертая часть контента'),
            )
        )
    )
}
```
 
Уже не такой лаконичный и понятный код, который был до этого.

React создает элементы как Dom элементы. А если это наши кастомные компоненты, то это просто функции, 
вызываемые в третьем парамере children. Сам react создает этого всего просто html.

При этом важно имя компонента в JSX должно начинаться с большой буквы, иначе JSX будет идентифицировать его как обычный HTML-тег.