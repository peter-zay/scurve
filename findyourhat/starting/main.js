class Field {
    constructor(grid) {
      this.grid = grid;
    }
  
    print() {
      for (const row of this.grid) {
        console.log(row.join(' '));
      }
    }
  
    static generateField(height, width, holePercentage) {
      const field = new Array(height).fill().map(() => new Array(width).fill('░'));
      const holeCount = Math.floor((height * width) * (holePercentage / 100));
  
      let hatPosition = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
      };
      while (hatPosition.x === 0 && hatPosition.y === 0) {
        hatPosition = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
      }
      field[hatPosition.y][hatPosition.x] = '^';
  
      for (let i = 0; i < holeCount; i++) {
        let holePosition = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
        while ((holePosition.x === 0 && holePosition.y === 0) ||
               (holePosition.x === hatPosition.x && holePosition.y === hatPosition.y) ||
               field[holePosition.y][holePosition.x] === 'O') {
          holePosition = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
          };
        }
        field[holePosition.y][holePosition.x] = 'O';
      }
  
      field[0][0] = '*';
      return field;
    }
  }
  
  // Example usage
  const height = 10;
  const width = 10;
  const holePercentage = 20;
  
  const randomField = Field.generateField(height, width, holePercentage);
  const myField = new Field(randomField);
  myField.print(); // Prints the randomly generated field
  