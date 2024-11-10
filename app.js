let gameGrid = [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]];
let heldBlockValue = 0;
let scoreValue = 0;
let tableSetHolder;
let blocks = [
    // Square block - 3x3 in the center of 5x5 grid (only one orientation)
    "0000001110011100111000000",

    // T-shaped block - 4 orientations
    "0000000000001000111000000", // Default orientation
    "0000001000011000100000000", // 90 degrees
    "0000001110001000000000000", // 180 degrees
    "0000000010001100001000000", // 270 degrees

    // L-shaped block - 4 orientations
    "0000000100001000011000000", // Default orientation
    "0000000000011100100000000", // 90 degrees
    "0000000110001000010000000", // 180 degrees
    "0000000010011100000000000", // 270 degrees

    // Big L-shaped block
    "0000001000010000111000000", // Default orientation
    "0000001110010000100000000", // 90 degrees
    "0000001110000100001000000", // 180 degrees
    "0000000010000100111000000", // 270 degrees

    // Small L-shaped block
    "0000000100011000000000000", // Default orientation
    "0000000100001100000000000", // 90 degrees
    "0000000000001100010000000", // 180 degrees
    "0000000000011000010000000", // 270 degrees

    // Rectangle 2x3
    "0000000000011100111000000", // Horizontal
    "0000001100011000110000000", // Vertical

    // Line block l4 - 2 orientations
    "0010000100001000010000000", // Vertical
    "0000000000011110000000000", // Horizontal

    // Line block l5 - 2 orientations
    "0010000100001000010000100", // Vertical
    "0000000000111110000000000", // Horizontal

    // Z-shaped block - 2 orientations
    "0000000100001100001000000", // Default orientation
    "0000000000011000011000000", // 90 degrees

    // 2 corners - 2 orientations
    "0000001000001000000000000",
    "0000000010001000000000000",

    // Mirror images of L-shaped block - 4 orientations
    "0000000100001000110000000", // Mirrored Default orientation
    "0000001000011100000000000", // Mirrored 90 degrees
    "0000000110001000010000000", // Mirrored 180 degrees
    "0000000000011100001000000", // Mirrored 270 degrees

    // Mirror images of Z-shaped block - 2 orientations
    "0000001000011000010000000", // Mirrored Default orientation
    "0000000000001100110000000"  // Mirrored 90 degrees

];
let colors = ["yellow", "red", "blue", "green", "cyan", "purple", "orange"];

let gameArea = document.getElementById("gameArea");
let tableCounter = 0;
let setTableCounter = 0;

function tableGen(tableWidth, tableHeight, tableWidth_px, tableHeight_px, tableId, trId, tdId, borderStyle, td_borderStyle){
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
            gameTd.style.border = td_borderStyle;
            gameTd.style.backgroundColor = "white";

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
    tempAssignedColors = [];

    // Select correct tableSet area
    for(let x = 0; x<3; x++){
        console.log("REPETITION " + (x + (tableCounter-1)));
        let tableSet = document.getElementById(("tableSet"+(x+1)));
        let tdCounterX = 0;
        let tdCounterY = 0;

        // Get random block and color for current iteration
        let tempColor = colors[randomColor()];
        let tempBlock = blocks[randomBlock()];

        // Repeat 25 times for each pixel
        for(let y = 0; y<25; y++){

            let tdSet = document.getElementById(`tdSet_${setTableCounter+1}_${tdCounterX}_${tdCounterY}`);
            console.log(`tdSet_${setTableCounter+1}_${tdCounterX}_${tdCounterY}`);

            // If it is meant to be filled, color it with current color
            if(tempBlock[y] == "1"){
                tdSet.style.backgroundColor = tempColor;
                // Storing colors till placement
                tempAssignedColors[x] = tempColor;
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
        setTableCounter++;
    }
    placeElement();
}


function moveBlock(ev){
    if(tableSetHolder){
        tableSetHolder.style.transform = 'translateY(' + (ev.clientY - 200) + 'px)';
        tableSetHolder.style.transform += 'translateX(' + (ev.clientX - 105) + 'px)';        
    }
}

function selectElement(tempBlock, x){
    if(heldBlockValue==0){
        heldBlockValue = tempBlock;
        tableSetHolder = document.getElementById('tableSet' + (x + (tableCounter-3)));
        tableSetHolder.style.position = 'absolute';
        tableSetHolder.style.pointerEvents = 'none';

        tableSetHolder.blockColor = tempAssignedColors[x];

        document.addEventListener('mousemove', moveBlock, false);
    }
}

function lineCheck(){

    for(let y = 0; y<8; y++){

        if (gameGrid[y].every(value => value === 1)) {
            console.log('Column ' + y + ' is all 1s');
            lineClear(y, false);
        }
        let isRowFull = true;
        for(let x = 0; x<8; x++){

            if(gameGrid[x][y] != 1){
                isRowFull = false;
                break;
            }
        }
        if(isRowFull){
            console.log('Row ' + y + ' is all 1s');
            lineClear(false, y)
        }
    }
}

function lineClear(x, y){
    if(x){
        //Column
        for(let z = 0; z<8; z++){
            let tempTd = document.getElementById("tdGame_0_" + x + "_" + z);
            tempTd.style.backgroundColor = "white";
            gameGrid[x][z] = 0;
        }
        updateScore(16);
    } else{
        //Row
        for(let z = 0; z<8; z++){
            let tempTd = document.getElementById("tdGame_0_" + z + "_" + y);
            tempTd.style.backgroundColor = "white";
            gameGrid[z][y] = 0;
        }
        updateScore(16);
    }
}

function placeElement(){
    const container = document.getElementById('tableGame0');
    container.addEventListener('click', function(event){
        const clickedElement = event.target;

        if (!heldBlockValue) {
            console.log("No block held for placement.");
            return;
        }

    // Area emptiness check
        console.log("Before check:" + heldBlockValue);

        let tdGame;
        let counter = 0;
        let isValid = true;
        for(let x=-2;x<3;x++){
            for(let y=-2;y<3;y++){
                tdGame = document.getElementById(String((clickedElement.id).substring(0, 8) + "_" + (parseInt(clickedElement.id[9])+y) + "_" + (parseInt(clickedElement.id[11])+x)));
                console.log("Scanning Process: " + String((clickedElement.id).substring(0, 8) + "_" + (parseInt(clickedElement.id[9])+y) + "_" + (parseInt(clickedElement.id[11])+x)));
                if(heldBlockValue[counter] == 1){
                    if(tdGame && isValid){
                            if(tdGame.style.backgroundColor != "white"){
                                console.log("Not empty space")
                                isValid = false;
                            }
                        } else{
                            console.log("Failed attempt or out of bounds...")
                            isValid = false;
                        }
                } else {
                    console.log("Space not needed")
                }
                counter++;
            }
        }

        //If check is sucessfull, fill out the space
        console.log("After check:" + heldBlockValue);
        if(isValid){
            counter = 0;
            for(let x=-2;x<3;x++){
                for(let y=-2;y<3;y++){
                    if(heldBlockValue[counter] == "1"){
                        tdGame = document.getElementById(String((clickedElement.id).substring(0, 8) + "_" + (parseInt(clickedElement.id[9])+y) + "_" + (parseInt(clickedElement.id[11])+x)));
                        console.log("Placement Process: " + String((clickedElement.id).substring(0, 8) + "_" + (parseInt(clickedElement.id[9])+y) + "_" + (parseInt(clickedElement.id[11])+x)));
                        console.log ("Placement Process tableSetHolder.id: " + (tableSetHolder.id[8]-1) + ", coressponding tempAssignedColors: " + tableSetHolder.blockColor);
                        tdGame.style.backgroundColor = tableSetHolder.blockColor;

                        gameGrid[parseInt(clickedElement.id[9])+y][parseInt(clickedElement.id[11])+x] = 1;
                    }
                    counter++;
                }
            }
            tableSetHolder.remove();
            document.removeEventListener('mousemove', moveBlock);
            let countOnes = (heldBlockValue.match(/1/g) || []).length;
            updateScore(countOnes);
            heldBlockValue = 0;
            tableSetHolder = null;
            lineCheck();
        } else {
            console.log("Block cannot be placed here.");
        }
    })
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

function updateScore(amount){
    let score = document.getElementById("score");
    scoreValue += amount;
    score.innerHTML = "Score: " + scoreValue;
}

//Amount of blocks = amount of points
//One line = cleared line amount x 2