FROM ubuntu:21.04

ENV TZ=America/New_York

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
 && apt-get install -y \
    curl htop lsof cron

# Networking Tools
RUN apt-get install -y \
    iproute2

RUN mkdir -p /var/www/html
WORKDIR /var/www/html


# INSTALL NODE
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt -y remove nodejs nodejs-doc
RUN apt -y install nodejs

EXPOSE 80

# LAUNCH APPLICATION
CMD [ "cron", "-f" ]

