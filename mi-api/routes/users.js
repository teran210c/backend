const express = require('express');
const app = express.Router();
const db = require('../config/db').pool;

const users = []

app.get('/users', async (req,res)=>{
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows)
    }catch(error){
        res.status(500).json({error:error.message})
    }
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

module.exports = app;