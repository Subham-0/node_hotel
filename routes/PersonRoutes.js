const express = require('express');
const router = express.Router();

const Person = require('../models/person') //mongoose model

//Define routes for person


router.post('/', async (req, res) => {
    try {
        const data = req.body //Assuming the request body contains the person data

        //create a new person document using the mongoose model in better way
        const newPerson = new Person(data);

        //Save the new person to database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }


})

router.get('/', async (req, res) => {

    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' })
    }
})

//paramerised endpoint

router.get('/:work', async (req, res) => {
    try {
        const workType = req.params.work;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('data fetched');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: 'Invalid workType' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//update person data
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //Extreact the id from URL parameter
        const updatePersonData = req.body; //Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, //return the updated document
            runValidators: true //run mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' })
        }
        console.log('data updated');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

//delete person data
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' })
        }
        console.log('data deleted');
        res.status(200).json({ message: 'person deleted successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;