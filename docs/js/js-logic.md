---
layout: default
nav_order: 5
permalink: js-logic
title: Логические операторы
parent: js
description: Общие рекомендации при использовании логических операторов
date: 2022-07-25 23:00:00 +3
published: false
tags:
- js

# Логические операторы
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

В js, впрочем, как и в другом языке логические операторы работают с булевыми значениями, но все не так радужно как кажется.

Очевидно но все же, общая теория

```javascript
// Если хотя бы один true, тогда все выражение будет true
true || true; // true
false || true; // true
true || false; // true
false || false; // false

// true только если оба true
true && true // true
false && true // false
true && false // false
false && false // false
```
Любое выражение приводится к логическому типу

```javascript
// Первый трушный элемент это
false || null || 2 || undefined // 2
// Последний лживый элемент
false || false || undefined || null // null
// До вычисления дело не дойдет
true || (2 + 1) // true
// Первое ложное значение
3 && null && 1 && undefined // null
// Последний true
9 && 77 && 6 && 5 // 5
```

> Например, в php оператор || всегда возвращает булевы значения, в отличие от js, здесь это значения


https://learn.javascript.ru/logical-operators
https://ru.hexlet.io/courses/js-basics/lessons/logical-operations/theory_unit
