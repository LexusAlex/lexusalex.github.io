---
layout: default
nav_order: 4
permalink: php-4-slim-framework
title: Slim framework 4
parent: php
grand_parent: Вопросы и решения
has_children: true
description: Исследование работы slim framework 4
date: 2023-07-12 17:00:00 +3
last_modified_date: 2023-07-16 00:50:00 +3
tags:
- php
- slim-framework
- questions-and-solutions
---

# Slim framework 4
{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>
---

Исследуем работу slim framework 4

Как работает slim:

1. Создание объекта `Slim\App`
2. Определение маршрутов, получается массив с объектами типа Route
3. Запуск приложения `$app->run();`
4. Вход в стек middleware и выполнение всех middleware на глобальном уровне
5. Вызывается объект App, отправляет текущий запрос объекту маршрута заданного заранее
6. Если все ок вызывается стек middleware для маршрута, далее код маршрута, то есть сам action
7. Если маршрут не найден вызывается NotFound или Not Allowed обработчик

## Базовое использование

````php

<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as Handler;
use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

// Глобальные middleware
$app->add(function (Request $request, Handler $handler) {
    echo 'one middleware'.'<br>';
    return $handler->handle($request);
});

$app->add(function (Request $request, Handler $handler) {
    echo 'two middleware'.'<br>';
    return $handler->handle($request);
});

$app->add(function (Request $request, Handler $handler) {
    echo 'three middleware'.'<br>';
    return $handler->handle($request);
});

// Маршруты с определением внутри middleware
$app->get('/', function (Request $request, Response $response) {
    echo 'main page'.'<br>';
    return $response;
})->add(function (Request $request, Handler $handler){
    echo 'route middleware one'.'<br>';return $handler->handle($request);}
)->add(function (Request $request, Handler $handler){
    echo 'route middleware two'.'<br>';return $handler->handle($request);}
)->add(function (Request $request, Handler $handler){
    echo 'route middleware three'.'<br>';return $handler->handle($request);}
);

// Запуск приложения
$app->run();

/*
// Обратим внимание на порядок выполнения
three middleware - был добавлен последним на глобальном уровне
two middleware
one middleware
route middleware three - был добавлен последним на уровне маршрута
route middleware two
route middleware one
main page - контент экшена
 */
````

## Маршруты

При создании маршрутов важно учитывать их порядок, они могут перекрывать друг друга

````php
// Для http методов существуют свои методы
$app->get('/get', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

$app->post('/post', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

$app->put('/put', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

$app->delete('/delete', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

$app->options('/options', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

$app->patch('/patch', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

// Параметры можно параметризовать
$app->get('/test[/{id}]', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

$app->get('/test2/{id}/{page}/{sector}', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

// Можно указывать необязательные параметры
$app->get('/news[/{year}[/{month}]]', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

// Или неограниченный набор параметров
///news4/1/2/5/6/67/tyu/uyti
$app->get('/news4[/{params:.*}]', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});
// Так же более узкое указание regexp
$app->get('/users5/{id:[0-5]+}', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

// Маршруты можно группировать
///group/group2/test
$app->group('/group', function (\Slim\Routing\RouteCollectorProxy $group){
    $group->group('/group2', function (\Slim\Routing\RouteCollectorProxy $group2){
        $group2->get('/test', function ($request, $response) {
            echo $_SERVER['REQUEST_URI'];
            return $response;
        });
    });

});

//$routeCollector = $app->getRouteCollector();
//$routeCollector->setCacheFile('/tmp/test.file');

// Любой метод
$app->any('/any', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

// Перечисление методов
$app->map(['GET','POST','DELETE'],'/map', function (Request $request, Response $response) {
    echo $_SERVER['REQUEST_URI'];
    return $response;
});

// Проверяем запросами
/*
GET http://127.0.0.1:8080/get
POST http://127.0.0.1:8080/post
PUT http://127.0.0.1:8080/put
PATCH http://127.0.0.1:8080/patch
DELETE http://127.0.0.1:8080/delete
OPTIONS http://127.0.0.1:8080/options
*/

// Но так работать не удобно, удобно вынести код роутов в отдельные классы, что мы и сделаем

// Контроллер с action
class HomeController
{
    public function test(\Psr\Http\Message\ServerRequestInterface $request, \Psr\Http\Message\ResponseInterface $response){
        echo 'Home controller';
        return $response;
    }
}

// action
class Action
{
    public function __invoke(\Psr\Http\Message\ServerRequestInterface $request, \Psr\Http\Message\ResponseInterface $response){
        echo 'Action';
        return $response;
    }
}

// PSR-15
class HomeAction implements \Psr\Http\Server\RequestHandlerInterface
{
    public function handle(\Psr\Http\Message\ServerRequestInterface $request): \Psr\Http\Message\ResponseInterface
    {
        echo 'HomeAction';
        return (new \Slim\Psr7\Response());
    }
}

// Создать контроллеры так гораздо удобнее, чем обычными callback функциями

$app->get('/controller1', '\HomeController:test');
$app->get('/controller2', HomeController::class.":test");
$app->get('/controller3', [HomeController::class,'test']);
$app->get('/controller4', HomeAction::class);
$app->get('/controller5', Action::class);
````



````php
<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

# Создание приложения стандартным образом
# По сути приложение - это объект роутинга

# В параметрах функции указываются
# ResponseFactoryInterface - реализация psr-7 Response 
# ContainerInterface - Контейнер psr-11
# CallableResolverInterface
# RouteCollectorInterface
# RouteResolverInterface
# MiddlewareDispatcherInterface - Менеджер middleware
$app = AppFactory::create();
# Любой из элементов выше можно переопределить для этого есть соответствующие методы
# Например добавим контейнер psr-11
AppFactory::setContainer($container);

# Определяем маршрут
# Паттерн - callable function
# Psr\Http\Message\ResponseInterface 
# Psr\Http\Message\ServerRequestInterface
$app->get('/', function (Request $request, Response $response, array $args) {
    # Внутри доступны два объекта и должен вернутся нужный нам Response
    # Slim\Psr7\Request
    # Slim\Psr7\Response
    return $response;
});

# Запускаем приложение
$app->run();
# Маршруты хранятся здесь
$app->getRouteCollector()->getRoutes()
# Под капотом slim вызывает RoutingMiddleware

TODO
````

## Запрос

Каждый маршрут получает текущий Request, полученный сервером, мы используем реализацию psr-7 от slim Slim\Psr7\Request.

```php
// Текущий метод запроса 
$request->getMethod() // GET POST PUT DELETE HEAD PATCH OPTIONS

// URI Запроса, для каждого из элементов запроса существует свои методы
$request->getUri()
/*
Slim\Psr7\Uri Object
(
    [scheme:protected] => http
    [user:protected] => 
    [password:protected] => 
    [host:protected] => 127.0.0.1
    [port:protected] => 8080
    [path:protected] => /controller1
    [query:protected] => t=1&t=45
    [fragment:protected] => 
)
*/
// Заголовки запроса
// Так же есть методы получения и проверки других заголовков
$request->getHeaders()
// Тело запроса, например массив POST запроса 
$request->getParsedBody()
// Объект Slim\Psr7\Stream, нужен если объект входящего запроса большой или нужно обрабатывать частями
$request->getBody() // У него много методов для работы с ресурсом
// Тело запроса
$request->getBody()->getContents()
// Массив $_FILES - загружаемые файлы
$request->getUploadedFiles()
// $_SERVER
$request->getServerParams()
// Есть возможность передать атрибут в экшен для дальнейшего использования
// В Middleware
$request = $request->withAttribute('str','123');
// В action
$request->getAttribute('str');
```

## Ответ

Так же каждый маршрут и middleware получает черновую версию ответа Slim\Psr7\Response, который нужно вернуть клиенту. 
До возврата его можно настроить как требуется

```php
// Код состояния ответа
$response->getStatusCode() // 200 ОК
$response->withStatus(302) // Переопределить код состояния
// Заголовки ответа, их можно проверить, установить, получить, удалить
$response->getHeaders()
// Тело ответа Объект Slim\Psr7\Stream
$response->getBody()
// Записать данные в ответ
$response->getBody()->write('123')
// Например, нужно вернуть ответ в JSON, поменяв заголовок это можно сделать так + заменим статус ответа
return $response->withHeader('Content-Type', 'application/json')->withStatus(302)
// Редирект на ya.ru
return $response->withHeader('Location', 'https://ya.ru')->withStatus(302)
```

## Middleware

В slim есть такие вещи как middleware. Это такие посредники которые выполняются до action.

Как их создать с помощью callback функции привели пример выше, сейчас создадим их с помощью класса

```php
// Можно так
class TestMiddleware
{
    public function __invoke(\Psr\Http\Message\ServerRequestInterface $request, \Psr\Http\Server\RequestHandlerInterface $handler)
    {
        $response = $handler->handle($request);
        $response->getBody()->write('TestMiddleware');

        return $response;
    }
}
// Вот так лучше
class TestMiddleware2 implements \Psr\Http\Server\MiddlewareInterface
{
    public function process(\Psr\Http\Message\ServerRequestInterface $request, \Psr\Http\Server\RequestHandlerInterface $handler): \Psr\Http\Message\ResponseInterface
    {
        $response = $handler->handle($request);
        $response->getBody()->write('TestMiddleware2');

        return $response;
    }
}
// Добавим к приложению
$app->add(TestMiddleware::class);
$app->add(TestMiddleware2::class);
```

Во фреймворке имеются middleware идущие из коробки

- Routing Middleware - Обработка текущего запроса
- ErrorMiddleware - Обработка ошибок
- Method Overriding Middleware - Переопределение метода входящего запроса
- Output Buffering Middleware - Режимы буферизации вывода
- Body Parsing Middleware - Автоматический парсинг JSON,xml, данных из форм
- Content Length Middleware - Автоматическое добавление заголовка Content Length

В репозитории [https://github.com/orgs/middlewares/](https://github.com/orgs/middlewares/) много полезных middleware

## Итог

Slim framework идеально подходит для api, каких-то небольших сервисов, в нем нет ничего лишнего. Полная свобода для творчества.