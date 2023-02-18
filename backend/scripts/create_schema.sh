#!/bin/bash

# Make this file executable by running the following command in the terminal:
# chmod +x scripts/create_schema.sh

# source the .env file to set environment variables
source .env

# set the database name and user based on the environment
if [[ $1 == "test" ]]; then
  DB_NAME=$TEST_DB_NAME
  DB_USER=$TEST_DB_USER
elif [[ $1 == "dev" ]]; then
  DB_NAME=$DB_NAME
  DB_USER=$DB_USER
else
  echo "Usage: $0 [test|dev]"
  exit 1
fi

# create the schema in the database
psql -d $DB_NAME -U $DB_USER -f schema.sql
