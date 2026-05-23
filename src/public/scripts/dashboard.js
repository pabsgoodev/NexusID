document.addEventListener('DOMContentLoaded', async () => {
    // Referências dos elementos do Header (alinhados via CSS)
    const usernameDisplay = document.getElementById('username-display');
    const avatarDisplay = document.querySelector('.user-avatar');
    const productsGrid = document.getElementById('products-grid');

    try {
        const authResponse = await fetch('/auth/me');
        const authData = await authResponse.json();

        if (!authResponse.ok) {
            window.location.href = '/login';
            return;
        }

        usernameDisplay.textContent = authData.username;
        avatarDisplay.textContent = authData.username.charAt(0).toUpperCase();

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
                        <a href="https://wa.me/${product.phone.replace(/\D/g, '')}" 
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
        console.error('Erro na carga do dashboard:', error);
        productsGrid.innerHTML = '<p>Ocorreu um erro ao carregar os dados.</p>';
    }
});