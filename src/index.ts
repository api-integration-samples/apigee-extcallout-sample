const express = require('express')
const port = 8080

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
    message.response.headers["x-extcallout-test"] = "test";
    callback(null, message);
  },
 
});

server.bind("127.0.0.1:8080", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:8080");
server.start();