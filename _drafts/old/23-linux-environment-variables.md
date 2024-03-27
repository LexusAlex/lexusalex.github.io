---
layout: default
nav_order: 23
permalink: 23-environment-variables
title: Linux. Переменные окружения
parent: Заметки
description: Типы и способы задания переменных окружения в linux
date: 2021-09-07 18:00:00 +3
tags:
- linux
---

# Linux. Переменные окружения
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

## Установка глобальных переменных окружения

Переменные будут видны для всех пользователей ssh. Для этого необходимо задать значения в файле `/etc/environment`

```shell
vim /etc/environment
TEST="123"
TEST2="SecretText"
```

После перезагрузки системы переменные будут доступны для всех пользователей ssh
