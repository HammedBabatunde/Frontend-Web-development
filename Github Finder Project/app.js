// Create an instance 
const github = new Github;
const ui = new UI;

// Get Users i
const users = document.getElementById('searchUser');

// event listener
users.addEventListener('keyup', (e) => {
    const userText = e.target.value;

    if(userText !== '') {
        //Get http request
        github.getUser(userText)
            .then(data => {
                if(data.profile.message === 'Not Found') {
                    // show Alert
                    ui.showAlert('User Not Found', 'alert alert-danger');
                } else {
                    // Show Profile
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            })
    } else  {
        // Clear Profile
        ui.clearProfile();
    }
})