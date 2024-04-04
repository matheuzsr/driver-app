# Driver app
Este conteúdo é parte do curso Clean Code e Clean Architecture da Branas.io

## 🚀 Como executar o projeto

### Pré-requisitos
- Git
- Node.js - v18.x.x (Recomendamos a instalação pelo NVM)
- Yarn
  
### Rodando o projeto

```
// Criando instância do banco de dados
docker-compose up -d

// Executar as queries do arquivo abaixo
./create.sql

// Para rodas os testes
npx jest

// Para rodas o coverage dos testes
npx jest --coverage

// Para subir a api
npx nodemon src/api/routes.ts
```
