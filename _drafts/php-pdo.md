```php
// рекомендуемые МНОЙ параметры
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_STRINGIFY_FETCHES => false,
    PDO::ATTR_EMULATE_PREPARES => false,
];

//$options = [];

$dsnMysql = "mysql:host=backend-mysql;dbname=starter;charset=utf8";
$pdoMysql = new PDO($dsnMysql, 'starter', 'starter', $options);

$dsnPgs = "pgsql:host=backend-postgres;dbname=starter;options='--client_encoding=UTF8'";
$pdoPgs = new PDO($dsnPgs, 'starter', 'starter', $options);

echo "<pre>";
print_r($pdoMysql);
print_r($pdoPgs);
```