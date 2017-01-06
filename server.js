/*jshint esversion:6*/

  const http = require('http');
  const fs = require('fs');
  const PORT = process.env.PORT || 3000;

  const qs = require('querystring');

  const fileNotFoundErrorHandler = (res) => {
    res.statusCode = 500;
    res.end('Internal Server Error\n');
  };

  const sendContent = (res, content) => {
    res.writeHeader('Content-Type', 'text/html');
    res.write(content);
    res.end('Content sent, closing connection');
  };

/*  const resourceMapping = {
    '/styles' : './public/css/styles.css',
    '/helium' : './public/helium.html',
    '/hydrogen' : './public/hydrogen.html',
    '/' : './public/index.html',
    '/404' : './public/404.html'
  };*/

  const server = http.createServer( (req, res) => {
    let urlRequest = req.url.slice(1);
    console.log("req.url", req.urlRequest);
    console.log("req.method", req.method);
    console.log("req.headers", req.headers);

  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    console.log(chunk);
    console.log(qs.parse(chunk));
  });

console.log('MICROPHONE CHECK 1-2 1-2');

  if(req.method === 'GET'){
    console.log('index', req.url);
    if(req.url === '/index.html'){
    fs.readFile('./public/index.html', (err, content) => {
      if(err){
        res.statusCode = 404;
      console.log('index request', req.url);
        sendContent(res, 'Unable to find request');
        return;
      }
      sendContent(res, content);
    });

    }else if(req.url === '/helium.html'){
      fs.readFile('./public/helium.html', (err, content) => {
      if(err){
        res.statusCode = 404;
      console.log('helium request', req.url);
        sendContent(res, 'Unable to find request');
        return;
      }
      sendContent(res, content);
    });

    }else if(req.url === '/hydrogen.html'){
      fs.readFile('./public/hydrogen.html', (err, content) => {
      if(err){
        res.statusCode = 404;
      console.log('hydrogen request', req.url);
        sendContent(res, 'Unable to find request');
        return;
      }
      sendContent(res, content);
    });

    }else if(req.url === '/styles.css'){
      fs.readFile('./public/css/styles.css', (err, content) => {
      if(err){
        res.statusCode = 404;
      console.log('css stuff', req.url);
        sendContent(res, 'Resource not found');
        return;
      }
      res.setHeader('Content-Type', 'text/css');
      res.write(content);
      res.end();
    });

let reqBody = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
    reqBody += chunk;
    console.log('chunk', chunk);
    });
    req.on('end', () =>{
      let bodyParse = qs.parse(reqBody);
     if(req.method === 'POST' && req.url === '/elements'){
      fs.writeFile(`./public/${bodyParse.elementName}.html`,`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${bodyParse.elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${bodyParse.elementName}</h1>
  <h2>${bodyParse.elementSymbol}</h2>
  <h3>${bodyParse.elementAtomicNumber}</h3>
  <p>${bodyParse.elementDescription}</p>
  <p><a href="/">back</a></p>
</body>
</html>`);
  res.setHeader('Content-Type', 'application/json');

  res.send(`{"Connection Successful" : true}`);
  res.end();
  }

    });

  }


  }

  console.log('why you no work??');

});
server.listen(PORT, () =>{
  console.log('server listening on port', PORT);
});

/*     let reqBody = '';
        req.setEncoding('utf8');
      req.on('data', (chunk) => {
        reqBody += chunk;
        console.log('chunk');
      });

    req.on('end', () => {
      reqHTML = qs.parse(reqBody);
      console.log(reqBody);
      let newFile = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${reqHTML.elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${reqHTML.elementName}</h1>
  <h2>${reqHTML.elementSymbol}</h2>
  <h3>Atomic number ${reqHTML.elementAtomicNumber}</h3>
  <p>${reqHTML.elementDescription}</p>
  <p><a href="/">back</a></p>
</body>
</html>`;

      res.writeHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.write('{ "Connection Successful" : true }');
      res.end();
});*/
/*
  server.listen(PORT, () => {
    console.log("server is listening on port", PORT);
};*/