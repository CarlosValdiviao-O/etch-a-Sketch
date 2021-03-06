const DEFAULT_COLOR = 'rgb(0, 0, 0)';
const DEFAULT_SIZE = 10;

let num = DEFAULT_SIZE;
let color = DEFAULT_COLOR;
const container = document.getElementsByClassName('container');

let colorPicked = document.querySelector('#colorPicker');
colorPicked.addEventListener('input', () => {
    color = colorPicked.value;
    rainbowMode=false;
});

colorPicked.addEventListener('click', () => {
    if (!rainbowMode){
        rainbowMode = true;
        togglePressed(rainbowButton);
        togglePressed(colorButton);
        togglePressed(colorPicked);
    }
});

let colorButton = document.querySelector('#color');
colorButton.classList.toggle('pressed');
colorButton.addEventListener('click', () => { 
    togglePressed(rainbowButton);
    togglePressed(colorButton);
    togglePressed(colorPicked);
    rainbowMode ? rainbowMode = false: rainbowMode = true
});

let opacityMode = false;
let opacity = document.querySelector('#opacity');
opacity.addEventListener('click', () => { 
    opacityMode ? opacityMode = false: opacityMode = true;
    togglePressed(opacity)
});

let rainbowMode = false;
let rainbowButton = document.querySelector('#rainbow');
rainbowButton.addEventListener('click', () => { rainbowMode ? rainbowMode = false: rainbowMode = true ;
    togglePressed(rainbowButton);
    togglePressed(colorButton);
    togglePressed(colorPicked);
});

let clear = document.querySelector('#clear');
clear.addEventListener('click', clearGrid);

let slider = document.querySelector("#slider");
slider.addEventListener('input', updateSizeBox);

let sliderBox = document.querySelector("#sliderBox");
sliderBox.addEventListener('mouseup',updateSize);

let size = document.querySelector('#sizeBox');
let sizeChangeAux = 10;

let toggGrid = document.querySelector('#toggleGrid');
toggGrid.addEventListener('click', toggleGrid);
toggGrid.classList.toggle('pressed');
let toggleAux = false;

createDivs (num);

function createDivs (num) {
    for (let i=0;i<num;i++){
        const div = document.createElement('div');
        div.classList.add('column');    
        container[0].appendChild(div);
        const column = document.getElementsByClassName('column');
        for (let j=0;j<num;j++){
            const block = document.createElement('div');
            block.classList.add('row');
            if (toggleAux) block.classList.add('noBorder');
            block.addEventListener('mouseover',changeColor);
            block.addEventListener('mousedown',changeColor);
            block.ondragstart= function() { return false; };
            column[i].appendChild(block);
        }
    }
}

function togglePressed (e) {
    e.classList.toggle('pressed');
}

function updateSizeBox() {
    size.textContent=`${slider.value}x${slider.value}`;
}

function updateSize(){
    if (sizeChangeAux==slider.value) return;
    container[0].innerHTML = '';
    createDivs(slider.value);
    sizeChangeAux=slider.value;
}

function toggleGrid (){
    const toggle = document.getElementsByClassName('row');
    for (let i=0;i<slider.value*slider.value;i++){
        toggle[i].classList.toggle('noBorder'); 
    }
    if (toggleAux) {
        toggleAux = false;
        toggGrid.textContent = 'Grid Lines: ON';
    }
    else {
        toggleAux = true;
        toggGrid.textContent = 'Grid Lines: OFF';
    } 
    toggGrid.classList.toggle('pressed');
}

function clearGrid () {
    container[0].innerHTML = '';
    createDivs(slider.value);
    sizeChangeAux=slider.value;
}

function changeColor(e){
    if (e.type === 'mouseover' && !clicked) return ;
    
    if (opacityMode) { 
        if (e.target.style.backgroundColor.substr(0,4) == 'rgba') e.target.style.backgroundColor = decreaseOpacity(e.target.style.backgroundColor);
        else e.target.style.backgroundColor = toRGBA(e.target.style.backgroundColor);  
    
        if (rainbowMode && !e.target.style.backgroundColor) {
        e.target.style.backgroundColor = toRainbow();
        }
    
        else if (!e.target.style.backgroundColor){
            e.target.style.backgroundColor = color;
        }
    }

    else{
        if (rainbowMode) {
            e.target.style.backgroundColor = toRainbow();
        }
        else {
            e.target.style.backgroundColor = color;
        }
    }
}

function toRainbow(){
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function toRGBA (str) {
    let newStr = `rgba(` + str.substring(4, (str.length-1)) + `, 0.9)`;
    return newStr;
}

function decreaseOpacity (str) {
    let newOpacity = str.substring(str.length-4, str.length-1);
    newOpacity = (+newOpacity*10 - 1)/10;
    if (newOpacity*10 < 2)
    return `rgb(` + str.substring(5,str.length-6) + `)`;
    let newStr = str.substring(0, str.length-4) + newOpacity + `)`;
    return newStr;
}

let clicked = false;
document.body.onmousedown = () => (clicked = true);
document.body.onmouseup = () => (clicked = false);

//to add increasing darkness mode look into hsl color format and string.split()