## Objective

Give an oveview of connecting react frontend to node backend

## Backend Setup

> Be sure to have postgresql installed and a database setup with pass e.g:

Run this in your terminal:

```
psql
```

> Use below to create an example database, user, password.
> substitute details below to match your chosen credentials

```
CREATE USER fullstack_user WITH PASSWORD 'fullstack_user@*';
CREATE DATABASE fullstack_dev WITH OWNER fullstack_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO fullstack_user;
\q
```

Rename `.env-example` to `.env`

Update `.env` details to match those you created above e.g:

```
PORT=4000
NODE_ENV=development
DB_USER=fullstack_user
DB_PASSWORD=fullstack_user@*
DB_NAME=fullstack_dev
DB_HOST=localhost
DB_PORT=5432
```

Create  a user database record within pgadmin

```
CREATE EXTENSION pgcrypto WITH SCHEMA public;

DROP TABLE IF EXISTS public."users";

CREATE TABLE IF NOT EXISTS public."users"
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    first_name character varying(255) COLLATE pg_catalog."default",
    last_name character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT "users_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."users"
    OWNER to fullstack_user;
```
