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

app.post('/users', (req,res)=>{
    const user = req.body;
    user.id = users.length + 1
    users.push(user);
    res.status(201).json(user);

})

app.put('/users/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const index = users.findIndex(u=>u.id===id);
    if (index !== -1){
        users[index] = {...users[index], ...req.body};
        res.json(users[index])
    } else{
        res.status(404).json({message:'El usuario no existe'})
    }
})


app.delete('/users/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const index = users.findIndex(u=>u.id===id);
    if (index !== -1){
        const deletedUsers = users.splice(index,1);
        res.json(deletedUsers[0])
    } else{
        res.status(404).json({message:'El usuario no existe'})
    }
})

app.get('/participantes', (req, res) => {
    res.json(participantes);
});

app.get('/participantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const participante = participantes.find(p => p.id === id);
    
    if (participante) {
        res.json(participante);
    } else {
        res.status(404).json({ message: "Participante no encontrado" });
    }
});

app.post('/participantes', (req, res) => {
    const { nombre, calificacion, servicio, comentario } = req.body;

    if (
        typeof nombre !== 'string' ||
        typeof calificacion !== 'number' ||
        typeof servicio !== 'number' ||
        typeof comentario !== 'string'
    ) {
        return res.status(400).json({ message: "Datos inválidos. Verifica los tipos de datos." });
    }

    const participante = {
        id: participantes.length + 1,
        nombre,
        calificacion,
        servicio,
        comentario
    };

    participantes.push(participante);
    res.status(201).json(participante);
});

app.put('/participantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = participantes.findIndex(p => p.id === id);

    if (index !== -1) {
        const { nombre, calificacion, servicio, comentario } = req.body;

        if (
            typeof nombre !== 'string' ||
            typeof calificacion !== 'number' ||
            typeof servicio !== 'number' ||
            typeof comentario !== 'string'
        ) {
            return res.status(400).json({ message: "Datos inválidos. Verifica los tipos de datos." });
        }

        participantes[index] = { ...participantes[index], nombre, calificacion, servicio, comentario };
        res.json(participantes[index]);
    } else {
        res.status(404).json({ message: "El participante no existe" });
    }
});


app.listen(port, ()=>{
    console.log('Servidor escuchando el puerto', port)
})