# Other

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