function createDivs (num) {
    for (let i=0;i<num;i++){
        const div = document.createElement('div');
        div.classList.add('column');
        const container = document.getElementsByClassName('container');
        container[0].appendChild(div);
        const column = document.getElementsByClassName('column');
        for (let j=0;j<num;j++){
            const div = document.createElement('div');
            div.classList.add('row');
            column[i].appendChild(div);
        }
    }
}
let num = 16;
createDivs (num);
const container = document.getElementsByClassName('container');
container[0].addEventListener('click',() => {
const toggle = document.getElementsByClassName('row');
for (let i=0;i<num*num;i++){
    toggle[i].classList.toggle('noBorder');
}
});
