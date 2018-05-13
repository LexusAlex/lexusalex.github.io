---
layout: post
title:  Выборка в sql
date:   2018-01-30
author: Алексей Шмелев
categories: development
comments: true
cover:  "/assets/hello/hello.jpg"
---

Выборка в sql пожалуй один из самых распрастоненных задач

Особенность оператора SELECT состоит в том , что он всегда в результате возвращет таблицу

~~~mysql
SELECT 2+3 AS five, 6+6 AS six

five	six
5	12

~~~ 

синтаксис оператора SELECT

~~~mysql
SELECT
    [ALL | DISTINCT | DISTINCTROW ]
      [HIGH_PRIORITY]
      [STRAIGHT_JOIN]
      [SQL_SMALL_RESULT] [SQL_BIG_RESULT] [SQL_BUFFER_RESULT]
      [SQL_CACHE | SQL_NO_CACHE] [SQL_CALC_FOUND_ROWS]
    select_expr [, select_expr ...]
    [FROM table_references
      [PARTITION partition_list]
    [WHERE where_condition]
    [GROUP BY {col_name | expr | position}
      [ASC | DESC], ... [WITH ROLLUP]]
    [HAVING where_condition]
    [ORDER BY {col_name | expr | position}
      [ASC | DESC], ...]
    [LIMIT {[offset,] row_count | row_count OFFSET offset}]
    [PROCEDURE procedure_name(argument_list)]
    [INTO OUTFILE 'file_name'
        [CHARACTER SET charset_name]
        export_options
      | INTO DUMPFILE 'file_name'
      | INTO var_name [, var_name]]
    [FOR UPDATE | LOCK IN SHARE MODE]]
~~~

Создадим тестовые данные для тестирования
id	id_good	id_client	title
1	1	1	order1
2	2	1	order2
3	1	2	order3
4	8	5	order4



