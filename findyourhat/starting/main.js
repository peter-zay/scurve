const prompt = require("prompt-sync")();

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// Move the getUserDirection function outside of the Field class
function getUserDirection() {
  let direction = prompt("Enter a direction (u, d, l, r): ");

  if (!["u", "d", "l", "r"].includes(direction.toLowerCase())) {
    console.log("Invalid direction. Please enter u, d, l, or r.");
    return getUserDirection(); // Call the function recursively until a valid direction is entered
  }

  return direction;
}

class Field {
  constructor(field) {
    this.field = field;
    this.playerRow = 0; // Initialize playerRow at the top row
    this.playerCol = 0; // Initialize playerCol at the leftmost column
  }

  static generateField(height, width) {
    const field = [];

    let hatPlaced = false;
    let pathPlaced = true; // Set pathPlaced to true to avoid placing another path character

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        let character;

        if (i === 0 && j === 0) {
          character = pathCharacter; // Place the player character at the top left corner
        } else {
          const randomNumber = Math.random();
          if (!hatPlaced && randomNumber < 0.1) {
            character = hat;
            hatPlaced = true;
          } else if (!pathPlaced && randomNumber < 0.2) {
            character = pathCharacter;
            pathPlaced = true;
          } else if (randomNumber < 0.3) {
            character = hole;
          } else {
            character = fieldCharacter;
          }
        }

        row.push(character);
      }
      field.push(row);
    }

    return field;
  }

  move(direction) {
    let newRow = this.playerRow;
    let newCol = this.playerCol;

    switch (direction) {
      case "up":
        newRow--;
        break;
      case "down":
        newRow++;
        break;
      case "left":
        newCol--;
        break;
      case "right":
        newCol++;
        break;
      default:
        console.log("Invalid direction");
        return;
    }

    if (
      newRow < 0 ||
      newRow >= this.field.length ||
      newCol < 0 ||
      newCol >= this.field[0].length
    ) {
      console.log("Cannot move outside the field");
      return;
    }

    if (this.field[newRow][newCol] === hole) {
      console.log("You fell into a hole!");
      return;
    } else if (this.field[newRow][newCol] === hat) {
      console.log("Congratulations! You found the hat!");
      // Additional logic for game completion can be added here
    }

    this.field[this.playerRow][this.playerCol] = fieldCharacter;
    this.field[newRow][newCol] = pathCharacter;
    this.playerRow = newRow;
    this.playerCol = newCol;
  }

print() {
  console.clear(); // Clear the console before printing the updated field

  console.log(this.field.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      if (rowIndex === this.playerRow && colIndex === this.playerCol) {
        return pathCharacter; // Display the player's position as the path character
      } else {
        return cell;
      }
    }).join("");
  }).join("\n"));

  let blink = false;
  const blinkInterval = setInterval(() => {
    console.clear(); // Clear the console before printing the updated field

    console.log(this.field.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (rowIndex === this.playerRow && colIndex === this.playerCol) {
          return blink? fieldCharacter : pathCharacter; // Blink the player's position
        } else {
          return cell;
        }
      }).join("");
    }).join("\n"));

    this.field[this.playerRow][this.playerCol] = pathCharacter; // Reset player's position

    // Check if the game is over
    const gameOverCondition = this.field[this.playerRow][this.playerCol] === hat;
    if (gameOverCondition) {
      clearInterval(blinkInterval); // Stop blinking once the game ends
      console.log("Congratulations! You found the hat!");
    }

    blink =!blink; // Toggle the blink state
  }, 500); // Set the blinking interval in milliseconds (e.g., 500ms for half-second intervals)
}

prompt() {
  let direction;
  let gameOverCondition = false; // Initialize gameOverCondition variable

  do {
    direction = getUserDirection(); // Call the getUserDirection function to prompt the user for a direction

    switch (direction.toLowerCase()) {
      case "u":
        this.move("up");
        break;
      case "d":
        this.move("down");
        break;
      case "l":
        this.move("left");
        break;
      case "r":
        this.move("right");
        break;
    }

    // Update the field after each move
    this.print();

    // Check if the game is over
    gameOverCondition = this.field[this.playerRow][this.playerCol] === hat;
  } while (!gameOverCondition);

  // Display the final state of the field after game completion
  console.log("Congratulations! You found the hat!");
  this.print();

  // End the game
  process.exit(0);
}
}

const field = Field.generateField(10, 10); // Generating a 10x10 field
const myField = new Field(field);

myField.print(); // Display the initial field
myField.prompt(); // Start playing the game
