---
layout: default
nav_order: 23
permalink: 23-linux-substitutions
title: Linux. Подстановки
parent: Заметки
description: Подстановка символов в командной строке linux
date: 2021-09-07 18:00:00 +3
tags:
- linux
---

# Linux. Подстановки
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

## Подстановочный символ

Подстановочный символ - это специальный знак, позволяющий выбирать имена файлов, соответствующие определенным шаблонам символов.

Они могут использоваться с любыми командами, где можно подставить имена файлов.

### * - Любой символ или отсутствие символа

Самым `широким` символом является `*` и означает просто любой символ.

Cуществует множество вариантов использования этого символа например:


```shell
ls /bin/ba* # программы которые начинаются в с `ba`
/bin/base32  /bin/base64  /bin/basename  /bin/basenc  /bin/bash  /bin/bashbug

ls /bin/*le # программы которые заканчиваютсчя на `le`
/bin/clear_console  /bin/file       /bin/locale       /bin/psfstriptable  /bin/tempfile
/bin/dotlockfile    /bin/grub-file  /bin/psfaddtable  /bin/psfxtable
/bin/fgconsole      /bin/lessfile   /bin/psfgettable  /bin/py3compile
```

### ? - Любой единичный символ

Здесь заменяется только один символ.

Например выведем программы в каталоге `bin` в названии которых два символа:

```shell
/bin/??
/bin/cp  /bin/du  /bin/id  /bin/ls  /bin/nc  /bin/pr  /bin/sg  /bin/su  /bin/vi
/bin/dd  /bin/ex  /bin/ip  /bin/mt  /bin/nl  /bin/ps  /bin/sh  /bin/tr  /bin/wc
/bin/df  /bin/hd  /bin/ln  /bin/mv  /bin/od  /bin/rm  /bin/ss  /bin/ul  /bin/xz
```

Комбинацию подстановочных символов можно представить так, например:

```shell
ls /bin/b??e*
/bin/base32  /bin/base64  /bin/basename  /bin/basenc  /bin/bzless
```

### [] - Набор символов

Что соответствует любому символу из набора.

Например программа начинающиеся с `a` или `c` состоящая из трех символов.

```shell
/bin/[ac]??
/bin/apt  /bin/awk  /bin/cat  /bin/cmp  /bin/col  /bin/ctr  /bin/cut

```
И обратная ситуация, когда нужны все другие программы кроме выбранных

```shell
ls /bin/[!ac]??
/bin/dig  /bin/fmt  /bin/ldd  /bin/ptx  /bin/rsh  /bin/seq  /bin/tar  /bin/toe  /bin/vim
/bin/dir  /bin/git  /bin/lft  /bin/pwd  /bin/scp  /bin/ssh  /bin/tbl  /bin/top  /bin/who
/bin/env  /bin/gpg  /bin/man  /bin/rcp  /bin/sed  /bin/sum  /bin/tee  /bin/tty  /bin/xxd
/bin/eqn  /bin/lcf  /bin/pic  /bin/rev  /bin/see  /bin/tac  /bin/tic  /bin/ucf  /bin/yes
```

Еще пример. Показать скрытые файлы, которые начинаются с точки в текущем каталоге, кроме второй точки, за которым 
следует любое количество символов.

```shell
echo .[!.]*
.bash_history .bash_logout .bashrc .gitconfig .profile .ssh .viminfo
```

### [0-5] Класс символов

Перечисляемем целые группы символов.

Программы, название которые на указанные цифры.

```shell
ls /bin/*[0-4] # что соответсвует ls /bin/*[01234]
/bin/base32   /bin/containerd-shim-runc-v1  /bin/linux32     /bin/ping4       /bin/ssh-argv0
/bin/base64   /bin/containerd-shim-runc-v2  /bin/linux64     /bin/pydoc3      /bin/x86_64
/bin/bunzip2  /bin/diff3                    /bin/pdb3        /bin/pygettext3
/bin/bzip2    /bin/grub-mkpasswd-pbkdf2     /bin/perl5.32.1  /bin/python3
```

>>> Проверять раскрытие без выполнения команды можно командой `echo`.


### {A-Z} - Диапазон символов

Самым интересным является именно подстановка диапазона символов.

Например можно делать такие интересные вещи:

```shell
mkdir -p year/{1990..2021}/{1..12}/{A..Z}
```

Мы создали структуру директорий одной командой с вложенными папками трех уровней - это ли не магия.


