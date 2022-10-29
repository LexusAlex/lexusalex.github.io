---
layout: default
nav_order: 1
permalink: 1-js-modal
title: Модальное окно
parent: JavaScript решения
grand_parent: js
has_children: true
description: Создаем модально окно на чисто js
date: 2022-10-29 19:40:00 +3
last_modified_date: 2022-10-29 19:40:00 +3
tags:
- js
- html
- css
---

# Модальное окно
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

Просто для того, чтобы понять как это сделано внутри

```html
<style>
    .modal-overlay {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100%;
        opacity: 0;
        visibility: hidden;
    }

    .modal {
        background-color: #ffffff;
        width: 300px;
        height: 300px;
        align-items: center;
        justify-content: center;
        display: none;
    }

    .modal-overlay--visible {
        opacity: 1;
        visibility: visible;
        transition: all 0.3s ease-in-out;
    }

    .modal--visible {
        display: block;
    }

</style>
<button class="button modal-button-1">Модальное окно 1</button>
<button class="button modal-button-2">Модальное окно 2</button>
<button class="button modal-button-3">Модальное окно 3</button>


<div class="modals">
  <div class="modal-overlay">
    <div class="modal modal--1 modal-button-1">Модальное окно 1</div>
    <div class="modal modal--2 modal-button-2">Модальное окно 2</div>
    <div class="modal modal--3 modal-button-3">Модальное окно 3</div>
  </div>
</div>
```

```javascript
const buttons = document.querySelectorAll('.button');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modals = document.querySelectorAll(".modal");

  for (let node of buttons) {
    node.addEventListener('click', function (event) {
      let modalButtonClass = event.currentTarget.classList[1];

      for (let modal of modals) {
        modal.classList.remove('modal--visible')
      }

      document.querySelector(".modal-overlay > ." + modalButtonClass).classList.add('modal--visible');
      modalOverlay.classList.add('modal-overlay--visible');
    })
  }

  modalOverlay.addEventListener('click', function (e) {
    modalOverlay.classList.remove('modal-overlay--visible');
    for (let modal of modals) {
      modal.classList.remove('modal--visible')
    }
  })
```


