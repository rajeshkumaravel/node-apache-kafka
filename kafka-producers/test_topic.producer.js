/* eslint-disable no-unused-vars */
const kafka = require('kafka-node');
const CONFIG = require('../config/index');

const _TOPIC = CONFIG.KAFKA.TOPICS.TEST_TOPIC;
try {
  const { Producer } = kafka;
  const client = new kafka.KafkaClient(CONFIG.KAFKA.SERVER);
  const producer = new Producer(client);
  const payloads = [
    {
      topic: _TOPIC,
      messages: _TOPIC,
    },
  ];

  producer.on('ready', async () => {
    const status = producer.send(payloads, (err, data) => {
      if (err) {
        console.log(`[kafka-producer -> ${_TOPIC}]: broker update failed`);
      } else {
        console.log(`[kafka-producer -> ${_TOPIC}]: broker update success`);
        process.exit(0);
      }
    });
  });

  producer.on('error', (err) => {
    console.log(err);
    console.log(`[kafka-producer -> ${_TOPIC}]: connection errored`);
    throw err;
  });
} catch (e) {
  console.log(e);
}
