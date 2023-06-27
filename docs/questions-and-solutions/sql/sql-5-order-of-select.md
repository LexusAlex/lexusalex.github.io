---
layout: default
nav_order: 5
permalink: sql-5-order-of-select
title: Порядок выполнения select запроса
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Из чего состоит select запрос
date: 2023-06-27 11:30:00 +3
last_modified_date: 2023-06-27 11:30:00 +3
tags:
  - mysql
  - sql
  - questions-and-solutions
---

# Порядок выполнения select запроса
{: .no_toc }

В каком же порядке выполняется sql запрос


```sql
# 1. Определение таблиц, секция FROM
SELECT * FROM `user`,`audit_kp` WHERE audit_kp.author_id = `user`.id

# 2. Объединение таблиц, секция JOIN
SELECT * FROM `user` JOIN audit_kp ON `user`.id = audit_kp.author_id # Результат с запросом выше идентичен                               

# 3. Условие WHERE
SELECT * FROM `user` WHERE `status` <> 10                 
SELECT * FROM `user` WHERE `status` != 10
SELECT * FROM `user` WHERE `status` = 10 AND departament = 5

# 4. Группировка строк GROUP BY
SELECT * FROM `user` WHERE `status` = 10 GROUP BY departament # Получим по одному представителю своего отдела

# 5. HAVING Уточнение выборки после GROUP BY
SELECT * FROM `user` WHERE `status` = 10 GROUP BY departament HAVING role = 3

# 6. Выбор столбцов и выполнение агрегатных функций в секции SELECT
SELECT COUNT(*),departament,username FROM `user` # Всего записей в таблице 
                                     
# 7. Сортировка столбцов ORDER BY
SELECT * FROM `user` ORDER BY id ASC
SELECT * FROM `user` ORDER BY id DESC
SELECT * FROM `user` ORDER BY username ASC, status DESC # Сортировка сразу по двум полям

# 8. LIMIT Ограничить количество выводимых строк
SELECT * FROM `user` LIMIT 10 # 10 первых строк
SELECT * FROM `user` LIMIT 10 OFFSET 10 # или SELECT * FROM `user` LIMIT 10,10
```

В итоге у нас получается порядок следующий

```text
FROM
JOIN
WHERE
GROUP BY
HAVING
SELECT
ORDER BY
LIMIT
```
