#!/usr/bin/env bash

docker build -t bentsolheim/kilsundvaeret-web .
docker run \
 --rm \
 -p 80:80 \
 --name kilsundvaeret-web \
 bentsolheim/kilsundvaeret-web:latest
