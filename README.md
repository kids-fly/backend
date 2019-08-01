

# KidsFly API

KidsFly API is a REST API that is used for a scheduling trips by parents with kids with an added functionality of matching admin to parents with kids to enable reduce the hassles associated with onboarding and offboarding flights , make flight trips a pleaseant experience for parents.
* Kidsfly API is currently hosted on [Heroku](https://cea-politico-gres.herokuapp.com/)

## Table of Content
- [Installation](#head1)
- [Testing with Postman](#head2)
- [Endpionts](#head3)
- [Deployment](#head4)
- [Author/s](#head5)
- [Acknowledgments](#head6)

### <a name='head1'>Installation</a>
  ** To install this API on your local device **
  - Copy the [Git Clone Link](https://github.com/basilcea/politico.git) the API on your local Git
  - Run npm install on local git

  ```
  $ cd ../politico
  $ git clone https://github.com/basilcea/politico.git
  $ npm run install
  $ npm run migrate createAllTables
  $ npm run dev

  ```

### Testing With Postman (#head2)

  #### Testing locally
    On your desktop or Laptop
    - Create a Postgres database on Port 5433 with name ** Politico **
    - Select the HTTP Method (GET, POST, PATCH, DELETE) on Postman
    - Test your API on localhost:3000/api/v1/<route>
    - On Postman click on Authorization, Select Bearer Token
    - For unauthenticated routes put null as value for token
    - For aunthenticated routes input the outputed token.

  #### Testing on Heroku
    On your desktop or laptop
    - Open Postman app on your local device
    - Select the HTTP Method (GET, POST, PATCH, DELETE) on Postman
    - Test your API on https://cea-politico-gres.herokuapp.com/<route>
     - On Postman click on Authorization, Select Bearer token
    - For unauthenticated routes put null as value for token
    - For aunthenticated routes input the outputed token.


### Endpionts (#head3)
  The endpoints below are divided into 7 categories.

  The endpoint specified below in the format of  METHOD <route>.

  #### Users Endpionts
    Endpoints are accessable without token authentication or immediately after login.

  	- POST </auth/signup> - Signup and automatic login.
    - POST </auth/login> - Login after logout.
    - POST </auth/forgot> - Send a reset link to email address where email exists in database.
    - POST </auth/reset> - Change forgotten password via link before login.
    - GET </auth/decrypt> - Decrypt user token.
    - GET </auth/logout> - Blacklist token on logout using Redis until token expiry.

  #### Activity Endpionts
    Endpoints for activity carried by user on login

    - GET </users/me> - Get user profile.
    - PATCH </users/me/edit> - Edit user profile.
    - PATCH </users/me/password> - Change user password after login.
    - GET </users/me/votes> - Get all voting activities.
    - DELETE </users/me> - Delete Profile.

  #### Offices Endpionts
    Endpionts for offices activities
    - POST </offices> - Create Office   - * Admin only *.
    - GET </offices> - Get all offices.
    - GET </offices/:id> - Get a specific office.
    - PATCH </offices/:id> - Edit a specific office detail - *Admin only *.
    - POST </offices/:id/register> - Register candidate for this office - * Admin only *.
    - GET </offices/:id/candidates> - Get all candidates for an office.
    - GET </offices/:id / result> - Get all voting results for an office.
    - DELETE <offices/:id> - Delete an office - *Admin only*.

  #### Vote Endpiont
    - POST </votes> - Vote a user for an office.

  #### Party Endpionts
    - POST </parties> - Create a party - * Admin only *.
    - GET </parties> - Get all parties.
    - GET </parties/:id> - Get a specific party.
    - PATCH </parties/:id> -Edit a party detail - * Admin only *.
    - DELETE </parties/:id> - Delete a party - *Admin only *.

  #### Candidates Endpionts
    - GET </candidates/user/:id> - Get all candidates by candidate id.
    - GET </candidates/:id> - Get candidates by user id.
    - PUT </candidates/:id> - Edit candidates by user id.
    - DELETE </candidates/:id> - Delete candidates by user id.

  #### Interests Endpionts
    - GET </interests> - Get all interests.
    - POST </interests> - Create an interest.
    - PATCH </interests/:id> - Edit an interest.
    - DELETE </interests/:id> - Delete an interest.

  #### Petition Endpionts
    - GET </petitions> - Get all petitions.
    - GET </petitions/:id> - Get a specific petition.
    - POST </petitions> - Post a petition.
    - PATCH </petitions/id> - Edit a petition.
    - DELETE </petitions/:id> - Delete a Petition.

### [Deployment](#head4)
  To deploy the API to Heroku
  - Create heroku account
  - Create an app on heroku
  - Git push origin <branch-name>
  - Connect Github repo to Heroku
  - Deploy manually or automatically by selecting the specifice github branch
  - Run APP on heroku.

### [Author/s](#head5)
  This API was created by [basilcea](https://github.com/basilcea?tab=repositories). API Specification provided by [Andela](https://andela.com/) as part of the bootcamp training process.

### [Acknowledgments](#head6)

  I want to acknowledge the inputs from two learning facilitators and a host of fellow bootcampers who contributed in no small way to building my building this API.


[![Build Status](https://travis-ci.org/business-card-organizer-app/backend.svg?branch=develop)](https://travis-ci.org/business-card-organizer-app/backend)
# BUSINESS CARD ORGANIZER.

## VISION

Create an application that helps user transer and store their business cards virtually.

---

## HEROKU BASE_URL

https://bussiness-card-app.herokuapp.com/

## API Spec

The preferred JSON object to be returned by the API should be structured as follows:

### Users (for Login)

```source-json
Login
{
     "status": 200,
    "data": [
        {
            "id": 2,
            "first_name": "Ikechukwu",
            "last_name": " Nmeregini",
            "email": "nmereginiikechukwu@yahoo.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6Im5tZXJlZ2luaWlrZWNodWt3dUB5YWhvby5jb20iLCJpYXQiOjE1NjQ0MjUzMjgsImV4cCI6MTU2NDUxMTcyOH0.6_njjykrIyMgqctr0hDvKYi8kuyPoHoHz3TFAV2PgrE"
        }
    ]
}

```

## Users SignUp
```

{
    "status": 201,
    "data": [
        {
            "first_name": "Ikechukwu",
            "last_name": " Nmeregini",
            "email": "nmereginiikechukwu@yahoo.com"
        }
    ]
}
```

### Profile

```source-json
"status": 200,
    "data": [
        {
            "id": "1",
            "first_name": "Vincent",
            "last_name": "Nmeregini",
            "email": "nmereginivincent@gmail.com"
        }
    ]
```

### Event 

```source-json
"status": 201,
    "data": [
        {
           "event_name": "lambda build week",
	        "event_date : "22/8/2019",
	         "event_venue" : " zoom",
	       "event_location": "online",
         "user_id" : 2,
        }
    ]
```

### Get all User Event response

```source-json
 "status": 200,
    "data": [
        {
            "id": 1,
            "name_event": "lambda school hackaton",
            "event_date": "2019-01-11T23:00:00.000Z",
            "event_venue": "zoom",
            "event_location": "online",
            "user_id": 1
        },
        {
            "id": 3,
            "name_event": "lambda school hackaton",
            "event_date": "2019-01-11T23:00:00.000Z",
            "event_venue": "zoom",
            "event_location": "online",
            "user_id": 1
        },
        {
            "id": 4,
            "name_event": "lambda school hackaton",
            "event_date": "2019-01-11T23:00:00.000Z",
            "event_venue": "zoom",
            "event_location": "online",
            "user_id": 1
        },
```

### Generate Cards 

```source-json
 "status": 201,
    "data": [
       {
            "id": 1,
            "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOVSURBVO3BO67kWgIDwcwD7X/LnDaeQUuAoKrbn2GE+YWZ/xxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmHGbKxUsqPykJn6TSkvCESktCU/lJSXjjMFMOM+UwUy4+LAmfpPJJKk+o3EnCE0n4JJVPOsyUw0w5zJSLL1N5IglPqDyRhKbyhkpLwhMqTyThmw4z5TBTDjPl4h+ThKbSVFoSmkpLwv+Tw0w5zJTDTLn4x6i0JDSVpvKGSkvC3+wwUw4z5TBTLr4sCb+Tyhsq35SEP8lhphxmymGmXHyYyu+UhKbSktBUWhKaSktCU3lC5U92mCmHmXKYKeYX/mIqbyThDZWWhL/ZYaYcZsphply8pNKS0FQ+KQktCXdUnlB5Igl3VD4pCd90mCmHmXKYKRcfpvJEEr4pCU3lThKeULmThKbSkvCESkvCJx1mymGmHGbKxYcloam0JDyh0pLwhEpLwh2VloSm8oTKHZU7Sbij0pLwxmGmHGbKYaaYX/gglZaEpnInCXdUWhKaSkvCGyotCU3lThKaSkvCGyotCW8cZsphphxmysWXqdxJwh2VloQnVFoS7qg8kYSm0lTuqLQkNJWfdJgph5lymCkXL6m0JDSVN5LQVFoSWhKeULmThDsqd5LQVFoSmkpLQlNpSfikw0w5zJTDTLn4w6jcScIdlZaEO0loKk3lDZU7Km+otCS8cZgph5lymCkXX5aEpvJEEppKS8IbKi0JTaUloancSUJTuZOEO0loKp90mCmHmXKYKRc/LAlPqLyh0pJwR+WTVN5QaUloSfikw0w5zJTDTDG/8BdTaUl4Q6UloancScITKneS8JMOM+UwUw4z5eIllZ+UhJaEptKS0FTuJKGptCQ0lTsqLQl3ktBUnkjCG4eZcpgph5ly8WFJ+CSVOyp3VO4k4ZuS8IRKS8JPOsyUw0w5zJSLL1N5IglvJOGOyhNJaCp3VN5IQlN5IglvHGbKYaYcZsrFP06lJaGp3ElCS0JTaUloKi0JTaWp/E6HmXKYKYeZcvGPS8KdJDSVptKS0JJwJwl3ktBU7iShqXzSYaYcZsphplx8WRK+KQlN5U4SmsqdJDSVJ5LQVJ5Iwk86zJTDTDnMlIsPU/lJKi0JbyShqbQk/CSVn3SYKYeZcpgp5hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgp/wOBdYNA7Yhm3QAAAABJRU5ErkJggg==",
            "occupation": "software engineer",
            "phone": "08097425429",
            "created_at": "2019-07-31T10:52:30.523Z",
            "user_id": 1
        }
	]
```

### Errors and Status Codes

If a request fails any validations, expect errors in the following format:

```source-json
{
    "status": 400,
    "message": "User already exists"
}
}
```

If requests on creating or updating event fails any validations, expect errors in the following format:

```source-json
{
    "status": 400,
    "message": {
        "name_event": [
            "The name event field is required."
        ],
        "event_venue": [
            "The event venue field is required."
        ]
    }
}
```

### Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request

## Endpoints:
### Authentication:

`POST /api/login`

Example request body:

```source-json
{
  "user":{
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a User

Required fields: `email`, `password`

### Registration:

`POST /api/register`

Example request body:

```source-json
{
  "email": "nmereginiikechukwu@yahoo.com",
	 "first_name" : "Ikechukwu",
	 "last_name" : " Nmeregini",
	 "password": "12345"
}
```

No authentication required, returns a User

Required fields: `email`, `first_name`, `last_name`,`password`

### Get Current User

`GET /api/user/:id`

```source-json
req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

```

### Post Event
`POST /api/user/:id/event`
where id id the users id
req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Example request body:

```source-json
{
  	 "event_name": "lambda build week",
	 "event_date : "22/8/2019",
	 "event_venue" : " zoom",
	 "event_location": "online",
}
```

Required fields: `event_name`, `event_date`, `event_venue`
Authentication is required set token in req.header

### Get User Event
`GET /api/user/:id/event`
where id id the users id
req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

### Update Event
`PATCH /api/user/:id/event/event_id`
where id is the users id
event_id is the events id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Example in request body:
```source-json
{
  	 "event_name": "lambda build week frontend",
	 "event_date : "22/8/2019",
	 "event_venue" : " zoom",
	 "event_location": "online",
}
```
Required fields: `event_name`, `event_date`, `event_venue`

returns all the events for that user

### Delete User Event
`DELETE /api/user/:id/event/event_id`
where id is the users id
event_id is the events id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Returns the event deleted by the user.

### Create Card

`POST /api/user/:id/card`
where id is the users id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Example in request body:
```source-json
{
  	 qr_code: "https://www.google.com",
   	 occupation: "Software engineer",
   	 phone: "08097425429"
}
```
Required fields: `qr_code`, `occupation`, `phone`
		`qr_code` must be a valid url and `phone` a valid moblile number.

### Get a user Bussiness Card

`GET /api/user/:id/card`
where id is the users id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Returns the users bussiness card

### Update a Users Bussiness Card

`PATCH /api/user/:id/card`
where id is the users id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Example in request body:
```source-json
{
  	 qr_code: "https://www.google.com",
   	 occupation: "Software engineer",
   	 phone: "08097425429"
}
```
Required fields: `qr_code`, `occupation`, `phone`
		`qr_code` must be a valid url and `phone` a valid moblile number.

### Delete a user Bussiness Card

`DELETE /api/user/:id/card`
where id is the users id

req.header.token = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Returns the card deleted.