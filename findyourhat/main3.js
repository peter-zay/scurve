const prompt = require("prompt-sync")();

// Define game characters
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
        let hatRow, hatCol, playerRow, playerCol;
        
        do {
            hatRow = Math.floor(Math.random() * height);
            hatCol = Math.floor(Math.random() * width);
            playerRow = Math.floor(Math.random() * height);
            playerCol = Math.floor(Math.random() * width);
        } while ((hatRow === playerRow && hatCol === playerCol) || (hatRow === 0 && hatCol === 0));

        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                if (i === 0 && j === 0) {
                    row.push(pathCharacter);
                } else if (i === hatRow && j === hatCol) {
                    row.push(hat);
                } else if (i === playerRow && j === playerCol) {
                    row.push(pathCharacter);
                } else {
                    row.push(Math.random() < 0.2? hole : fieldCharacter);
                }
            }
            field.push(row);
        }

        return new Field(field);
    }

    movePlayer(direction) {
        switch (direction) {
            case 'r': this.playerCol++; break;
            case 'd': this.playerRow++; break;
            case 'l': this.playerCol--; break;
            case 'u': this.playerRow--; break;
            default: console.log('Invalid direction. Please provide a valid direction.'); return false;
        }

        if (this.playerRow < 0 || this.playerRow >= this.field.length || this.playerCol < 0 || this.playerCol >= this.field[0].length) {
            console.log('Out of bounds. Provide a valid direction.');
            this.playerRow = Math.max(0, Math.min(this.playerRow, this.field.length - 1));
            this.playerCol = Math.max(0, Math.min(this.playerCol, this.field[0].length - 1));
        }

        if (this.field[this.playerRow][this.playerCol] === hat) {
            console.log('Congratulations! You found the hat. Game over!');
            return true;
        } else if (this.field[this.playerRow][this.playerCol] === hole) {
            console.log('Game over! You stepped into a hole.');
            return true;
        }

        this.field[this.playerRow][this.playerCol] = pathCharacter;

        return false;
    }

    printField() {
        console.clear();
        let fieldString = '';
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if (i === this.playerRow && j === this.playerCol) {
                    fieldString += this.field[i][j];
                } else if (i === 0 && j === 0) {
                    fieldString += '*';
                } else {
                    fieldString += this.field[i][j];
                }
            }
            fieldString += '\n';
        }
        console.log(fieldString);
    }
}

let playAgain = true;
while (playAgain) {
    const myField = Field.generateField(10, 10);
    let gameOver = false;

    while (!gameOver) {
        myField.printField();
        const direction = prompt('Which way do you want to move? (r/d/l/u): ');
        gameOver = myField.movePlayer(direction);

        if (gameOver) {
            const playAgainInput = prompt('Do you want to play again? (y/n): ');
            playAgain = playAgainInput.toLowerCase() === 'y';
        }
    }
}