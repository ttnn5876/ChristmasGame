
const express = require('express')

const generateRandomUid = () => {
    return Math.random().toString(36).substring(2, 8);
}

const shuffleArray = (array) => {
    for (var i = array.length -1; i > 0; i--) {

        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

const data = [
    { name: 'Inay', color: '#FF6B6B', uid: generateRandomUid() },
    { name: 'Tal', color: '#6BFF6B', uid: generateRandomUid() },
    { name: 'Litay', color: '#6B6BFF', uid: generateRandomUid() },
    { name: 'Artur', color: '#6BFFD4', uid: generateRandomUid() },
    { name: 'Gil', color: '#FF6BCD', uid: generateRandomUid() },
    { name: 'Bianca', color: '#FFD46B', uid: generateRandomUid() },
    { name: 'Noe', color: '#6B96FF', uid: generateRandomUid() },
    { name: 'Dean', color: '#D46BFF', uid: generateRandomUid() }
]; 

const getPlayerByUid = (uid) => {
    return data.find(player => player.uid === uid)
}

var draft = []
const app = express()
const port = process.env.PORT || 3000;

const init_draft = () => {

    draft = shuffleArray([...data])
    for (let i = 0; i < data.length ; i++) {
        draft[i].partner = draft[(i + 1) % data.length].name

    }
}

app.get('/:uid', (req, res) => {
    const playerObj = getPlayerByUid(req.params.uid)

    if (playerObj) {
        console.log(`${playerObj.name} accessed`)
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Merry Christmas ${playerObj.name}</title>
                <style>
                    body {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        margin: 0;
                        font-family: 'M PLUS Rounded 1c', cursive;
                        background-color: ${playerObj.color};
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
                    <h1>Merry Christmas ${playerObj.name}</h1>
                    <p>Your partner for this year's game is <strong>${playerObj.partner}!</strong></p>
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

    printedDraft = shuffleArray(draft)

    printedDraft.forEach(playerObj => {
        console.log(`${playerObj.name} - https://christmasgame.onrender.com/${playerObj.uid}`)
    })
    console.log("\nAccess Log:\n")
})
