![Build status](https://spylkkanen.visualstudio.com/kubernetes-microservices/_apis/build/status/kubernetes-microservices-Docker%20container-CI)
![Release status](https://spylkkanen.vsrm.visualstudio.com/_apis/public/Release/badge/91705780-23f2-4c51-8f8d-bd251a855be4/1/1)

# Overview
This is simple nodejs based application designed to showcase microservices in docker and kubernetes. Application contains one web application and two REST api services where one of the service is internal which is not directly accessible from internet.

Configuration demonstrates basics how to setup local docker registry and local kubernetes hosting. e.g. If you want to create own private cloud solution.

:grey_exclamation: Please notice that example is documented based on Windows host.

# Architecture

All application services used in showcase are written with NodeJS.

## Docker hosted application
Simplyfied overal structure of application networking.
![Docker application structure](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/docker-application-structure.PNG)

## Kubernetes hosted application
Simplyfied overal structure of application networking.
![Kubernetes application structure](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/kubernetes-application-structure.PNG)


# Repository Structure
The main levels of the repository directory tree are laid out as follows 
```
.
├── backend-api1            NodeJS backend service 1.
│   └── api                 REST api's.
├── backend-api2            NodeJS internal backend service 2.
│   ├── api                 REST api's.
├── docs                    Documentation
├── frontend                NodeJS hosted webapp.
├── kubernetes              Kubernetes installation scripts to setup application to kubernetes.
├── docker-compose.yml      Docker compose to setup application to docker.
```


# Environment
## Allow powershell script execution
Open powershell as Adminstrator. Run command to enable powershell script execution on local machine.
```
Set-ExecutionPolicy remoteSigned
```
## Docker Community Edition
Install Docker Community Edition. https://docs.docker.com/docker-for-windows/install/
![Docker memory and cpu](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/docker-about.PNG)

## Set memory and cpu
Enable atleast 4GB memory and 4 cpu's for docker to host kubernetes applications.
![Docker memory and cpu](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/docker-memory-and-cpu.PNG)

## Enable kubernetes
Install kubernetes to your local with `Enable Kubernetes` checkbox and also remember to select `Kubernetes` orchestrator.
![Enable kubernetes](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/docker-enable-kubernetes.PNG)

## Install kubernetes ingress controller
https://github.com/kubernetes/ingress-nginx/blob/master/docs/deploy/index.md

Install ingress controller with command
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/mandatory.yaml
```

Verify installation with commands.
```
kubectl get pods -n ingress-nginx
kubectl get pods --all-namespaces -l app.kubernetes.io/name=ingress-nginx --watch
```
Result
```
NAME                                       READY     STATUS    RESTARTS   AGE
default-http-backend-7c5bc89cc9-wpc2p      1/1       Running   5          8d
nginx-ingress-controller-5b6864749-t8qff   1/1       Running   5          8d
NAMESPACE       NAME                                       READY     STATUS    RESTARTS   AGE
ingress-nginx   nginx-ingress-controller-5b6864749-t8qff   1/1       Running   5          8d
```

Alternative way to install ingress.
https://stackoverflow.com/questions/49845021/getting-an-kubernetes-ingress-endpoint-ip-address
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/namespace.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/default-backend.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/configmap.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/tcp-services-configmap.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/udp-services-configmap.yaml
```

## Create local private registry
Run command to create local docker image registry. https://docs.docker.com/registry/deploying/
```
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```
Result
```
cb6bdd494a2a94d329a03100cb9251e9ef2f5690f50f2522212e8f32d40c9b48
```
---
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

---
# Kubernetes application quick launch
Open `kubernetes-microservices-example` folder.

Run command to build docker images and push images them to local registry.
```
./build.ps1
```
Result
```
Untagged: localhost:5000/microservice-example-1/frontend:latest
Untagged: localhost:5000/microservice-example-1/frontend@sha256:16874db16ea58a1a75acd8488a6e46a919b51405938c7e0f25acee394b9c5e95
Untagged: localhost:5000/microservice-example-1/backend-api1:latest
Untagged: localhost:5000/microservice-example-1/backend-api1@sha256:a705d9a0c938105ff5faf16552e5c62a99c27e96b78c1b17006d3964890ad2d1
Untagged: localhost:5000/microservice-example-1/backend-api2:latest
Untagged: localhost:5000/microservice-example-1/backend-api2@sha256:6e8f5b642de39958ebd3a6b5cc0227f42ee8364c48a64070f43f725e5f249ed1
Building frontend
Step 1/11 : FROM node:8-alpine
8-alpine: Pulling from library/node
Digest: sha256:d75742c5fd41261113ed4706f961a21238db84648c825a5126ada373c361f46e
Status: Image is up to date for node:8-alpine
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
8-alpine: Pulling from library/node
Digest: sha256:d75742c5fd41261113ed4706f961a21238db84648c825a5126ada373c361f46e
Status: Image is up to date for node:8-alpine
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
8-alpine: Pulling from library/node
Digest: sha256:d75742c5fd41261113ed4706f961a21238db84648c825a5126ada373c361f46e
Status: Image is up to date for node:8-alpine
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
Pushing frontend (localhost:5000/microservice-example-1/frontend:latest)...
The push refers to repository [localhost:5000/microservice-example-1/frontend]
935ba74cf4d8: Layer already exists
9758ab13c113: Layer already exists
16d236c94835: Layer already exists
b59eac191a7d: Layer already exists
2b4cefb9501e: Layer already exists
8b59e4cead98: Layer already exists
7aa09d2ca0a3: Layer already exists
df64d3292fd6: Layer already exists
latest: digest: sha256:16874db16ea58a1a75acd8488a6e46a919b51405938c7e0f25acee394b9c5e95 size: 1996
Pushing backend-api1 (localhost:5000/microservice-example-1/backend-api1:latest)...
The push refers to repository [localhost:5000/microservice-example-1/backend-api1]
d935f7c8a365: Layer already exists
63754cfe9038: Layer already exists
b0004ce82fd2: Layer already exists
165ae900e867: Layer already exists
2d5ae6ee428a: Layer already exists
8b59e4cead98: Layer already exists
7aa09d2ca0a3: Layer already exists
df64d3292fd6: Layer already exists
latest: digest: sha256:a705d9a0c938105ff5faf16552e5c62a99c27e96b78c1b17006d3964890ad2d1 size: 1996
Pushing backend-api2 (localhost:5000/microservice-example-1/backend-api2:latest)...
The push refers to repository [localhost:5000/microservice-example-1/backend-api2]
d7019ff82462: Layer already exists
a483eb063fbb: Layer already exists
58b5ec8fa2ab: Layer already exists
b6a193233f40: Layer already exists
97ffcc33d464: Layer already exists
8b59e4cead98: Layer already exists
7aa09d2ca0a3: Layer already exists
df64d3292fd6: Layer already exists
latest: digest: sha256:6e8f5b642de39958ebd3a6b5cc0227f42ee8364c48a64070f43f725e5f249ed1 size: 1996
The push refers to repository [localhost:5000/microservice-example-1/frontend]
935ba74cf4d8: Layer already exists
9758ab13c113: Layer already exists
16d236c94835: Layer already exists
b59eac191a7d: Layer already exists
2b4cefb9501e: Layer already exists
8b59e4cead98: Layer already exists
7aa09d2ca0a3: Layer already exists
df64d3292fd6: Layer already exists
latest: digest: sha256:16874db16ea58a1a75acd8488a6e46a919b51405938c7e0f25acee394b9c5e95 size: 1996
The push refers to repository [localhost:5000/microservice-example-1/backend-api1]
d935f7c8a365: Layer already exists
63754cfe9038: Layer already exists
b0004ce82fd2: Layer already exists
165ae900e867: Layer already exists
2d5ae6ee428a: Layer already exists
8b59e4cead98: Layer already exists
7aa09d2ca0a3: Layer already exists
df64d3292fd6: Layer already exists
latest: digest: sha256:a705d9a0c938105ff5faf16552e5c62a99c27e96b78c1b17006d3964890ad2d1 size: 1996
The push refers to repository [localhost:5000/microservice-example-1/backend-api2]
d7019ff82462: Layer already exists
a483eb063fbb: Layer already exists
58b5ec8fa2ab: Layer already exists
b6a193233f40: Layer already exists
97ffcc33d464: Layer already exists
8b59e4cead98: Layer already exists
7aa09d2ca0a3: Layer already exists
df64d3292fd6: Layer already exists
latest: digest: sha256:6e8f5b642de39958ebd3a6b5cc0227f42ee8364c48a64070f43f725e5f249ed1 size: 1996


StatusCode        : 200
StatusDescription : OK
Content           : {"repositories":["microservice-example-1/backend-api1","microservice-example-1/backend-api2","microservice-example-1/frontend"]}

RawContent        : HTTP/1.1 200 OK
                    Docker-Distribution-Api-Version: registry/2.0
                    X-Content-Type-Options: nosniff
                    Content-Length: 163
                    Content-Type: application/json; charset=utf-8
                    Date: Sun, 16 Sep 2018 12:40:46 GMT...
Forms             : {}
Headers           : {[Docker-Distribution-Api-Version, registry/2.0], [X-Content-Type-Options, nosniff], [Content-Length, 163], [Content-Type, application/json; charset=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : System.__ComObject
RawContentLength  : 163
```

Open `kubernetes-microservices-example\kubernetes` folder.

Deploy application to kubernetes application with command
```
./reinstall.ps1
```
Result
```
deployment.extensions "backend-api-1" deleted
deployment.extensions "backend-api-2" deleted
deployment.extensions "frontend" deleted
ingress.extensions "microservices-example-ingress" deleted
No resources found
service "backend-api-1-svc" deleted
service "backend-api-2-svc" deleted
service "frontend-svc" deleted
service "kubernetes" deleted
warning: Immediate deletion does not wait for confirmation that the running resource has been terminated. The resource may continue to run on the cluster indefinitely.
pod "backend-api-1-66cc9fcfff-mmmqw" deleted
pod "backend-api-1-66cc9fcfff-n2llg" deleted
pod "backend-api-1-66cc9fcfff-n2vdj" deleted
pod "backend-api-2-58bd6dc59b-8pgtj" deleted
pod "backend-api-2-58bd6dc59b-g8nsr" deleted
pod "backend-api-2-58bd6dc59b-nf7jt" deleted
pod "frontend-586984c5dc-q8qzh" deleted
pod "frontend-586984c5dc-w84ck" deleted
No resources found
No resources found
service "backend-api-1-svc" created
service "backend-api-2-svc" created
service "frontend-svc" created
deployment.apps "backend-api-1" created
deployment.apps "backend-api-2" created
deployment.apps "frontend" created
ingress.extensions "microservices-example-ingress" created
```

Check kubernetes application status. Wait until you will see all pods in `Running` state and that ingress has external `Address`. Also see that pods does not have external access. Application is only accessible through ingress.
```
./status.ps1
```
Result
```
NAME                             READY     STATUS    RESTARTS   AGE
backend-api-1-66cc9fcfff-44gvc   1/1       Running   0          2m
backend-api-1-66cc9fcfff-w6kq6   1/1       Running   0          2m
backend-api-1-66cc9fcfff-z2967   1/1       Running   0          2m
backend-api-2-58bd6dc59b-6tq97   1/1       Running   0          2m
backend-api-2-58bd6dc59b-bw9tn   1/1       Running   0          2m
backend-api-2-58bd6dc59b-t9bf8   1/1       Running   0          2m
frontend-586984c5dc-bvzx2        1/1       Running   0          2m
frontend-586984c5dc-d4hqk        1/1       Running   0          2m
NAME                            HOSTS       ADDRESS     PORTS     AGE
microservices-example-ingress   localhost   localhost   80        2m
NAME                TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
backend-api-1-svc   ClusterIP   10.106.200.16    <none>        80/TCP    2m
backend-api-2-svc   ClusterIP   10.101.241.106   <none>        80/TCP    2m
frontend-svc        ClusterIP   10.97.53.55      <none>        80/TCP    2m
kubernetes          ClusterIP   10.96.0.1        <none>        443/TCP   2m
```

## Test application
###### Verify that frontend javascript file can be loaded.
```
http://localhost/app.js
```
Result
```
You should see frontend application javascript code.
```

###### Verify that frontend can give configuration.
```
http://localhost/api/config
```
Result
```
{"service1endpoint":"http://localhost:9010/api"}
```

###### Verify that you can retrieve data from backend-api-1-svc.
```
http://localhost/api/message
```
Result
```
{"service1":{"message":"This is message from service 1."},"service2":{"message":"This is message from service 2."}}
```

###### Verify that you can run complete application.
```
http://localhost/
```
Result
```
This is message from service 1.

This is message from service 2.
```

---

# Other usefull commands and etc.
?????
```
kubectl get services --all-namespaces
REM kubectl get pods --all-namespaces -l app=ingress-nginx --watch
```
---

## Remove unused images
https://gist.github.com/bastman/5b57ddb3c11942094f8d0a97d461b430
```
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
```
---

## Build images to local registry
https://docs.docker.com/compose/reference/push/
Open .env file and set DOCKER_REG=localhost:5000/
```
docker-compose build --force-rm --pull
```
or
```
$ENV:DOCKER_REG="localhost:5000/";docker-compose build --force-rm --pull
```
or
```
$ENV:DOCKER_REG="localhost:5000/";$ENV:DOCKER_TAG=":latest";docker-compose build --force-rm --pull
```
---

Build tag images
```
docker tag image-name:tag-name localhost:5000/image-name:tag-name
docker push localhost:5000/image-name:tag-name
```
---

## Push images to repository
```
docker-compose push
```
or
```
docker push localhost:5000/image-name:tag-name
```
---

## Verify images from registry
https://docs.docker.com/registry/spec/api/#listing-repositories
command
```
curl http://localhost:5000/v2/_catalog/
```
---

## Open kubernetes pods live log
Show pod console logs
```
kubectl logs frontend-657dcc9684-dj8z8
```
---

## Open kubernetes pod bash command line
```
kubectl exec -it frontend-866f7bff9f-7gf88 -- /bin/bash
```
---

# Azure and VSTS CI/CD integration
[Visual Studio Team Service CI/CD configuration](https://github.com/spylkkanen/kubernetes-microservices/docs/Azure-and-VSTS/README.md)


