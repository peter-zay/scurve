const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*'

class Field {
    static generateField() {
        const field = [];
        const characters = [hole, fieldCharacter,hat];
        let hatPlaced = false;

        for (let i = 0; i < 10; i++) {
            field[i] = [];
            for (let j = 0; j < 10; j++) {
                if (i === 0 && j === 0) {
                    field[i][j] = pathCharacter
                } 
                else {
                    const randomChar = characters[Math.floor(Math.random() * characters.length)];
                    field[i][j] = randomChar;
                }
            }
        }

        return field;
    }
}

// Create the playing field
const generatedField = Field.generateField();
console.log(generatedField);