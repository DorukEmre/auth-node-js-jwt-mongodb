Adapted from https://www.bezkoder.com/node-js-mongodb-auth-jwt/

#### Token Based Authentication

Comparing with Session-based Authentication that need to store Session on Cookie, the big advantage of Token-based Authentication is that we store the JSON Web Token (JWT) on Client side: Local Storage for Browser, Keychain for IOS and SharedPreferences for Android… So we don’t need to build another backend project that supports Native Apps or an additional Authentication module for Native App users.

There are three important parts of a JWT: Header, Payload, Signature. Together they are combined to a standard structure: header.payload.signature.

The Client typically attaches JWT in Authorization header with Bearer prefix:

Authorization: Bearer [header].[payload].[signature]

Or only in x-access-token header:

x-access-token: [header].[payload].[signature]

For more details, you can visit:
In-depth Introduction to JWT-JSON Web Token

#### Node.js & MongoDB User Authentication example

We will build a Node.js Express application in that:

    User can signup new account, or login with username & password.
    By role (admin, moderator, user), the User has access to protected resources or not

These are APIs that we need to provide:
Methods	Urls	Actions
POST	/api/auth/signup	signup new account
POST	/api/auth/signin	login an account
GET	/api/test/all	retrieve public content
GET	/api/test/user	access User’s content
GET	/api/test/mod	access Moderator’s content
GET	/api/test/admin	access Admin’s content

#### Node.js Express Architecture with Authentication & Authorization

Via Express routes, HTTP request that matches a route will be checked by CORS Middleware before coming to Security layer.

Security layer includes:

    JWT Authentication Middleware: verify SignUp, verify token
    Authorization Middleware: check User’s roles with record in database

An error message will be sent as HTTP response to Client when the middlewares throw any error, .

Controllers interact with MongoDB Database via Mongoose library and send HTTP response (token, user information, data based on roles…) to Client.
