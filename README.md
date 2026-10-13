# NestJS Aula 2 — MySQL, Repository e DatabaseService

Projeto de estudo da aula do Senac RJ. Usa NestJS 10, TypeScript 5.7, `mysql2` e `@nestjs/config`, sem Prisma.

## 1. Requisitos

- Node.js 20+
- MySQL ou XAMPP com MySQL iniciado

## 2. Criar banco e tabela

Abra o phpMyAdmin ou o terminal MySQL e execute:

```sql
CREATE DATABASE IF NOT EXISTS escola;
USE escola;

CREATE TABLE IF NOT EXISTS alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  curso VARCHAR(100) NOT NULL
);

INSERT INTO alunos (nome, email, curso)
VALUES
  ('Ana', 'ana@exemplo.com', 'Sistemas de Informação'),
  ('Carlos', 'carlos@exemplo.com', 'Ciência da Computação');
```

O exercício da aula pede a coluna `email`; por isso ela já está incluída no projeto.

Se você já criou a tabela `alunos` sem email, execute uma vez:
```sql
ALTER TABLE alunos ADD COLUMN email VARCHAR(150) NOT NULL DEFAULT '';
```

## 3. Configurar o projeto

Na pasta do projeto, no PowerShell:

```powershell
npm install
Copy-Item .env.example .env
```

Abra o `.env` e ajuste `DB_USER`, `DB_PASSWORD` e `DB_PORT` conforme seu MySQL.
- XAMPP padrão geralmente usa `DB_PORT=3306` e usuário `root` sem senha.
- Se o seu MySQL estiver em outra porta, informe a porta correta.

## 4. Iniciar a API

```powershell
npm run start:dev
```

A API inicia em `http://localhost:3000`.

## 5. Testar as rotas

### Listar alunos
`GET http://localhost:3000/alunos`

### Buscar por ID
`GET http://localhost:3000/alunos/1`

### Cadastrar aluno
`POST http://localhost:3000/alunos`

Body JSON:
```json
{
  "nome": "Maria",
  "email": "maria@exemplo.com",
  "curso": "Engenharia de Software"
}
```

### Atualizar aluno
`PUT http://localhost:3000/alunos/1`

Body JSON:
```json
{
  "nome": "Ana Silva",
  "email": "ana.silva@exemplo.com",
  "curso": "Sistemas de Informação"
}
```

### Excluir aluno
`DELETE http://localhost:3000/alunos/1`

## Arquitetura

`Controller → Service → Repository → DatabaseService → MySQL`

- Controller: recebe requisições HTTP.
- Service: coordena a lógica da aplicação.
- Repository: executa SQL parametrizado.
- DatabaseService: gerencia o pool `mysql2`.
- DatabaseModule exporta `DatabaseService`.
