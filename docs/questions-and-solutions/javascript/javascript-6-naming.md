---
layout: default
nav_order: 6
permalink: javascript-6-naming
title: Именование в javascript
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Как именовать сущности в javascript
date: 2024-01-05 20:00:00 +3
last_modified_date: 2024-01-05 20:00:00 +3
tags:
- javascript
- js
- questions-and-solutions
---

# Именование в javascript
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

Именование в программировании играет большую роль. 
Ведь от того, как будут названы сущности зависит качество кода и его восприятие.

Цель этого всего не заставлять человека читающего код думать, имя сущности должно само за себя говорить.

Программист - не должен додумывать смысл, а просто читать код.

## Пример названия переменной

В качестве примера разберем названия переменной для книги:

````javascript
let s = 'Война и Мир'; // Ничего не понятно
let string = 'Война и Мир'; // Тоже ничего не понятно
let book = 'Война и Мир'; // Книга, но какая
let bookName = 'Война и Мир'; // Уже лучше, подойдет
let bookNameIsMyRead = 'Война и Мир'; // Излишняя информация 
let bookNameIsMyReadTheLastYear = 'Война и Мир'; // Еще больше лишней информация 
````

Здесь главное найти золотую середину, в нашем случае - это `bookName`

## Типы нотаций

Какие нотации именования самые ходовые:

1. Верблюжья нотация `camelCaseNotation`
2. Нотация Паскаля `PascalCaseNotation`
3. Змеиная нотация `shake_case_notation`
4. Шашлычная нотация `kebab-case-notation`
5. Плоская нотация `flatcasenotation`
6. Для констант `CONSTANT_CASE`

Какую и в каких конструкциях использовать, зависит от языка. В javascript используется верблюжья нотация `camelCaseNotation`.

## Соглашения об именовании

1. Избегать одно буквенных названий <span class="text-red-300">`q`</span> <span class="text-green-300">`query`</span>
2. Используйте `camelCase` нотацию для именования объектов и функций <span class="text-red-300">`MYSUPER_object`</span> <span class="text-green-300">`mySuperObject`</span>
3. Конструкторы и классы именовать в `PascalCase` нотации <span class="text-red-300">`class clientServer`</span> <span class="text-green-300">`class ClientServer`</span>
4. Не использовать `_` в начале или в конце названий сущностей <span class="text-red-300">`__myVariable_`</span> <span class="text-green-300">`myVariable`</span>
5. При экспорте функции использовать нотацию `camelCase` и должно совпадать с названием функции <span class="text-green-300">`export default mySuperPuperExtraFunction;`</span>
6. При экспорте классов, конструкторов, объектов использовать `PascalCase` нотацию <span class="text-green-300">`export default AnimalClass;`</span>
7. Сокращения и аббревиатуры должны быть в верхнем или нижнем регистре <span class="text-red-300">`HtTpRequests`</span> <span class="text-green-300">`httpRequests HTTPRequests`</span>

## Именование переменных

1. Переменная может содержать буквы, цифры,$,_ , но не может начинаться с цифры.
2. Все остальные символы недопустимы.
3. Переменная `a` и `A` разные переменные.
4. Переменные нельзя называть [зарезервированными словами](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Lexical_grammar#%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B2%D1%8B%D0%B5_%D1%81%D0%BB%D0%BE%D0%B2%D0%B0)
5. Имя должно быть коротким, интуитивно понятным и описательным.

## Предикаты и коллекции

- Функция-действие-глагол
- Переменная-существительное

Предикаты (проверки) начинать с префикса `is`

- `isValid()`
- `isNull()`
- `isTest()`
- `isEmpty()`

Количество чего-то в чем-то

- `hasUsers(1)` - есть ли в списке пользователи с типом 1
- `hasListeners()`

Переменная обозначающая количество.

Сущность во множественном числе + count.

- `symbolsCount`
- `charsCount`
- `stringsCount`
- `animalsCount`

Коллекция - это всегда элемент во множественном числе:

- `errors`
- `collections`
- `peoples`
- `cars`
- `numbers`
- `items`

Парные слова

- `begin` - `end`
- `best` – `worst`
- `big` - `little`
- `clean` - `dirty`


## Думай, прежде чем назвать

Что хранится в переменной, например `file`, но файл это большое понятие, как правило, это какая-то часть файла.

- `fileName`
- `filePath`
- `fileExtension`
- `content`
- `header`

Если в переменной храниться строка, то здесь зависит от ее происхождения.

- `text` - произвольная строка
- `sentence`
- `char`
- `word`
- `string`

Потрать время и подумай как назвать переменную, которая будет отражать суть, что в ней лежит.

`unpaidOrdersInPreviousQuarterCount` - количество неоплаченных заказов в предыдущем квартале.
`sistersAndBrothersOfKingCount` - количество сестер и братьев короля

## До и после

Правильно именовать такие переменные нужно так, чтобы они отражали суть, предмета который там находится

- `valueBeforeProcess` - значение до процесса
- `valueAfterProcess` - значение после процесса
- `contentBeforeMove` - контент до перемещения
- `contentAfterMove` - контент после перемещения

## Функция - это всегда действие

Функция всегда что-то возвращает, даже если она пустая.
Порядок именования приблизительно такой. Что делаем? Над чем делаем?

Примеры названий функций

- `getName`
- `setName`
- `parse`
- `getValue`
- `render`
- `build`
- `generateSymbol`
- `enableUser`
- `makePhp`
- `createForm`
- `checkPermission`

> Одна функция – одно действие


Еще примеры функций

- `showMessage` - показать сообщение
- `calculateSum` - считает и возвращает сумму
- `updateForm` - обновляет форму
- `insertDataTable` - вставить данные в таблицу

Функция конструктор называется с большой буквы, устоявшиеся соглашение

## Кратко

- По возможности не писать сокращения в названиях переменных, исключения это счетчики и циклов (i, j, k, l, t)
- `camelCase` нотация для объявления переменных, для констант `CONSTANT_CASE`
- Одна функция – одно действие
- `is_` (`isBark`,`isTest`) - состояние текущего контекста
- `has_` (`hasProducts`) - количество чег-то в чем-то
- `getFruitsCount()` - вернуть что-то из функции
- `setFruits()` - установить какое-либо значение
- `resetFruits()` - сброс
- `fetchPosts()` - сделать ассинхронный запрос
- `removeFilter` - удалить что-то откудано
- `selectedFilters` - указать что выбрано
- `deletePost` - полное удаление сущности
- `composePageUrl` - создать новые данные из существующих
- `handleLinkClick` - совершить действие