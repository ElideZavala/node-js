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
const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' | pathName === '/overview') {
        res.end('Estamos en este momento comunicanonos por overview');
    } else if (pathName === '/product') {
        res.end('Estamos en este momento comunicanonos por product');        
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
})