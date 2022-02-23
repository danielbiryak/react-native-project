const server = require('express')()

const PORT = '3000'

server.get('/', (req, res) => {
    let response_text = 'Chillout'

    res.json({some_text: response_text})
})


server.listen(PORT)