# Kafka Sales Processor

This project is a simple implementation of a payments system using Nest and Kafka

## To run this app

- Clone this repo and open in your IDE
```
git clone https://github.com/jfirme-sys/kafka-sales-processor.git
```

- Run the containers
```
docker compose up -d
```

- Access the container
```
docker compose exec app bash
```

- Install dependecies
```
npm i
```
### Orders

- Run the migrations
```
cd apps/orders && npx prisma migrate dev
```
- Run the app
```
npm run start:dev
```
### Payments
- Run the migrations
```
cd apps/payments && npx prisma migrate dev
```
- Run the app
```
npm run start:dev payments
```
## Technologies
- [NestJS](https://nestjs.com/): A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Kafka](https://kafka.apache.org/): Open-source distributed event streaming platform for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.
