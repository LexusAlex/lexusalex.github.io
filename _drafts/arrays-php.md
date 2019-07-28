Массивы в php

Массив в php - это список элементов, коллекция состоящая из пар ключ => значение,  набор однотипных элементов.

Массив - это динамическая структура

индекс последнего элемента `$animals[count($animals) - 1]`
размер массива `count($animals)`

`unset($animals[1]);`
В общем случае уменьшение размера массива — нежелательная операция

В общем случае, правильно всегда проверять доступность индекса и никогда не обращаться к массиву за его границами.

`array_key_exists ( mixed $key , array $array ) : bool` проверка существования индекса часто используют `isset()`

null coalescing operator `$value = $matrix[3] ?? $matrix[3][8] ?? 'x';`

Частая операция при работе с массивами - это итерация по элементам

Оптимальный вариант

~~~php
for ($i = 0, $length = count($colors); $i < $length; print($i), $i++) {
  print_r("{$colors[$i]}\n");
}
~~~

при таком for будет ошибка Начальное значение $i выходит за границу массива

~~~php
for ($i = count($userNames); $i >= 0; $i--) {
  print_r("{$userNames[$i]}\n");
}
~~~

писать нужно так `$i = count($userNames) - 1`

частые ошибки - это неизвестный индекс ` Undefined offset: 26`

Частая задача - нужно из исходного делать новый массив

Проверить
Выход за границу массива
Остановка цикла
function reverseArray($coll) 
{
    $size = sizeof($coll);
    $maxIndex = floor($size / 2);
    for ($i = 0; $i < $maxIndex; $i++) {
        $mirrorIndex = $size - $i - 1;
        $temp = $coll[$i];
        $coll[$i] = $coll[$mirrorIndex];
        $coll[$mirrorIndex] = $temp;
    }
    
    return $coll;
}

print_r(reverseArray([3, 2]));
print_r(reverseArray([3, 56, 2]));
print_r(reverseArray(['one', 'two', 'three', 'four']));
