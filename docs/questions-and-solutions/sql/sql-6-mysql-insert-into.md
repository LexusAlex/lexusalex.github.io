---
layout: default
nav_order: 6
permalink: sql-6-mysql-insert-into
title: Вставка данных c помощью INSERT в mysql
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Как вставить данныe в таблицу с помощью INSERT INTO
date: 2023-06-27 17:00:00 +3
last_modified_date: 2023-06-27 17:00:00 +3
tags:
  - mysql
  - sql
  - questions-and-solutions
---

# Вставка данных c помощью INSERT в mysql
{: .no_toc }

Вставка по формуле таблица - столбцы - значения
```sql
# Вставка одного значения  
INSERT INTO history (`table`) VALUES ('test_table') # в неуказанные столбцы будет вставлен NULL
INSERT INTO history (`table`,row_id,user_id,time, description) VALUES ('test_table',1,8,1234567,'description')
INSERT INTO history VALUES (NULL,'test_table',1,8,1234567,'description')
# Выражение во вставляемом значении, можно и так    
INSERT INTO history VALUES (NULL,'test_table',1,(8*4),1234567,'description')    

# Так же существует такой синтаксис    
INSERT INTO history SET `table`='table';
INSERT INTO history SET `table`='table',row_id=1,user_id=24,time=1234546,description='description';    
    
# Вставка нескольких значений
INSERT INTO history VALUES (NULL,'test_table',1,8,1234567,'description'),(NULL,'test_table2',1,8,1234567,'description'),(NULL,'test_table3',1,8,1234567,'description')
INSERT INTO history VALUES (NULL,'test_table',1,8,1234567,'description'),(NULL,NULL,1,8,1234567,'description'),(NULL,NULL,NULL,NULL,NULL,'description') # Заполняем нулями пустые поля

# Вставка из другой таблицы
# Порядок тут такой, нужно выполнить запрос на SELECT выбирающий данные для вставки с точным указаним полей, далее выполнить INSERT
INSERT INTO history (row_id,user_id, time) (SELECT row_id,user_id,time FROM history WHERE `table` = 'clients')
# Таблица может быть вообще другой
INSERT INTO history (`table`, row_id, user_id) (SELECT doc_type,doc_id,sum FROM invoice WHERE doc_type = 3)
# Если у поля есть значение по умолчанию, то если мы не укажем его в INSERT, будет подставлено значение по умолчанию

# Игнорирование ошибки вставки. Допустим вносим дублирующий id, получим 1062 - Duplicate entry '104096' for key 'PRIMARY', добавим IGNORE чтобы подавить ошибку
INSERT IGNORE INTO history VALUES (104096,'test_table',1,77,1234567,'description')

# Вставка или обновление при дубликате, команда REPLACE, здесь упомяну про нее как универсальная команда вставки и обновления
REPLACE history VALUES (104096,'test_table1',1,77,1234567,'description') # Если записи нет, она будет добавлена, если есть обновлена
```
