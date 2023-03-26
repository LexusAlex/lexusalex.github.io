---
layout: default
nav_order: 50
permalink: 50-backup-and-restore-gitlab
title: Бэкап и восстановление gitlab
parent: Заметки
description: Делаем резервную копию gitlab и восстанавливаем на другом сервере
date: 2023-03-26 12:00:00 +3
last_modified_date: 2023-03-26 12:00:00 +3
tags:
- linux
- gitlab
- git
---

# Бэкап и восстановление gitlab
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

В статье [Установка gitlab ](https://lexusalex.ru/49-install-gitlab)мы поставили gitlab.
Следующий вопрос который встает как все это добро бэкапить и впоследствии восстанавливать.

## Резервная копия

По дефолту архивы резервных копий хранятся в каталоге `/var/opt/gitlab/backups/`

Делаем резервную копию командой

```shell
gitlab-rake gitlab:backup:create
```

2 файла при этом не будут забэкаплены: 

- `/etc/gitlab/gitlab-secrets.json`
- `/etc/gitlab/gitlab.rb`

Их нужно скопировать вручную.

Для автоматизации процесса лучше добавить команду [в CRON](https://docs.gitlab.com/ee/raketasks/backup_gitlab.html#configuring-cron-to-make-daily-backups)

Копируем файлы в другое место.

## Восстановление

Очень важно, чтобы версии gitlab копии совпадали со свежеустановленной версии gitlab.

Сперва нужно скопировать архив и поставить ему нужные права

> В названии архива указана версия gitlab с которой она была сделана

```shell
sudo cp 11493107454_2018_04_25_10.6.4-ce_gitlab_backup.tar /var/opt/gitlab/backups/
sudo chown git:git /var/opt/gitlab/backups/11493107454_2018_04_25_10.6.4-ce_gitlab_backup.tar
```

Останавливаем службы и проверяем

```shell
sudo gitlab-ctl stop puma
sudo gitlab-ctl stop sidekiq
sudo gitlab-ctl status
```

Восстанавливаем из файла, указав timestamp этого файла

```shell
sudo gitlab-backup restore BACKUP=1679818220_2023_03_26_15.10.0
```

В этом процессе будет очищена база данных, дабы избежать колизий, и накатан дамп БД

Далее нужно восстановить `/etc/gitlab/gitlab-secrets.json` и `/etc/gitlab/gitlab.rb`

Запустить команды

```shell
sudo gitlab-ctl reconfigure
sudo gitlab-ctl restart
sudo gitlab-rake gitlab:check SANITIZE=true
sudo gitlab-rake gitlab:artifacts:check
sudo gitlab-rake gitlab:lfs:check
sudo gitlab-rake gitlab:uploads:check
```

Заходим в интерфейс и видим что все на месте, на этом восстановление завершено

[Актуальная документация](https://docs.gitlab.com/ee/raketasks/restore_gitlab.html#restore-for-omnibus-gitlab-installations)