# Azure and VSTS CI/CD integration

## Azure setup
Azure Kubernetes cluster creation template can be found from `azure/kubernetes-cluster-template` folder. But below are short list of creation parameters.

1. Create `Kubernetes Service`
2. Setup
    - Basic
        - Subscription: Select your own.
        - Resource Group: Create new or use existing one.
        - Kubernetes cluster name: Your choice.
        - Region: Select closest region.
        - Kubernetes version: `1.11.2` example is made this this version.
        - DNS name prefix. Your choice.
    - Scale
        - Node size: `Standard B2ms`. 2vcpus, 8 GB memory, 16GB ssd.
        - Node count: `1` is enough for testing.
    - Authentication
        - Service principal: Default `(new) default service principal`.
        - Enable RBAC: Default `No`.
    - Networking
        - HTTP application routing: Default `Yes`.
        - Network configuration: Default `Basic`.
    - Monitoring
        - Enable containet monitoring: Default `Yes`.
        - Log Analytics workspace: Default selection.

### Azure Container registry authentication
https://docs.microsoft.com/en-us/azure/container-registry/container-registry-authentication
Open `Azure Container registry` and select `Access keys`. Select `Enable` for `Admin user`.
or
```
az acr update -n <AzureContainerRegistryName> --admin-enabled true
```
Now you should be able to connect to you Azure container registry.

Login to Azure Container registry.
```
az acr login --name <AzureContainerRegistryName>
```
### Azure kubernetes cluster connection
https://docs.microsoft.com/en-us/azure/aks/tutorial-kubernetes-deploy-cluster
Get Azure kubernetes cluster credentials.
```
az aks get-credentials --resource-group myResourceGroup --name <AzureKubernetesClusterName>
```
Select context for `kubectl`.
```
kubectl config use-context <AzureKubernetesClusterName>
```

### Create Azure kubernetes connection settings for VSTS
https://github.com/dtzar/blog/tree/master/CD-Kubernetes-VSTS
1. Create VSTS pipeline
2. Add Kubernetes service to VSTS and create connection between VSTS and Kubernetes
az aks create --name <AzureKubernetesClusterName> --resource-group <AzureResourceGroupName> --generate-ssh-keys
3. View created connection configuration.
    ```
    kubectl config view
    ```
    or manually from folder
    - Linux: `${HOME}/.kube/config`
    - Windows: `%UserProfile%\.kube\config`

### Kubernetes Azure CR authentication
```
kubectl create secret docker-registry acr-auth --docker-server <AzureKubernetesClusterName>.azurecr.io --docker-username <AzureResourceGroupName> --docker-password <docker_password> --docker-email <email_address>
```

### Azure kubernetes ingress controller installation
https://blogs.msdn.microsoft.com/mihansen/2018/05/31/kubernetes-ingress-in-azure-government/
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/mandatory.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/cloud-generic.yaml
```

## Continuous Integration (CI)

![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_services_kubernetes_authentication.png)

![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_ci_build_images.png)
![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_ci_build_images_agent_job.png)
![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_ci_build_images_agent_build_services.png)
![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_ci_build_images_agent_push_services.png)
![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_ci_build_images_agent_publish_artifact.png)

## Continuous Delivery (CD)

![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_cd_pipeline.png)
![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_cd_pipeline_artifact_github.png)
![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_cd_pipeline_artifact_azurecr_deployment_trigger.png)
![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_cd_pipeline_artifact_azurecr.png)
![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_cd_pipeline_agent_job.png)
![](https://github.com/spylkkanen/kubernetes-microservices/blob/master/docs/Azure-and-VSTS/vsts_cd_pipeline_agent_k8s_deploy.png)


# Other Azure notes

az acr login --name <AzureContainerRegistryName>

kubectl config use-context <AzureKubernetesClusterName>

https://github.com/dtzar/blog/tree/master/CD-Kubernetes-VSTS
1. Create VSTS pipeline
2. Add Kubernetes service to VSTS and create connection between VSTS and Kubernetes
az aks create --name <AzureKubernetesClusterName> --resource-group <AzureResourceGroupName> --generate-ssh-keys
3. kubectl config view
- ${HOME}/.kube/config for Linux systems
- %UserProfile%\.kube\config for Windows machines

kubenetes <-> azure ACR authentication
kubectl create secret docker-registry acr-auth --docker-server <AzureKubernetesClusterName>.azurecr.io --docker-username <AzureResourceGroupName> --docker-password <docker_password> --docker-email <email_address>

https://mohitgoyal.co/2017/09/21/configure-cicd-for-dockerized-apps-using-vsts-to-kubernetes-cluster-in-acs/


Create azure cluster connection.
az aks get-credentials --resource-group <AzureResourceGroupName> --name <AzureKubernetesClusterName>

Switch to azure cluster.
kubectl config use-context <AzureKubernetesClusterName>

Show Azure cluster information.
kubectl cluster-info


Azure NgInx controller install
https://blogs.msdn.microsoft.com/mihansen/2018/05/31/kubernetes-ingress-in-azure-government/
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/mandatory.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/cloud-generic.yaml


Get azure DNS zone name.
az aks show --resource-group spylkkanen-microservices --name spylkkanen --query addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName -o table
