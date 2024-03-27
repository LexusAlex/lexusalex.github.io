---
layout: default
nav_order: 10
permalink: sql-10-char_varchar
title: Типы данных char и varchar
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Символьные типы данных char и varchar
date: 2023-09-03 18:00:00 +3
last_modified_date: 2023-09-03 12:40:00 +3
tags:
- mysql
- postgresql
- sql
- questions-and-solutions
---

# Типы данных char и varchar
{: .no_toc }
 
## mysql

CHAR хранит строку фиксированной длины. От 0 до 255 Если происходит передача строки меньшей длины, чем была указана, то оставшиеся символы заполняются пробелами.

VARCHAR в MySQL хранит строку переменной длины. Длина от 0 до 65 535 символов

Если длина строки превосходит длину указанную в CHAR или VARCHAR, то передаваемая строка обрезается до допустимой длины.

Размер строки в байтах будет больше, чем в символах так как используется Unicode.

````sql
# создадим таблицу для тестирования
CREATE TABLE `char` (`varchar` VARCHAR(16100), `char` CHAR(255));

SELECT `char`,CHAR_LENGTH(`char`) FROM `char`;
````