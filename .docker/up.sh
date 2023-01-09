#!/bin/bash

# https://docs.docker.com/compose/compose-file/compose-file-v3/#resources
# Only works with compatibility option
docker-compose --compatibility --project-name lucia up --build -d

docker rmi $(docker images | grep "^<none>" | awk "{print $3}")