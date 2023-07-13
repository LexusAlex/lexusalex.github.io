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
last_modified_date: 2023-07-13 17:00:00 +3
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

1. Создание объекта Slim\App
2. Определение маршрутов, получается массив с объектами типа Route
3. Запуск приложения
4. Вход в стек middleware и выполнение всех middleware
5. Вызывается объект App, отправляет текущий запрос объекту маршрута заданного заранее
6. Если все ок вызывается стек middleware для маршрута, далее код маршрута
7. Если маршрут не найден вызывается NotFound или Not Allowed
 

````php
// Базовое использование
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();


$app->add(function (Request $request, RequestHandlerInterface $handler) {
    echo 'one middleware'.'<br>';
    return $handler->handle($request);
});

$app->add(function (Request $request, RequestHandlerInterface $handler) {
    echo 'two middleware'.'<br>';
    return $handler->handle($request);
});

$app->get('/', function (Request $request, Response $response) {
    echo 'main page'.'<br>';
    return $response;
})->add(function (Request $request, RequestHandlerInterface $handler){
    echo 'route middleware one'.'<br>';return $handler->handle($request);}
)->add(function (Request $request, RequestHandlerInterface $handler){
    echo 'route middleware two'.'<br>';return $handler->handle($request);}
)->add(function (Request $request, RequestHandlerInterface $handler){
    echo 'route middleware three'.'<br>';return $handler->handle($request);}
);

$app->run();
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