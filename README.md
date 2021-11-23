# Readme

## Getting started

In order to set up this example you need to install the following on your machine 
- [Docker](https://www.docker.com/get-started)
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
- [Tilt](https://docs.tilt.dev/install.html)

Then once all package are set up run the following commands at the root of the folder:
- `ctlptl apply -f kind-config.yaml` this will create a kubernetes cluster on your machine
- `tilt up` this will build all apps and deploy them in the kind cluster previously created

## Deploying your app
Open tilt control pane by going to [http://localhost:10350](http://localhost:10350), once on the control pane you can click on any app to redeploy them when modified. You can also check the logs to see what is wrong with your app.


