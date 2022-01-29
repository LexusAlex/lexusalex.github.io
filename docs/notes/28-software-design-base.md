---
layout: default
nav_order: 28
permalink: 28-software-design-1
title: Проектирование программного обеспечения. Базовые понятия
parent: Заметки
description: Способы мышления при при проектировании программ
date: 2022-01-29 18:00:00 +3
tags:
- php
- software
---

# Проектирование программного обеспечения. Базовые понятия
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

Зададим базовый набор понятий который будем использовать:

- Процедура - программа выполняющая свои операции без возврата какого-либо значения.
- Функция - программа выполняющая свои операции и возвращающая значение.
- Структура — это объединение нескольких объектов, возможно, различного типа под одним именем, которое является типом структуры.

## Процедуры и функции

Например, имеем курс выгруженный из базы данных курс, определим для него процедуру `addQuestion` которая будет добавлять вопрос к курсу в массив `$course`.

```php
function addQuestion(&$course, $question){
   if (!in_array($question , $course['questions'])) {
       $course['questions'][] = $question;
   }
}

$course = [
   'name' => 'test name',
   'questions' => [
       'question1',
       'question2',
       'question3',
   ]
];

addQuestion($course, 'question4');
addQuestion($course, 'question5');
addQuestion($course, 'question6');
```

Все вроде бы удобно, но эта процедура глобальная для всего кода. Так же она работает с массивом `$course` напрямую, что плохо, исправим это,
напишем функцию `addQuestionF`, которая будет уже возвращать новый объект курса меняя данные внутри.

```php
function addQuestionF($course, $question){
   if (!in_array($question , $course['questions'])) {
       return [
           'name' => $course['name'],
           'questions' => [ ...$course['questions'],  $question ]
       ];
   } else {
       return $course;
   }
}

$course = [
   'name' => 'test name',
   'questions' => [
       'question1',
       'question2',
       'question3',
   ]
];

$newStateCourse = addQuestionF($course, 'question4');
```

Стало лучше, но с массивами таким образом работать неудобно. 

## Структуры

Сделаем класс `course` - где разместим все эти поля, добавим метод `addQuestion` и заполним объект:

```php
class Course
{
    public string $name;
    public array $questions;

    public function __construct(string $name, array $questions)
    {
        $this->name = $name;
        $this->questions = $questions;
    }
    
    public function addQuestion($question){
        if (in_array($question , $this->questions)) {
            throw new \DomainException('Question( already exists in the course');
        }

        $this->questions[] = $question;
    }
}

$course = new Course('name course',['question1', 'question2', 'question3']);
$course->addQuestion('question4');
```

Как видно теперь внутри можно писать различные проверки, даже код стал выглядеть чище и приятней.

Структура выше содержит данные и поведение для управления этими данными в одном месте.