window.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('login-form');

    form.addEventListener('submit', login);

    async function login(event) {
        console.log('Login function called');

        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {

            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                window.location.href = '/dashboard';
            } else {
                showError("Usuário ou senha inválidos.");
            }

        } catch (error) {
            console.error(error);
        }
    }

});

function showError(message) {
  const errorEl = document.getElementById('error');
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');

  setTimeout(() => {
    errorEl.classList.add('hidden');
  }, 4000);
}