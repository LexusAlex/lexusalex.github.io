---
layout: default
nav_order: 12
permalink: javascript-12-react-use-state
title: React. useState
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Использование хука useState
date: 2024-03-24 16:00:00 +3
last_modified_date: 2024-03-24 16:00:00 +3
tags:
- javascript
- react
- questions-and-solutions
---

# React. useState
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

Говорим react что хотим запомнить значение.

````jsx
import {useState} from "react";
import Button from "react-bootstrap/Button";

export default function UseState()
{
  // index переменная состояния
  // setIndex функция которая будет обновлять index
  const [index, setIndex] = useState(1);
  return (
    <>
        <Button variant={"success"} onClick={() => {setIndex(index + 1); console.log(index)}}>useState</Button>
    </>
  );
}
````

## Особенности хуков

- Хуки доступны только тогда когда react находится в процессе рендеринга
- Их можно вызывать только на верхнем уровне компонента
- Их нельзя вызывать в уловных конструкциях

TO be Continue