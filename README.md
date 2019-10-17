# node-apache-kafka
Sample project to demonstrate NodeJS and Apache Kafka (Windows)

---

## Table of contents
- Prerequisites
- Configuration
- Running Application
- Project Structure

### Prerequisites

| Tool | Version |
| :--- | ------- |
| **Node JS** | 8.11.x |
| **kafka** | kafka_2.12-2.3.0 |
| **zookeeper** | zookeeper-3.5.5 |

### Configuration

1. Update kafka server.properties

    > /kafka_2.12-2.3.0/config/server.properties

2. Copy zoo_sample.cfg to zoo.cfg and update **dataDir** (The directory where the snapshot is stored) value

    > /zookeeper-3.5.5/conf/zoo.cfg

3. Start ZooKeeper

    > Open a command prompt and type **zkserver**

4. Start kafka service - Under kafka extracted directory

    > kafka_2.12-2.3.0 >.\bin\windows\kafka-server-start.bat .\config\server.properties

5. Create two topics (As per configuration /config/config.development.js)

    > 'TEST_TOPIC' and 'NODE_KAFKA'
  
    > kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic TEST_TOPIC

    > kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic NODE_KAFKA

### Running Application

1. Under roor directory - _Spin up kafka consumers_

    > node src/index.js

2. To generate message

    > node kafka-producers/node_kafka.producer.js

3. Message received at kafka-consumer - NODE_KAFKA

    > **Log folder** : node-apache-kafka/logs/node_topic_out.log

    > **Output**     : Message received at NODE_KAFKA. Message [  NODE_KAFKA  ]

### Project Structure

    .
    ├── node-apache-kafka                                             
    |   ├── /config                # Configuration files
    |   ├── /kafka-consumers       # Kafka Consumers scripts
    |   ├── /kafka-producers       # Kafka Producers scripts
    |   ├── /logs                  # Log files
    │   |   ├── *_out.log          # Stdout logs
    │   |   ├── *.log              # Log
    │   |   └── *_err.log          # Stderr logs
    |   ├── /src                   # Source scripts
    │   |   └── index.js           # Entry point file - _Spin up consumers_
    |   ├── /node_modules          # Contains Node packages as specified as dependencies in package.json
    │   |   ├── :                  # -|-
    │   |   ├── :                  # -|-
    │   |   └── :                  # -|-
    │   ├── .gitignore             # git configuration to ignore some files and folder
    │   ├── package.json           # Standard npm package specification
    │   ├── LICENSE                # LICENSE information
    └───└── README.md              # **node-apache-kafka** documentation
    
