
# Opportunity-Backend




## Deployment on your local machine

1. Clone the repo
2. Open it in any ide(VS Code) 
3. Before running the app
4. Execute npm i

        Create an .env file and the content of .env file will be:-

        1. Provide mongodb connection string in variable "connection_string"

        2. Provide salt for password hashing in variable named "salt".
        3. Provide jwt secret key in variable named "jwt_secret" jwt secret key can be anything.
        4. Provide port in varaible name "port". By default it will run on port 3000.
       
       After completing above steps-
       =>run command node createuser.js
       => it will print an alphanumeric string on console, copy it and place it in .env file in a variable named "salt"
       => After that program will be asking you to prove name, email and password in a row , space seperated. Provide it these will be your credentails for login.

        


5. Execute node app.js 


# API Reference

### Login of Admin

    1. Enter the details of admin user.
    2. Copy the token from it from response body.

```http
  POST /admin/login
```

| Parameter     | Type     | 
| :--------     | :------- | 
| `password`    | `string` | 
| `email`       | `string` | 


### Screenshot for reference:-

![loginAdminSc](https://user-images.githubusercontent.com/105383117/229051001-5d5f1acd-e008-43a8-b50f-72b25a09287a.JPG)


#### -Bearer Token 

![bearer](https://user-images.githubusercontent.com/105383117/229050745-17f30061-a741-4d74-8480-66456ab3297f.JPG)



### Create new Admin

```http
  POST /admin/newadmin
```

| Parameter     | Type     | 
| :--------     | :------- | 
| `name`        | `string` | 
| `password`    | `string` | 
| `email`       | `string` | 

note- send the bearer token along with your request otherwise you wont be authorised,and email should be of valid format.

### Screenshots for reference:-


![createAdmin](https://user-images.githubusercontent.com/105383117/229051538-4d0db7aa-0ca5-4832-8f4e-6518d7458aee.JPG)



        
### Post a job


```http
  POST /jobs
```

 | Parameter     | Type     | 
| :--------     | :------- | 
| `title`    | `string` | 
| `company`       | `string` | 
| `description`       | `string` |
| `startdate`       | `Date` |
| `lastdate`       | `Date` | 
| `stipend`       | `string` | 
| `exclusive`       | `boolean` | 
| `live`       | `boolean` | 
| `location`       | `string` | 
| `duration`       | `string` | 
| `url`       | `string` | 
| `tags`       | `string` | 
| `skills`       | `string` | 
| `requirements`       | `Array` | 
| `file`    | `file` |


note- send the bearer token along with your request otherwise you wont be authorised
Note-

    1.requirements field is an array you can acheive that with having multiple feilds with same name in the form.
    2. tags field is an space seperated string with "-" chained elements.
    ex- "web-devlopment backend-developer os"
    3. Do step 2 the same with the skills field.


### Screenshot for reference:-

![postJOB1](https://user-images.githubusercontent.com/105383117/229052749-8de4820d-6495-4383-842e-ed5307ae76be.JPG)
![postJob2](https://user-images.githubusercontent.com/105383117/229052757-3491ed73-306a-4aca-aad9-abc1bfe2e969.JPG)




### Delete a Job Item


```http
  DELETE /jobs/:id
 ```
  
### Screenshot for reference:-

![deleteById](https://user-images.githubusercontent.com/105383117/229054246-ecd3bcbf-8e3e-413b-a92c-e05cf06bbe8f.JPG)

Note- send bearer token with request


### Refersh Database Route

```http
  DELETE /jobs/refresh
 ```
 
with this route all the jobs which have there last date passed will be removed at once



Note- send bearer token along with request


### Update an item 

```http
  PUT /jobs/:id
 ```
 | Parameter     | Type     | 
| :--------     | :------- | 
| `title`    | `string` | 
| `company`       | `string` | 
| `description`       | `string` |
| `startdate`       | `Date` |
| `lastdate`       | `Date` | 
| `stipend`       | `string` | 
| `exclusive`       | `boolean` | 
| `live`       | `boolean` | 
| `location`       | `string` | 
| `duration`       | `string` | 
| `url`       | `string` | 
| `tags`       | `string` | 
| `skills`       | `string` | 
| `requirements`       | `Array` | 
| `file`    | `file` |

note- 
    1.send the bearer token along with your request otherwise you wont be authorised
    2. fields here are optional
Note-

    1.requirements field is an array you can acheive that with having multiple feilds with same name in the form.
    2. tags field is an space seperated string with "-" chained elements.
    ex- "web-devlopment backend-developer os"
    3. Do step 2 the same with the skills field.

### Screenshot of response:-
![updateres](https://user-images.githubusercontent.com/105383117/229057182-07bfa443-90ad-40a0-b724-5e945d335000.JPG)


### Get item by id

```http
  GET /jobs/:id
 ```
 
 This route will let to search a particular item via id
 

### Filter Item

```http
  GET /jobs/
 ```
  | Parameter     | Type     | 
| :--------     | :------- | 
| `title`    | `string` | 
| `company`       | `string` | 
| `description`       | `string` |
| `startdate`       | `Date` |
| `lastdate`       | `Date` | 
| `stipend`       | `String` | 
| `exclusive`       | `boolean` | 
| `live`       | `boolean` | 
| `location`       | `string` | 
| `duration`       | `string` | 
| `url`       | `string` | 
| `tags`       | `string` | 
| `skills`       | `string` | 
| `requirements`       | `Array` | 

Note- 
    1.feilds here are optional. Sent them according to need.
    2. send the fields in query

### Screenshot for reference:-

![filterreq](https://user-images.githubusercontent.com/105383117/229062866-de68b423-7d18-4417-b02e-c813a626a649.JPG)




 
