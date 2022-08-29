# API Documentation

## Create New User / Register ( Superadmin/Customer )

    POST /api/v1/users
    Host: localhost:3000
    User-Agent: insomnia/2022.5.1
    Content-Type: application/json
    Accept: */*
    Content-Length: 102

    {
    	"name":"Super Admin",
    	"role":"superadmin",
    	"email":"superadmin@gmail.com",
    	"password":"100100"
    }

    Response:{
        "message": "successfully created",
        "success": true,
        "data": {
            "name": "Super Admin",
            "email": "superadmin@gmail.com",
            "password": "$2a$12$/Wh3PLlig.Z01kZm7X0UxeDO8oFXCJF/JKGfjEfsEcYfMIBuBcxYS",
            "active": true,
            "role": "superadmin",
            "_id": "630c641d533097aa8dc96de2",
            "createdAt": "2022-08-29T07:00:45.527Z",
            "updatedAt": "2022-08-29T07:00:45.527Z",
            "__v": 0
        }
    }

***

## Login

     POST /api/v1/users/login
     Host: localhost:3000
     User-Agent: insomnia/2022.5.1
     Content-Type: application/json
     Accept: */*
     Content-Length: 68

     {
     	"email":"faisalpthalakkadathur@gmail.com",
     	"password":"100100"
     }

    Response:{
        "success": true,
        "message": "Hurry! you are now logged in.",
        "data": {
            "role": "customer",
            "email": "faisalpthalakkadathur@gmail.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwYzI1OGFhZGJkZjliOTI2OWM1Njk0IiwibmFtZSI6IkZhaXNhbCIsInJvbGUiOiJjdXN0b21lciIsImVtYWlsIjoiZmFpc2FscHRoYWxha2thZGF0aHVyQGdtYWlsLmNvbSIsImlhdCI6MTY2MTc1NjQ4NCwiZXhwIjoxNjYyMzYxMjg0fQ.AvFaA4AE_fLVmWBpqWQe-sKm5Bl8N_phZqWxxmCiJR4",
            "expiresIn": "2022-09-05T07:01:24.652Z"
        }
    }

***


## Get All Users (For Super admin)

    > GET /api/v1/users
    > Host: localhost:3000
    > User-Agent: insomnia/2022.5.1
    > Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwYzI1OGFhZGJkZjliOTI2OWM1Njk0IiwibmFtZSI6IkZhaXNhbCIsInJvbGUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJmYWlzYWxwdGhhbGFra2FkYXRodXJAZ21haWwuY29tIiwiaWF0IjoxNjYxNzQxMDI3LCJleHAiOjE2NjIzNDU4Mjd9.G2SK_o-e_NHYRVV_Vj8rBkwm2ke6p1g1SlWwioFxyG4
    > Accept: */*

    Response:{
        "success": true,
        "message": "success",
        "data": [
            {
                "_id": "630c258aadbdf9b9269c5694",
                "name": "Faisal",
                "email": "faisalpthalakkadathur@gmail.com",
                "active": true,
                "role": "customer",
                "createdAt": "2022-08-29T02:33:46.017Z"
            },
            {
                "_id": "630c641d533097aa8dc96de2",
                "name": "Super Admin",
                "email": "superadmin@gmail.com",
                "active": true,
                "role": "superadmin",
                "createdAt": "2022-08-29T07:00:45.527Z"
            }
        ]
    }

***

## Applay Loan (Customer)

    > POST /api/v1/loans/application
    > Host: localhost:3000
    > User-Agent: insomnia/2022.5.1
    > Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwYzI1OGFhZGJkZjliOTI2OWM1Njk0IiwibmFtZSI6IkZhaXNhbCIsInJvbGUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJmYWlzYWxwdGhhbGFra2FkYXRodXJAZ21haWwuY29tIiwiaWF0IjoxNjYxNzQxMDI3LCJleHAiOjE2NjIzNDU4Mjd9.G2SK_o-e_NHYRVV_Vj8rBkwm2ke6p1g1SlWwioFxyG4
    > Content-Type: application/json
    > Accept: */*
    > Content-Length: 32

    {
    	"amount":10000,
    	"tenure":4
    }

    Response:{
        "success": true,
        "message": "success",
        "data": {
            "user_id": "630c258aadbdf9b9269c5694",
            "amount": 10000,
            "tenure": 4,
            "active": true,
            "repayment_status": false,
            "loan_is_approved": false,
            "_id": "630c4d92204ee84bd829579c",
            "createdAt": "2022-08-29T05:24:34.776Z",
            "updatedAt": "2022-08-29T05:24:34.776Z",
            "__v": 0
        }
    }

***


## Get All Loans(Super admin)

    > GET /api/v1/loans HTTP/1.1
    > Host: localhost:3000
    > User-Agent: insomnia/2022.5.1
    > Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwYzY0MWQ1MzMwOTdhYThkYzk2ZGUyIiwibmFtZSI6IlN1cGVyIEFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJlbWFpbCI6InN1cGVyYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjYxNzU5MDM0LCJleHAiOjE2NjIzNjM4MzR9.L-5bL7fToB35GTmjzsf3cW7aOAoovhAZvwnPc7FMu6E
    > Accept: */*

    Response: {
        "success": true,
        "message": "success",
        "data": [
            {
                "name": "Faisal",
                "user_id": "630c258aadbdf9b9269c5694",
                "loan_id": "630c4d92204ee84bd829579c",
                "amount": 10000,
                "status": "Approved",
                "repayment_status": true,
                "created_at": "2022-08-29T05:24:34.776Z",
                "repayment_schedules": [
                    {
                        "_id": "630c58e0e84a66e4ed9ef11e",
                        "user_id": "630c258aadbdf9b9269c5694",
                        "loan_id": "630c4d92204ee84bd829579c",
                        "duedate": "2022-09-05T06:12:48.938Z",
                        "amount": 2550,
                        "amount_paid_on": "2022-08-29T07:21:52.435Z",
                        "repayment_status": "Paid"
                    },
                    {
                        "_id": "630c58e0e84a66e4ed9ef120",
                        "user_id": "630c258aadbdf9b9269c5694",
                        "loan_id": "630c4d92204ee84bd829579c",
                        "duedate": "2022-09-12T06:12:48.983Z",
                        "amount": 2550,
                        "amount_paid_on": "2022-08-29T07:25:11.408Z",
                        "repayment_status": "Paid"
                    },
                    {
                        "_id": "630c58e0e84a66e4ed9ef122",
                        "user_id": "630c258aadbdf9b9269c5694",
                        "loan_id": "630c4d92204ee84bd829579c",
                        "duedate": "2022-09-19T06:12:48.988Z",
                        "amount": 2550,
                        "amount_paid_on": "2022-08-29T07:25:23.561Z",
                        "repayment_status": "Paid"
                    },
                    {
                        "_id": "630c58e0e84a66e4ed9ef124",
                        "user_id": "630c258aadbdf9b9269c5694",
                        "loan_id": "630c4d92204ee84bd829579c",
                        "duedate": "2022-09-26T06:12:48.992Z",
                        "amount": 2550,
                        "amount_paid_on": "2022-08-29T07:25:40.719Z",
                        "repayment_status": "Paid"
                    }
                ]
            }
        ]
    }

***

## Approve Loan(Super admin)

    > POST /api/v1/loans/approve
    > Host: localhost:3000
    > User-Agent: insomnia/2022.5.1
    > Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwYzI1OGFhZGJkZjliOTI2OWM1Njk0IiwibmFtZSI6IkZhaXNhbCIsInJvbGUiOiJzdXBlcmFkbWluIiwiZW1haWwiOiJmYWlzYWxwdGhhbGFra2FkYXRodXJAZ21haWwuY29tIiwiaWF0IjoxNjYxNzQxMDI3LCJleHAiOjE2NjIzNDU4Mjd9.G2SK_o-e_NHYRVV_Vj8rBkwm2ke6p1g1SlWwioFxyG4
    > Content-Type: application/json
    > Accept: */*
    > Content-Length: 86

    {
    	"user_id": "630c258aadbdf9b9269c5694",
    	"loan_id": "630c4d92204ee84bd829579c"
    }
    
    Response:{
        "success": true,
        "message": "success",
        "data": {
            "_id": "630c4d92204ee84bd829579c",
            "user_id": "630c258aadbdf9b9269c5694",
            "amount": 10000,
            "tenure": 4,
            "active": true,
            "repayment_status": false,
            "loan_is_approved": true,
            "createdAt": "2022-08-29T05:24:34.776Z",
            "updatedAt": "2022-08-29T05:28:20.802Z",
            "__v": 0
        }
    }

***

## Repayment (Customer)

    > POST /api/v1/loans/repayment
    > Host: localhost:3000
    > User-Agent: insomnia/2022.5.1
    > Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwYzI1OGFhZGJkZjliOTI2OWM1Njk0IiwibmFtZSI6IkZhaXNhbCIsInJvbGUiOiJjdXN0b21lciIsImVtYWlsIjoiZmFpc2FscHRoYWxha2thZGF0aHVyQGdtYWlsLmNvbSIsImlhdCI6MTY2MTc1NjQ4NCwiZXhwIjoxNjYyMzYxMjg0fQ.AvFaA4AE_fLVmWBpqWQe-sKm5Bl8N_phZqWxxmCiJR4
    > Content-Type: application/json
    > Accept: */*
    > Content-Length: 67

        {
        	"repayment_id":"630c58e0e84a66e4ed9ef124",
        	"amount_paid":2550
        }
    
    Response:{
        "success": true,
        "message": "success",
        "data": {
            "_id": "630c58e0e84a66e4ed9ef124",
            "user_id": "630c258aadbdf9b9269c5694",
            "loan_id": "630c4d92204ee84bd829579c",
            "duedate": "2022-09-26T06:12:48.992Z",
            "amount": 2550,
            "amount_paid_on": "2022-08-29T07:25:40.719Z",
            "repayment_status": true,
            "createdAt": "2022-08-29T06:12:48.994Z",
            "updatedAt": "2022-08-29T07:25:40.720Z",
            "__v": 0
        }
    }

***


## Get User's Loans


    > GET /api/v1/loans HTTP/1.1
    > Host: localhost:3000
    > User-Agent: insomnia/2022.5.1
    > Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwYzI1OGFhZGJkZjliOTI2OWM1Njk0IiwibmFtZSI6IkZhaXNhbCIsInJvbGUiOiJjdXN0b21lciIsImVtYWlsIjoiZmFpc2FscHRoYWxha2thZGF0aHVyQGdtYWlsLmNvbSIsImlhdCI6MTY2MTc1NjQ4NCwiZXhwIjoxNjYyMzYxMjg0fQ.AvFaA4AE_fLVmWBpqWQe-sKm5Bl8N_phZqWxxmCiJR4
    > Accept: */*

    Response:{
        "success": true,
        "message": "success",
        "data": [
            {
                "user_id": "630c258aadbdf9b9269c5694",
                "loan_id": "630c4d92204ee84bd829579c",
                "amount": 10000,
                "status": "Approved",
                "repayment_status": true,
                "created_at": "2022-08-29T05:24:34.776Z",
                "repayment_schedule": [
                    {
                        "_id": "630c58e0e84a66e4ed9ef11e",
                        "user_id": "630c258aadbdf9b9269c5694",
                        "loan_id": "630c4d92204ee84bd829579c",
                        "duedate": "2022-09-05T06:12:48.938Z",
                        "amount": 2550,
                        "amount_paid_on": "2022-08-29T07:21:52.435Z",
                        "repayment_status": "Paid"
                    },
                    {
                        "_id": "630c58e0e84a66e4ed9ef120",
                        "user_id": "630c258aadbdf9b9269c5694",
                        "loan_id": "630c4d92204ee84bd829579c",
                        "duedate": "2022-09-12T06:12:48.983Z",
                        "amount": 2550,
                        "amount_paid_on": "2022-08-29T07:25:11.408Z",
                        "repayment_status": "Paid"
                    },
                    {
                        "_id": "630c58e0e84a66e4ed9ef122",
                        "user_id": "630c258aadbdf9b9269c5694",
                        "loan_id": "630c4d92204ee84bd829579c",
                        "duedate": "2022-09-19T06:12:48.988Z",
                        "amount": 2550,
                        "amount_paid_on": "2022-08-29T07:25:23.561Z",
                        "repayment_status": "Paid"
                    },
                    {
                        "_id": "630c58e0e84a66e4ed9ef124",
                        "user_id": "630c258aadbdf9b9269c5694",
                        "loan_id": "630c4d92204ee84bd829579c",
                        "duedate": "2022-09-26T06:12:48.992Z",
                        "amount": 2550,
                        "amount_paid_on": "2022-08-29T07:25:40.719Z",
                        "repayment_status": "Paid"
                    }
                ]
            }
        ]
    }