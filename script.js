document.addEventListener('DOMContentLoaded', () => {
    
    const express = require('express');
    const fetch = require('node-fetch');
    require('dotenv').config();
    
    const app = express();
    const port = 3000;
    
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const refresh_token = process.env.REFRESH_TOKEN;
    
    async function getAccessToken() {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
        }),
      });
    
      const data = await response.json();
      return data.access_token;
    }
    
    app.get('/now-playing', async (req, res) => {
      try {
        const access_token = await getAccessToken();
    
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        });
    
        if (response.status === 204 || response.status > 400) {
          return res.json({ isPlaying: false });
        }
    
        const data = await response.json();
    
        const result = {
          isPlaying: data.is_playing,
          name: data.item.name,
          artist: data.item.artists.map(a => a.name).join(', '),
          album: data.item.album.name,
          cover: data.item.album.images[0]?.url,
          url: data.item.external_urls.spotify,
        };
    
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong.' });
      }
    });
    
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

    async function getNowPlaying() {
        try {
          const res = await fetch('http://localhost:3000/now-playing');
          const data = await res.json();
      
          const display = document.getElementById('now-track');
      
          if (data.isPlaying) {
            display.innerHTML = `<a href="${data.url}" target="_blank">${data.name}</a> — ${data.artist}`;
          } else {
            display.textContent = "Nothing playing";
          }
        } catch (err) {
          console.error('Error fetching track:', err);
        }
      }
      
      setInterval(getNowPlaying, 30000);
      getNowPlaying();

// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);

    // Обработчик клика
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

    // Табы для картинок
    document.querySelectorAll('.tab-header').forEach(header => {
        header.addEventListener('click', () => {
            const tab = header.parentElement;
            const content = header.nextElementSibling;
            const marker = header.querySelector('.tab-marker');
            
            tab.classList.toggle('active');
            if (marker) marker.classList.toggle('active');
            
            if (tab.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Автозапуск видео в digital-art.html
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                this.querySelectorAll('video').forEach(v => v.play());
            } else {
                this.querySelectorAll('video').forEach(v => v.pause());
            }
        });
    });
});
