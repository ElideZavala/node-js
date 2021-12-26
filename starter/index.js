const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////
// FILES

// Blocking, synchronous way 
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);  
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`; 
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log('ERROR! 🎇');

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.readFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//                 console.log('Your file has been written 🎨');
//             });
//         });
//     });
// });
// console.log('Will read file'); 

////////////////////////////////
// SERVER
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8'); 
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8'); 
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8'); 

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); // lee los  datos del directorio JSON. 
const dataObj = JSON.parse(data);      // Vamos a leer los datos de la Api. 

const server = http.createServer((req, res) => {

    const { query, pathname } =  url.parse(req.url, true);    // Variables fuera de la url.

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    // Product page
    } else if (pathname === '/product') {
        console.log(query);
        res.end('Estamos en este momento comunicanonos por product');
        
    // API
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json'});
        res.end(data);

    // Not fount
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not fount!</h1>')
    }
}); 

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});