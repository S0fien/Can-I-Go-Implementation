# CAN I GO? 🤔

## How to use

At the root folder run :
```
docker-compose up -d
```

Next you should create your own user or use a provided test user to request a token :
```
endpoint: http://localhost:8080/api/auth/login

method: GET

payload: 
 {
	"email": "test_user@gmail.com",
	"password": "test"
 }
```

