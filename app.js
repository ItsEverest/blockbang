const blocks = [/*Kwadrat*/"111111111",/*2x3*/ "111111000", /*S*/"110011000", /*niskie-T*/"111010000", "111"];
const colors = ["blue", "yellow", "orange", "red", "cyan", "purple", "green"]

function genTable(tableWidth, tableHeight, tableName, trName, tdName, tableBorder, tdBorder){
    let createTable = document.createElement("table");
    let gameArea = document.getElementById("gameArea");

    createTable.style.border = tableBorder;
    createTable.style.width = (tableWidth*100)+"px";
    createTable.style.height = (tableHeight*100)+"px";
    createTable.id = tableName;
    gameArea.appendChild(createTable);

    let cellCounter = 0; 
    let rowCounter = 0;

    for(let x=0; x<tableHeight; x++){
 
        let createTr = document.createElement("tr");

        createTr.style.border = "1px solid black"
        createTr.style.height = "100px";
        createTr.id = String(trName) + rowCounter;
        createTable.appendChild(createTr);

        for(let y=0; y<tableWidth; y++){
            let createTd = document.createElement("td")
            createTd.style.border = tdBorder;
            createTd.style.width = "100px";
            createTd.id = String(tdName) + cellCounter;
            createTr.appendChild(createTd);
            cellCounter++;

        }
    }

    console.log("Generated table with parameters (tableWidth:" + tableWidth +", tableHeight:" + tableHeight + ", tableName:" + tableName + ", trName:" + trName + ", tdName:" + tdName + ", tableBorder: " + tableBorder + ", tdBorder:" + tdBorder + ")");
}

function randomBlock(){
    // Powtórzenie 3x dla każdego kształtu
    for(let x = 0; x<9; x+=3){
        // Losowy klocek na podstawie długości zbioru
        let blockNum = Math.floor(Math.random()*(blocks.length));
        console.log("Random block tableindex is: " + blockNum);
        // Losowy kolor
        let currentColor = randomColor();
        // Rysowanie kształtu
        for(let y=0; y<9; y++){
            // Iteracja przez binarnie zapisany kształt
            let temp = blocks[blockNum][y];
            // Jeśli zamalowany
            if (temp === "1") {
                let tempCell;

                if (y < 3) {
                    // Pierwszy rząd
                    tempCell = document.getElementById("setCell" + (y+x));
                    console.log("setCell" + y+x);
                } else if (y < 6) {
                    // Drugi rząd
                    tempCell = document.getElementById("setCell" + (y + 6 + x));
                    console.log("setCell" + (y+6+x));
                } else {
                    // Trzeci rząd
                    tempCell = document.getElementById("setCell" + (y + 12 + x));
                    console.log("setCell" + (y+12+x));
                }

                tempCell.style.backgroundColor = currentColor;
            }
        }
    }
}

function randomColor(){
    return colors[Math.floor(Math.random()*(colors.length))];
}

function clearSet(){
    for(let y=0; y<(9*3); y++){
        document.getElementById("setCell" + (y)).style.backgroundColor = "white";
    }
}

