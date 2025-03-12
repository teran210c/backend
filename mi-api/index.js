const express = require('express')
const app = express()
const port = 3010

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Hola Mundo')
});

const users = []

app.get('/users', (req,res)=>{
    res.json(users)
})

app.get('/users/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const user = users.find(u=>u.id===id);
    if (user){
        res.json(user)
    } else{
        res.status(404).json({message:"Usuario no encontrado"})

    }

})

app.listen(port, ()=>{
    console.log('Servidor escuchando el puerto', port)
})