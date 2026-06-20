const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Erlaubt das Lesen von Formulardaten (POST-Anfragen)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Macht den Ordner "public" für statische Dateien (HTML, CSS) verfügbar
app.use(express.static(path.join(__dirname, 'public')));

// --- UNSERE TEMPORÄREN DATENBANKEN (Listen) ---
const USERS = {
    "Admin": { password: "Admin123", role: "admin" }
};

const TEACHERS = []; // Hier landen die erstellten Lehrer

// 1. LOGIN VERARBEITEN
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    // Prüfen ob der Nutzer existiert und das Passwort stimmt
    if (USERS[username] && USERS[username].password === password) {
        // Erfolgreich! Wir leiten den Nutzer an das Dashboard weiter
        // In einer echten Website würde man hier Sessions/Cookies nutzen
        return res.redirect('/dashboard.html');
    } else {
        return res.send('<h1>Fehler: Falsche Anmeldedaten!</h1><a href="/">Zurück zum Login</a>');
    }
});

// 2. API: LEHRER AUFLISTEN (Für Bild 3)
app.get('/api/teachers', (req, res) => {
    res.json(TEACHERS);
});

// 3. API: NEUEN LEHRER ERSTELLEN (Für Bild 4)
app.post('/api/teachers/new', (req, res) => {
    const { 
        geschlecht, akademischerTitel, vorname, nachname, 
        kurzform, email, geburtsdatum, klassenleitung, 
        alsNutzerAnlegen, startAm, endeAm 
    } = req.body;

    // Neuen Lehrer in die Liste eintragen
    const neuerLehrer = {
        id: TEACHERS.length + 1,
        name: `${nachname}, ${vorname}`,
        kurzform: kurzform,
        klassen: klassenleitung || "0 Klassen",
        schueler: "0 Schüler",
        unterrichtseinheiten: "0 Unterrichtseinheiten"
    };
    TEACHERS.push(neuerLehrer);

    // Wenn der Haken "Lehrer als Nutzer anlegen" aktiv war (Bild 5 & 6)
    if (alsNutzerAnlegen === "true" || alsNutzerAnlegen === true) {
        // Generiert ein Standardpasswort aus der Kurzform + "2026"
        const username = kurzform; 
        USERS[username] = {
            password: "StartPasswort123!", 
            role: "lehrer"
        };
    }

    // Nach dem Speichern zurück zur Lehrerliste leiten
    res.redirect('/dashboard.html?view=lehrer');
});

// Server starten
app.listen(PORT, () => {
    console.log(`FoxNoten läuft auf http://localhost:${PORT}`);
});
