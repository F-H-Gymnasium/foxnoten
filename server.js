const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Erlaubt das Lesen von Formulardaten (POST-Anfragen)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Aktiviert den "public"-Ordner für alle restlichen HTML-Dateien (wie dashboard.html)
app.use(express.static(path.join(__dirname, 'public')));

// --- UNSERE TEMPORÄREN DATENBANKEN ---
const USERS = {
    "Admin": { password: "Admin123", role: "admin" }
};
const TEACHERS = []; 

// Startseite ausliefern: Holt die index.html jetzt direkt aus dem HAUPTORDNER
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// LOGIN VERARBEITEN
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    console.log(`Login-Versuch von: ${username} mit Rolle: ${role}`);

    if (username === "Admin" && password === "Admin123") {
        // Erfolgreich! Der Server leitet den Browser per GET weiter
        return res.redirect('/dashboard.html');
    } else {
        return res.send('<h1>Fehler: Falsche Anmeldedaten!</h1><a href="/">Zurück zum Login</a>');
    }
});

// APIs für die spätere Verwaltung
app.get('/api/teachers', (req, res) => res.json(TEACHERS));

app.listen(PORT, () => {
    console.log(`FoxNoten läuft auf http://localhost:${PORT}`);
});
