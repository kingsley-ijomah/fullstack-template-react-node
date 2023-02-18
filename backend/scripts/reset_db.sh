#!/bin/bash

# Make this file executable by running the following command in the terminal:
# chmod +x scripts/reset_test_db.sh

# source the .env file to set environment variables
source .env

# set the database name and user based on the environment
DB_NAME=$TEST_DB_NAME
DB_USER=$TEST_DB_USER

# apply the schema to the test database
psql -d $DB_NAME -U $DB_USER -f schema.sql
