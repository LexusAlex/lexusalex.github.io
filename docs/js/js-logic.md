---
layout: default
nav_order: 5
permalink: js-logic
title: Логические операторы
parent: js
description: Использование логических операторов
date: 2022-07-30 00:10:00 +3
published: true
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

В js, впрочем, как и в другом языке логические операторы работают с булевыми значениями, с некоторыми оговорками.

## Общая теория

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
// Первый трушный элемент это 2
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

```javascript
true || (234 + 67) // true и дальше вычиления не будет
false || (234 + 67) // 301 , здесь ситуация меняется вычисление идет дальше
!null // true всегда приводится к булеву типу
```


> Например, в php оператор || всегда возвращает булевы значения, как результат сравнения, в js наоборот значения
