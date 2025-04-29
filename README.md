# 📚 Avaliação DW3 - MiniDevBlog React + Firebase + Deploy

## 🏛️ Contextualização

"Nos bons tempos", o desenvolvedor que sabia organizar rotas, proteger páginas e ainda subir uma aplicação pública era considerado digno da espada de um verdadeiro arquiteto de sistemas. Hoje, você terá essa oportunidade.

Você irá concluir a construção de um **Mini DevBlog** utilizando **React**, **Firebase Authentication** e **Deploy Automatizado**, tomando como base:

> 🔗 [Repositório Inicial (Incompleto) - avalicao-lifedev](https://github.com/victoricoma/avaliacao-lifedev.git)

Inspirando-se na estrutura de:

> 🔗 [Exemplo Estruturado - dw3_react_minidevblog](https://github.com/victoricoma/dw3_react_minidevblog)

---

## 🛠️ Tarefas a serem realizadas

### 1. Preparação do Ambiente

- Faça o **fork** do repositório de avaliação.
- Crie uma **branch** chamada:  
  `avaliacaodw-seulogindogithub`
- Exemplo: `avaliacaodw-joaosilva`

---

### 2. Construção de Rotas Principais

Implemente as seguintes **rotas** usando `react-router-dom`:

| Rota | Função | Proteção |
|:----|:------|:------|
| `/login` | Página de login | Acesso público |
| `/dashboard` | Listagem de posts | Acesso protegido (usuário logado) |
| `/post/:id` | Visualização individual de post | Acesso protegido |
| `/post/new` | Criação de novo post | Acesso protegido |

---

### 3. Construção da Dashboard

- Crie uma página `Dashboard.jsx`:
  - Liste **todos os posts** em cards ou em lista.
  - Cada card deve ter:
    - Título do post
    - Autor (se possível)
    - Link para visualizar o post completo (`/post/:id`).

- Utilize **Hooks** para buscar os dados:
  - `useEffect` para puxar os posts ao carregar a página.
  - `useState` para armazenar a lista de posts.

---

### 4. Construção da Página de Criação de Postagem

- Crie uma página `CreatePost.jsx`:
  - Formulário com campos para:
    - Título
    - Conteúdo
  - Botão **Salvar**.
  - Ao enviar, crie o novo post no **Firebase** ou no contexto/local que esteja usando para simulação.

- Dica prática:
  - Use `useState` para controlar os campos do formulário.
  - Use `useContext` ou chamadas diretas para atualizar a lista de posts ao salvar.

---

### 5. Sistema de Login (Firebase OAuth)

- Implemente o **login via Firebase Authentication**.
- Métodos obrigatórios:
  - Login com **Google** (padrão).
- Mantenha conexão com o Firebase durante a sessão do usuário.

---

### 6. Controle de Acesso (Proteção de Rotas)

- Utilize um `PrivateRoute` (ou configuração equivalente) para proteger:
  - `/dashboard`
  - `/post/:id`
  - `/post/new`

- Usuário **não logado** deve ser redirecionado para `/login`.

---

### 7. Menu de Navegação Condicional

- Ajuste o menu para:
  - Exibir apenas **Login** quando o usuário não estiver autenticado.
  - Exibir **Dashboard**, **Novo Post**, **Logout** quando estiver logado.

---

### 8. Configuração de Pipeline e Deploy

- Configure o deploy automático usando **GitHub Actions** ou plataformas como **Vercel**, **Netlify** ou **Firebase Hosting**:
  - Após o push para a branch de entrega, o sistema deve ser publicado automaticamente.
  - Deve ser possível acessar o sistema por link público.

---

## ⚙️ Dicas Técnicas para os Hooks

- **useState**:
  ```javascript
  const [posts, setPosts] = useState([]);
  ```

- **useEffect** para buscar posts:
  ```javascript
  useEffect(() => {
    // Função para buscar posts aqui
  }, []);
  ```

- **useContext** para controle global de autenticação:
  - Criar um `AuthContext`.
  - Fornecer informações de login para todo o app.

- **Redirecionamento Condicional**:
  ```javascript
  if (!user) {
    return <Navigate to="/login" />;
  }
  ```

- **Proteção de Rotas** usando `Outlet`:
  ```javascript
  const PrivateRoute = () => {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
  ```

---

## 📌 Entrega

Você deve entregar:

1. **Link da Branch** `avaliacaodw-seulogindogithub`
2. **Link do Deploy Funcionando** para teste público
3. **Pipeline CodeQL** rodando no GitHub Actions

---

## 📅 Avaliação

Serão avaliados:

- Organização e Estrutura do Código
- Funcionamento das Rotas e Autenticação
- Funcionalidade da Dashboard e Criação de Postagem
- Deploy público funcional
- Qualidade geral do repositório e uso correto de boas práticas

---

# 🚀 Bons estudos e boa sorte!  
*"O código que você escreve hoje é a carta que você envia para o seu eu do futuro. Capriche."* 📜🚀

