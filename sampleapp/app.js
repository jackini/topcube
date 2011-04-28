#!/usr/bin/env node

var Http = require('http'),
    Stack = require('stack'),
    Creationix = require('creationix'),
    WebApp = require('../topcube');

var PORT = 7569;
var handler = Stack(
  Creationix.log(),
  Creationix.static("/", __dirname + "/www")
);
(function listen() {
  try {
    Http.createServer(handler).listen(PORT);
  } catch (err) {
    if (err.code === "EADDRINUSE") {
      PORT++;
      listen();
      return;
    }
    throw err;
  }
  console.dir(WebApp);
  var child = WebApp("http://127.0.0.1:" + PORT + "/index.html");
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  
  console.dir(WebApp);
  setTimeout(function () {
  }, 1000);
}());

