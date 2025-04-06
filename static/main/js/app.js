document.querySelector('.filters__btn--gender').addEventListener('click', function() {
    this.closest('.filters').classList.toggle('active');
  });

  // Закрытие при клике вне фильтра
document.addEventListener('click', function(e) {
    if (!e.target.closest('.filters')) {
      document.querySelector('.filters').classList.remove('active');
    }
});
document.addEventListener('DOMContentLoaded', () => {
  const profileButton = document.querySelector('.nav__btn--profile');
  const mainButton = document.querySelector('.nav__btn'); // Кнопка "Главная"
  const modal = document.getElementById('registrationModal');
  const closeModal = document.getElementById('closeModal');
  const registerButton = document.querySelector('.modal__submit');
  const mainSections = document.querySelectorAll('main');

  // Открытие модального окна
  profileButton.addEventListener('click', () => {
      modal.style.display = 'flex';
  });

  // Закрытие модального окна
  closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  // Закрытие модального окна при клике вне его
  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  // Переход на <main class="admin">
  registerButton.addEventListener('click', (event) => {
      event.preventDefault(); // Останавливаем стандартное поведение формы
      modal.style.display = 'none'; // Закрываем модальное окно

      // Скрываем все секции <main>
      mainSections.forEach((section) => {
          section.style.display = 'none';
      });

      // Показываем <main class="admin">
      const adminMain = document.querySelector('main.admin');
      if (adminMain) {
          adminMain.style.display = 'block';
      }
  });

  // Переход на <main class="main"> по кнопке "Главная"
  mainButton.addEventListener('click', () => {
      // Скрываем все секции <main>
      mainSections.forEach((section) => {
          section.style.display = 'none';
      });

      // Показываем <main class="main">
      const mainMain = document.querySelector('main.main');
      if (mainMain) {
          mainMain.style.display = 'block';
      }
  });
});