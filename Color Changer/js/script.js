const body = document.querySelector('body');
const colorBtn = document.querySelector('button');
const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple']


body.style.backgroundColor = 'yellow';
colorBtn.addEventListener('click', changeBackground);

function changeBackground () {

    const colorIndex = parseInt(Math.random()*colors.length)
    body.style.backgroundColor = colors[colorIndex];

}
