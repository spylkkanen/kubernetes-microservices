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
Document describes environment used in this showcase.
> [Environment](https://github.com/spylkkanen/kubernetes-microservices/tree/master/docs/Environment)

# Docker application quick launch
Document uses powershell script to show docker image build and push to local container repository. Finally presentation starts containers in local docker service and has some quick browser based test cases.
> [Docker application quick launch](https://github.com/spylkkanen/kubernetes-microservices/tree/master/docs/DockerApplicationQuickLaunch)

# Kubernetes application quick launch
Document uses powershell script to show docker image build and push to local container repository and how to deploy container registry images to local kubernetes cluster. Finally presentation starts containers in local kubernetes cluster and has some quick browser based test cases.
> [Kubernetes application quick launch](https://github.com/spylkkanen/kubernetes-microservices/tree/master/docs/KubernetesApplicationQuickLaunch)

# Azure and VSTS CI/CD integration
Maybe local cloud is not what you are looking for and morelikely you want to same in Cloud. This documentation shows how to integrate Azure and VSTS Continuous Integration and Continuous Development.
> [Visual Studio Team Service CI/CD configuration](https://github.com/spylkkanen/kubernetes-microservices/tree/master/docs/Azure-and-VSTS)



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

