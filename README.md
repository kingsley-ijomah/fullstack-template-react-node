As you are learning to code, it is important to understand the big picture, how does
React connect to a backend application on Node, and how can we trace the CRUD (create - read - update - delete) actions all the way from Frontend to Backend.

This is the repository that helps you understand that, and we will cover this in detail on: [www.codehance.com](https://www.codehance.com)

## Backend Setup

Change directory into the backend folder

```
cd backend
```

Then run npm install command

```
npm install --save-dev
```

Rename `.env-example` to `.env`

Update `.env` details to match those you created above e.g:

```
# Common variables
DB_HOST=localhost
DB_PORT=5432
PORT=4000

# Development variables
DB_USER=fullstack_user
DB_PASSWORD=fullstack_user@*
DB_NAME=fullstack_dev

# Test variables
TEST_DB_USER=fullstack_test_user
TEST_DB_PASSWORD=fullstack_test@*
TEST_DB_NAME=fullstack_test

NODE_ENV=development

COOKIE_NAME=fullstack-dev-session
COOKIE_SECRET=add-a-super-secret-string-here
JWT_SECRET=super-secretive-token-string-here

SENDGRID_API_KEY=key-goes-here
FROM_EMAIL=email-goes-here
FRONTEND_DOMAIN=http://localhost:3000
```

> Be sure to have postgresql already installed

Now we are going to create test and dev databases in you pgAdmin

Run this in your terminal:

```
npm run create:test:db
npm run create:dev:db
```

Create a user database record within pgadmin

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

Finally start your backend server with:

```
npm run start
```

## Frontend Setup

Change into the frontend project

```
cd frontend
```

Then run npm install command

```
npm install --save-dev
```

Rename `.env-example` to `.env`

Update `.env` details to match:

```
VITE_API_URL=http://localhost:4000/api
VITE_NODE_ENV=development
```

Start the server

```
npm run start
```

### Remember Me Processs

In an API without a session, you can implement "remember me" functionality by using JSON Web Tokens (JWTs) and cookies.

When a user logs in and chooses not to be remembered (i.e., rememberMe is set to false), the API can return a JWT in the response that can be stored in browser cookie. This JWT can be used to authenticate subsequent requests made by the user during the current session.

When the user closes the browser or the session expires, the JWT stored in browser cookie will also be deleted. The next time the user visits the site, they will have to log in again and a new JWT will be issued.

However, if the user chooses to be remembered (i.e., rememberMe is set to true), the API can also set a cookie on the user's browser with a long expiration time. The value of the cookie can be a unique identifier for the user.

On subsequent visits, the API can check for the presence of this cookie and use the value of the cookie to retrieve the user's JWT from the server. The JWT can then be stored in localStorage and used to authenticate subsequent requests made by the user during the current session.

In this way, the user can remain logged in between visits as long as the rememberMe cookie is present and the JWT stored on the server has not expired.
