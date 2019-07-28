

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

### [<a id='head1'>Installation</a>
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
