document.addEventListener('DOMContentLoaded', async () => {
    // Referências dos elementos do Header (alinhados via CSS)
    const usernameDisplay = document.getElementById('username-display');
    const avatarDisplay = document.querySelector('.user-avatar');
    const productsGrid = document.getElementById('products-grid');

    try {
        // 1. Verifica a sessão do usuário no banco de dados
        const authResponse = await fetch('/auth/me');
        const authData = await authResponse.json();

        // if (!authResponse.ok) {
        //     window.location.href = '/login';
        //     return;
        // }

        // 2. Preenche o Header com os dados da Entity User
        usernameDisplay.textContent = authData.username;
        avatarDisplay.textContent = authData.username.charAt(0).toUpperCase();

        // 3. Busca os produtos da Entity Product
        const productsResponse = await fetch('/products');
        const products = await productsResponse.json();

        if (products.length === 0) {
            productsGrid.innerHTML = '<p class="empty-msg">Nenhum produto listado ainda.</p>';
            return;
        }

        // Limpa o grid e injeta os produtos dinamicamente
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            // Formatação de Preço (R$)
            const priceFormatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(product.price);

            // Formatação de Data (Entidade Product.createdAt)
            const dateFormatted = new Date(product.createdAt).toLocaleDateString('pt-BR');

            // Template do Card com as cores: --color-1, --color-2, etc.
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