const fs = require('fs');
const forever = require('forever-monitor');
const kafka = require('kafka-node');
const config = require('../config/index');

const client = new kafka.KafkaClient();


const CONSUMERS_PATH = './kafka-consumers/';

// Check topics are created
/* eslint-disable */
let _TOPICSLIST = [];
for (const topic in config.KAFKA.TOPICS) {
  _TOPICSLIST.push(topic);
}

let _availableTopics = {};
client.loadMetadataForTopics([], (e, r) => {
  if (e) {
    console.log(e); // TODO: log!
  } else {
    if (r[1].metadata) {
      for (const topic in r[1].metadata) {
        _availableTopics[topic] = topic;
      }
      _TOPICSLIST.forEach((topic) => {
        if (!_availableTopics.hasOwnProperty(topic)) throw new Error(`${topic} is not available in consumer`);
      });
      /* eslint-enable */
    }
  }
});


fs.readdir(CONSUMERS_PATH, (err, consumer) => {
  if (err) {
    throw new Error(err);
  } else if (consumer.length > 0) {
    consumer.forEach((filePath) => {
      const child = new (forever.Monitor)(CONSUMERS_PATH + filePath, {
        max: 1,
        silent: true,
        /* eslint-disable */
        logFile: './logs/' + filePath.split('.')[0] + '_log.log',
        outFile: './logs/' + filePath.split('.')[0] + '_out.log',
        errFile: './logs/' + filePath.split('.')[0] + '_err.log',
        /* eslint-enable */
      });

      child.on('exit', () => {
        console.log(`${filePath} has exited after 3 restarts`);
      });

      child.start();
    });
  } else {
    throw new Error('[ No consumers defined ]');
  }
});
