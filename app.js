const express = require('express');

const app = express();

//Drill 1
app.get('/sum', (req, res) => {
    const {a, b} = req.query;

    if(!a){
        return res
            .status(400)
            .send('missing `a`');
    }
    if(!b){
        return res
            .status(400)
            .send('missing `b`');
    }
    if(Number.isNaN(a)){
        return res
            .status(400)
            .send('`a` must be a number');
    }
    if(Number.isNaN(b)){
        return res
            .status(400)
            .send('`b` must be a number');
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const c = numA + numB;
    const responseString = `The sum of ${numA} and ${numB} is ${c}.`;
    
    res
        .status(200)
        .send(responseString);
});

//Drill 2
app.get('/cipher', (req, res) => {
    const {text, shift} = req.query;

    if(!text){
        return res
            .status(400)
            .send('missing `text`');
    }

    const shiftNum = parseFloat(shift);

    if(Number.isNaN(shift)){
        return res
            .status(400)
            .send('`shift` must be a number');
    }

    const base = 'A'.charCodeAt(0);

    const cipher = text
        .toUpperCase()
        .split('')
        .map(char => {
            const code = char.charCodeAt(0);

            if(code < base || code > (base + 26)){
                return char;
            }

            let difference = code - base;
            difference += shift;
            difference = difference % 26;

            const charShift = String.fromCharCode(base + difference);
            return charShift;
        })
        .join('')

    res
        .status(200)
        .send(cipher)
});