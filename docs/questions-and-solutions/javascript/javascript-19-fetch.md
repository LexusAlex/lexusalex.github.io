---
layout: default
nav_order: 19
permalink: javascript-19-fetch
title: Fetch в JavaScript
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Используем fetch запросы в javascript
date: 2024-04-20 17:00:00 +3
last_modified_date: 2024-04-20 17:00:00 +3
tags:
  - javascript
  - js
  - async
  - questions-and-solutions
---

# Fetch в JavaScript

{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>
---

## Базовый пример

````javascript
fetch('https://fakerapi.it/api/v1/addresses')
    .then((res) => {
        return res.json();
    }).then((res) => {
    console.log(res.data);
})
````