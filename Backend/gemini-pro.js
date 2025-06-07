const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; 
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

async function getSpotifyAccessToken() {
    const url = 'https://accounts.spotify.com/api/token';
    
    const headers = {
        'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials'); 

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
    });

    const data = await response.json();
    return data.access_token; 
}

app.post('/track-info', async (req, res) => {
    const { name, artist } = req.body;

    try {
        const token = await getSpotifyAccessToken();
        const query = encodeURIComponent(`track:${name} artist:${artist}`);
        const url = `${SPOTIFY_API_URL}/search?q=${query}&type=track&limit=1`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (
            data.tracks &&
            data.tracks.items &&
            data.tracks.items.length > 0
        ) {
            const track = data.tracks.items[0];
            res.json({
                preview_url: track.preview_url,
                spotify_url: track.external_urls.spotify,
                image_url: track.album.images[0]?.url,
                track_id: track.id,
            });
        } else {
            res.json({ preview_url: null, spotify_url: null, image_url: null, track_id: track.id, });
        }
    } catch (error) {
        console.error('Error fetching song info:', error);
        res.status(500).json({ error: 'Error fetching track info from Spotify' });
    }
});

app.post('/playlist', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "El campo 'text' es obligatorio." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

        const prompt = `
        Analiza el siguiente texto: "${text}" e identifica el estado emocional, necesidad de la persona o simplemente lo que está buscando.
        Con base en eso, genera una lista de 30 canciones que:
        - Existan realmente (verificables).
        - Estén disponibles en Spotify obligatoriamente.
        Devuelve el resultado **solo** en formato JSON, sin explicaciones ni texto adicional. El JSON debe tener una propiedad raíz "songs", que contenga un arreglo de objetos, cada uno con:
        Cada canción debe tener:
        - name: nombre exacto de la canción
        - artist: nombre del artista
        - reason: una frase breve explicando por qué se recomienda esta canción para el caso
        Asegúrate de que las canciones y enlaces sean reales y actuales. No inventes canciones.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();

        console.log(generatedText);
        res.json({ result: generatedText });
    } catch (error) {
        console.error("Error en la generación de contenido:", error);
        res.status(500).json({ error: "Error al procesar la solicitud." });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});