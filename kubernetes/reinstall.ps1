kubectl delete deployments --all
kubectl delete ingress --all
kubectl delete statefulsets --all
kubectl delete services --all
kubectl delete pods --all --grace-period=0 --force
kubectl delete PersistentVolumeClaims --all
kubectl delete persistentvolumes --all
kubectl create -f .\backend-api-1.svc.yaml -f .\backend-api-2.svc.yaml -f .\frontend.svc.yaml -f .\backend-api-1.deploy.yaml -f .\backend-api-2.deploy.yaml -f .\frontend.deploy.yaml -f .\ingress.yaml
