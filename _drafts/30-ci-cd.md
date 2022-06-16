---
layout: default
nav_order: 30
permalink: 30-ci-cd
title: Ci/Cd или процесс разработки
parent: Заметки
description: Как использовать в проекте непрерывное развертывание и непрерывную интеграцию
date: 2022-04-30 23:00:00 +3
tags:
- linux
---

# Ci/Cd или процесс разработки
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

## Непрерывная интеграция (Continuous Integration)

Этапы которые должен пройти ваш код, чтобы попасть на прод.

1. Допустим мы пишем какой-то код. Для тестирования я создал отдельный репозиторий [https://github.com/LexusAlex/ci-cd-test](https://github.com/LexusAlex/ci-cd-test)
2. Далее допустим решаем задачу, для этого лучше всего ее начать делать в отдельной ветке

