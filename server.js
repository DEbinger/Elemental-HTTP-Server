/*jshint esversion:6*/

const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const fileNotFoundErrorHandler = (res) => {
  res.statusCode = 500;
  res.end('Server is broken');
};

const sendContent = (res, content) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();
};

/*const resourceMapping = {
  '/styles' : './public/css/styles.css',
  '/helium' : './public/helium.html',
  '/hydrogen' : './public/hydrogen.html',
  '/' : './public/index.html',
  '/404' : './public/404.html'
};*/

const server = http.createServer( (req, res) => {
  console.log("req.url", req.url);
  console.log("req.method", req.method);
  console.log("req.headers", req.headers);

  let reqBody = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    reqBody += chunk;
    console.log('chunk');
  });
  req.on('end', () => {
    // reqBody is complete, handle request!
    console.log(reqBody);

  if( req.url === '/' ){
      fs.readFile('./index.html', (err, content) => {
        if(err){
          res.statusCode = 500;
          res.end('Server is broken');
          return;
        }

        res.setHeader('Content-Type', 'text/html');
        res.write(content);
        res.end();
      });
    } else if( req.url === '/helium' ){
      fs.readFile('./helium.html', (err, content) => {
        if(err){
          res.statusCode = 500;
          res.end('Server is broken');
          return;
        }

        res.setHeader('Content-Type', 'text/html');
        res.write(content);
        res.end();
      });
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('Resource not found');
      return;
    }
  });

/*
    fs.readFile(resourceMapping[req.url] || '', (err, content) => {*/
 /*     if(err){
        res.statusCode = 404;
        sendContent(res, 'Resource not found');
        return;
      }*/

//      sendContent(res, content);
});


server.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});
