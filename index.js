// console.log('hello there')
// 1 - DEPENDENCIES 
// import express from 'express' // package.json needs a 'type'
// key with a value of module 

// common js module system that came with Node
const e = require('express')
const express = require('express')
const shortid = require('shortid')
// import { generate } from 'shortid' // ES6 modules
const generate = require('shortid').generate

// 2 - INSTANTIATE and CONFIGURE the server
// here is our app (our server)
const app = express()
// plugging in a piece of middleware
app.use(express.json())

// 3 - DECIDE A PORT NUMBER
const port = 5000

// 4 - FAKE DATA
let users = [
    { id: generate(),name: 'mali',bio: 'web36' },
]
// 5 - ENDPOINT
// [GET] all users in the db
app.get('/api/users', (req, res) => {
    try {
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'The users information could not be retrieved.'})
    }
})

app.get('/api/users/:id', (req, res) => {
    // 1 - pull out the id from the request (the URL param)
    const { id } = req.params
    // 2 - find the user in the users arr with the given id
    const user = users.find(user => user.id === id)
    // 3 - set status code and send back the dog
    try {
        if (!user) {
            //set 4040 and send something decent
            res.status(404).json({
                message: `The user with the specified ID does not exist.`,
            })
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(500).json({ message: 'The user information could not be retrieved.'})
    }

})

// [POST] user using the request body as raw material 
app.post('/api/users', (req, res) => {
    // 1 - pull out the { name, breed } from the body of req
    const { name, bio } = req.body
    // 2 - make sure the body includes name and breed
    try {
        if (!name || !bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user.'
            })
        } else {
            // 3 - make a new resource, complete with unique id
            const newUser = { id: generate(), name, bio, }
            // 4 - add the new user to our fake db
            users.push(newUser)
            // 5 send back the newly created resource 
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({ message: 'There was an error while saving the user to the database'})
    }
})

// [PUT] replace user with given id (params) with the { name, bio }
app.put('/api/users/:id', (req, res) => {
    // 1 - pull id from params
    const { id } = req.params
    // 2 - pul lname and breed from body 
    const { name, bio } = req.body 
    // 3 - validate id and validate req body 
    const indexOfUser = users.findIndex(user => user.id === id)
     // 4 - find and swap 'breed' and 'name'
    try {
        if (indexOfUser !== -1) {
            users[indexOfUser] = { id, name, bio }
        // 5 - send back the updated dog 
            res.status(200).json({ id, name, bio })
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'The user information could not be modified.'})
    }
})

// [DELETE] remove user with given id in the params 
app.delete('/api/users/:id', (req, res) => {
    // 1 - find user by the given id 
    // 2 - remove it from the array 
    // 3 - send back something
    const { id } = req.params 
    try {
        if (!users.find(user => user.id === id)) {
            res.status(404).json({ message: 'The user with the specified ID does not exist.'})
        } else {
            users = users.filter(user => user.id !== id)
            res.status(200).json({ message: `User with id ${id} has been deleted`})
        }
        // if there is a crash here 
        //instead of the app blowing up
        // the block inside the catch will rum 

    } catch (error) {
        res.status(500).json({ message: 'The user could not be removed'})
    }
}) 

// catch all endpoint (404 resource not found)
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' })
})

// 6 - LISTEN FOR INCOMING REQUESTS
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

