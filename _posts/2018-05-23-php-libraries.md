--- 
layout: post 
title: Полезные библиотеки в php 
permalink: php-libraries
tags: php libraries
comments: true
--- 

Собираю в одном месте полезные библиотеки и функции в php, дабы иметь все под рукой.


## Содержание
- **Универсальные**
    - [Funct - часто используемые блоки кода](#funct)
    - [Unit Converter - универсальный конвертер величин](#unit-converter)
- **Строки**
    - [Stringy - работа со строками](#stringy)
    - [Morphos - морфология для сайта](#morphos)
    - [Faker - генератор фейковых данных](#faker)
    - [Str - работа со строками в ООП стиле](#str)
    - [Tiny php - обфускация строки](#tiny-php)
    - [Uuid - генератор уникальных универсальных идентификаторов](#uuid)
- **Дата и время**
    - [Carbon - манипуляция с датой и временем](#carbon)
- **Инструменты**
    - [PHP_CodeSniffer - инструмент позволяющий найти проблемы в коде](#php-codesniffer)
    - [Phploc - статистика php проекта](#phploc)
    - [VfsStream - виртуальная файловая система](#vfs-stream)
      
----    
# Универсальные

Для чего пишут такие библиотеки:
1. Исправление ошибок в нативных функциях php, они по историческим причинам ведут себя неверно
2. Расширенные возможности, более удобный порядок аргументов 

### Funct

Набор функций для работы с коллекциями, строками c хорошей документацией

[https://github.com/phpfunct/funct](https://github.com/phpfunct/funct)

~~~php
Funct\Collection\pluck(
            [
                [1, 2, 3, 66],
                [4, 5, 6, 89],
                [7, 8, 9, 789],
                [90, 22, 00, 44],
            ],0

        ); // функция вернет элементы по указанному индексу, в данном случае это 1,4,7,90
~~~

### Unit-converter

Универсальный конвертер различных величин

[https://github.com/jordanbrauer/unit-converter](https://github.com/jordanbrauer/unit-converter)

# Строки

### Stringy

Большой набор функций для работы со строками, на все случаи жизни

[https://github.com/danielstjules/Stringy](https://github.com/danielstjules/Stringy)

### Morphos
 
Морфология для сайта, не библиотека , а клад, имеет подробную документацию.

Немного примеров (В документации больше информации)
~~~php
// просто массив всех падежей, можно указать какой падеж и какой пол, 
// если имя не русское, можно отдельно склонять части ФИО
morphos\Russian\inflectName('Шмелев Алексей');

array(6) {
  ["nominative"]=>
  string(27) "Шмелев Алексей"
  ["genitive"]=>
  string(29) "Шмелева Алексея"
  ["dative"]=>
  string(29) "Шмелеву Алексею"
  ["accusative"]=>
  string(29) "Шмелева Алексея"
  ["ablative"]=>
  string(33) "Шмелевым Алексеем"
  ["prepositional"]=>
  string(29) "Шмелеве Алексее"
}

// тоже самое с географическими названиями, страны, области, города
morphos\Russian\GeographicalNamesInflection::getCases('Тамбовская область');

array(6) {
  ["nominative"]=>
  string(35) "Тамбовская область"
  ["genitive"]=>
  string(35) "Тамбовской области"
  ["dative"]=>
  string(35) "Тамбовской области"
  ["accusative"]=>
  string(35) "Тамбовскую область"
  ["ablative"]=>
  string(37) "Тамбовской областью"
  ["prepositional"]=>
  string(35) "Тамбовской области"
}
// с именами существительными тоже работает
morphos\Russian\NounDeclension::getCases('программа');

// что еще очень классно, склонение числительных, специально подобрал число посложнее
morphos\Russian\CardinalNumeralGenerator::getCases(23567981760);

array(6) {
  ["nominative"]=>
  string(206) "двадцать три миллиарда пятьсот шестьдесят семь миллионов девятьсот восемьдесят одна тысяча семьсот шестьдесят"
  ["genitive"]=>
  string(218) "двадцати трех миллиардов пятисот шестидесяти семи миллионов девятисот восемидесяти одной тысячи семисот шестидесяти"
  ["dative"]=>
  string(224) "двадцати трем миллиардам пятистам шестидесяти семи миллионам девятистам восемидесяти одной тысяче семистам шестидесяти"
  ["accusative"]=>
  string(206) "двадцать три миллиарда пятьсот шестьдесят семь миллионов девятьсот восемьдесят одну тысячу семьсот шестьдесят"
  ["ablative"]=>
  string(260) "двадцатью тремя миллиардами пятьюстами шестьюдесятью семью миллионами девятьюстами восемьюдесятью одной тысячей семьюстами шестьюдесятью"
  ["prepositional"]=>
  string(224) "двадцати трех миллиардах пятистах шестидесяти семи миллионах девятистах восемидесяти одной тысяче семистах шестидесяти"
}

// Валюта, более чем достаточно
morphos\Russian\MoneySpeller::spell(1531468991.67, 'RUB', morphos\Russian\MoneySpeller::CLARIFICATION_FORMAT);
string(264) "1531468991 (один миллиард пятьсот тридцать один миллион четыреста шестьдесят восемь тысяч девятьсот девяносто один) рубль 67 (шестьдесят семь) копеек"
~~~

Еще можно задавать интервалы во времени, и кончания слов, помоему это то что нужно для многих задач

[https://github.com/wapmorgan/Morphos](https://github.com/wapmorgan/Morphos)

### Faker

Генератор фейковых данных, незаменим при тестировании, генерирует имена, адреса, просто строки любой длины, электронные адреса,
user agent, цвета, имена файлов, идентификаторы и другое

[https://github.com/fzaninotto/Faker](https://github.com/fzaninotto/Faker)

### Str

Работа со строками в ООП стиле

[https://github.com/fe3dback/str](https://github.com/fe3dback/str)

### Tiny php

Обфускация строки

[https://github.com/zackkitzmiller/tiny-php](https://github.com/zackkitzmiller/tiny-php)

### Uuid

Генератор универсальных уникальных идентификаторов.

[https://github.com/ramsey/uuid](https://github.com/ramsey/uuid)

Для хранения в бд используйте поле двоичный объект, не храните как строка
[https://www.percona.com/blog/2014/12/19/store-uuid-optimized-way/](https://www.percona.com/blog/2014/12/19/store-uuid-optimized-way/)

# Дата и время

### Carbon

Удобная библиотека для манипулирования датой и временем, очень часто в процессе работы требуется 
вычесть одну дату из другой, отобразить разницу, создать указанную дату. У библиотеки шикарная дока

[https://github.com/briannesbitt/carbon](https://github.com/briannesbitt/carbon)

Например:

~~~php
Carbon::tomorrow(); // получим завтрашную дату
Carbon::yesterday(); // вчера
Carbon::now(); // сейчас
Carbon::now()->addDays(3); // добавим 3 дня к текущей дате
Carbon::now()->subDays(3); // вычтем 3 дня из текущей даты
Carbon::now()->addHour(5)->subDays(6)->addMinutes(30); // что удобно можно делать такие штуки
~~~
Здесь мы имеем просто громадное количество методов по добавлению и вычитанию периодов, об этом можно глянуть в 
[официальной документации](https://carbon.nesbot.com/docs/#api-addsub)

Что примечательно, также просто можно получить разницу между датами.

# Инструменты

### php-codeSniffer

Набор скриптов, позволяющие найти проблемы в исходном коде, например несоответствие стандартам кодирования.
Автоматическое исправление кода

Php-codeSniffer предназначен для того чтобы отловить проблемы в коде, которые мы можем не увидеть.

[https://github.com/squizlabs/PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer)

### phploc

Отображает статистику php проекта

[https://github.com/sebastianbergmann/phploc](https://github.com/sebastianbergmann/phploc)

### vfs-stream

Виртуальная файловая система, подходит для тестов phpunit

[https://github.com/mikey179/vfsStream](https://github.com/mikey179/vfsStream)

Данный список буду дополнять по мере нахождения чего-либо интересного.

UPD 10.07.2018 Добавлены библиотеки tiny-php, uuid

UPD 31.12.2018 Добавлены библиотеки unit converter, php-codeSniffer

UPD 08.01.2019 Добавлена библиотека phploc

UPD 02.02.2019 Добавлена библиотека vfsStream



