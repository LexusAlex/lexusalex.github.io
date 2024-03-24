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
last_modified_date: 2024-03-24 14:30:00 +3
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

По сути компонент это функция с названием большая буква. Значение которые возвратит функция задекларирован.

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

Компоненты можно вкладывать друг в друга и переиспользовать много раз, например

````jsx
// Header.jsx
export default function Header() {
  return (
    <>Header</>
  );
}
// Footer.jsx
export default function Footer() {
    return (
        <>Footer</>
    );
}
// Application.jsx
function Application() {
    return (
        <>
            <Header></Header>
            <Footer></Footer>
        </>
    );
}
````

Так же можем использовать множество уже готовых компонентов, например [https://react-bootstrap.github.io/](https://react-bootstrap.github.io/)

````jsx
import Button from 'react-bootstrap/Button';

<Button variant="primary" onClick={handleShow}>
    demo
</Button>

````
При этом в готовых компонентах уже зашита и логика работы с ними.

## Импорт и экспорт компонентов
 
По умолчанию компонент должен экспортироваться по дефолту. В одном файле можно объявить несколько компонентов, например

````jsx
// Component.jsx

export function Component1()
{
    return (
        <>Component 1</>
    )
}

export function Component2()
{
    return (
        <>Component 2</>
    )
}

export default function Component3()
{
    return (
        <>Component 3</>
    )
}
````

Импорт компонентов в другом файле:

````jsx
import Component3, {Component1, Component2} from "../Component";
````

## Стили компонентов

Чтобы сделать свой кастомный класс как это принято в react, нужно

Создать файл стилей для компонента:

````css
/* Button.module.css */
.my {
    background: aquamarine;
}
````

Подключить его на нужной странице и использовать

````jsx
import style from "./Button.module.css";

<Button className={style.my} variant="primary" onClick={handleShow}>
    Launch demo modal
</Button>
````

## Передача данных между компонентами

Очень важно уметь переиспользовать компоненты. Но как передавать данные между компонентами. Это называется props

Для примера создадим компонент `Item` отображающий элемент списка, в данном случае это карточка, может быть чего угодно.

````jsx
import {Card} from "react-bootstrap";
// На вход компоненту передаем props - это объект с данными
// В теле компонента выводим данные
// props это единственный параметр который может принимать функциональный компонент
export default function Item(props) {
    return (
        <div>
            <Card bg={"primary"} style={{ width: '18rem' }} border={"light"} text={"white"}>
                <Card.Body>
                    <Card.Title>{props.data.title}</Card.Title>
                    <Card.Subtitle className="mb-2">{props.data.subtitle}</Card.Subtitle>
                    <Card.Text>
                        {props.data.text}
                    </Card.Text>
                    <Card.Footer>
                        {props.data.date}
                    </Card.Footer>
                </Card.Body>
            </Card>
        </div>
    );
}  
````
 
Создадим еще один компонент `Items`, который будет выводить item

````jsx
import Item from "../Item/Item";
import {Col, Row} from "react-bootstrap";

export default function Items() {
  // Данные, они могут быть присланы по api или еще как  
  const currentDate = (new Intl.DateTimeFormat('ru-RU',{
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Moscow'
  }).format(Date.now()));
  const data = [
    {
      title: 'Карточка чего нибудь',
      subtitle: 'Заголовок карточки',
      date: currentDate,
      text: 'React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQuery. As one of the oldest React libraries, React-Bootstrap has evolved and grown alongside React, making it an excellent choice as your UI foundation.'
    },
    {
      title: 'Еще карточка',
      subtitle: 'Заголовок карточки 2',
      date: currentDate,
      text: 'Какой-то другой текст'
    }
  ];
  // Вызов нашего компонента с передачей туда props
  return (
    <Row>
      <Col>
        <Item data={data[0]}></Item>
      </Col>
      <Col>
        <Item data={data[1]}>></Item>
      </Col>
    </Row>
  )
}
````

Таким образом компонент стал гибким и настраиваемым

Так же `jsx` можно передать внутрь как дочерний элемент, к примеру

````jsx
// Card.jsx - комопонент обертка
import {Alert} from "react-bootstrap";

export default function Card({children})
{
  return (
    <Alert variant="success">
      {children}
    </Alert>
  )
}

// Использование
<Card>
    <Footer></Footer>
</Card>
````

## Условная отрисовка

Очень часто нужно, что-то показывать, а что-то нет, рассмотрим на примере списка

````jsx
import List from "./List";
// Lists.jsx - компонент выводящий весь список
export default function Lists()
{
  return (
    <ul>
      <List name={'Первый пункт списка'} visible={true}></List>
      <List name={'Второй пункт списка'} visible={false}></List>
      <List name={'Третий пункт списка'} visible={true}></List>
    </ul>
  )
}

// Немного прообгрейдим компонент и вынесем данные в массив
export default function Lists()
{
    const data = [
        ['Первый пункт списка', true],
        ['Второй пункт списка', false],
        ['Третий пункт списка', true],
    ];
    // Будем проходить циклом
    const elem = data.map(element => <List name={element[0]} visible={element[1]}></List>);
    return (<ul>{elem}</ul>
    )
}

// Но что если нужно вывести определенные активные элементы списка
export default function Lists()
{
    const data = [
        ['Первый пункт списка', true],
        ['Второй пункт списка', false],
        ['Третий пункт списка', true],
    ];
    // Отфильтруем нужные нам элементы
    const filter = data.filter(element => element[1] === false);
    // Так же выводим как и в примере выше
    const elem = filter.map(element => <List key={element[0]} name={element[0]} visible={element[1]}></List>);
    return (<ul>{elem}</ul>
    )
}

// List.jsx- элемент списка
export default function List ({name, visible})
{
    // Здесь проверяем банальным тернарным оператором
    let item = (visible ? <del>{name}</del> : name);
    return <li>{item}</li>
}
````

## Особенности компонентов

- Каждый компонент должен быть обернут в `<React.Fragment></React.Fragment>` или сокращенно `<></>`
- Мы описываем что хотим видеть в компонентах - декларативное программирование
- Компонент нужно всегда экспортировать по дефолту
- в `{}` внутри компонента - это любой валидный js код, который выводит либо строку, либо другой react компонент
- Между компонентами можно передавать данные с помощью `props`, так же как и в обычной функции можно указать дефолтное значение
- Удобно использовать композицию элементов.
- У каждого элемента должен быть уникальный ключ строка или число, чтобы react знал что перерисовывать `key={element[0]}`, главное чтобы это был статичный id
- Каждый компонент должен быть чистым - то есть при одинаковых входных параметров должен быть один и тот же результат. Нужно жить без глобальных переменных. 