const amqp = require('amqplib/callback_api');

// connect to RabbitMQ server
const rabbitMqUrl = process.env.RABBIT_MQ_URL || 'rabbitmq';

export const sendMessageToRabbitMQ = (message) => {
    amqp.connect(`amqp://${rabbitMqUrl}`, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            const queueName = process.env.RABBIT_MQ_QUEUE;
            const msg = message;

            channel.assertQueue(queueName, {
                durable: false
            });

            channel.sendToQueue(queueName, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });
        setTimeout(function () {
            connection.close();
        }, 500);
    });
};