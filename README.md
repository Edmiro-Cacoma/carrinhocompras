# Sistema de Carrinho de Compras com Estrutura de Dados de Pilha
![screenshot](https://github.com/user-attachments/assets/513a26ab-0221-4b3b-ba49-5b67b8780aa5)

## Índice

- [Visão Geral](#visão-geral)
- [Backend](#backend)
- [Frontend](#frontend)

## Visão Geral

Este projeto é um sistema de carrinho de compras que permite adicionar itens, listar todos os itens no carrinho e remover o último item adicionado. A aplicação é composta por um backend em Express.js que utiliza uma pilha para gerenciar os itens e um frontend em React com Vite que fornece uma interface interativa para o usuário.

## Backend

O backend é desenvolvido utilizando Express.js e TypeScript e utiliza uma pilha para armazenar os itens do carrinho.

### Funcionalidades

- **Adicionar Item**: Adiciona um item ao topo da pilha.
- **Remover Item**: Remove o item do topo da pilha.
- **Listar Itens**: Retorna todos os itens da pilha.

### Endpoints

- `POST /cart/add` - Adiciona um novo item ao carrinho. O corpo da requisição deve conter um JSON com o item:
  ```json
  { "item": "Nome do Item" }
- `DELETE /cart/remove` - Remove o último item adicionado ao carrinho. Retorna o item removido.
  ```json
  { "removedItem": "Nome do Item Removido" }
- `GET /cart/list` - Lista todos os itens no carrinho. Retorna um JSON com a lista de itens. 
  ```json
  { "removedItem": "Nome do Item Removido" }
