const body = document.querySelector('body');
const button = document.querySelector('#btn');
const colorValue = document.querySelector('#hex-value');
const colors = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];

button.addEventListener('click', changeBackgroundColorHex);

function changeBackgroundColorHex () {
    let hex = '#';

    for (let i = 0; i<6; i++) {
        const colorIndex = Math.floor(Math.random()*colors.length);
        hex += colors[colorIndex];
    }

    body.style.backgroundColor = hex;

    colorValue.textContent = hex;
}