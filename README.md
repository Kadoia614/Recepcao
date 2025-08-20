# Project Readme

## Web-App

### Description

Is the part responsible to generate the front end

```
Source: /web-admin
```

### Instalation

1. Acess the project folder:

```
cd ./web-admin
```

2. Install the dependencies:

   npm i

3. Alter the proxi to target your API

```
Source: /web-admin/vite.config.js ->
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  [...]
  server: {
    host: "0.0.0.0", //Acesso externo
    port: 5173,
    proxy: {
      "/api/v1": {
        target: "Your API here",
        changeOrigin: false,
        secure: false,
      }
    }
  }
  [...]
})
```

4. Execute the project:

```
#### Inside web-admin project's Folder
  npm run dev
```

5. To generate Build, execute:

```
###inside web-admin folder
  npm run build
```

### Dependencies

```
"@fontsource/roboto": "^5.2.6",
"@headlessui/react": "^2.2.4",
"@heroicons/react": "^2.2.0",
"@tailwindcss/vite": "^4.1.11",
"axios": "^1.10.0",
"moment": "^2.30.1",
"primeicons": "^7.0.0",
"primereact": "^10.9.6",
"react": "^19.1.0",
"react-dom": "^19.1.0",
"react-hook-form": "^7.59.0",
"react-router-dom": "^7.6.3",
"react-webcam": "^7.2.0",
"tailwindcss": "^4.1.11"
```

### Project's structure

```
...
├── src/
│   ├── API/ -> API connection with Axios
│   ├── assets/ -> Project stilization
│   ├── components/ -> Components t ouse inside project
│   ├── context/ -> Application's context
│   └── middleware/ -> Application's middleware
|   └── pages/ -> Application Pages
|   └── service/ -> Services responsible to consume API

```

# API

# Documentação da API Recepção

**Versão: 1.0.0**

Este documento fornece uma descrição detalhada da API Recepção, utilizada para gerenciar usuários, visitantes e visitas. A documentação foi gerada com base em uma especificação OpenAPI, utilizando Fastify e Zod.

## URL Base

Todas as URLs mencionadas nesta documentação são relativas à seguinte URL base:

```
http://192.168.16.13:3333
```

## Autenticação

A maioria das rotas protegidas requer um token de autenticação JWT. Após realizar o login com sucesso na rota `/api/v1/login/`, um token será retornado. Para autenticar as requisições subsequentes, inclua este token no cabeçalho `Authorization` como um "Bearer token".

**Exemplo de Header:**

```
Authorization: Bearer seu_token_jwt_aqui
```

---

## Endpoints da API

### Índice

1.  [Login]
2.  [User (Usuário)]
3.  [Visitor (Visitante)]
4.  [Visits (Visitas)]

---

### Login

Endpoints relacionados à autenticação e gerenciamento de sessão.

#### `POST /api/v1/login/`

Realiza o login na aplicação utilizando `username` e `password`.

**Corpo da Requisição (`application/json`)**
| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `username` | string | Sim | Nome de usuário para login. |
| `password` | string | Sim | Senha do usuário. |

**Exemplo de Requisição:**

```json
{
  "username": "seu.usuario",
  "password": "sua_senha"
}
```

**Respostas:**

- **`200 OK`** - Login bem-sucedido.
  ```json
  {
    "message": "Login sucess",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "uuid": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Nome do Usuario",
      "role": "Admin",
      "firstLogin": false
    },
    "ip": "192.168.16.1"
  }
  ```

#### `POST /api/v1/login/verify`

Verifica a integridade e validade de um token JWT.

**Corpo da Requisição (`application/json`)**
| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `token` | string | Sim | O token JWT a ser verificado. |

**Exemplo de Requisição:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respostas:**

- **`200 OK`** - Token válido.
- **`401 Unauthorized`** - Token inválido.
- **`500 Internal Server Error`** - Erro interno.

#### `POST /api/v1/login/alterpwd`

Permite que um usuário autenticado altere sua própria senha.

**Corpo da Requisição (`application/json`)**
| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `old_password` | string | Sim | Senha atual do usuário. |
| `new_password` | string | Sim | Nova senha desejada. |

**Exemplo de Requisição:**

```json
{
  "old_password": "senha_antiga_123",
  "new_password": "nova_senha_forte_456"
}
```

**Respostas:**

- **`200 OK`** - Senha alterada com sucesso.
- **`401 Unauthorized`** - Credenciais inválidas (senha antiga incorreta).
- **`500 Internal Server Error`** - Erro interno.

---

### User (Usuário)

Endpoints para o gerenciamento de usuários do sistema.

#### `POST /api/v1/user/`

Cria um novo usuário no sistema.

**Corpo da Requisição (`application/json`)**
| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `first_name` | string | Sim | Primeiro nome do usuário. |
| `last_name` | string | Sim | Sobrenome do usuário. |
| `role` | string | Sim | Nível de permissão (ex: "Admin", "User"). |
| `email` | string | Sim | E-mail do usuário (deve ser único). |
| `cpf` | string | Sim | CPF do usuário (deve ser único). |
| `password` | string | Não | Senha inicial. Se não for fornecida, uma padrão pode ser gerada. |

**Respostas:**

- **`201 Created`** - Usuário criado com sucesso.
- **`400 Bad Request`** - Dados de entrada inválidos.
- **`403 Forbidden`** - O usuário (email ou CPF) já existe.

#### `GET /api/v1/user/`

Retorna uma lista de todos os usuários cadastrados.

**Respostas:**

- **`200 OK`** - Lista de usuários retornada com sucesso.
  ```json
  {
    "user": [
      {
        "uuid": "123e4567-e89b-12d3-a456-426614174000",
        "first_name": "João",
        "last_name": "Silva",
        "role": "Admin",
        "email": "joao.silva@example.com",
        "username": "joao.silva"
      }
    ],
    "count": 1,
    "message": "List of users"
  }
  ```

#### `PUT /api/v1/user/{uuid}`

Atualiza os dados de um usuário existente.

**Parâmetros de URL**
| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `uuid` | string | UUID do usuário a ser atualizado. |

**Corpo da Requisição (`application/json`)**
_Similar ao `POST`, mas sem os campos `cpf` e `password`._

**Respostas:**

- **`200 OK`** - Usuário atualizado com sucesso.
- **`404 Not Found`** - Usuário não encontrado.

#### `DELETE /api/v1/user/{uuid}`

Exclui um usuário do sistema.

**Parâmetros de URL**
| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `uuid` | string | UUID do usuário a ser excluído. |

**Respostas:**

- **`200 OK`** - Usuário excluído com sucesso.
- **`404 Not Found`** - Usuário não encontrado.

---

### Visitor (Visitante)

Endpoints para o gerenciamento de visitantes.

#### `POST /api/v1/visitors/`

Cadastra um novo visitante.

**Corpo da Requisição (`application/json`)**
| Campo | Tipo | Obrigatório |
| :--- | :--- | :--- |
| `name` | string | Sim |
| `cpf` | string | Sim |
| `photo` | string | Não |
| `email` | string | Não |
| `phone` | string | Não |
| `address` | string | Não |
| `city` | string | Não |
| `state` | string | Não |
| `zipCode` | string | Não |

**Respostas:**

- **`201 Created`** - Visitante criado com sucesso.

#### `GET /api/v1/visitors/`

Retorna uma lista de todos os visitantes.

**Respostas:**

- **`200 OK`** - Lista retornada com sucesso.

#### `PUT /api/v1/visitors/{uuid}`

Atualiza os dados de um visitante existente.

**Parâmetros de URL**
| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `uuid` | string | UUID do visitante a ser atualizado. |

**Respostas:**

- **`200 OK`** - Visitante atualizado com sucesso.

#### `DELETE /api/v1/visitors/{uuid}`

Exclui um visitante.

**Parâmetros de URL**
| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `uuid` | string | UUID do visitante a ser excluído. |

**Respostas:**

- **`200 OK`** - Visitante excluído com sucesso.

---

### Visits (Visitas)

Endpoints para o gerenciamento de registros de visitas.

#### `POST /api/v1/visits/`

Cria um novo registro de visita.

**Corpo da Requisição (`application/json`)**
| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `visitor_uuid` | string | Sim | UUID do visitante. |
| `subject` | string | Sim | Assunto/motivo da visita. |
| `date` | string (date-time) | Sim | Data e hora da visita. |

**Exemplo de Requisição:**

```json
{
  "visitor_uuid": "123e4567-e89b-12d3-a456-426614174000",
  "subject": "Reunião com o departamento financeiro",
  "date": "2025-08-20T15:30:00Z"
}
```

**Respostas:**

- **`200 OK`** - Visita registrada com sucesso.

#### `GET /api/v1/visits/`

Retorna uma lista de todos os registros de visita.

**Respostas:**

- **`200 OK`** - Lista de visitas retornada com sucesso.

#### `GET /api/v1/visits/visitor/{uuid}`

Retorna todos os registros de visita de um visitante específico.

**Parâmetros de URL**
| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `uuid` | string | UUID do visitante. |

**Respostas:**

- **`200 OK`** - Histórico de visitas do visitante.
  ```json
  {
    "message": "Success",
    "visits": [
      {
        "subject": "Reunião com assessor",
        "date": "2023-10-01T12:00:00Z"
      }
    ]
  }
  ```
