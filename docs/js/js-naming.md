---
layout: default
nav_order: 1
permalink: js-naming
title: Именование сущностей
parent: js
description: Общие рекомендации при именовании сущностей
date: 2022-07-20 22:35:00 +3
tags:
- js
- naming

  
---

# Именование сущностей
{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>
---

Именование в программировании играет большую роль. Ведь от того, как будут названы сущности зависит качество кода и
его восприятие. Цель этого всего не заставлять человека читающего код думать, имя сущности должно само за себя говорить.

Программист - не должен додумывать смысл, а просто читать код.

## Типы нотаций 

Какие нотации именования самые ходовые:

1. Верблюжья нотация `camelCaseNotation`
2. Нотация Паскаля `PascalCaseNotation`
3. Змеиная нотация `shake_case_notation`
4. Шашлычная нотация `kebab-case-notation`
5. Плоская нотация `flatcasenotation`

Какую и в каких конструкциях использовать, зависит от языка.

## Соглашения об именовании

1. Избегать одно буквенных названий <span class="text-red-300">`q`</span> <span class="text-green-300">`query`</span>
2. Используйте `camelCase` нотацию для именования объектов и функций <span class="text-red-300">`MYSUPER_object`</span> <span class="text-green-300">`mySuperObject`</span>
3. Конструкторы и классы именовать в `PascalCase` нотации <span class="text-red-300">`class clientServer`</span> <span class="text-green-300">`class ClientServer`</span>
4. Не использовать `_` в начале или в конце названий сущностей <span class="text-red-300">`__myVariable_`</span> <span class="text-green-300">`myVariable`</span>
5. При экспорте функции использовать нотацию `camelCase` и должно совпадать с названием функции <span class="text-green-300">`export default mySuperPuperExtraFunction;`</span>
6. При экспорте классов, конструкторов, объектов использовать `PascalCase` нотацию <span class="text-green-300">`export default AnimalClass;`</span>
7. Сокращения и аббревиатуры должны быть в верхнем или нижнем регистре <span class="text-red-300">`HtTpRequests`</span> <span class="text-green-300">`httpRequests HTTPRequests`</span>

## Правила именования

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

Переменная обозначающая количество

Сущность во множественном числе + count.

- `symbolsCount`
- `charsCount`
- `stringsCount`
- `animalsCount`

Коллекция - это всегда элемент во множественном числе, 

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

Что хранится в переменной, например `file`, но файл это большое понятие, как правило это какая-то часть файла

- `fileName`
- `filePath`
- `fileExtension`
- `content`
- `header`

Если в переменной храниться строка, то здесь зависит от ее происхождения

- `text` - произвольная строка
- `sentence`
- `char`
- `word`
- `string`

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

TODO - дописать
