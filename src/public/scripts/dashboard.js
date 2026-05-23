// 1. Função isolada para carregar produtos (para ser usada no início e após criar novo produto)
async function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    try {
        const productsResponse = await fetch('/products');
        const products = await productsResponse.json();

        if (products.length === 0) {
            productsGrid.innerHTML = '<p class="empty-msg">Nenhum produto listado ainda.</p>';
            return;
        }

        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const priceFormatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(product.price);

            const dateFormatted = new Date(product.createdAt).toLocaleDateString('pt-BR');

            // Tratamento para evitar erro caso o telefone venha vazio
            const cleanPhone = product.phone ? String(product.phone).replace(/\D/g, '') : '';

            const productCard = `
                <article class="product-card">
                    <div class="card-body">
                        <h2 class="product-title">${product.name}</h2>
                        <div class="product-price">${priceFormatted}</div>
                        <p class="product-description">${product.description || 'Sem descrição disponível.'}</p>
                        
                        <div class="product-meta">
                            <small>Publicado em: ${dateFormatted}</small>
                        </div>
                    </div>
                    
                    <div class="card-footer">
                        <a href="https://wa.me/${cleanPhone}" 
                           target="_blank" 
                           class="btn-contact">
                           Contatar Vendedor
                        </a>
                    </div>
                </article>
            `;
            
            productsGrid.insertAdjacentHTML('beforeend', productCard);
        });

    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        productsGrid.innerHTML = '<p>Ocorreu um erro ao carregar os produtos.</p>';
    }
}

// 2. Evento Inicial (Autenticação + Primeira Carga)
document.addEventListener('DOMContentLoaded', async () => {
    const usernameDisplay = document.getElementById('username-display');
    const avatarDisplay = document.querySelector('.user-avatar');

    try {
        const authResponse = await fetch('/auth/me');
        
        if (!authResponse.ok) {
            window.location.href = '/login';
            return;
        }

        const authData = await authResponse.json();
        
        if (usernameDisplay) usernameDisplay.textContent = authData.username;
        if (avatarDisplay) avatarDisplay.textContent = authData.username.charAt(0).toUpperCase();

        // Carrega a lista de produtos assim que a página abrir
        await loadProducts();

    } catch (error) {
        console.error('Erro na carga inicial do dashboard:', error);
    }
});

// 3. Controle do Modal e Formulário
const btnCreate = document.getElementById('btn-create');
const modal = document.getElementById('modal-container');
const btnClose = document.getElementById('btn-close-modal');
const formProduct = document.getElementById('form-create-product');

if (btnCreate) {
    btnCreate.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
}

if (btnClose) {
    btnClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// 4. Envio do formulário
if (formProduct) {
    formProduct.addEventListener('submit', async (e) => {
        e.preventDefault();

        const payload = {
            name: document.getElementById('p-name').value,
            price: parseFloat(document.getElementById('p-price').value),
            phone: document.getElementById('p-phone').value,
            description: document.getElementById('p-desc').value
        };

        try {
            const response = await fetch('/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Produto criado com sucesso!');
                modal.style.display = 'none';
                formProduct.reset();
                
                // AGORA FUNCIONA: Chama a função que definimos no passo 1
                await loadProducts(); 
            } else {
                const errData = await response.json();
                alert('Erro ao criar produto: ' + (errData.message || 'Verifique os dados.'));
            }
        } catch (error) {
            console.error('Erro no envio:', error);
            alert('Erro de conexão com o servidor.');
        }
    });
}