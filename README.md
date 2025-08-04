# Besmoke Scientific Inventory Management System 

## Features 
- View all products with filtering by product type
- Add, edit, or delete products (no duplicates allowed based on product type/size/material)
- Record stock-in and stock-out operations
- View inventory reports including:
  - Stock operation history with filtering by product type
  - Visualization of current stock status 
  - Visualization of top-selling products summary

## Project Struture 
```
.
├── frontend
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layout/
│   │   └── pages/
│   ├── App.jsx
│   └── main.jsx
└── backend
    ├── Controllers/
    ├── Data/
    ├── Models/
    │   ├── Domains/
    │   └── DTOs/
    ├── Repositories/
    └── Program.cs
``` 
