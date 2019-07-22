/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const express = require('express')
const bunyan = require('bunyan');
const {LoggingBunyan} = require('@google-cloud/logging-bunyan');

const app = express()
const port = 3000

const loggingBunyan = new LoggingBunyan();
const logger = bunyan.createLogger({
  name: 'stackdrivertest',
  streams: [
    {stream: process.stdout, level: 'info'},
    loggingBunyan.stream('info'),
  ],
});

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/info', function (req, res) {
    logger.info("log:INFO")
    res.send('Info!')
})

app.get('/warning', function (req, res) {
    logger.warn("log:WARNING")
    res.send('Warning!')
})

app.get('/error', function (req, res) {
    logger.error("log:ERROR")
    res.send('Error!')
})

app.get('/critical', function (req, res) {
    logger.fatal("log.FATAL")
    res.send('Critical!')
})

app.listen(port, () => logger.info(`stackdrivertest listening on port ${port}!`))
