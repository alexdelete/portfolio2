document.addEventListener('DOMContentLoaded', () => {
    
    // Плейлист консоль
    const playlistToggle = document.getElementById('playlist-toggle');
    const playlistContent = document.getElementById('playlist-content');
    let currentTrack = 0;
    let hintElement = null;
    let isLoading = false;
    
    if (playlistToggle && playlistContent) {
        const loadTracks = () => {
            isLoading = true;
            playlistContent.innerHTML = `
                <div class="terminal-loader">
                    <div class="terminal-header">
                        <div class="terminal-controls">
                            <span class="control red"></span>
                            <span class="control yellow"></span>
                            <span class="control green"></span>
                        </div>
                        <div class="terminal-title">track_loader.exe</div>
                    </div>
                    <div class="terminal-content">Initializing playlist...</div>
                </div>
            `;
            
            setTimeout(() => {
                isLoading = false;
                renderTracks();
                showHint();
            }, 3000);
        };
        
        const renderTracks = () => {
            playlistContent.innerHTML = `
                <div class="playlist-track" data-index="0">1. Aphex Twin - Xtal</div>
                <div class="playlist-track" data-index="1">2. M83 - Midnight city</div>
                <div class="playlist-track" data-index="2">3. M|O|O|N - Hydrogen</div>
                <div class="playlist-track" data-index="3">4. Aphex Twin - 4</div>
                <div class="playlist-track" data-index="4">5. 100 gecs - stupid horse</div>
                <div class="playlist-track" data-index="5">6. Oneohtrix Point Never - Boring Angel</div>
                <div class="playlist-track" data-index="6">7. Ross from Friends - The Daisy</div>
                <div class="playlist-track" data-index="7">8. Lana Del Rey, The Weeknd - Stargirl Interlude</div>
                <div class="playlist-track" data-index="8">9. 100 gecs - money machine</div>
                <div class="playlist-track" data-index="9">10. 100 gecs - ringtone</div>
                <div class="playlist-link">
                    <a href="https://open.spotify.com/playlist/..." target="_blank">OPEN_IN_SPOTIFY</a>
                </div>
            `;
            
            const tracks = document.querySelectorAll('.playlist-track');
            if (tracks[currentTrack]) {
                tracks[currentTrack].classList.add('selected');
            }
        };
        
        const showHint = () => {
            if (hintElement) return;
            
            hintElement = document.createElement('div');
            hintElement.className = 'playlist-hint';
            hintElement.innerHTML = 'Use ↑ ↓ arrows to navigate <span class="close-hint">[×]</span>';
            playlistContent.prepend(hintElement);
            
            hintElement.querySelector('.close-hint').addEventListener('click', () => {
                hintElement.style.opacity = '0';
                setTimeout(() => hintElement.remove(), 300);
            });
        };
        
        playlistToggle.addEventListener('click', (e) => {
            if (e.button === 0 && !isLoading) {
                const wasClosed = !playlistContent.classList.contains('active');
                playlistContent.classList.toggle('active');
                
                const arrow = playlistToggle.querySelector('.console-arrow');
                if (arrow) {
                    arrow.textContent = playlistContent.classList.contains('active') ? '▲' : '▼';
                }
                
                if (wasClosed && playlistContent.classList.contains('active')) {
                    loadTracks();
                }
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (!playlistContent.classList.contains('active') || isLoading) return;
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                if (hintElement) {
                    hintElement.style.opacity = '0';
                    setTimeout(() => hintElement.remove(), 300);
                }
                
                e.preventDefault();
                const tracks = document.querySelectorAll('.playlist-track');
                
                const prevTrack = currentTrack;
                if (e.key === 'ArrowDown' && currentTrack < tracks.length - 1) {
                    currentTrack++;
                } else if (e.key === 'ArrowUp' && currentTrack > 0) {
                    currentTrack--;
                }
                
                if (prevTrack !== currentTrack) {
                    tracks.forEach(t => t.classList.remove('selected'));
                    tracks[currentTrack].classList.add('selected');
                    tracks[currentTrack].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }

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