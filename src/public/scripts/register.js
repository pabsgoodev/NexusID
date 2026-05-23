const form = document.getElementById('register-form');

form.addEventListener('submit', register);

async function register(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/auth/register', {
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

    if (response.ok) {
        window.location.href = '/dashboard';
    } else {
        showError('Erro ao registrar usuário: Tente mais caracteres ou um nome diferente.');
    }
}

function showError(message) {
  const errorEl = document.getElementById('error');
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');

  setTimeout(() => {
    errorEl.classList.add('hidden');
  }, 4000);
}