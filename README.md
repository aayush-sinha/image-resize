# Create Image Thumbnail API
A simple API that authenticates users and returns signed JSON web Token which could be further used to validate future request made on protected endpoint.

Base URL: https://create-thumbnail.herokuapp.com/
API endpoints are also hosted and running on heroku for demo purpose.
  ### Other Resources
Consider checking these resources to get better insight on the working of the API

 Swagger    https://app.swaggerhub.com/apis-docs/aayush-sinha/Image-Resizer/1.0.0 
 JSDoc   [plugins/github/README.md][PlGh] 
### Modules / Libraries Used 


| Name | Description |
| ------ | ------ |
| Sharp | Used to resize imgae |
| eslint | tool for identifying and reporting on patterns found in JavaScript code.
| Jest | JavaScript Testing Framework |
| Supertest | used to test HTTP endpoints |

### Commands

Install depedencies

```sh
$ npm install
```

Start the server

```sh
$ npm start
```
Run the test suites

```sh
$ npm test
```

# Endpoints
Base URL: https://create-thumbnail.herokuapp.com/

| Method | Endpoint |
| ------ | ------ |
| POST | /api/login |
| POST | /api/create |

### /api/login
The /api/login endpoint responds to POST requests containing a JSON object that describes a user, e.g.

> {
> "username" : "example"
>  "password" : "password"
> }
```sh
cURL
curl --location --request POST 'https://create-thumbnail.herokuapp.com/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"username":"example",
	"password":"password"
}'
```
#### Response
The response contains 2 sections:
* token - Signed JSON web token returned for the user
* user - user login credentials

```sh
Response
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZXhhbXBsZSIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwiaWF0IjoxNTkwMzE1Nzk5fQ.eONkaSdkZRUUz4Z_pUMGYz7jIrePaX78P8iJbxYkMd8",
    "user": {
        "username": "example",
        "password": "password"
    }
}
```

### /api/create
The /api/create endpoint authorizes user with the signed JSON web token passed as Authorization key in the header as {Bearer <access_token>} also requests body should contain a JSON object that describes the image, e.g.

<img src="image/Screenshot 2020-05-24 at 16.12.22.png">


> {
> "image" : "https://picsum.photos/id/1014/367/267"
> }
```sh
cURL
curl --location --request POST 'https://create-thumbnail.herokuapp.com/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"username":"example",
	"password":"password"
}'
```
