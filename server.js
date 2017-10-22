var http = require('http');
var fs = require("fs");
var hostname = 'localhost';
var port = 9000;


http.createServer(function(request, response) {
  checkForFileExt(request, response);
}).listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function checkForFileExt(request, response) {
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(request.url)[1];
  if (ext === 'js') {
    sendFileContent(response, request.url.toString().substring(1), "text/javascript");
  } else if (ext === 'css') {
    sendFileContent(response, request.url.toString().substring(1), "text/css");
  } else if (ext === 'html') {
    sendFileContent(response, request.url.toString().substring(1), "text/html");
  } else {
    response.end();
  }
}

function sendFileContent(response, fileName, contentType) {

  fs.readFile(fileName, function(err, data) {
    if (err) {
      response.writeHead(404);
      response.write("Not Found!");
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.write(data);
    }
    response.end();
  });
}