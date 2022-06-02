### Technologies Used

    - Node.js
    - Kafka
    - MySQL

### To Run Application

#### Kafka/Zookeeper

```
docker compose up
```

####
```
docker pull mysql

docker run --name mysql-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql
```
####

#### Producer
```
$ cd users/
$ npm i 
$ node server.js
```

#### Consumer
```
$ cd notes/
$ npm i
$ node server.js
```