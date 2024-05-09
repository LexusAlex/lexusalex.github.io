---
layout: default
nav_order: 21
permalink: javascript-21-typescript
title: Typescript. Базовые знания
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Базовые знания о typescript
date: 2024-04-21 23:00:00 +3
last_modified_date: 2024-05-09 21:16:00 +3
tags:
- javascript
- typescript
- questions-and-solutions
---

# Typescript. Базовые знания
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

## Проблемы javascript

- Динамические типы (не строгая типизация)
- Autocomplete
- Невозможность рефакторинга
- Невозможность понять структуру данных

Typescript надмножество javascript
## Конфигурация

Конфигурация по дефолту `tsconfig.json`
## Простые типы

number,string,boolean

````typescript
let num:number = 1;
let num2:number = -1;
let num3:number = 54654.67;
let num4:number = NaN;
let num5:number = Infinity;
let str:string = "Строка";
let str2:string = "Строка";
let str3:string = `Строка`;
let bool:boolean = true;
let bool2:boolean = false;
const a:number = 1 + 123;
````
## Функции

Типы лучше всегда указывать явно

````typescript
function one(a:string, b:boolean): string {
  return 'str';
}
// Стрелочная функция
one = (a:string, b:boolean): string => {
    return 'str';
}
````

### Пример

````typescript
 enum Status {
    'published' = 'published',
    'draft' = 'draft',
    'deleted' = 'deleted',
}
async function getFaqs(req:{
    topicId:number,
    status: Status}): Promise<
    {
        "question":string,
        "a":string,
        "tags": string[],
        "likes": number
        "status": Status
    }[]> {
    const res = await fetch('/faqs', {
        method: 'POST',
        body: JSON.stringify(req)
    });
    return await res.json();
}
````
## Объект

````typescript
// Типы на месте
let o: {name:string, age:number} = { name: 'str', age: 20};
let o2: {name: {car: {colors:[string,string]}}} = { name: {car: {colors: ['blue','red']}}}
let o3:{officeId:number, isOpened:boolean,contacts: {phone:string, email: string,address:{city:string}}} = {
    "officeId": 45,
    "isOpened": false,
    "contacts": {
        "phone": "+79100000000",
        "email": "my@email.ru",
        "address": {
            "city": "Москва"
        }
    }
}
````
## Массивы

````typescript
const a:number[] = [1,2,3,4,5];
let a1: string[] = ['234', 'dgfdfg'];
let a2: number[] = [1,2,3];
let a3: Array<number> = [1,2,3]; // Альтернативная запись
let a31: ReadonlyArray<number> = [1,2,3]; // Альтернативная запись
// Любой тип
const a4:any[] = [1,2,3,4,'str',false];
const a5:[number,string] = [1,'str']; // tuples - точная струкутра массива
const a6:[[string,number,string],string,number] = [['str',1,'str'],'str',1];
// При итерации по массиву typescript будет понимать что это строка
const a7: [number, ...string[]] = [1, 'str', 'str', 'str'] // Неограниченное число строк
const a8: [number, ...string[]] = [1] // Тоже валидный код
const a9: readonly [number, ...string[]] = [1] // Только для чтения
````
## Enum 
  
Ограниченный набор значений.
Удобно использовать для ролей пользователей, каких-то ограниченных величин

````typescript
enum StatusCode {
    SUCCESS = 1,
    INFO = 2,
    FAILED = 3,
    TIMEOUT = () => {return 5},
}

const res = {
    message: 'Hello World!',
    status: StatusCode.SUCCESS,
}
````

В js это будет функция, что не очень быстро работает. 

Если не нужен динамический расчет, то enum может быть константным

````typescript
const enum StatusCode {
    SUCCESS = 1,
    INFO = 2,
    FAILED = 3
}

const res = {
    message: 'Hello World!',
    status: StatusCode.SUCCESS,
}
````
 
На выходе js получаем, что не нужно рассчитывать и это офигенно.

````js
"use strict";
const res = {
    message: 'Hello World!',
    status: 1 /* StatusCode.SUCCESS */,
};

````
## Union

Несколько типов 

````typescript
let ab:boolean|string = 'str';
let bc:number|boolean|string = true;
function log(id: string|number|boolean) { // Любой из указанных типов
    // Cужение типов, конкретный тип в конкретных условиях
    if (typeof id === 'string') {
       console.log(id.charAt());
   } 
}

function logO( obj: {a: number} | {b: number}) {
    if ('a' in obj) {

    }
}
````
## Literal

````typescript
const t:'post'|'get' = 'get'; // Любое из двух значений
const a:1 = 1; // тип 1
const t1:1|2|7 = 7;
function test(): 1 | "test" { // Функция возвращает либо 1 либо test
    return "test";
}
```` 
## Алиасы для типов
 
Дополнительное отображение типов

````typescript
type httpMethod =  'get' | 'post' | 'put' | 'patch' | 'delete';
const method : httpMethod = 'get';

// Типизция обьекта, удобно переиспользование обьекта
type User = {
    name: number,
    email: number,
    skills: number[]

}
let user:User = {
    name: 1,
    email: 2,
    skills: [1,2,3,4,5,6,7,8,9,10]
}

// Типы можно свмещать друг с другом
type One = {
    id: string,
    name: string,
}

type Two = {
    test: number
}

type Three = One & Two;

let u: Three = {
    name: 's',
    id: 'w',
    test: 1
}

// Но так мы выбираем только один обьект
// Их можно комбиннировать на любом уровне вложенности
type One = {
    id: string,
    name: string,
}

type Two = {
    test: number
}

type Three = One | Two;

let u: Three = {
    test: 1
}
```` 
## Interfaces
 
````typescript
// Базовый пример
interface One {
    id: string,
    name: string,
}

let u:One = {
    name: '1',
    id: '2'
}

// Наследование интерфейсов
interface One {
    id: string,
    name: string,
}

// Можно наследовать так же несколько интерфейсов сразу
interface Two extends One {
    role: number,
    createdDate: Date
}

let u1:Two = {
    name: '1',
    id: '2',
    role: 5,
    createdDate: new Date(),
}

// Описываем методы
interface App {
    log: (id: number) => number
}

let u2:App = {
    log(id:number){
        return id;
    },
}
````

В интерфейсах можно доопределить свойства

> В интерфейсах нужно всегда писать однозначное определение его свойств

Types and Interfaces
## Классы

````typescript
class Point {
    private readonly x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    private func():number {
        this.y = 6;
        return this.y + 1;
    }

    protected a() {

    }
}

class d3P extends Point {
    private z:number;
    constructor(x: number, y: number, z: number) {
       super(x, y);
       this.z = z;
       this.a();
   }

    protected a(name?: string) {
        
    }
}

class StaticTest{
  static c = 'sdfd';
  static test() {}
}

// Нельзя сделать инстанс
abstract class Test4 {
    met(){}
}

class Test5 extends Test4 {
    
}

interface C {
    test:() => void
}

class D implements C {
    test(): void {
    }

}

const point = new Point(5,6);
point.y = 5;

const d3 = new d3P(1,2,3);

const s = StaticTest.c;
````