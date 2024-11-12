const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Setup MySQL connection
const db = mysql.createConnection({
    host: 'localhost',     // Replace with your DB host
    user: 'root',          // Replace with your DB username
    password: 'password',  // Replace with your DB password
    database: 'your_database_name'  // Replace with your DB name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Enable CORS and JSON parsing
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Search route
app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const sqlQuery = 'SELECT name, pharmacies, location FROM Medicines WHERE LOWER(name) LIKE ?';
    db.query(sqlQuery, [`%${query}%`], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Database error');
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
