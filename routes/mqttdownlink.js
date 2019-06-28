const express = require('express');
const mqtt = require('mqtt');

const router = express.Router();

router.get('/', (req, res, next)=>{   
    res.status(200).json({
        message : 'Please send a POST request.',
    });
});

router.post('/', (req, res, next)=>{
    const topic =  {
        name : req.body.topic,
        message : req.body.message
    };

    var options = {
        port: 1883,
        host: '', //hostname
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        username: '', //username
        password: '', //password
        keepalive: 60,
        reconnectPeriod: 1000,
        protocolId: 'MQIsdp',
        protocolVersion: 3,
        clean: true,
        encoding: 'utf8'
    };
    
    var client = mqtt.connect('',options); //hostname

    client.on('connect',function(){
        client.publish(topic.name, topic.message);
        console.log('mqtt_called');
    });
    res.status(200).json({
        message : 'Successfully published to '+topic.name,
        topic : topic
    });
});

module.exports = router;