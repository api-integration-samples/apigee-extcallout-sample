const express = require('express');
const generateRandomJoke = require('chatgpt-joke-generator');
const port = 8080;

const PROTO_PATH = "external_callout.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

var apigeeProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();

server.addService(apigeeProto.apigee.ExternalCalloutService.service, {

  processMessage: (call, callback) => {
    let message = call.request;
    console.log("REQUEST: " + JSON.stringify(message, null, 2));

    const joke = generateRandomJoke();
    if (!message.response.headers) message.response.headers = {};

    if (message && message.response && message.response.headers)
      message.response.headers["x-random-joke"] = {
        "strings": [joke]
      };
    
    console.log("RESPONSE: " + JSON.stringify(message, null, 2));

    callback(null, message);
  } 
});

server.bind("0.0.0.0:8080", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://localhost:8080");
server.start();