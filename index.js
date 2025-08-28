// const sumar = (a,b)=>{
//     return a + b;
// }
// console.log(sumar(4,5));

const http = require('http');
const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('Hello World\n');
});
const PORT = 3000;
app.listen(PORT)
console.log('Servidor Levantao en el puerto 3000 ');
