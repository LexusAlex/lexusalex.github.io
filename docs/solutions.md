---
layout: default
title: Решения
comments: true
summary: Алексей Шмелев - решения
permalink: /solutions
nav_order: 9
---

# Решения
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

Различные решения, советы и код, к которым дошел сам, нашел или подсказали. Чтобы не потерять и не забыть, собираю в 
одном месте

## PhpStorm

### Множественные курсоры в ubuntu

Столкнулся с проблемой, что из коробки в phpstorm на ubuntu не работают множественные выделения.
Это очень удобная фича, можно выделять множество однотипных строк, столбцов.

По умолчанию каждый новый курсор, должен появляться при нажатии `alt+click`, но в ubuntu на уровне системы это сочетание
двигает окна.

Решение: Нужно зайти в настройки это file->settings->keymap->editor actions->clone caret below и установить удобное для вас
сочетание клавиш, для меня это `alt + a`. Эта комбинация дает появление нескольких курсоров на экране.

### Поиск в файлах всего проекта

Не раз выручал простой функционал поиска нужной строки во всех файлах проекта.

Вызвать окно поиска можно комбинацией `ctrl + shift + F`

## Chrome DevTools

### Контраст текста

Для проверки контраста текста можно использовать веб-инспектор Chrome DevTools (F12)

Выбрав любой цвет на панели Styles браузер автоматически выведет коэффициент контраста текста. 
Он обозначен как Contrast ratio. Если контраст находится в рамках допустимого, то будет отмечен зелёной галочкой. 
В противном случае будет показан красный круг.

Встроенная штука о которой знают не многие.

## Linux

### Полезные пакеты

#### Neofetch

Удобная утилита для просмотра информации о системе

Установка: `sudo apt install neofetch`

Использование: `neofetch`

## PHP

### PhpUnit

#### Протестировать вывод на экран

Неочевидно, но в phpunit есть возможность протестировать и побочный эффект, а именно печать на экран следующим образом,
достаточно протестировать строку.

```php
<?php
echo 'some';
$this->expectOutputString('some');
```

Или указать регулярку, если нужно протестировать только часть строки, иногда это очень удобно.

```php
<?php
echo 'some asdgfsd dfgfdgfdg';
$this->expectOutputRegex('/^some/');
```

#### Тестирование исключений

Тестировать исключения в phpunit можно так:

```php
<?php
// а здесь, мы его перехватываем
$this->expectException(\Exception::class);

// здесь код который выбрасивает ислючение
throw new \Exception('something went wrong');
```

## HTML + CSS

### Форма с валидацией

Иногда бывает срочно нужно сделать прототип простой формы с валидацией, и каждый раз ее приходится делать с нуля исча в интернетах.
Для облегчения процесса, код:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="" method="get" id="form">
    <fieldset>
        <legend> Текстовое поле </legend>
        <label>
            <input type="text" name="text">
        </label>
    </fieldset>
    <fieldset>
        <legend> Пароль </legend>
        <label>
            <input type="password" name="password">
        </label>
    </fieldset>
    <fieldset>
        <legend> Текстовая область </legend>
        <label>
            <textarea name="textarea" cols="50" rows="10"></textarea>
        </label>
    </fieldset>
    <fieldset>
        <legend> Группа радиокнопок </legend>
        <label>
            <input type="radio" name="answer" value="one">
            Уничтожитель
        </label>
        <label>
            <input type="radio" name="answer" value="two">
            Разрушитель
        </label>
        <label>
            <input type="radio" name="answer" value="three">
            Обвинитель
        </label>
        <label>
            <input type="radio" name="answer" value="four">
            Сладкоежка
        </label>
    </fieldset>
    <fieldset>
        <legend> Группа чекбоксов </legend>
        <label>
            <input type="checkbox" name="check" value="one">
            Уничтожитель
        </label>
        <label>
            <input type="checkbox" name="check" value="two">
            Разрушитель
        </label>
        <label>
            <input type="checkbox" name="check" value="three">
            Обвинитель
        </label>
        <label>
            <input type="checkbox" name="check" value="four">
            Сладкоежка
        </label>
    </fieldset>
    <button type="submit">Отправить</button>
</form>
<script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous">
</script>
<script>
    window.onload = function()
    {
        $('#form').submit(function()
        {
            var text = $('[name = "text"]');
            if (text.val() === '') {
                //text.parent().find('label').css("color", "#a94442");
                $(".help-block").remove();
                text.parent().append("<div class='help-block' style='color: #a94442'>Необходимо заполнить поле «----».</div>");
                return false;
            }
            $('#form').find('[type="submit"]').prop("disabled", true);
        });

    }
</script>
</body>
</html>
```
## SQL

### MySql

#### Очистка таблицы

Неочевидно, но очистить данные из таблицы, не удаляя при этом саму таблицу можно командой 

```sql
TRUNCATE tbl_name
```

#### Вставка данных INSERT

Представим, что имеем таблицу с полями:

| id | a | b | c | d | e |

id - это первичный ключ

Разные способы вставки данных в таблицу:

```sql
-- Простая вставка одной строки, с четким соответствием столбцов
INSERT INTO table2 (a, b, c, d, e) VALUES (1, 2, 3, 4, 5);
-- Или так, в неуказанные столбцы будет вставлен NULL
INSERT INTO table2 SET a=1, b=2, c=3;
-- Множественная вставка нескольких значений
INSERT INTO table2 (a, b, c, d, e) VALUES (1, 2, 3, 4, 5), (NULL,2, NULL, 4, 5), (NULL, NULL, NULL, NULL,5);
```


## JavaScript

### Выделение текущего пункта меню

В обычном html бывает задача выделения активного пункта меню в зависимости от url страницы.

В оборачивающий меню элемент добавляем атрибут `data-id-page` с url страницы.
В каждую ссылку добавляем `data-id-nav` с адресом этой ссылки.

```javascript
var pageId = $("#mobile-footer-info").attr('data-id-page');
var navItem = $("#mobile-footer-info").find("a[data-id-nav]").attr("data-id-nav");
var item = $('a[data-id-nav="'+pageId+'"]');

if(pageId == item.attr("data-id-nav")) {
	item.find('i').addClass("footeractive");
}
```