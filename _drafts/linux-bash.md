Программирование на bash

$ command -x 1 [-x 2 args] {-x n | --long-options i } args ...

~ - домашний каталог
* - любой символ сколько угодно
? - любой но один символ
[x-y] - диапазон
[abc]

m 1 m 2 m...m n ’ - множественное экранирование
”m 1 m 2 m...m n ” - множественное экранирование
\m одиночное

ls -l mu* - любое кол-во символов
ls -la mu?????? - 6 любых символов
ls -la ???????? - 8 любых символов
[mr]*
ls -ld *-*
ls -ld /etc/*[0-9]*
find . -maxdepth 1 -size 0
wc -l

Подстановка вывода команд ` `  $()
rm `find . -maxdepth 1 -size 0`
rm $(find . -maxdepth 1 -size 0) 
cmd1 $(cmd2 $(cmd3))
cmd1 $(cmd2) $(cmd3)

touch "name test"

find /usr -size +35k
find /usr -size +$[5 * 1024]k -ls
find /usr -size +$[5 * 1024]k | wc -l - арифметическая подстановка
echo $[2**10]

Подстановка параметров 
echo $LANG 
echo ${LANG}test 

set -x включить трассировку всего 
set +x выкл трассировку

du -sh ~ вес домашнего каталога

Списки

cmd ; cmd  безусловный список
cmd || cmd условный список ИЛИ
cmd && cmd  условный список И

cmd & cmd

Параллеьное выполнение
find / -size 0 2> /dev/null 1> /tmp &

#!/bin/sh диалект сценария

#!/bin/bash

# Comment

echo Hello! $1

// если список команд закончился успехом, то выполняем ветку
if test "$1" = "" 
then
    echo Hello!
else
    echo Hello! $1
fi


https://www.youtube.com/watch?v=WVHC5Ggl7k4 7мин