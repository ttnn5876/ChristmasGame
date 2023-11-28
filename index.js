
const express = require('express')

const players = ['Inay', 'Tal', 'Litay', 'Artur', 'Gil', 'Bianca', 'Noe', 'Dean']
const draft = {}

const app = express()
const port = process.env.PORT || 3000;

const init_draft = () => {

    const shuffledNames = [...players]
    for (var i = shuffledNames.length -1; i > 0; i--) {

        var j = Math.floor(Math.random() * (i + 1))
        var temp = shuffledNames[i]
        shuffledNames[i] = shuffledNames[j]
        shuffledNames[j] = temp

    }
    shuffledNames.forEach((name, index) => {
        if (index == shuffledNames.length - 1) {
            draft[shuffledNames[index]] = shuffledNames[0]
        }
        else {
            draft[shuffledNames[index]] = shuffledNames[index + 1]
        }
    })
}

app.get('/:name', (req, res) => {
    const playerName = req.params.name
    const match = draft[playerName]

    if (match) {
        console.log(`${playerName} accessed`)
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Merry Christmas John</title>
                <style>
                    body {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        margin: 0;
                        font-family: 'M PLUS Rounded 1c', cursive;
                        background-color: #f59fce;
                    }
                    div {
                        text-align: center;
                    }
                    h1 {
                        font-size: 3em;
                    }
                    p {
                        font-size: 1.5em;
                    }
                    strong {
                        font-weight: bold;
                        font-size: 1.8em; 
                    }
                </style>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700&display=swap" rel="stylesheet">
            </head>
            <body>
                <div>
                    <h1>Merry Christmas ${playerName}</h1>
                    <p>Your partner for this year's game is <strong>${match}!</strong></p>
                </div>
            </body>
        </html>
        `
        res.send(htmlContent)
    } else {
        res.status(404).send('Player not found')
    }
})

app.listen(port, () => {
    init_draft()
    console.log(`Started Server on ${port}`)
})