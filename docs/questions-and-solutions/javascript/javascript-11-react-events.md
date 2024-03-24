---
layout: default
nav_order: 11
permalink: javascript-11-react-events
title: React. События
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Использование событий в react
date: 2024-03-24 16:00:00 +3
last_modified_date: 2024-03-24 16:00:00 +3
tags:
- javascript
- react
- questions-and-solutions
---

# React. События
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

Интерактивность - это считай базовая вещь.

Создадим базовый клик на кнопку, все так же как и в обычном js

````jsx
import Button from "react-bootstrap/Button";

export default function TestButton () {
  function HandleClick()
  {
    console.log(1);
  }
  return (
    <>
      <Button variant="warning" onClick={HandleClick}>Кнопка</Button>
    </>
    )
}

// или передав функцию прям в обработчик
<>
    <Button variant="warning" onClick={function HandleClick()
    {
        console.log(1);
    }}>Кнопка</Button>
</>
// или передав анонимную функцию
<>
    <Button variant="warning" onClick={() => {console.log(1);}}>Кнопка</Button>
</>
````

Обработчики так же можно передавать в пропсах как обычный параметр.

Так же события срабатывают и на вложенных элементах.

Например, обернем вызов нашего компонента в `div`

````jsx
<div onClick={() => {console.log('parent')}}>
    <TestButton></TestButton>
</div>
````

Тогда при клике на кнопку будет вызвано 2 обработчика.

Теперь создадим форму

````jsx
// FormTest.jsx
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Убирвем действие по умолчанию e.preventDefault()
function FormTest() {
  return (
    <Form onSubmit={(e) => {e.preventDefault(); console.log('submit');}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormTest;

// Вызовем ее выше 
<FormTest></FormTest>
````
