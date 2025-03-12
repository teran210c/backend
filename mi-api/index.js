const express = require('express')
const app = express()
const port = 3010

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Hola Mundo')
});

app.listen(port, ()=>{
    console.log('Servidor escuchando el puerto', port)
})