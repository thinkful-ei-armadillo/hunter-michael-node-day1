'use strict';
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

  const cipher = text
    .toUpperCase()
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      const base = 'A'.charCodeAt(0);

      if(code < base || code > (base + 26)){
        return char;
      }

      let difference = code - base;
      difference = difference + shiftNum;
      difference = difference % 26;

      const charShift = String.fromCharCode(base + difference);
      return charShift;
    })
    .join('');

  res
    .status(200)
    .send(cipher);
});

//Drill 3
app.get('/lotto', (req, res) => {
  const {numbers} = req.query;

  if(!numbers){
    return res
      .status(200)
      .send('missing `numbers`');
  }

  const guesses = numbers
    .map(n => parseInt(n))
    .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));

  if(guesses.length !== 6){
    return res
      .status(400)
      .send('`numbers` must contain 6 integers between 1 & 20');
  }

  const ranNums = [];
  for(let i = 0; i < 6; i++){
    const ran = Math.floor(Math.random() * 20) + 1;
    ranNums.push(ran);
  }

  let difference = ranNums.filter(n => !guesses.includes(n));
  let responseString;

  switch(difference.length){
  case 0:
    responseString = 'Wow! Unbelievable! You could have won the mega millions!';
    break;
  case 1:
    responseString = 'Congratulations! You win $100!';
    break;
  case 2:
    responseString = 'Congratulations! You win a free ticket!';
    break;
  default:
    responseString = 'Sorry, you lose.';
    break;
  }

  res.send(responseString);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});