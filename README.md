# Prestalo technical test

## 🚀 Pasos para levantar la aplicación

> **El .env (tanto del backend como del frontend) están en el repositorio para facilitaros la vida y 
> que no tengáis que crearlos.**

1. Clonar el repositorio de GitHub

```
git clone https://github.com/laubernal/prestalo-technical-test.git
```

2. Ejecutar el docker compose

```
docker-compose up -d --build
```

> ⚠ WARNING! 
> 
> Dependiendo de qué versión de docker compose tengáis el comando para levantar el contenedor 
> tendrá que ser: `docker compose up -d --build`


3. Una vez construida la aplicación esta se levantará en el puerto 5000.

```
http://localhost:5000
```

## 🧪 Pasos para ejecutar los tests

```
cd ./server
npm run test
```

## 🔎 Decisiones técnicas

### ¿Cómo he enfocado la prueba?

Lo primero que he hecho al recibir la prueba es leerla atentamente y a partir de las indicaciones 
las he desgranado en pequeñas tareas.

A nivel de arquitectura de la aplicación he decidido hacer una arquitectura hexagonal junto con DDD, 
creando un bounded context llamado ```Loan``` en el cuál he creado el módulo de ```LoanApplication``` para
agrupar toda la lógica de negocio que tiene que ver con las solicitudes de préstamo. 
Ya que presumiblemente si esta aplicación fuese para el mundo real habría una gran diferencia en el número 
de escrituras y de lecturas, he usado la librería de ```CQRS``` que NestJS tiene.

Para encapsular la validación de los primitivos de la entidad de dominio he usado los value objects, en algunos
sí que he añadido la validación (```Id```, ```Email```) pero en otros no la he implementado.

Concesiones que más pueden llamar la atención:

- Entidad de dominio ```LoanApplication``` anémica, no tiene métodos de dominio es como un DTO.

### Otras decisiones a destacar

#### ¿Por qué identificadores desde fuera?

- Es más eficiente que generarlo en la base de datos
- Mantenemos las mutaciones de estado sin ningún retorno
- Simplicidad del uso de la api por parte de los clientes

#### ¿Por qué gestionar los errores en el controlador?

- Granularidad a la hora de controlar los errores de cada caso de uso
- Mapeo de los errores de dominio a los códigos de HTTP
- Alternativa: usar los interceptors de NestJS

### Testing

He implementado un test unitario del ```CreateLoanApplicationCommandHandler``` y uno del
```CreateLoanApplicationController```.

### Mejoras

- Implementar un mejor control de errores y excepciones.
- Agregar validaciones más estrictas en los value objects.

### ¿Qué ha faltado por implementar?

Por falta de tiempo no he podido implementar el sistema de RabbitMq para gestionar el estado de 
la solicitud de préstamo.
