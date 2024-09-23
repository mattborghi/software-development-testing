#!/bin/bash

mysql --user=${MYSQL_USER} --password=${MYSQL_PASSWORD} </./docker-entrypoint-initdb.d/seed.sql
