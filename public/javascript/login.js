
async function loginFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-form').value.trim();
    const password = document.querySelector('#password-form').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusTest);
        }
    }
}

async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok) {
            console.log('sucess');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
