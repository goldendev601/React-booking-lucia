#!/bin/bash
git config --global --add safe.directory /var/www/lucia
echo "called git config --global --add safe.directory /var/www/lucia INSIDE"

git pull

cd .docker

sh down.sh;
sh rebuild.sh;

cd ../

printf "We are through!\n"

