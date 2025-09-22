# Blog

## Entities

1. Article
2. Comment
3. User
    3.1. User
    3.2. Author

## Paths

### Auth

1. POST /auth/login -> Login utente

### Users

1. POST /api/users -> Registrare un nuovo utente

### Me

1. GET /api/me -> Ottenere le proprie informazioni
2. GET /api/me/articles -> Ottenere i propri articoli
3. GET /api/me/articles/:article_id/comments -> Ottenere i commenti per i propri articoli
4. PUT /api/me -> Modificare le proprie informazioni
5. PUT /api/me/password -> Modificare la propria password
6. DELETE /api/me -> Eliminare il proprio utente

### Articles

1. GET /api/articles -> Ottenere tutti gli articoli impaginati
2. GET /api/articles/:id -> Ottenere un articolo tramite il suo ID
3. POST /api/articles -> Creare un nuovo articolo
4. PUT /api/articles/:id -> Modificare un articolo esistente tramite il suo ID
5. DELETE /api/articles/:id -> Eliminare un articolo esistente tramite il suo ID

### Comments

1. GET /api/comments/:article_id -> Ottenere tutti i commenti di un articolo impaginati
2. POST /api/comments/:article_id -> Creare un commento su un articolo tramite ID
3. PUT /api/comments/:id -> Modificare un commento su un articolo tramite ID
4. DELETE /api/comments/:id -> Eliminare un commento su un articolo tramite ID

### Categories

1. GET /api/categories -> Ottenere tutti i commenti di un articolo impaginati
2. GET /api/categories/:id -> Ottenere una singola categoria
3. POST /api/categories -> Creare una nuova categoria
4. PUT /api/categories/:id -> Modificare una categoria tramite ID
5. DELETE /api/categories/:id -> Eliminare una categoria tramite ID

### Tags

1. GET /api/tags -> Ottenere tutti i tag
2. GET /api/tags/:id -> Ottenere un singolo tag
3. POST /api/tags -> Creare un nuovo tag
4. PUT /api/tags/:id -> Modificare un tag tramite ID
5. DELETE /api/tags/:id -> Eliminare un tag tramite ID

## Logics

```js
// POST -> /auth/login -> { email: "mario.bianchi@email.com", password: "1234" }
// Controller -> loginUser -> token

// GET -> /api/me -> Ottenere i miei dati -> Necessita autorizzazione
// Middlweare -> authUser -> se presente token e se valido -> prosegui
//                        -> se token assento o non valido restituisci errore 403
```
