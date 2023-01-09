#!/bin/bash
docker-compose --project-name lucia logs | grep app --color=auto
