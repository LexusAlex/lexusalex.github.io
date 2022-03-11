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

Различные решения и советы, к которым дошел сам, нашел или подсказали. Чтобы не потерять и не забыть.

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
                text.parent().find('label').css("color", "#a94442");
                text.parent().append("<div class='help-block'>Необходимо заполнить поле «----».</div>");
                return false;
            }
            $('#form').find('[type="submit"]').prop("disabled", true);
        });

    }
</script>
</body>
</html>
```

