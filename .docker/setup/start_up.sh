#!/bin/bash

# LINK .ENV FILE
touch /home/environs/.env
ln -s /home/environs/.env /var/www/html/.env
chmod -R 777 /home/environs

cd /var/www/html
npm install
npm run build
npm install -g serve
serve -s build -p 80
