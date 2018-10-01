# Environment

## Allow powershell script execution
Open powershell as Adminstrator. Run command to enable powershell script execution on local machine.
```
Set-ExecutionPolicy remoteSigned
```
## Docker Community Edition
Install Docker Community Edition. https://docs.docker.com/docker-for-windows/install/
![Docker memory and cpu](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Environment/docker-about.PNG)

## Set memory and cpu
Enable atleast 4GB memory and 4 cpu's for docker to host kubernetes applications.
![Docker memory and cpu](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Environment/docker-memory-and-cpu.PNG)

## Enable kubernetes
Install kubernetes to your local with `Enable Kubernetes` checkbox and also remember to select `Kubernetes` orchestrator.
![Enable kubernetes](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Environment/docker-enable-kubernetes.PNG)

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