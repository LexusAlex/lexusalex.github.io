---
layout: default
title: Команды
comments: true
summary: Алексей Шмелев - команды
permalink: /commands
nav_order: 8
---

# Команды
{: .no_toc }

<details open markdown="block">
  <summary>
    Содержание
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>
---

Команды и директивы. Собираю все в одном месте.

## Linux

### Объем

```shell
du -sh /var/www/* | sort -hr # отображение размеров
```

### Файловая система/монтирование

```shell
cat /proc/filesystems # поддержиеваемые файловые системы дистрибутива
ls -l /lib/modules/$(uname -r)/kernel/fs # поддержиеваемые файловые системы дистибутива
findmnt --real # отобразить точки монтирования или так mount | grep "^/dev"
findmnt # показать все точки монтирования или так просто команда mount
sudo mount.cifs -v //Server /mnt/  --verbose -o username="test",password="test",file_mode=0777,dir_mode=0777,iocharset=utf8 # монтирование диска на windows
sudo umount /mnt # размонтирование раздела
```

### Зависимости

```shell
ldd /bin/ls # отобразить зависимости команды
```

```shell
vnstat -h # монниторинг трафика, утилита с приятным интерфейсом
```

## Docker

### Системное

```shell
docker system df # размеры компонентов докера
sudo du -sh /var/lib/docker/overlay2 # размер слоев docker в системе
sudo du -sh /var/lib/docker # размер всех компонентов докера
docker system prune -a # удалить все компоненты докера, рекомендуется переодически запускать
```

### Контейнер

Изолированный процесс в namespaces. Что из себя предоставляет

- Cgroups
- IPC
- Network
- Mount
- PID
- User
- UTS
- +Специфические вещи докера

Особенности:
- важно это НЕ виртуальная машина.
- нет ядра, используется ядро хостовой машины.

```shell
docker ps -a # список всех контейнеров
docker create --name test-c mongo # сохдать контейнер, но не запускать его
docker run -it node # скачать образ node если его нет из реестра образов и запустит изолированный процесс операционной системы в виде контейнера - то есть в реальности это просто процесс
docker run --name my-mdb -d mongo # запустить контейнер mongo в фоне с указанным именем
docker run --name my-mdb --network my-network -p 3000:3000 -d mongo # запустить контейнер с указанной сетью + mapping порта
docker run --name my-mysql-server --network host mysql # создать контейнер с типом сети host, то есть ip будет такой же как у хоста
docker run --name my-mysql-server --dns 8.8.8.8 mysql # создать контейнер и указать dns внутри контейнера
docker run --name my-mysql-server -d -v /home/alex/docker/scratch/mysql-data:/var/lib/mysql mysql # создать том и сбиндить директорию /var/lib/mysql из контейнера в хост машину
docker run --name my-mysql-server -d --tpmfs /var/lib/mysql mysql # создать временный volume который будет удален после остановки контейнера
docker run --name scratch-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=scratch -v /home/alex/docker/scratch/mysql-data:/var/lib/mysql -d bianjp/mariadb-alpine # запуск контейнера
docker start my-mdb # запустить контейнер
docker stop my-mdb # остановить контейнер
docker restart my-mdb # рестартовать контейнер
docker rm lexusalexgithubio_jekyll_1 # удалить контейнер по имени
docker kill my-mdb # убить процесс контейнера
docker container prune # удалить все остановленные контейнеры
docker rename test_test mongodb # переименовать контейнер
docker inspect -s mysql # информация о контейнере
docker logs -f my-mdb # логи контейнера, со следованием за ними
docker logs my-mdb | grep "id" -m 2 > text.txt # логи контейнера с фильтрацией по строке, в количестве 2 строк и записью этой информации в файл
docker exec -w /root mongo pwd # выполнить команду в указанном контейнере в указанной директории
docker exec -e MYSQL_DATABASE=db mongo printenv # вывести переменные окружения внутри контейнера + добаввили свои
docker exec -it mongo bash # интерактивный режим контейнера подключится к контейнеру, имеем возможность вводить команды внутри контейнера
docker exec mongo bash -c 'mongo --version > m.txt' # выполнить команду внутри контейнера
```

### Образ

Образ состоит из слоев (overlay fs), слои доступны только для чтения.

При сборке нового образа слои пере используются.

```shell
docker pull nginx # скачать образ из реестра образов
docker push nginx # загрузить образ в реестр образов
docker images # или docker image ls список образов
docker save --output php.tar php # сохранить образ на диск в архив, нужно крайнее редко - это архив со всеми слоями образа
docker history composer:2 # слои и история образа, как был собран образ
docker image import php.tar # развернуть образ из архива
docker build --tag lexusalex/scratch . # сборка и пересборка образа из контекста
docker inspect php:8 # информация об образе
docker image rm php # удалить образ
docker image prune # удалить все образы без тега daling образы
docker build -t test:scratch -f app/api/Dockerfile . # Сборка сервиса, по умлчанию ищет Dockerfile в корне корне контекста
```

### Сеть

Типы сетевых драйверов docker:

- bridge - дефолтная сеть которая изолирована, работает в рамках одной хост машины
- host - доступ напрямую к хостовой машине
- overlay - docker swarm
- macvlan - уникальный mac для контейнера
- null - без сети

```shell
docker network ls # список сетей
docker network inspect bridge # просмотреть параметры сети
docker network create my-network # создать новую сеть типа bridge
docker network connect my-network node-1 # подключить контейнер node-1 к сети my-network
```

### Тома

Зачем нужны

- Персистентное, постоянное хранение данных
- Передача конфигов в контейнер, что удобно
- Share данных между контейнерами
- Экспорт логов

Типы подключений томов:

- volumes
- bind mounts
- tmpfs

```shell
docker volume ls # список volumes
docker volume create demo # создать том в области докера
docker volume inspect slim-prototype-mysql # информация о томе, например здесь /var/lib/docker/volumes/slim-prototype_mysql лежат данные из тома на хостой машине
docker volume rm demo # удалить том, удалить директорию
docker volume prune # удалить volume, ВНИМАНИЕ ВСЕ ДАННЫЕ ТОМА БУДУТ УДАЛЕНЫ!
docker cp hostfile.txt volume-9:/opt/data # скопировать файл внутрь тома
docker cp volume-9:/opt/data data # скопировать из тома в хостовую систему
```

### Dockerfile

```dockerfile
# Аргументы сборки, они не будут присутсвовать в финальном образе
ARG MY_ARG=latest
# На чем будет базироваться образ - базовый образ
FROM node:17-bullseye as build
# Метаинформация
LABEL vers="1.0"
# Пользователь и рабочая диреткория относить которой производить сборку
USER root
WORKDIR /opt/app
# Добавить файл в образ из хостовой машины или добавить файл из другого образа
ADD .gitignore ./
COPY .gitignore ./
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
# Установка SHELL
SHELL ["/bin/sh", "-c"]
# Выполнение команды при сборке образа в shell. Самая частая команда
RUN npm install
# Переменные окружения, они будут присутствовать в финальном образе
ENV TEST=1
ENV BAR=$TEST
# Отправить сигнал при остановке контейнера
STOPSIGNAL 9
# Примонтирование тома, все это будет только на этапе запуска контейнера, он не имеет имени
VOLUME ["/opt/app/data"]
# Указание порта на котором будет слушатся запросы
EXPOSE 80/tcp
# Команды при запуске контейнера из этого образа
# Запуск команды в терминале
CMD ["node", "./index.js"]
# Всегда в приоритете в отличие от CMD
ENTRYPOINT ["top", "-c"]
```

### Docker-compose

Docker-compose позволяет описать всю конфигурацию контейнеров в текстовом виде.

Конфигурация docker-compose пишется в yml файлах, где в приоритете отступы.

#### docker-compose.yml

```yaml
version: "3.9" # версия файла, влияет на поддержку новых фич
services: # какие у нас будут подняты сервисы
    api: # название сервиса
        image: debian # имя образа из которого собрать контейнер
        container_name: my-name # имя контейнера
        build: # где лежит Dockerfile для сборки образа
            context: infrastructure/backend/development/docker/nginx-debian-bullseye
            dockerfile: Dockerfile # как называется Dockerfile
        restart: always # в случае если сервис упал он будет перезагружен
        ports: # проброшенные порты
            - "3000:3000"
        networks: # сеть для контроллера
            - myTestNetwork #сеть для контейнера
        volumes: # тома
            - mysql:/var/lib/mysql
            - ./.env:/opt/app/.env
        profiles: # профили для сервиса
            -   backend
        depends_on: # зависимость этого контейнера от следующих
            -   rmq
    rmq:
        image: rabbitmq:3-management
        restart: always
        env_file: # указать файл с переменными окружения
            -   .env
        environment: # переменные окружения доступные внутри контейнера
            - MYTEST=test
            - TESTMY=test
networks: 
    myTestNetwork: # создать новую сеть 
        driver: bridge
    default: # подключить уже созданную сеть, когда она уже создана
        external: true
        name: myNetwork
volumes: 
    mysql: # создать том
```

#### Контейнеры

```shell
docker-compose up -d # поднять контейнеры в фоновом режиме, при это название всех сущностей докера будет начинатся с названия папки
docker-compose stop # остановить все контейнеры в текущем контексте, то есть все которые описаны в docker-compose.yml в сервисах
docker-compose start # запустить сервисы
docker-compose down # остановить и удалить контейнеры и сети
docker-compose down --remove-orphans # остановить и удалить контейнеры которые не установлены в docker-compose.yml
docker-compose down -v --remove-orphans # остановить контейнеры и тома
docker-compose --profile backend up -d # запустить сервисы с указанным профилем
docker-compose run api # поднять только один сервис
docker-compose --env-file .env.compose up -d # поднять контейнеры с указанием где брать переменные окруженния
```

## Git

### Системное

```shell
# Добавляем файлы и директории в глобальный gitignore
git config --global core.excludesfile ~/.gitignore
echo '.idea/' >> ~/.gitignore

# Учетные данные для коммитов
git config --global user.name "Alexey Shmelev"
git config --global user.email alexsey_89@bk.ru

git reflog # системный журнал
```

### Создание репозитория

```shell
git init demo # создать пустой репозиторий, по факту в текущей директории создается папка .git
```

### Индексирование/удаление/рабочий процесс

```shell
git add --all # добавить в индекс все неотслежиеваемые изменения
git add . # добавить в индекс все файлы в текущем каталоге
git add readme.md # добавить в индекс файл readme.md
git rm --cached readme.md # убрать файл из индекса, то есть на шаг назад, если файл еще не был закомичен
git restore readme.md # сбросить изменения, ОПАСНО при этом все изменения в файле будут удалены!!!
git restore --staged readme.md # убрать файл из индекса, если файл уже был закомичен
```

### Ветки

```shell
git branch -M main # переименовать локальную текущую ветку в main
git branch feature-001 # создать новую ветку feature-001
git checkout feature-001 # перейти в ветку feature-001
git checkout -b feature-001 # создать и перейти в ветку feature-001
git branch # список веток
git merge feature-001 # находясь в текущей ветке main влить в нее ветку feature-001 Внимание возможен CONFLICT, сперва его нужно устранить, merge создает коммит на каждое слияние, по окончании разруливания конфликтов выполнить git commit
git merge --no-ff # не использовать режим fast-forvard, всегда создать merge commit
git merge --abort # выйти из режима слияния веток, если что-то накосячили и хотим все вернуть, такое бывает
git cherry-pick 7d11802b9090e4665ada7169b0fff0a41fe6fea6 # добавить коммит из другой ветки. находясь в ветке куда добавить коммит, добавить коммит из другой ветки, хеш и время при этом изменяется, в отличии от имени коммита
git cherry-pick --abort # выйти из режима взятия определенного коммита
git rebase main # переместить ветку в другую ветку, при этом нужно находится в той ветке куда хотим переместить например feature-001, переместить хотим ветку main, возможны конфликты. Особенность rebase в том, что он осуществляет перенос по одному коммиту в новую ветку, поэтому придется решать все конфликты. Запутывает людей, лучше работать с ним в одиночку
git rebase --continue # продолжить процедуру rebase, после успешного выполнения история будет линейной
git rebase --abort # выход из режима rebase
```

### Теги

```shell
git tag v.1.0.0 # создать простой тег на текущий коммит
git tag -a v.1 -m "version 1.0" # создать аннотированный тег
```

### Удаленные репозитории

```shell
git remote add origin git@github.com:LexusAlex/starter.git # добавить удаленный репозиторий в проект с именем origin
git remote -v # список удаленных репозиториев
git push -u origin main # установить связь между локальной и удаленной веткой main и отправить туда все коммиты, команда выполняеся единожды
git fetch + git merge # подтянуть и слить изменения из удаленного репозитория
git pull # подтянуть и слить изменения из удаленного репозитория
git push # отправить коммиты на удаленный репозиторий
git push —set-upstream origin feature # связать локальную и удаленную ветку
```

### Работа с историей

```shell
git log --oneline --all --graph # удобный просмотр дерева коммитов во всех ветках
git show fc6a09817b8e17966fd0baa624fb4ea916c89c4e # просмотр информации о коммите
```

### Навигация по коммитам

```shell
git rev-parse HEAD # текущий коммит, где находимся
git rev-parse HEAD~1 # коммит уровнем выше или git rev-parse HEAD~ или git rev-parse @~ что эквивалентно
```

### Откаты и отмены

```shell
git commit --ammend # закомитили, совершили ошибку, правим файл, индексируем его, и справляем последний коммит, сообщение при этом не будет исправлено
git revert @~ # сделать новый коммит который отменяет действия указанного в данном случае последнего, в результате будут созданы обратные действия
git revert @~7 # отменить седьмой коммит
git revert --abort # отменить revert 
git revert --continue # продолжить revert 
git revert @ -m 2 # отменить коммит слияния (в данном случае последний), важно нужно указать родителя к состоянию которого все вернуть - это цифра
git reset HEAD~2 --mixed # передвигает ветку на указанное количество коммитов назад (в данном случае 2) при этом все изменения положатся обратно в рабочую директорию
git reset HEAD~2 --soft # сбросить ветку на указанное количество коммитов назад, при этом все изменения будут проиндексированы
git reset @~2 --hard  # Сброс изменения переместится на 2 коммита назад, и все потрет!!! Осторожно с этой командой
git reset a61516d --hard # Если удалили коммит, потом поняли что зря, его можно восстановить, заглянув в системный журнал командой git reflog, оттуда взять хеш коммита 
```

### Спрятать изменения

```shell
git stash # спрятать изменения над незаконченной работой, они должны быть проиндексированны
git stash list # просмотреть спрятанные изменения
git stash pop # восстановить stash и применить его к текущей ветке
```

## Composer

```shell
composer require tightenco/collect # установка пакета локально в проект, он добавляется в секцию require
composer require --dev phpunit/phpunit # установка пакета локально в проект в секцию require-dev
composer install # установить зависимости если это не первая установка, то будут установлены зависимости из файла composer.lock
composer update # обновляет версии пакетов, игнорируя composer.lock, такакое обновление делать осторожно
composer validate # проверка, что пакет правильно настроен
```