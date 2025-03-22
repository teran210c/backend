const express = require('express')
const app = express()
const port = 3010

const {testConnection} = require('./config/db')
const userRoutes = require('./routes/users')

app.use(express.json())

app.use('',userRoutes)

app.get('/', (req, res)=>{
    res.send('Hola Mundo')
});



testConnection().then((connected) => {
    if(connected){
    app.listen(port, ()=>{
        console.log('Servidor escuchando el puerto', port)
    });
}else {
    console.error("x no jala el mysql")

}

});