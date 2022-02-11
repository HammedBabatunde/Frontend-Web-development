const form = document.querySelector('#message-form');
const message = document.querySelector('#message');
const lastMessage = document.querySelector('.message-content');
const feedback = document.querySelector('.feedback');

form.addEventListener('submit', passMessage);

function passMessage(e) {
    // prevent default form submission 
    e.preventDefault();

    if(message.value === '') {
        feedback.classList.add('show');
        setTimeout(function (){
            feedback.classList.remove('show');
        }, 2000)
    } else {
        lastMessage.textContent = message.value;
        message.value = '';
    }
}