document.addEventListener('DOMContentLoaded', () => {
 

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
