
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
    // { name: 'Inay', color: '#FF6B6B', uid: generateRandomUid() }, // :(
    { name: 'Tal', color: '#de1836', uid: generateRandomUid() },
    { name: 'Litay', color: '#5f73e3', uid: generateRandomUid() },
    { name: 'Artur', color: '#a8d156', uid: generateRandomUid() },
    { name: 'Gil', color: '#4bd2d6', uid: generateRandomUid() },
    { name: 'Bianca', color: '#dae83c', uid: generateRandomUid() },
    { name: 'Noe', color: '#f50f44', uid: generateRandomUid() },
    { name: 'Dean', color: '#f04f32', uid: generateRandomUid() }
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
            <title>Dynamic Text with Button</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(45deg, ${playerObj.color}, #ffffff);
                    font-family: "DynaPuff", system-ui;
                    color: #fff;
                }
                #text-container {
                    text-align: center;
                    font-size: 2rem;
                    line-height: 1.5;
                }
                .line {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 1s, transform 1s;
                    text-shadow: 0 0 1px #808080, 0 0 2px #808080, 0 0 3px #808080;
                }
                .line.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                #reveal-button {
                    opacity: 0;
                    margin-top: 20px;
                    padding: 10px 20px;
                    font-size: 1.2rem;
                    font-family: "DynaPuff", system-ui;
                    color: #ff9a9e;
                    background: #fff;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                    transition: opacity 1s, transform 0.2s, box-shadow 0.2s;
                }
                #reveal-button.visible {
                    opacity: 1;
                }
                #reveal-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
                }
                #extra-line {
                    margin-top: 20px;
                    font-size: 3rem;
                    opacity: 0;
                    transform: scale(0.8);
                    transition: opacity 1s, transform 1s;
                }
                #extra-line.visible {
                    opacity: 1;
                    transform: scale(1);
                }
            </style>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&display=swap" rel="stylesheet">
            
        </head>
        <body>
            <div id="text-container">
                <div class="line">Hi ${playerObj.name} ☺️</div>
                <div class="line">Christmas is coming up!</div>
                <div class="line">Who will you spoil this year?</div>
            </div>
            <button id="reveal-button">CLICK HERE TO FIND!</button>
            <div id="extra-line">${playerObj.partner}!</div>
            
            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    const lines = document.querySelectorAll('.line');
                    const button = document.getElementById('reveal-button');
                    const extraLine = document.getElementById('extra-line');

                    // Show lines sequentially
                    lines.forEach((line, index) => {
                        setTimeout(() => {
                            line.classList.add('visible');
                            if (index === lines.length - 1) {
                                setTimeout(() => {
                                    button.classList.add('visible');
                                }, 2000);
                            }
                        }, index * 2000);
                    });

                    // Reveal extra text when button is clicked
                    button.addEventListener('click', () => {
                        extraLine.classList.add('visible');
                    });
                });
            </script>
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
