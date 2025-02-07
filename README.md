# bookrev
Personal Book Review Platform

# Book Review Platform

A personal book review website that tracks reading history, ratings, and favorite quotes. Integrates with Open Library for book covers and uses PostgreSQL for data storage.

![Screenshot](/public/screenshot.png)

## Features
- Book catalog with covers
- Rating system (1-10)
- Favorite quotes storage
- Detailed review pages
- Sort by rating/date
- Previous/Next book navigation

## Prerequisites
- Node.js (v18+)
- npm (v9+)
- PostgreSQL (v15+)

## Installation

### 1. Clone Repository
`git clone https://github.com/ttlektessov/bookrev.git`
`cd bookrev`
### 2. Install Dependencies
`npm install | npm i`
### 3. Database Setup
Create PostgreSQL database:
```
CREATE TABLE book_entries (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20),
    fav_quote TEXT,
    rating INTEGER,
    date_read DATE,
    review TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Testing
Insert Sample Data
```
INSERT INTO book_entries (
    title, author, isbn, date_read, rating, review, fav_quote
) VALUES (
    'You Can Negotiate Anything',
    'Herb Cohen',
    '9780804005297',
    CURRENT_DATE - INTERVAL '30 days',
    10,
    'A classic negotiation guide with practical strategies',
    'Everything is negotiable. Challenge authority.'
);
```
Run the project
`nodemon .\index.js`

### Project Structure
```
├── public/          
    └── main.css
├── views/           
│   ├── partials/
        ├── footer.ejs
        └── header.ejs
│   ├── index.ejs
│   └── post.ejs
├── index.js         
├── package.json
└── package-lock.json    
```