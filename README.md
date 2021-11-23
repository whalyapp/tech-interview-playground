# Readme

## Getting started

In order to set up this example you need to install the following on your machine 
- [Docker](https://www.docker.com/get-started)
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
- [Tilt](https://docs.tilt.dev/install.html)
- [Ctlptl](https://github.com/tilt-dev/ctlptl#how-do-i-install-it)

Then once all package are set up run the following commands at the root of the folder:
- `ctlptl apply -f kind-config.yaml` this will create a kubernetes cluster on your machine
- `tilt up` this will build all apps and deploy them in the kind cluster previously created

## Deploying your app
Open tilt control pane by going to [http://localhost:10350](http://localhost:10350), once on the control pane you can click on any app to redeploy them when modified. You can also check the logs to see what is wrong with your app.

## Check that your local env is correctly setup

a. Go to: http://localhost:5735/ and check the Hello World frontend
b. Run:
```
curl --location --request POST 'http://localhost:4000' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query Articles {\n  articles {\n    title\n  }\n}","variables":{}}'
```

-> You should have:
```json
{"data":{"articles":[{"title":"The Awakening"},{"title":"City of Glass"}]}}
```

c. Run:
```
curl --location --request GET 'http://localhost:5000/sqltest'
```

-> You should have:
```json
{
    "result": {
        "command": "SELECT",
        "rowCount": 1,
        "oid": null,
        "rows": [
            {
                "now": "2021-11-23T15:49:36.381Z"
            }
        ]
    }
}
```