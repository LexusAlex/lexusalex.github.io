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
last_modified_date: 2023-07-14 17:00:00 +3
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
 

````php
// Базовое использование
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

// Но так работать не удобно, удобно вынести код роутов в отдельные классы
TODO
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