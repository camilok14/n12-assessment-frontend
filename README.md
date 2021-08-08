## Descripción
Interfaz de usuario para la solución del desafío técnico de nextchallenge

## Instalar dependencias
Este software fue construido usando VueJS sobre node en su versión `v14.17.4`, para instalar las dependencias se debe ejecutar:
```bash
$ npm install
```

## Configuración de variables de entorno
En el archivo `.env` se encuentra definida la variable `VUE_APP_BACKEND_URL` cuyo valor es el URL del servicio REST `n12-assessment-backend` contra el cual se realizarán las peticiones GET y POST.

## Ejecutar la aplicación
Luego de el backend funcionando, con la base de datos y el servicio REST, además de la variable de entorno con el URL del servicio REST, se puede levantar esta aplicación con el comando:
```bash
$ npm run serve
```

## Tests unitarios
Luego de haber instalado las dependencias, se pueden ejecutar los tests unitarios con el comando:
```bash
$ npm run test:unit
```
Para ver un reporte de cobertura de código de los tests unitarios se puede ejecutar:
```bash
$ npm run test:cov
```

 ## Test end to end
 Ejecutan la automatización programada para interactuar con la interfaz de usuario, que a su vez realiza peticiones contra el backend. Una forma facil de ejecutar las purebas end to end, es primero levantar un contenerdor docker con la base de datos `docker run -it -p 27017:27017 mongo`, luego levantar un contenedor docker con el servicio REST `docker run -it --network host -e MONGODB_URI='mongodb://localhost:27017/n12-assessment-database' camilok14/n12-assessment-backend`, asegurarse que el archivo `.env` tenga la variable `VUE_APP_BACKEND_URL` configurada con el valor `http://localhost:3000` y ejecutar el comando:
 ```bash
 $ npm run test:e2e
 ```

 ## Imagen docker
 Se ha publicado la imagen docker `camilok14/n12-assessment-frontend` con la cual se puede levantar la interfaz de usuario :
 ```bash
 $ docker run -it --network host camilok14/n12-assessment-frontend
 ```

 ## Solución completa usando docker compose
 Se puede levantar la solución completa levantando 3 contenedores docker que interactúan entre ellos con la siguiente instrucción, que recoge la configuración a partir del archivo `docker-compose.yml`:
 ```bash
 $ docker-compose up
 ```

 ## Solución desplegada
 Es posible utilizar la solución en un ambiente desplegado en `https://n12-assessment-frontend.herokuapp.com`
