const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);



const server = http.createServer((req,res)=>{

    const pathName = req.url;

    if (pathName === '/')
    res.end("this is the default page");

    if (pathName === '/product')
    res.end("this is the product page");

    if (pathName === '/api')
    {
        res.writeHead(200,{
            'Content-type': 'application/json',
            'My-header' : 'Hemanth Header'
        });
        res.end(data);
    }

});

server.listen(8000,'127.0.0.1',()=>{
    console.log(`Server initiated successfully on PORT 8000`);
});