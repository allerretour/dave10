    const games = [];
    let currentGameIndex = 0;

    function getRandomNumber(max) {
      return Math.floor(Math.random() * (max + 1));
    }

    function generateUniqueRandomNumberPairs(count) {
      let uniquePairs = new Set();
      while (uniquePairs.size < count) {
        let pair = [getRandomNumber(16), getRandomNumber(8)];
        uniquePairs.add(pair.toString());
      }
      return Array.from(uniquePairs).map(pair => pair.split(",").map(Number));
    }

    function getColor(number) {
      const colors = [
        "yellow", "blue", "red", "purple", "orange",
        "green", "maroon", "black", "yellow", "blue",
        "red", "purple", "orange", "green", "maroon",
      ];
      return colors[number - 1] || "white";
    }

function drawGrid(ctx, width, height) {
  ctx.strokeStyle = "#ddd";
  const xSpacing = width / 18;
  const ySpacing = height / 10;

  // Draw the vertical grid lines
  for (let x = 0; x <= 16; x++) {
    let xPos = (x + 1) * xSpacing;
    ctx.beginPath();
    ctx.moveTo(xPos, ySpacing);
    ctx.lineTo(xPos, height - ySpacing);
    ctx.stroke();
    
    // Draw black lines over the 1st, 5th, 9th, 13th, and 17th vertical lines (indices 0, 4, 8, 12, 16)
    if (x === 0 || x === 4 || x === 8 || x === 12 || x === 16) {
      ctx.strokeStyle = "grey"; // Change stroke color to black
      ctx.beginPath();
      ctx.moveTo(xPos, ySpacing);
      ctx.lineTo(xPos, height - ySpacing);
      ctx.stroke();
      ctx.strokeStyle = "#ddd"; // Reset stroke color back to light grey
    }
  }

  // Draw the horizontal grid lines
  for (let y = 0; y <= 8; y++) {
    let yPos = height - (y + 1) * ySpacing;
    ctx.beginPath();
    ctx.moveTo(xSpacing, yPos);
    ctx.lineTo(width - xSpacing, yPos);
    ctx.stroke();
    
    // Draw black lines over the 1st, 4th, and 9th horizontal lines (indices 0, 3, 8)
    if (y === 0 || y === 4 || y === 8) {
      ctx.strokeStyle = "grey"; // Change stroke color to black
      ctx.beginPath();
      ctx.moveTo(xSpacing, yPos);
      ctx.lineTo(width - xSpacing, yPos);
      ctx.stroke();
      ctx.strokeStyle = "#ddd"; // Reset stroke color back to light grey
    }
  }


// Write numbers 0 to 16 in the last row (index 8 in the grid, which is the last horizontal line)
const lastRowYPos = height - ySpacing / 2; // Adjust Y position for the numbers
ctx.font = "bold 16px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

for (let i = 0; i <= 16; i++) {
  let xPos = (i + 1) * xSpacing;

  // Set color: black for even numbers except 0, 8, and 16
  if (i !== 0 && i % 2 === 0 && i !== 8 && i !== 16) {
    ctx.fillStyle = "black"; // Black color for even numbers except 0, 8, and 16
  } else {
    ctx.fillStyle = "lightgrey"; // Light grey for 0, 8, 16, and odd numbers
  }
  
  ctx.fillText(i, xPos, lastRowYPos); // Draw the number at each X position
}

// Write numbers 0 to 8 in the first column (starting from the top)
const firstColumnXPos = xSpacing / 2; // Position for the first column, at the left side of the canvas
for (let i = 0; i <= 8; i++) {
  let yPos = height - (i + 1) * ySpacing + ySpacing / 2 - 13; // Move the numbers slightly higher to align with the horizontal lines
  
  // Set color: black for even numbers except 0, 8, and 16
  if (i !== 0 && i % 2 === 0 && i !== 8 && i !== 16) {
    ctx.fillStyle = "black"; // Black color for even numbers except 0, 8, and 16
  } else {
    ctx.fillStyle = "lightgrey"; // Light grey for 0, 8, 16, and odd numbers
  }

  ctx.fillText(i, firstColumnXPos, yPos); // Draw the number in the first column
}



}




    function drawCircles(ctx, pairs) {
      pairs.forEach((pair, index) => {
        let x = (pair[0] + 1) * (ctx.canvas.width / 18);
        let y = ctx.canvas.height - ((pair[1] + 1) * (ctx.canvas.height / 10));

        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI); // Circle radius set to 10
        ctx.fillStyle = getColor(index + 1);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.fillStyle = (index + 1 === 1 || index + 1 === 9) ? "black" : "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(index + 1, x, y); // Centered text inside circle
      });
    }

    function drawTableAndCircles(canvas, pairs) {
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas.width, canvas.height);
      drawCircles(ctx, pairs);
    }

    function generateGames() {
      for (let i = 1; i <= 10; i++) {
        const elementsContainer = document.createElement("div");
        elementsContainer.className = "elements-container";
        elementsContainer.style.display = i === 1 ? "block" : "none";

        const roundTitle = document.createElement("div");
        roundTitle.className = "round-title";
        
        const ball = document.createElement("span");
        ball.className = "ball";
        ball.style.backgroundColor = getColor(i); // Boule avec la couleur correspondante
        ball.textContent = i;

        // Applique du style noir aux boules 1 et 9
        if (i === 1 || i === 9) {
          roundTitle.innerHTML = `Diagramme avec <span class="ball" style="background-color: ${getColor(i)}; color: black;">${ball.textContent}</span> boule${i > 1 ? 's' : ''}`;
        } else {
          roundTitle.innerHTML = `Diagramme avec ${ball.outerHTML} boule${i > 1 ? 's' : ''}`;
        }

        let zd = 1 + getRandomNumber(7);
        let za = 1+ getRandomNumber(7);
        while (zd === za) {
          za = 1 + getRandomNumber(7);
        }

        const extraFields = document.createElement("div");
        extraFields.className = "extra-fields";
        extraFields.innerHTML = `
          <button class="btn-zd">ZD : ${zd}</button>
          <button class="btn-za">ZA : ${za}</button>
        `;

        elementsContainer.appendChild(roundTitle);
        elementsContainer.appendChild(extraFields);

        const tableContainer = document.createElement("div");
        tableContainer.className = "table-container";
        const table = document.createElement("table");
        table.innerHTML = `
          <tr>
            <th>Boule</th>
            <th>Position</th>
          </tr>
        `;
        const pairs = generateUniqueRandomNumberPairs(i);
        pairs.forEach((pair, index) => {
          const row = table.insertRow();
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          cell2.textContent = `H${pair[0]} / V${pair[1]}`; // Modified format here

          const ball = document.createElement("span");
          ball.className = "ball";
          ball.style.backgroundColor = getColor(index + 1);
          ball.textContent = index + 1;

          // Application de la couleur de texte noir pour les boules 1 et 9
          if (index + 1 === 1 || index + 1 === 9) {
            ball.style.color = "black";
          }
          
          cell1.appendChild(ball);
        });

        tableContainer.appendChild(table);
        elementsContainer.appendChild(tableContainer);

        const canvasContainer = document.createElement("div");
        canvasContainer.className = "canvas-container";
        const canvas = document.createElement("canvas");
        canvas.width = 650;
        canvas.height = 250;
        canvas.style.display = "none";
        canvasContainer.appendChild(canvas);


        elementsContainer.appendChild(canvasContainer);
        drawTableAndCircles(canvas, pairs);

        games.push({ elementsContainer, pairs, canvas });

        const diagrammeButton = document.createElement("button");
        diagrammeButton.className = "diagramme-button";
        diagrammeButton.textContent = "Diagramme";
        diagrammeButton.onclick = function() {
          canvas.style.display = canvas.style.display === "none" ? "block" : "none";
        };
        
        elementsContainer.appendChild(diagrammeButton);
      }
    }

    function showGame(index) {
      if (index >= 0 && index < games.length) {
        games.forEach((game, i) => {
          game.elementsContainer.style.display = i === index ? "block" : "none";
        });

        const buttons = document.querySelectorAll(".button-container button");
        buttons.forEach((button, i) => {
          button.classList.toggle("selected", i === index);
        });

        document.getElementById("gameContainer").innerHTML = "";
        document.getElementById("gameContainer").appendChild(games[index].elementsContainer);
      }
    }

    function exportGameCoordinates() {
  let content = "Diagrammes de 1 à 10\n\n";
  
  
  // Add date to the filename
  const currentDate = new Date().toLocaleDateString().replace(/\//g, '-'); // Format the date
  const filename = `DAVE10_${currentDate}.txt`;
  
content += `Généré : ${currentDateTime}\n\n`

  games.forEach((game, i) => {
    content += `Diagramme ${i + 1}:\n`;
    // Include ZD and ZA
    const zdZaButtons = game.elementsContainer.querySelectorAll(".btn-zd, .btn-za");
    const zd = zdZaButtons[0].textContent.split(":")[1].trim();
    const za = zdZaButtons[1].textContent.split(":")[1].trim();
    
    content += `ZD: ${zd}, ZA: ${za}\n`;
    
    game.pairs.forEach((pair, index) => {
      content += `(${index +1}) : H${pair[0]} / V${pair[1]}\n`;
    });
    
    content += "\n";
  });

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename; // Use the formatted filename
  link.click();
}


    generateGames();
    showGame(currentGameIndex);

    // Display current date and time
    const currentDateTime = new Date().toLocaleString();
    document.getElementById("currentDateTime").textContent = currentDateTime;