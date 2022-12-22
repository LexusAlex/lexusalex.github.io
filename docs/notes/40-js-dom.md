---
layout: default
nav_order: 40
permalink: 40-js-dom
title: JS DOM
parent: Заметки
description: JS DOM. Необходимый минимум
date: 2022-12-22 22:30:00 +3
last_modified_date: 2022-12-22 22:30:00 +3
tags:
- javascript
---

# JS DOM
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

## Создание элементов

```javascript
let element = document.createElement('div'); // div
```

## Создание текстового узла

```javascript
let text = document.createTextNode('Контент'); // #text
```

## Вставка текста внутрь элемента

```javascript
element.textContent = 'Текст для вставки'; // Вставка теста
element.append(text); // Вставка тестового узла
```