const fs = require('fs');
const http = require('http');


const server = http.createServer((req,res)=>{

    
    res.end("This is from the server...!");


});

server.listen(8000,'127.0.0.1',()=>{
    console.log(`Server initiated successfully on PORT 8000`);
});