#!/bin/bash

# Make this file executable by running the following command in the terminal:
# chmod +x scripts/create_db.sh

# source the .env file to set environment variables
source .env

# set environment variables for database credentials based on command line arguments
if [[ "$1" == "test" ]]; then
  DB_USER=$TEST_DB_USER
  DB_PASSWORD=$TEST_DB_PASSWORD
  DB_NAME=$TEST_DB_NAME
elif [[ "$1" == "dev" ]]; then
  DB_USER=$DB_USER
  DB_PASSWORD=$DB_PASSWORD
  DB_NAME=$DB_NAME
else
  echo "Invalid environment specified. Usage: ./create_db.sh [test|dev] [database_name]"
  exit 1
fi

# create the role and grant privileges
psql -d postgres -U ${PG_SUPER_USER} -tc "SELECT 1 FROM pg_roles WHERE rolname = '${DB_USER}'" | grep -q 1 || psql -d postgres -U postgres -c "CREATE ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASSWORD}'; GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${DB_USER};"

# create the database if it doesn't exist
psql -d postgres -U ${DB_USER} -tc "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'" | grep -q 1 || psql -d postgres -U postgres -c "CREATE DATABASE ${DB_NAME} WITH OWNER ${DB_USER};"

# create the extension pgcrypto a superuser privileges
psql -d ${DB_NAME} -U ${PG_SUPER_USER} -tc "CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;" --set ON_ERROR_STOP=on