const kafka = require('kafka-node');
const express = require('express');
const bodyParser = require('body-parser');

const { initialize, sequelize } = require('./database');
const { methods } = require('./noteModel');
const noteRoutes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(noteRoutes);

try {
    console.log('kafka consumer is booting up')
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient('localhost:2181');
    let consumer = new Consumer(
        client,
        [{ topic: 'feed-service', partition: 0 }],
        {
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8',
            fromOffset: false
        }
    );
    consumer.on('message', async function (message) {
        const consumerData = JSON.parse(message.value);
        if (consumerData.type === 'DELETE_USER_POST') {
            const deleteStatus = await methods.deleteUserNotes(consumerData.data);
            console.log('deleteStatus', deleteStatus);
            console.log('Notes deleted successfully');
        }
    });
    consumer.on('error', function (err) {
        console.log('error', err);
    });
} catch (e) {
    console.log(e);
}

initialize().then(() => {
    sequelize.sync()
        .then(() => {
            console.log('Connected');
            app.listen(4568, () => {
                console.log(`Server is up and running on 4568`);
            });
        })
})
    .catch(err => console.log(err));