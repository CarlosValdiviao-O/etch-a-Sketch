const DEFAULT_COLOR = 'black';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 10;

let num = DEFAULT_SIZE;
let color = DEFAULT_COLOR;
let sizeChangeAux = 10;
let rainbowMode = true;

let slider = document.querySelector("#slider");
let sliderBox = document.querySelector("#sliderBox");
sliderBox.addEventListener('mouseup',updateSize);
slider.addEventListener('input', updateSizeBox);
let size = document.querySelector('#sizeBox');
const container = document.getElementsByClassName('container');
let toggle = document.querySelector('#toggleGrid');
toggle.addEventListener('click', toggleGrid);
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

function stopDrag(e){
    e.type='mouseover';
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
    (toggleAux) ? toggleAux = false: toggleAux = true; 
}

function changeColor(e){
    if (e.type === 'mouseover' && !mouseDown) return ;
    if (rainbowMode) {
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
    else{
        e.target.style.backgroundColor = color;
    }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);