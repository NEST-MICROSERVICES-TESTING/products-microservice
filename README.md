# Products Microservices

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `env.template`
4. Ejecutar migración de prisma `npx prisma migrate dev`
5. Ejecutar `npm run start:dev`


## Nats
```
6. docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```



## PROD
1. Ejecutar
```
docker build -f dockerfile.prod -t client-gateway .
```