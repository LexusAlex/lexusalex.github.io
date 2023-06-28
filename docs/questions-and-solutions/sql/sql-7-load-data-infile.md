---
layout: default
nav_order: 7
permalink: sql-7-load-data-infile
title: Загрузка данных из файла LOAD DATA IN FILE
parent: sql
grand_parent: Вопросы и решения
has_children: true
description: Способы загрузки данных из файла с помощью LOAD DATA IN FILE
date: 2023-06-28 12:00:00 +3
last_modified_date: 2023-06-28 12:00:00 +3
tags:
  - mysql
  - sql
  - questions-and-solutions
---

# Загрузка данных из файла LOAD DATA IN FILE
{: .no_toc }

```sql
# Базовый пример
# Фаил /var/tmp/load.txt
# app2	456457
# app3	456458
# app4	456459
# app5	456450
# app6	456488
# app7	456400
# Важно что разделитель по умолчанию здесь TAB, иначе работать не будет.
# Если не прописать полностью путь до файла по умолчанию он берется из /var/lib/mysql/[DBNAME]/load.txt    
LOAD DATA INFILE '/var/tmp/load.txt' INTO TABLE history (`table`, `row_id`); # Два столбца из файла
LOAD DATA INFILE '/var/tmp/load.txt' INTO TABLE history (`table`, `row_id`, `user_id`,`time`, `description`); # Все поля

# Разделитель любой символ
# Поставим в качестве разделителя ,
# 99999,app2,234234,45,1234567,текст русский
# 99910,app2,234234,45,1234567,текст русский
# 99911,app2,234234,45,1234567,текст русский
# 99912,app2,234234,45,1234567,текст русский
# 99913,app2,234234,45,1234567,текст русский
# 99914,app2,234234,45,1234567,текст русский
LOAD DATA INFILE '/var/tmp/load.txt' INTO TABLE history FIELDS TERMINATED BY ',';
# Определенный набор полей
# app2,234234,45
# app4,234234,45
# app5,234234,45
# app6,234234,45
LOAD DATA INFILE '/var/tmp/load.txt' INTO TABLE history FIELDS TERMINATED BY ',' (`table`, `row_id`, `user_id`);
    
# Другой разделитель между строками
# 99999,app2,234234,45,1234567,текст русский|99977,app2,234234,45,1234567,текст русский|99945,app2,234234,45,1234567,текст русский|95677,app2,234234,45,1234567,текст русский|99888,app2,234234,45,1234567,текст русский|99900,app2,234234,45,1234567,текст русский    
LOAD DATA INFILE '/var/tmp/load.txt' INTO TABLE history FIELDS TERMINATED BY ',' LINES TERMINATED BY '|';
    
# Еще пример, делаем автоинкремент по id
LOAD DATA INFILE '/var/tmp/load.txt' INTO TABLE history FIELDS TERMINATED BY ',' (`table`, `row_id`, `user_id`,`time`,`description`) SET id=NULL;
Важно что фаил - это просто текстовый файл не привязанный к формату
```