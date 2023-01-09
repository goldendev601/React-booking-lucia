FROM basic_node_apache:14.21.04

COPY . /var/www/html

WORKDIR /var/www/html

# LAUNCH APPLICATION
CMD [ "bash", ".docker/setup/start_up.sh" ]

