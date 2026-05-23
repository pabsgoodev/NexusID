
# NexusID 🚀

O **NexusID** é uma plataforma robusta de gestão e exibição de produtos, desenvolvida com uma arquitetura focada em escalabilidade, segurança e tipagem forte. O projeto consiste em um Dashboard dinâmico que consome uma API RESTful para realizar operações de CRUD completas.

## 🛠 Tecnologias Utilizadas

### Backend

* **Node.js & Express:** Servidor e roteamento.
* **TypeORM:** Mapeamento objeto-relacional para persistência de dados.
* **Zod:** Validação de esquemas e contratos de dados.
* **Result Pattern:** Implementação de um fluxo de erro consistente e previsível, evitando o uso excessivo de `try/catch` para lógica de negócio.
* **TypeScript:** Garantia de tipagem em todo o ciclo de desenvolvimento.

### Frontend

* **Vanilla JavaScript (ES6+):** Lógica assíncrona e manipulação de DOM.
* **Tailwind CSS / CSS Moderno:** Interface responsiva e limpa.
* **Intl API:** Formatação nativa de moedas (BRL) e datas.

---

## 🏛 Arquitetura e Padrões

O projeto segue princípios de **Clean Code**, separando responsabilidades de forma clara:

1. **Entities:** Definição das tabelas e relacionamentos do banco de dados.
2. **Services:** Onde reside a lógica de negócio, utilizando o **Result Pattern** para retornar sucessos ou falhas de forma explícita.
3. **Controllers:** Gerenciamento das requisições HTTP e tradução dos resultados para o frontend.
4. **Schemas (Zod):** Camada de proteção que garante que apenas dados válidos entrem na aplicação.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

* Node.js instalado.
* Banco de dados (PostgreSQL/MySQL/SQLite) configurado.

### Configuração

1. **Clone o repositório:**
```bash
git clone https://github.com/pabsgoodev/NexusID.git
cd nexusid

```


2. **Instale as dependências:**
```bash
npm install

```


3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz e adicione as credenciais:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nexusid

```


34. **Execute e inicie o servidor:**
```bash
npm run dev

```

## 📌 Estrutura de Rotas e Endpoints

O projeto separa as rotas em camadas de interface (HTML) e persistência de dados (API). Todas as rotas de produtos e informações sensíveis de usuário são protegidas pelo middleware `authUser`.

### 🖥️ Rotas de Páginas (Front-end)

| Rota | Acesso | Descrição |
| --- | --- | --- |
| `/login` | Público | Página de autenticação de usuários. |
| `/register` | Público | Página de cadastro de novos usuários. |
| `/dashboard` | **Privado** | Painel principal (Requer cookie/token de sessão). |

### ⚙️ Endpoints de API (Back-end)

#### Autenticação

| Método | Endpoint | Descrição |
| --- | --- | --- |
| **POST** | `/auth/login` | Realiza o login e gera a sessão do usuário. |
| **POST** | `/auth/register` | Cadastra um novo perfil no NexusID. |
| **GET** | `/auth/me` | Retorna os dados do usuário logado (usado no Header). |

#### Gestão de Produtos

| Método | Endpoint | Proteção | Descrição |
| --- | --- | --- | --- |
| **GET** | `/products` | `authUser` | Lista todos os produtos cadastrados. |
| **POST** | `/products` | `authUser` | Cria um novo produto (Validação via Zod). |
| **GET** | `/products/:id` | `authUser` | Detalhes de um produto específico. |
| **PUT** | `/products/:id` | `authUser` | Atualiza dados (Preço, Nome, etc). |
| **DELETE** | `/products/:id` | `authUser` | Remove o produto permanentemente. |

---

## 🔒 Segurança (Middleware)

Implementamos uma camada de segurança robusta através do `authUser`.

* **Validação de Sessão:** Caso o usuário tente acessar o `/dashboard` ou qualquer endpoint de `/products` sem estar autenticado, o servidor bloqueia a requisição e redireciona para `/login`.


## 📝 Exemplo de Entidade de Produto

```typescript
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column() 
    name!: string;

    @Column({ type: "decimal" }) 
    price!: number;

    @Column()
    phone!: string;
}

```

---

## 🤝 Contribuição

1. Faça um **Fork** do projeto.
2. Crie uma **Branch** para sua feature (`git checkout -b feature/NovaFeature`).
3. Faça o **Commit** das alterações (`git commit -m 'Add NovaFeature'`).
4. Faça o **Push** para a Branch (`git push origin feature/NovaFeature`).
5. Abra um **Pull Request**.

---

## 📄 

*Desenvolvido por [Pablo/NexusID Team] com ☕ e TypeScript.*

---

### Dica Extra:

Se você ainda não implementou o **Result Pattern** em todos os métodos, ele geralmente se parece com isso no seu Service:

```typescript
// Exemplo rápido de como citar o padrão no código
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

```
