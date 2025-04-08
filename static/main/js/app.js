document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filters__button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterGroup = button.parentElement; // Находим родительский filters__group
            const isActive = filterGroup.classList.contains('filters__group--active');

            // Закрываем все фильтры
            document.querySelectorAll('.filters__group').forEach(group => {
                group.classList.remove('filters__group--active');
            });

            // Если текущий фильтр не был активен, открываем его
            if (!isActive) {
                filterGroup.classList.add('filters__group--active');
            }
        });
    });

    // Закрываем фильтры при клике вне их
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filters__group')) {
            document.querySelectorAll('.filters__group').forEach(group => {
                group.classList.remove('filters__group--active');
            });
        }
    });
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

document.querySelectorAll('input[name="gender"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      const gender = radio.value;

      // Получаем текущий путь без слэша на конце
      let currentPath = window.location.pathname.replace(/\/$/, '');

      // Убираем /male или /female, если уже есть
      currentPath = currentPath.replace(/\/(male|female)$/, '');

      // Формируем новый путь
      const newPath = `${currentPath}/${gender}`;

      // Перенаправление
      window.location.href = newPath;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const genderMatch = path.match(/\/(male|female)/);

  if (genderMatch) {
    const gender = genderMatch[1]; // 'male' или 'female'
    const radio = document.querySelector(`input[name="gender"][value="${gender}"]`);
    if (radio) {
      radio.checked = true;
    }
  }
});
