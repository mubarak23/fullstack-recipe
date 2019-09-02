//mongoDB connection string: mongodb+srv://mubarak23:<password>@cluster0-xniel.mongodb.net/test?retryWrites=true&w=majority
//pass: hWE5Zwrhj5HDQy7H
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(' mongodb+srv://mubarak23:hWE5Zwrhj5HDQy7H@cluster0-xniel.mongodb.net/test?retryWrites=true&w=majority')
        .then(() =>{
            console.log('Successfully connected to Atlas MongoDB')
        })
        .catch((error) => {
            console.log('Unable to connect to atlas mongoDB')
            console.error(error);
        })    

const normalizePort = val =>{
    const port = parseInt(val, 10);
    if(isNaN(port)){
        return val;
    }else if(port >= 0){
        return port;
    }
    return false;
}
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const erroHandler = error =>{
    if(error.syscall !== 'listen'){
        throw error;
    }
    const address = server.address;
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    switch (error.code){
        case 'EACCES':
            console.error(bind + 'require elevated previleges.');
            process.exit(1);
            break
        case 'EADDRIMUSE':
            console.error(bind + 'is already in use.');
            process.exit(1);
            break
         default:
            throw error       
    }
};


//app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.on('error', erroHandler);
server.on('listening', () =>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);