FROM postgres:14

COPY ./db ./docker-entrypoint-initdb.d