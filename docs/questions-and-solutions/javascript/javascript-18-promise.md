---
layout: default
nav_order: 18
permalink: javascript-18-promise
title: Используем Promise
parent: javascript
grand_parent: Вопросы и решения
has_children: true
description: Используем promise в js
date: 2024-04-20 17:00:00 +3
last_modified_date: 2024-04-20 17:00:00 +3
tags:
  - javascript
  - js
  - async
  - questions-and-solutions
---

# Используем Promise

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

Уже делал обзор на promise в статье [https://lexusalex.ru/javascript-7-promise-basics](https://lexusalex.ru/javascript-7-promise-basics)

Пришло время более подробно поговорить об этом.

## Проблема

Часто в коде можно встретить зависимые асинхронные запросы друг от друга.

Например, имеем функцию `request`, которая делает ajax запрос на сервер

````javascript
function request(url, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url); // инициализация запроса (async)
    xhr.send(); // отправка запроса
    xhr.onload = () => {
        if (xhr.status !== 200) {
            return xhr.statusText;
        } else {
            const result = JSON.parse(xhr.response).data[0];
            success(result);
        }
    };

    xhr.onerror = () => {
        const e = new Error('Failed request');
        error(e);
    };
}
````

И делаем 5 зависимых (!!!) друг от друга запросов с обработкой ошибок.

Функция `getInfo()`

````javascript
function getInfo() {
    request(
        'https://fakerapi.it/api/v1/addresses?_quantity=1',
        (result) => {
            console.log(result);
            request(
                'https://fakerapi.it/api/v1/custom?_quantity=1&city=city&streetName=streetName',
                (result2) => {
                    console.log(result2);
                    request(
                        'https://fakerapi.it/api/v1/custom?_quantity=1&phone=phone&',
                        (result3) => {
                            console.log(result3);
                            request("https://fakerapi.it/api/v1/addresses?_quantity=1", (result4) => {
                                console.log(result4);
                                request("https://fakerapi.it/api/v1/images?_quantity=1&_type=kittens&_height=300", (result5) => {
                                    console.log(result5);
                                }, (err5) => {
                                    console.log(err5);
                                })
                            }, (err4) => {
                                console.log(err4);
                            })
                        },
                        (err3) => {
                            console.error(err3);
                        }
                    );
                },
                (err2) => {
                    console.error(err2);
                }
            );
        },
        (err) => {
            console.error(err);
        }
    );
}

getInfo();
````

Посмотрим код:

````javascript
f1(() => {
    f2()
    f3(() => {
        f4(() => {
            f5(() => {
                f6(() => {
                    f7(() => {})
                })
            })
        })
    })
})
````
 
Что тут происходит, что за чем вызывается, сложно...

Получается ад колбэков.

### Минусы

Какие минусы этого подхода:

- Код тяжело читать, так как он сдвигается вправо, особенно когда много вычислений между запросами, сложная логика обработки
- Жесткая сцепленности кода
- Если упал 3 запрос, то 4 и 5 никогда не выполнятся

### Пример
 
Результаты запрсов можно увидеть в консоли браузера.

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/18/18.1-problem" height="152" width="100%"></iframe>

[Открыть пример 18.1 в новой вкладке](/assets/demo/qs/javascript/18/18.1-problem.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

## Что такое promise

Это более удобный механизм для работы с асинхронным кодом, js объект со скрытыми полями.

## Создание 

````javascript
// Создадим `Promise`
const p = new Promise(); // Будет ошибка
// Внутрь промиса нужно передать обязательно функцию обратного вызова
const p = new Promise(() => {console.log('exec')}); // Вот сейчас сработает
// Или так
function exec(){
    console.log('exec');
}
const p = new Promise(exec); // Но чаще первый вариант
````

## Resolve

Функция которую нам предоставляет promise, чтобы разрешить свое состояние. По умолчанию - это `pending`, значит незавершенный запрос.

Мы сами решаем что успешно, а что нет.

````javascript
const p = new Promise(resolve => {
    resolve(1); // Главное вызвать функцию
});

console.log(p); // Теперь state будет fulfilled, а значение будет 1
// На самом деле можно ничего не передавать, тогда в value будет undefined, но разрешить пропим успешно нужно.
const p = new Promise((resolve) => {
    resolve();
});
````

- Функция resolve() должна быть вызвана в любом случае, тогда промис завершится успешно.

## Reject

Второй параметр reject, если запрос не выполнился, или произошла ошибка.

````javascript
const p = new Promise((resolve, reject) => {
  reject(new Error(123)); // Состояние rejected
});

console.log(p);
````

## Состояния

- `pending` - ожидает выполнение
- `fulfilled` - успешно завершился resolve()
- `rejected` - произошла ошибка, отклонен. reject()

- Если не вызвать resolve() или reject() будет всегда состояние pending

Состояние промиса можно менять только один раз, например

````javascript
 const p = new Promise((resolve, reject) => {
      resolve(1); // Будет выполнена только эта функция, все что после не будет выполнено
      resolve(777);
      reject(2);
      resolve(345);
      reject(555);
  });
  console.log(p);
````

Callback выполняется синхронно в момент вызова.

## Обработка результата

- then
- catch
- finally

### then

Код после успешного выполнения promise

Then будет вызван только тогда, когда будет вызван `resolve()`

````javascript
 const p = new Promise((resolve, reject) => {
        // Любой код
        resolve(777);
  });

  p.then((resolveResult) => { // Обязательный параметр
      console.log(resolveResult); // Тут будет 777
  })
````

При возникновении ошибки передаем вторым параметром `rejectResult` и обрабатываем ошибку

````javascript
const p = new Promise((resolve, reject) => {
  reject('error');
});

p.then((resolveResult) => {
  console.log(resolveResult);
}, ((rejectResult) => { // Этот колбэк необязательный
  console.log(rejectResult);
}))
````
 
> Внимание callback rejectResult обрабатывает не все ошибки

Promise можно создать с использованием статической функции.

````javascript
const p1 = Promise.resolve(3456); // Автоматически разрешить промис
const p2 = Promise.reject('error2'); // Завершить промис
// Обработка такого варианта идет так же через then
````

### catch

Ловит все ошибки, которые возникают в then

`````javascript
const p = new Promise((resolve, reject) => {
    resolve(123); // Разрешаем промис
});

p.then((resolveResult) => {
    console.log(resolveResult); // 123
    throw new Error('error');
}, ((rejectResult) => {
    console.log(rejectResult);
})).catch((error) => {
    console.log(error.message); // ловим error
})
`````

> Каждый обработанный Promise неявно возвращает новый промис

````javascript
p1.then(() => {
}).then(() => {
}).catch(() => {
}).then(() => {
}).then(() => {
}).then(() => {
})
````
 
Можно навесить одну секцию catch на всю цепочку промисов, и если в одном из промисов что-то пойдет не так, мы обязательно попадем в эту секцию

Можно делать такие штуки

````javascript
const p1 = new Promise((resolve,reject) => {
      resolve(4);
  })

  const n = p1.then((resolveResult) => {
      return resolveResult;
  });

  n.then((data) => {
      console.log(data + 4); // Тут уже будет 8
  })
````
 
Или вот такие удивительные вещи: 

````javascript
const p1 = new Promise((resolve, reject) => {
        resolve(4);
    })

    p1.then((resolveResult) => {
        console.log(resolveResult);
        return resolveResult;
    }).then((result2) => {
        result2 = result2 + 2;
        console.log(result2);
        return result2;
    }).then((result3) => {
        result3 = result3 + 2;
        console.log(result3);
        return result3;
    }).then((result4) => {
        result4 = result4 + 2;
        console.log(result4);
        return result4;
    });
````

Код получается линейным и легко читается, это называется цепочка промисов.

### finally

Если нужно что-то сделать после завершения промиса и не важно успешно или нет, то используем `finally`.

Пример:

````javascript
const promise = new Promise((resolve) => {
        resolve(10);
    })

    promise.then((res) => {
        return res;
    }).then((res) => {
        res = res + 10;
        if (res === 20) {
            throw Error('some error');
        }
        console.log(res);
        return res;
    }).then((res) => {
        console.log(res);
        return res + 10;
    }).catch((error) => {
        console.log(error); // Обрабытывем ошибки
    }).finally(() => {
        console.log('finally'); // Выполнится в любом случае
    })
````

### Примеры

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/18/18.2-promise.html" height="152" width="100%"></iframe>

[Открыть пример 18.2 в новой вкладке](/assets/demo/qs/javascript/18/18.2-promise.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}

Перепишем первый пример на Промисы и в консоли увидим результат.

<iframe class="" loading="lazy" title="" src="/assets/demo/qs/javascript/18/18.3-promise-1.html" height="152" width="100%"></iframe>

[Открыть пример 18.3 в новой вкладке](/assets/demo/qs/javascript/18/18.3-promise-1.html){:target="_blank"}{:rel="nofollow noopener noreferrer"}





 

## Примеры

Выполнение двух setTimeout c задержкой три секунды 

> Промис должен возвращать промис

````javascript
const p = new Promise((resolve, reject) => {
      setTimeout(() => {
          // fetch любой ассинхронный код
          resolve({id: 1, name: 'Test'});
      }, 3000)
  })

  p.then((res) => {
      console.log(res);
      return res;
  }).then((res) => {
      setTimeout(() => {
          // fetch
          console.log({id: 2, name: 'Test2'});
      }, 3000)
      return res;
  })
````

TODO

Promise.all - ждем все промисы, если хоть один с ошибок - catch, иначе then

Promise.allSettled - просто ждем выполнения всех промисов (всегда then)

Promise.race - получаем первый выполнившийся промис (если он был с ошибкой - catch, иначе then)

Promise.any - получаем первый УСПЕШНО выполнившийся промис