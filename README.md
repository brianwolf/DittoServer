# Ditto-Server

> Servidor de mocks para peticiones REST, **ditto** por el Pokemon que cambiaba de forma :P

A diferencia de Mockoon o Postman que son *local* este permite ser *desplegado* y usado con test automatizados junto con alguna herramienta de CI/DI o simplemente para tener centralizado los mocks en un equipo

![alt text](img/ditto.gif)

---

## Indice

* [Requerimientos](#requerimientos)
* [Ejecucion](#ejecucion)
* [Npm](#npm)
* [Paginas](#paginas)
* [Autor](#autor)

---

## Requerimientos

* MongoDB
* Node 12 o mayor
* npm

## Ejecucion

* Instalar las dependencias con el comando `npm install`
* Ejecutar el server de *express* con `npm start`
* El server quedara ejecutado en el **puerto 7000**
* Para probar que se levanto correctamente ejecutar en un navegador `http://localhost:7000/`
* Para ver las variables configuradas en la app `http://localhost:7000/variables`

## Npm

* **start**: para levantar la aplicacion con *node*
* **demon**: para levantar la aplicacion con *nodemon*
* **stop**: para matar la aplicacion corriendo en el **puerto 7000**

---

## Paginas

* [Levantar un MongoDB con docker-compose](https://github.com/brianwolf/dockers-utiles/tree/master/base_de_datos/no_relacionales/mongodb)

## Autor

* **Brian Lobo** * *Creador* * [brianwolf](https://github.com/brianwolf)
