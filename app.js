let gameGrid = [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]];
let elements = [];
let blocks = [/*Square 3x3*/"0000001110011100111000000", /*T*/ "0000001110001000000000000"];
let colors = ["yellow", "red", "blue", "green", "cyan", "purple", "orange"];

let gameArea = document.getElementById("gameArea");
let tableCounter = 0;

function tableGen(tableWidth, tableHeight, tableWidth_px, tableHeight_px, tableId, trId, tdId, borderStyle){
    let gameTable = document.createElement("table");

    gameTable.id = String(tableId) + tableCounter;

    gameTable.style.border = borderStyle;
    gameTable.style.width = String(tableWidth_px) + "px";
    gameTable.style.height = String(tableHeight_px) + "px";
    gameTable.style.transition = "transform 0.1s ease";
    gameArea.appendChild(gameTable);

    let trCounter = 0;
    let tdCounterX = 0;
    let tdCounterY = 0;

    for(let y = 0; y < tableHeight; y++){
        let gameTr = document.createElement("tr");

        gameTr.id = String(trId) + trCounter;
        gameTable.appendChild(gameTr);
        trCounter++;

        for(let x = 0; x < tableWidth; x++){
            let gameTd = document.createElement("td");

            gameTd.id = String(tdId) + "_" + tableCounter + "_" + tdCounterX + "_" + tdCounterY;
            gameTd.style.border = "1px solid black";
            gameTr.appendChild(gameTd);
            tdCounterX++;

            if((tdCounterX+1) % tableWidth-1 == 0){
                tdCounterX = 0;
                tdCounterY++;
            }

        }
    }
    tableCounter++;
}

function setGen(){
    // Select correct tableSet area
    for(let x = 0; x<(tableCounter-1); x++){
        console.log("REPETITION " + x);
        let tableSet = document.getElementById(("tableSet"+(x+1)));
        let tdCounterX = 0;
        let tdCounterY = 0;

        // Get random block and color for current iteration
        let tempColor = colors[randomColor()];
        let tempBlock = blocks[randomBlock()];

        // Repeat 25 times for each pixel
        for(let y = 0; y<25; y++){

            let tdSet = document.getElementById(("tdSet" + "_" + (x+1) + "_" + tdCounterX + "_" + tdCounterY));
            console.log(("tdSet" + "_" + (x+1) + "_" + tdCounterX + "_" + tdCounterY));

            // If it is meant to be filled, color it with current color
            if(tempBlock[y] == 1){
                tdSet.style.backgroundColor = tempColor;
                tdSet.addEventListener("click", () => selectElement(tempBlock, x));
            } else{
                tdSet.style.backgroundColor = "white";
                tdSet.addEventListener("click", () => selectElement(tempBlock, x));
            }

            // Counting collumns and rows for ID referencing
            tdCounterX++;

            if((tdCounterX) % 5 == 0){
                tdCounterX = 0;
                tdCounterY++;
            }


        }
    }
}

function selectElement(tempBlock, x){
    const table = document.getElementById('tableSet' + (x+1));
    table.style.position = 'absolute';

    document.addEventListener('mousemove', function(ev){
        document.getElementById('tableSet' + (x+1)).style.transform = 'translateY('+(ev.clientY-115)+'px)';
        document.getElementById('tableSet' + (x+1)).style.transform += 'translateX('+(ev.clientX-105)+'px)';            
    },false);
}





function randomBlock(){
    let temp = getRandomInt(blocks.length);
    console.log("blocks[] = " + temp);
    return temp;
}

function randomColor(){
    let temp = getRandomInt(colors.length);
    console.log("colors[] = " + temp);
    return temp;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}