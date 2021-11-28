debian 11

sudo apt update
sudo apt install apt-transport-https lsb-release ca-certificates


sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg

sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'

apt list --upgradable

sudo apt install php8.1-cli php8.1-fpm php8.1-bz2 php8.1-mysql php8.1-readline php8.1-intl php8.1-mbstring php8.1-xml php8.1-bcmath php8.1-curl php8.1-gd php8.1-zip

Проверяем php -v

PHP 8.1.0 (cli) (built: Nov 25 2021 20:48:52) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.1.0, Copyright (c) Zend Technologies
with Zend OPcache v8.1.0, Copyright (c), by Zend Technologies


cent os 8

sudo dnf update
sudo dnf install dnf-utils

sudo dnf install http://rpms.remirepo.net/enterprise/remi-release-8.rpm
