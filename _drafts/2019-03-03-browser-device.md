---
layout: post 
title: Устройство браузеров
permalink: browser-device
tags: browsers
--- 

Блочная модель

![box-model](/assets/images/browser/box_model/box_model_1.png "box-model")

Размеры элемента определяются в зависимости от значения свойства box-sizing

document.documentElement.clientWidth ширина корневого элемента
document.documentElement.clientHeight высота корневого элемента

var div = document.getElementById('box2');
div.clientWidth

По умолчанию свойство ширина элемента устанавливается исходя из типа и содержимого элемента



Viewport - это видимая пользователю область веб-страницы. Т.е. это то, что может увидеть пользователь, не прибегая к прокрутке.
Содержащий блок - родительский блок
Контекст форматирования - блочный или строчный

Блочная модель

размерами бокса: точно заданными или заданными ограничениями. Если размеры не заданы, это правило игнорируется;
типом бокса: inline, inline-level, atomic inline-level, block box;
схемой позиционирования: normal flow, a float или absolute positioning;
другими элементами дерева: дочерними и соседними;
размерами и расположением окна просмотра (viewport);
внутренними размерами содержащихся изображений;
другой внешней информацией.
    

box-sizing

Поток

    





