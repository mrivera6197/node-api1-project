// console.log('hello there')
// 1 - DEPENDENCIES 
// import express from 'express' // package.json needs a 'type'
// key with a value of module 

// common js module system that came with Node
const express = require('express')
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
// catch all endpoint (404 resource not found)

app.get('/api/users', (req, res) => {
    res.status(200).json(users)
})

app.get('/api/users/:id', (req, res) => {
    // 1 - pull out the id from the request (the URL param)
    const { id } = req.params
    // 2 - find the user in the users arr with the given id
    const user = users.find(user => user.id === id)
    // 3 - set status code and send back the dog
    if (!user) {
        //set 4040 and send something decent
        res.status(404).json({
            message: `No user with id ${id}`,
        })
    } else {
        res.status(200).json(user)
    }
})

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not found' })
})

// 6 - LISTEN FOR INCOMING REQUESTS
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

