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
last_modified_date: 2024-03-31 19:00:00 +3
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

Позволяет задавать состояние компонента.

React в строгом режиме вызывает компонент 2 раза, чтобы убедится что в коде отсутствуют сайд эффекты.

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
 
Еще пример:

````jsx
// Состояние скрытия/показа кнопки
const [show, setShow] = useState(false);
// Кнопка с обработчиком
<Button onClick={() => {setShow(!show)}}>
    {show ? 'Hide' : 'Show'}
</Button>
// Скрытый текст
{show && <p>Скрытый текст</p>}
````

Кнопка будет показывать/скрывать текст. На мой взгляд пример показателен.

## Как работает

````jsx
// Первоначальная инициализация с дефолтным значеним Сохранить
const [text, setText] = useState('Сохранить');
// Присвоение в text = Закрыть, при этом начальное состояние не меняется
setText('Закрыть');
// Но значение text сразу не меняется, оно изменится при следующей итерации.
````

## Бегающие часы
 
Частая задача отобразить бегающие часы на странице

````jsx
function useTime() {
    // Инициализация состояния
    const [time, setTime] = useState(() => new Date());
    // Еще один хук, который рассмотрим в отдельной статье
    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(id);
    }, []);
    return time;
}

const time = useTime();
<h1>{time.toLocaleString()}</h1>
````

## Текущий рендер только один раз
    
Если присвоить состояние таким образом:

````jsx
// Здесь просто присваемваем значение
setText('Закрыть');
setText('Закрыть');
setText('Закрыть');
setText('Закрыть');
````

Значение в рамках текущего рендера будет присвоено не 4 раза, а 1 раз, нужно об этом знать.

Но если нужно получить обновленное значение нужно передать в функцию установки `callback` функцию.

````jsx
setIndex((n) => n + 1);
setIndex((n) => n + 1);
setIndex((n) => n + 1);
setIndex((n) => n + 1);
setIndex((n) => n + 1);
````
Тогда получим желаемый результат `+5` к значению.

Подытожим, если вызвать так:

````jsx
setIndex(index + 1);
setIndex((n) => n + 1);
setIndex(456); // Только последнее значение будет использоваться
````

## Объект в качестве начального значения

Раннее мы передавали число, строку или булев тип, но в качестве начального значения можно передать и объект.

Преимущества объекта, его значения можно менять не перезаписывая переменную.

````jsx
const [position, setPosition] = useState({
    x: 0,
    y: 0
});
<Button onClick={() => {setPosition({x:34, y: 67}); console.log(position)}}>Object</Button>
````

## Особенности хука

- Хуки доступны только тогда когда react находится в процессе рендеринга
- Их можно вызывать только на верхнем уровне компонента
- Их нельзя вызывать в уловных конструкциях.
- Можно создавать несколько переменных состояния и функций обновления их.
- Состояние всегда изолировано, оно хранится локально в компоненте, не управляется снаружи.
- В рамках текущего рендера переменная состояния меняется где-то на стороне реакта, но значение подставляется в текущую разметку.
