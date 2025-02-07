import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "bookrev",
    password: "123",
    port: 5432,
  });

db.connect();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
    try {
        const sort = req.query.sort || 'date_desc';
        let orderBy;
        
        switch(sort) {
            case 'title_asc':
                orderBy = 'title ASC';
                break;
            case 'date_desc':
                orderBy = 'date_read DESC';
                break;
            case 'rating_desc':
                orderBy = 'rating DESC, date_read DESC';
                break;
            default:
                orderBy = 'date_read DESC';
        }

        const result = await db.query(`
            SELECT id, title, author, isbn, fav_quote, review, rating, date_read 
            FROM book_entries 
            ORDER BY ${orderBy}
        `);
        
        res.render("index.ejs", { 
            reviews: result.rows,
            currentSort: sort 
        });
    } catch (error) {
        console.log(error);
        res.status(500).render("404.ejs");
    }
});

app.get("/book/:id", async (req, res) => {
    try {
        const currentBook = await db.query(
            "SELECT * FROM book_entries WHERE id = $1",
            [req.params.id]
        );

        const nextBook = await db.query(`
            SELECT id 
            FROM book_entries 
            WHERE date_read < $1 OR (date_read = $1 AND id > $2)
            ORDER BY date_read DESC, id DESC
            LIMIT 1`,
            [currentBook.rows[0].date_read, req.params.id]
        );

        const prevBook  = await db.query(`
            SELECT id 
            FROM book_entries 
            WHERE date_read > $1 OR (date_read = $1 AND id < $2)
            ORDER BY date_read ASC, id ASC
            LIMIT 1`,
            [currentBook.rows[0].date_read, req.params.id]
        );

        res.render("post.ejs", {
            review: currentBook.rows[0],
            prevId: prevBook.rows[0]?.id,
            nextId: nextBook.rows[0]?.id
        });
    } catch (error) {
        console.log(error);
        res.status(500).render("404.ejs");
    }
});
app.use((req, res) => {
    res.status(404).render("404.ejs");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("404.ejs");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});