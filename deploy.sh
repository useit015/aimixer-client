#!/bin/bash

ionic build
rsync -a ./dist/ root@app.aimixer.io:/var/www/app.aimixer.io/