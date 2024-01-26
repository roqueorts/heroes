# Para configurar server

## Modificar el angular.json para añadir proxy:

    "architect": {
        "serve": {
            "development": {
                    "browserTarget": "heroes:build:development",
                    "proxyConfig": "src/proxy.conf.json"
            }
        }
    }
