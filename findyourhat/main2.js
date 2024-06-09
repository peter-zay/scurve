const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.hatRow = 0;
    this.hatCol = 0;
    this.playerRow = 0;
    this.playerCol = 0;
  }

  static generateField(height, width) {
    let field = [];
    let hatRow = Math.floor(Math.random() * height);
    let hatCol = Math.floor(Math.random() * width);

    if (hatRow === 0 && hatCol === 0) {
      hatRow = Math.floor(Math.random() * (height - 1)) + 1;
      hatCol = Math.floor(Math.random() * (width - 1)) + 1;
    }

    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        if (i === 0 && j === 0) {
          row.push(pathCharacter);
        } else {
          row.push(i === hatRow && j === hatCol ? hat : fieldCharacter);
        }
      }``
      field.push(row);
    }

    return new Field(field);
  }

movePlayer(direction) {
    switch (direction) {
        case 'r':
            this.playerCol++;
            break;
        case 'd':
            this.playerRow++;
            break;
        case 'l':
            this.playerCol--;
            break;
        case 'u':
            this.playerRow--;
            break;
        default:
            console.log('Invalid direction. Please provide a valid direction.');
    }

    if (this.playerRow < 0 || this.playerRow >= this.field.length || this.playerCol < 0 || this.playerCol >= this.field[0].length) {
        console.log('Out of bounds. Provide a valid direction.');
        this.playerRow = Math.max(0, Math.min(this.playerRow, this.field.length - 1));
        this.playerCol = Math.max(0, Math.min(this.playerCol, this.field[0].length - 1));
    }

    if (this.field[this.playerRow][this.playerCol] === hat) {
        console.log('Congratulations! You found the hat. Game over!');
    } else {
        this.field[this.playerRow][this.playerCol] = pathCharacter;
        console.clear(); // Clear the console
        this.printField(); // Print the updated field
    }
}

  printField() {
    const fieldString = this.field.map(row => row.join('')).join('\n');
    console.log(fieldString);
  }
}

const myField = Field.generateField(10, 10);
myField.printField();

while (myField.field[myField.playerRow][myField.playerCol] !== hat) {
  const direction = prompt('Which way do you want to move? (r/d/l/u): ');
  myField.movePlayer(direction);
}