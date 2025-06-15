document.addEventListener('DOMContentLoaded', () => {
 
// Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});
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
// Обработчик формы контактов
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Здесь можно добавить отправку формы
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}
document.addEventListener('DOMContentLoaded', function() {
    // Открытие шторки
    const projectItems = document.querySelectorAll('.project-item');
    const projectDrawer = document.getElementById('projectDrawer');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    projectItems.forEach(item => {
      item.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        loadProjectData(projectId); // Функция для загрузки данных проекта
        projectDrawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Закрытие шторки
    const closeDrawer = document.querySelector('.close-drawer');
    closeDrawer.addEventListener('click', closeProjectDrawer);
    overlay.addEventListener('click', closeProjectDrawer);
    
    function closeProjectDrawer() {
      projectDrawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Загрузка данных проекта (заглушка)
    function loadProjectData(projectId) {
      // Здесь будет логика загрузки данных проекта
      // Например, через AJAX или из объекта с данными
      console.log('Loading project', projectId);
      
      // Пример обновления содержимого шторки
      const projectData = {
        title: 'Project Title ' + projectId,
        year: '202' + projectId,
        description: 'Detailed description of project ' + projectId,
        images: ['image1.jpg', 'image2.jpg']
      };
      
      document.querySelector('.drawer-number').textContent = projectId.padStart(2, '0');
      document.querySelector('.drawer-title').textContent = projectData.title;
      document.querySelector('.drawer-year').textContent = projectData.year;
      
      const gallery = document.querySelector('.drawer-gallery');
      gallery.innerHTML = '';
      projectData.images.forEach(img => {
        gallery.innerHTML += `<img src="images/${img}" alt="${projectData.title}">`;
      });
      
      document.querySelector('.drawer-description').innerHTML = 
        `<p>${projectData.description}</p>`;
    }
  });
// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-title', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});

gsap.from('.grid-item', {
  opacity: 0,
  y: 30,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.grid-container',
    start: "top 80%"
  }
});
