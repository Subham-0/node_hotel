const express = require('express');
const routes = express.Router();

const MenuItem = require('../models/Menu');


routes.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('data saved')
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
routes.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched')
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

//paramerised endpoint
routes.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste;
        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
            const response = await MenuItem.find({ taste: tasteType })
            console.log('data fetched');
            res.status(500).json(response);
        }
        else {
            res.status(404).json({ error: 'Invalid tastetype' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

//update menu data
routes.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenudata = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenudata, {
            new: true, //return the updated document
            runValidators: true //run Mongoose Validation
        })
        if (!response) {
            return res.status(404).json({ error: 'Menu not found' })
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

//delete menu data
routes.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if (!response) {
            return res.status(404).json({ error: 'Menu not found' })
        }
        console.log('data deleted');
        res.status(200).json({ message: 'menu deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})
module.exports = routes