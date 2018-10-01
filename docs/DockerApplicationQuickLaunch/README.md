# Docker application quick launch

Open `kubernetes-microservices-example` folder.

Run command to build and run application in docker.
```
docker-compose up --build
```
Result
```
Building frontend
Step 1/11 : FROM node:8-alpine
 ---> df48b68da02a
Step 2/11 : LABEL version="1.0.0"
 ---> Using cache
 ---> 3a216bb3f0a4
Step 3/11 : ARG basedir="frontend"
 ---> Using cache
 ---> e80eece9e0b9
Step 4/11 : ENV NODE_ENV production
 ---> Using cache
 ---> 18fddf9fd538
Step 5/11 : WORKDIR ${basedir}/ .
 ---> Using cache
 ---> 0855136e3ac6
Step 6/11 : COPY ${basedir}/package*.json ./
 ---> Using cache
 ---> 9f46ad9cba02
Step 7/11 : RUN npm install --silent
 ---> Using cache
 ---> e341a0c4ea79
Step 8/11 : COPY ${basedir}/ .
 ---> Using cache
 ---> 3552085b0718
Step 9/11 : RUN apk update && apk add bash
 ---> Using cache
 ---> d6165beeff70
Step 10/11 : EXPOSE 9000
 ---> Using cache
 ---> 5efbb141f38a
Step 11/11 : CMD npm start
 ---> Using cache
 ---> 34eaa8780cd9
[Warning] One or more build-args [build_config] were not consumed
Successfully built 34eaa8780cd9
Successfully tagged localhost:5000/microservice-example-1/frontend:latest
Building backend-api1
Step 1/10 : FROM node:8-alpine
 ---> df48b68da02a
Step 2/10 : LABEL version="1.0.0"
 ---> Using cache
 ---> 3a216bb3f0a4
Step 3/10 : ARG basedir="backend-api1"
 ---> Using cache
 ---> 5d4661422d36
Step 4/10 : WORKDIR ${basedir}/ .
 ---> Using cache
 ---> 642afd1c3af0
Step 5/10 : COPY ${basedir}/package*.json ./
 ---> Using cache
 ---> 26b1f36a9851
Step 6/10 : RUN npm install --silent
 ---> Using cache
 ---> a0e6fe19c392
Step 7/10 : COPY ${basedir}/ .
 ---> Using cache
 ---> 77b05288bb3e
Step 8/10 : RUN apk update && apk add bash
 ---> Using cache
 ---> a5d578f90271
Step 9/10 : EXPOSE 9010
 ---> Using cache
 ---> 422800d48387
Step 10/10 : CMD npm start
 ---> Using cache
 ---> b22dad5ef63c
[Warning] One or more build-args [build_info] were not consumed
Successfully built b22dad5ef63c
Successfully tagged localhost:5000/microservice-example-1/backend-api1:latest
Building backend-api2
Step 1/10 : FROM node:8-alpine
 ---> df48b68da02a
Step 2/10 : LABEL version="1.0.0"
 ---> Using cache
 ---> 3a216bb3f0a4
Step 3/10 : ARG basedir="backend-api2"
 ---> Using cache
 ---> 7778fab8cee1
Step 4/10 : WORKDIR ${basedir}/ .
 ---> Using cache
 ---> 4c88b41ff572
Step 5/10 : COPY ${basedir}/package*.json ./
 ---> Using cache
 ---> 3e9b5fce9948
Step 6/10 : RUN npm install --silent
 ---> Using cache
 ---> 1737ecca03ec
Step 7/10 : COPY ${basedir}/ .
 ---> Using cache
 ---> 0464789a1c98
Step 8/10 : RUN apk update && apk add bash
 ---> Using cache
 ---> a3efd6d24cff
Step 9/10 : EXPOSE 9020
 ---> Using cache
 ---> 205a9a8f1d8d
Step 10/10 : CMD npm start
 ---> Using cache
 ---> c4cdbd7a6daa
[Warning] One or more build-args [build_info] were not consumed
Successfully built c4cdbd7a6daa
Successfully tagged localhost:5000/microservice-example-1/backend-api2:latest
Creating kubernetes-microservices-example_frontend_1 ... done
Creating kubernetes-microservices-example_backend-api1_1 ... done
Creating kubernetes-microservices-example_backend-api2_1 ... done
Attaching to kubernetes-microservices-example_frontend_1, kubernetes-microservices-example_backend-api1_1, kubernetes-microservices-example_backend-api2_1
frontend_1      |
frontend_1      | > frontend@1.0.0 start /frontend/ .
frontend_1      | > node server.js
frontend_1      |
frontend_1      | ### Content dir = '/frontend/ .'
frontend_1      | ### Server listening on 3000
backend-api1_1  |
backend-api1_1  | > backend-api1@1.0.0 start /backend-api1/ .
backend-api1_1  | > node server.js
backend-api1_1  |
backend-api1_1  | ### Server listening on 3010
backend-api2_1  |
backend-api2_1  | > backend-api2@1.0.0 start /backend-api2/ .
backend-api2_1  | > node server.js
backend-api2_1  |
backend-api2_1  | ### Server listening on 3020
```

## Test application
###### Verify that frontend javascript file can be loaded.
```
http://localhost:9000/app.js
```
Result
```
You should see frontend application javascript code.
```

###### Verify that frontend can give configuration.
```
http://localhost:9000/api/config
```
Result
```
{"service1endpoint":"http://localhost:9010/api"}
```

###### Verify that you can retrieve data from backend-api1.
```
http://localhost:9010/api/message
```
Result
```
{"service1":{"message":"This is message from service 1."},"service2":{"message":"This is message from service 2."}}
```

###### Verify that you can't retrieve data from backend-api2.
```
http://localhost:9020/api/message
```
Result
```
You should see 502 http status code.
```

###### Verify that you can run complete application.
```
http://localhost:9000/
```
Result
```
This is message from service 1.

This is message from service 2.
```