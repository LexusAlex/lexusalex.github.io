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
last_modified_date: 2024-04-28 17:00:00 +3
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


````typescript

let n:null = null;
let u:undefined = undefined;
let any:any = [];
let ab:boolean|string = 'str';
let bc:number|boolean|string = true;

;

// type
type U = {test: string};

// interface
interface U2 {
  test: string
}

interface U3 {
    // опционнальный параметр
  test?: string
}

const o3:U = {test:"234"};
const o4:U2 = {test:"234"};
const o5:U3 = {};


type ob = {
    name: string,
    age: number
    more ?: () => {data: string}
}

let o7:ob[] = [
    {
        name: 'alex',
        age: 23,
        more: () => { return {data: '123'};}
    },
    {
        name: 'alex2',
        age: 50
    },
];
````

TO BE CONTINUE... 017 Enums.mp4