const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// WICHTIG: Erlaubt das Lesen von Formulardaten (POST-Anfragen)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Aktiviert den "public"-Ordner für alle HTML- und CSS-Dateien
app.use(express.static(path.join(__dirname, 'public')));

// --- UNSERE TEMPORÄREN DATENBANKEN (Listen) ---
const USERS = {
    "Admin": { password: "Admin123", role: "admin" }
};
const TEACHERS = []; 

// Startseite ausliefern (holt index.html aus /public)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// LOGIN VERARBEITEN
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    console.log(`Login-Versuch von: ${username} mit Rolle: ${role}`); // Zum Testen im Terminal

    if (USERS[username] && USERS[username].password === password) {
        // Erfolgreich! Weiterleitung zum Dashboard
        return res.redirect('/dashboard.html');
    } else {
        return res.send('<h1>Fehler: Falsche Anmeldedaten!</h1><a href="/">Zurück zum Login</a>');
    }
});

// APIs für später
app.get('/api/teachers', (req, res) => res.json(TEACHERS));
app.post('/api/teachers/new', (req, res) => {
    // (Hier bleibt deine Lehrer-Erstellungs-Logik von vorhin)
    res.redirect('/dashboard.html?view=lehrer');
});

app.listen(PORT, () => {
    console.log(`FoxNoten läuft auf http://localhost:${PORT}`);
});
