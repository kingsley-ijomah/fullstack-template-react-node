#!/bin/bash

# Make this file executable by running the following command in the terminal:
# chmod +x drop_db.sh

# source the .env file to set environment variables
source .env

# set environment variables for database credentials based on command line argument
if [[ "$1" == "test" ]]; then
  DB_USER=$TEST_DB_USER
  DB_NAME=$TEST_DB_NAME
  DB_PASSWORD=$TEST_DB_PASSWORD
elif [[ "$1" == "dev" ]]; then
  DB_USER=$DB_USER
  DB_NAME=$DB_NAME
  DB_PASSWORD=$DB_PASSWORD
else
  echo "Invalid environment specified. Usage: ./teardown_db.sh [test|dev]"
  exit 1
fi

# delete the database if it exists
psql -d postgres -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'" | grep -q 1 && psql -d postgres -U postgres -c "DROP DATABASE ${DB_NAME}"

# delete the user if it exists
psql -d postgres -U postgres -tc "SELECT 1 FROM pg_roles WHERE rolname = '${DB_USER}'" | grep -q 1 && psql -d postgres -U postgres -c "DROP ROLE ${DB_USER}"
