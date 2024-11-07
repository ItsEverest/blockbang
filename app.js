let gameGrid = [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]];
let tempAssignedColors = [];
let heldBlockValue = 0;
let tableSetHolder;
let blocks = [/*Square 3x3*/"0000001110011100111000000", /*T*/ "0000001110001000000000000"];
let colors = ["yellow", "red", "blue", "green", "cyan", "purple", "orange"];

let gameArea = document.getElementById("gameArea");
let tableCounter = 0;

function tableGen(tableWidth, tableHeight, tableWidth_px, tableHeight_px, tableId, trId, tdId, borderStyle, isMainArea){
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
    }
    placeElement();
}

function selectElement(tempBlock, x){
    if(heldBlockValue==0){
        heldBlockValue = tempBlock;
        tableSetHolder = document.getElementById('tableSet' + (x+1));
        tableSetHolder.style.position = 'absolute';
        tableSetHolder.style.pointerEvents = 'none';

        document.addEventListener('mousemove', function(ev){
            document.getElementById('tableSet' + (x+1)).style.transform = 'translateY('+(ev.clientY-115)+'px)';
            document.getElementById('tableSet' + (x+1)).style.transform += 'translateX('+(ev.clientX-105)+'px)';           
        },false);
    }
}

function placeElement(xColorsArray){
    const container = document.getElementById('tableGame0');
    container.addEventListener('click', function(event){
        const clickedElement = event.target;


    // Area emptiness check
        console.log(heldBlockValue);

        let tdGame;
        let counter = 0;
        let isValid = true;
        for(let x=-2;x<3;x++){
            for(let y=-2;y<3;y++){
                tdGame = document.getElementById(String((clickedElement.id).substring(0, 8) + "_" + (parseInt(clickedElement.id[9])+y) + "_" + (parseInt(clickedElement.id[11])+x)));
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
        if(isValid){
            counter = 0;
            for(let x=-2;x<3;x++){
                for(let y=-2;y<3;y++){
                    if(heldBlockValue[counter] == 1){
                        tdGame = document.getElementById(String((clickedElement.id).substring(0, 8) + "_" + (parseInt(clickedElement.id[9])+y) + "_" + (parseInt(clickedElement.id[11])+x)));
                        tdGame.style.backgroundColor = tempAssignedColors[tableSetHolder.id[8]-1];
                    }
                    counter++;
                }
            }
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

