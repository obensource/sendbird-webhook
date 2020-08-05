#!/usr/bin/env node

// Get local environment variables
require('dotenv').config();

const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const crypto = require('crypto')

// Initialize express and define a port
const app = express()
const PORT = process.env.PORT || 3000

// Set auth credentials
const APP_ID = process.env.APP_ID
const USER_ID = process.env.USER_ID
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

// Ask express to use body-parser's JSON parsing
app.use(bodyParser.json())

// Ensure something returns if the root route receives a request
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Webhook definition
app.post("/hook", async (req, res) => {
  // Ensure that this still sends all events and branch functionality on the event category 
  if (req.body.category === 'group_channel:create') {

    // Group channel URL
    const CHANNEL_URL = req.body.channel.channel_url

    // Admin Metadata
    const adminData = {
      img: 'https://i.imgur.com/dXgUAVk.jpg',
      author: 'Alan Kay',
      company: 'Xerox PARC'
    }

    // Message Data
    const data = {
      message_type: 'ADMM',
      user_id: USER_ID,
      channel_url: CHANNEL_URL,
      message: 'If you like to draw, do not automate drawing: rather, program your computer to give you a new set of paints. If you like to play music, do not build a \'player piano\': instead program yourself a new kind of instrument.',
      custom_type: 'notice',
      data: JSON.stringify(adminData),
      is_silent: true
    }

    // URL to group channel for fetch POST method
    const URL = `https://api-${APP_ID}.sendbird.com/v3/group_channels/${CHANNEL_URL}/messages`

    // Webhook response to channel:
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) {
        // In a production environment, I would establish monitoring to catch errors
        console.log('Sendbird network response has failed')
        res.status(500).end()
      }
      return response
    }).catch(error => {
      console.log('A problem has occured with the group message webhook fetch operation:', error)
    })
  }
  res.status(200).end()
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))