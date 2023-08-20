# E-Commerce API

Uma API RESTful para gerenciar um e-commerce, construída com Node.js, TypeScript e Prisma.

## 🚀 Características

- Registro e autenticação de usuários.
- CRUD de produtos.
- Gerenciamento de pedidos.
- Sistema de cupons de desconto.
- Favoritos para usuários.
- Notificações para administradores sobre estoque baixo.

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Express](https://expressjs.com/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/manuncorrea/services-ecommerce
cd services-ecommerce
```
2. Instale as dependências:

```bash
npm install
```

1. Configure as variáveis de ambiente no arquivo .env.
2. Execute as migrações do Prisma

```bash
npx prisma migrate dev
```
1. inicie o servidor:

```bash
npm install
```
## 🤝 Contribuições

Contribuições são muito bem-vindas! Aqui estão os passos para contribuir:

1. Faça um fork do projeto.
2. Crie sua feature branch: `git checkout -b minha-nova-feature`.
3. Commit suas mudanças: `git commit -am 'Adiciona nova feature'`.
4. Push para a branch: `git push origin minha-nova-feature`.
5. Abra um Pull Request.

