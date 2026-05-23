async function register(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            showError(data.message || 'Erro desconhecido no servidor');
        }
    } catch (error) {
        showError('Erro de conexão: Verifique se o servidor está rodando.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    
    if (form) {
        form.addEventListener('submit', register);
        console.log("Evento de registro ativado!");
    } else {
        console.error("Erro: Formulário 'register-form' não encontrado.");
    }
});