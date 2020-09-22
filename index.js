const fs = require('fs');
const http = require('http');
const url = require('url');


const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const replacetemplate = (temp, product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id)

    if(!product.organic)
    output = output.replace(/{%NOTORGANIC%}/g,'not-organic');
    return output;

}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);





const server = http.createServer((req,res)=>{

    const {query, pathname}= url.parse(req.url,true);

    if (pathname === '/' || pathname === '/overview')
    {
        res.writeHead(200,{'Content-type':'text/html'});

        const cardsHtml = dataObj.map(el => replacetemplate(tempCard, el) ).join('');

        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);


    }
    if (pathname === '/product')
    {
        res.writeHead(200,{'Content-type':'text/html'});
        const product = dataObj[query.id];
        const output = replacetemplate(tempProduct,product);
        res.end(output);

        console.log(query);

    }
    // res.end("this is the product page");

    if (pathname === '/api')
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