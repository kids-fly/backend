# KidsFly API

KidsFly API is a REST API that is used for a scheduling trips by parents with kids with an added functionality of matching admin to parents with kids to enable reduce the hassles associated with onboarding and offboarding flights , make flight trips a pleaseant experience for parents.
* Kidsfly API is currently hosted on [Heroku](https://kidsflyapi.herokuapp.com/)

## Table of Content
- [Installation](#installation)
- [Endpionts](#endpoints)
-  [Summary](#summary)
- [User Endpoints](#user-endpoints)
- [Admin Endpoints](#admin-endpoints)
- [Details](#details)
- [Author/s](#authors/s)

### Installation 
  ***To install this API on your local device***
  - Copy the [Git Clone Link](https://github.com/kids-fly/backend.git) the API on your local Git
  - Create database kidsFly on local and run migrations and seeds.
  - Run npm install on local git
  

  ```
  $ cd backend
  $ git clone https://github.com/kids-fly/backend.git
  $ npm run install
  $ npm run server

  ```
### Endpoints
  #### Summary
  The endpoints below are divided into 2 categories.

  ##### Users Endpoints
Endpoints are accessable to all users.

 - `POST </auth/signup>` Signup requires `username` and `password`
 - `POST </auth/login>` Login after signup or logout. `username` and `password`
 - `GET </user>` View user profile. 
 - `PUT </user>` Edit user profile. optional input field includes `username`,`firstname`, `lastname` , `contact`, `imageUrl`
  - `GET </user/flights/:id>` Get a single flight. 
  - `GET </user/flights>` Get all flights.
  - `POST </user/trips>` Post a trip for a specific user. Required field includes `flight_id`,`no_of_kids`,`admin_on`,`no_of_assigned_admins`
    - `admin_on` options include [`departure`,`arrival`, `both`]
    - `no_of_assigned_admins` options include [`1` ,`2`]
  - `GET </user/trips>` Get all trips by a specific user
  - `GET </user/trips/:id>` Get a specific trip by a specific user
  - `PUT </user/trips/:id>` Edit trip details for a specific trip by a user. optional fields similiar to those for post trips
  - `DELETE </user/trips/:id>` Delete a trip by a specific user provided it was user who created the trip
  - `POST </user/arrival>` Post a specific arrival detail 
  - `PUT </user/arrival>` Edit a specific arrival detail
  - `DELETE </user/arrival>` Delete a specific arrival detail
  ##### Admin Endpoints
  Endpoints for admin related activities

 - `GET </adminstatus/:id>` Admin can make another user a fellow admin via the user admin. 
 - `POST </admin/details>` Add admin details. Requires `user_id`,`admin_location`,`airport_id`inputs fields
- `PUT </admin/details>` Edit admin details.optional fields similiar to post details
- `POST </admin/flights>` Post flights. Requires the following fields- `departure_airport_id`,`departure_time`,`arrival_airport_id`,`arrival_time`,`airline_name`
- `DELETE </admin/flights/:id>` Delete a single flight.
- `POST </admin/airports>` Add airport. Requires the following fields- `airport_name` and `airport_location`
- `DELETE </admin/airports/:id>` Delete a single airport.
- `GET </admin/users>` Get all users assigned to admin.
- `GET </admin/trips>` Get all trips for admin airport
#### Details 
##### Login
`POST /login`

Example request body:

```source-json
{
    "username": "ikechukwu",
    "password": "123abc"
}
```

No authentication required, returns a User

Required fields: `email`, `password`

##### Registration:

`POST /register`

Example request body:

```source-json
{

	 "username" : "Ikechukwu",
	 "password": "1234abc"
}
```

No authentication required, returns a User

Required fields: `username`,`password`

##### Get Current User

`GET /user`

```source-json
req.headers.authorization = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

```

### Post Trips
`POST /user/trips`
req.headers.authorization = token

Authentication required, returns a User that's the current user
set token on the header and pass the token recieved during Login

Selecting a particular flight from the drop down list returns the flight id

Example request body:

```source-json
{
  	 "flight_id": "1",
	 "no_of_kids : "2",
	 "no_of_assigned_admins" : " 1",  // option to be either 1 or 2
	 "admin_on": "departure", // options are [departure , arrival , both]
}
```

Required fields: `flight_id`, `no_of_kids`, `no_of_assigned_admins`,`admin_on`
Authentication is required set token in req.headers
### Author/s
  This API was created by [basilcea](https://github.com/basilcea?tab=repositories). API Specification provided by [Lambda](https://lambda.com/) during its build week