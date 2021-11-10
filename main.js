const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
  };
  print() {
    console.log(this.field);
  };

  static generateField(width, height) {
    const characters = [hole, fieldCharacter];
    var result = [];
    for (var i = 0 ; i < width; i++) {
        result[i] = [];
        for (var j = 0; j < height; j++) {
          let multiplier = Math.random();
          if (multiplier > 0.75) {
      var fun = 0
    } else {
      var fun = 1
    };
    let chooser = characters[fun];
            result[i][j] = chooser;
        }
    }
    result[0][0] = pathCharacter;
    let row = Math.floor(Math.random()*width);
    let column = Math.floor(Math.random()*height);
    result[column][row] = hat;
    return result;
  }
};

function startGame(startPos=[0,0], game=new Field(Field.generateField(6,5))) {
  console.log(game.field);                                                              //displays the state of the game

  var move = prompt("what direction?");                                                 //Prompts user input for direction
  if (!['l','r','d','u'].includes(move)) {
    return "You can only move left, right, up or down";                                 //Checks if user input is invalid
  } else {                                                                              //Exits the function if user input is invalid
    let newPos = startPos;
    switch(move) {                                                                      //Computes new position
      case "l":
        newPos[1] = newPos[1]-1;
        break;
      case "r":
        newPos[1] = newPos[1]+1;
        break;
      case "d":
        newPos[0] = newPos[0]+1;
        break;
      case "u":
        newPos[0] = newPos[0]-1;
    };

    if (newPos.some(v => v < 0) || newPos[0]==game.field.length || newPos[1]==game.field[0].length) {
        console.log('out');
        return "out of bounds";
    } else if (game.field[newPos[0]][newPos[1]] == "O") {
        console.log(game.field[newPos[0]][newPos[1]])
        return "You fell in a hole";
    } else if (game.field[newPos[0]][newPos[1]] == "^") {
        console.log("You found it!!!")
        return "You Found It!!!";
    } else {
      game.field[newPos[0]][newPos[1]] = "*";
      startGame(newPos, game);
    };
  };
};

console.log(startGame());