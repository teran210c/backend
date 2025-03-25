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

app.get('/users/:id', async (req,res)=>{
    const id = parseInt(req.params.id)
    try {
        const[rows] = await db.query('SELECT * FROM USERS WHERE ID = ?', [id]);
        if(rows.length > 0){
            res.json(rows[0])
        }else {
            res.status(400).json({message:"Usuario no encontrado"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
})

app.post('/users', async (req,res)=>{
    try {
        const {nombre, email} = req.body;
        const [result] = await db.query('INSERT INTO users (nombre, email) VALUES (?, ?)', [nombre, email]);
        res.status(201).json({id: result.insertId, nombre, email});
    } catch (error) {
        res.status(500).json({error:error.message})
    }

})

app.put('/users/:id', async (req,res)=>{
    const id = parseInt(req.params.id);
    try {
        const {nombre, email} = req.body;
        const [result] = await db.query('UPDATE users SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id]);
        if (result.affectedRows > 0) {
            res.json({message: 'Usuario actualizado correctamente'});
        } else {
            res.status(404).json({message: 'Usuario no encontrado'});
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.delete('/users/:id', async (req,res)=>{
    const id = parseInt(req.params.id);
    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({message: 'Usuario eleiminado correctamente'});
            
        } else {
            res.status(404).json({message: 'Usuario no encontrado'});
            
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})

module.exports = app;