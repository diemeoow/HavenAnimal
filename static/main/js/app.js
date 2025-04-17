document.addEventListener('DOMContentLoaded', () => {
    // Существующий код для фильтров
    const filterButtons = document.querySelectorAll('.filters__button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterGroup = button.parentElement;
            const isActive = filterGroup.classList.contains('filters__group--active');

            document.querySelectorAll('.filters__group').forEach(group => {
                group.classList.remove('filters__group--active');
            });

            if (!isActive) {
                filterGroup.classList.add('filters__group--active');
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filters__group')) {
            document.querySelectorAll('.filters__group').forEach(group => {
                group.classList.remove('filters__group--active');
            });
        }
    });

    // Существующий код для модального окна регистрации и навигации
    const profileButton = document.querySelector('.nav__btn--profile');
    const mainButton = document.querySelector('.nav__btn');
    const modal = document.getElementById('registrationModal');
    const closeModal = document.getElementById('closeModal');
    const registerButton = document.querySelector('.modal__submit');
    const mainSections = document.querySelectorAll('main');

    profileButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'none';

        mainSections.forEach((section) => {
            section.style.display = 'none';
        });

        const adminMain = document.querySelector('main.admin');
        if (adminMain) {
            adminMain.style.display = 'block';
        }
    });

    mainButton.addEventListener('click', () => {
        mainSections.forEach((section) => {
            section.style.display = 'none';
        });

        const mainMain = document.querySelector('main.main');
        if (mainMain) {
            mainMain.style.display = 'block';
        }
    });

    // Новый код для открытия окна подробностей
    const cards = document.querySelectorAll('.card');
    const contextWindow = document.getElementById('context_window');
    const contextCloseButton = contextWindow.querySelector('.modal__close');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Получаем данные из карточки
            const name = card.querySelector('.card__name').textContent;
            const imageSrc = card.querySelector('.image').src;
            const isFemale = card.classList.contains('card--female');
            const description = card.getAttribute('data-description');
            const isCat = card.classList.contains('card--cat'); // Извлекаем описание

            // Обновляем содержимое окна подробностей
            const contextName = contextWindow.querySelector('.name__pets');
            const contextImage = contextWindow.querySelector('.modal__form .image');
            const contextGenderIcon = contextWindow.querySelector('.modal__header img');
            const contextDescription = contextWindow.querySelector('.modal__form p');

            contextName.textContent = name;
            contextImage.src = imageSrc;
            contextGenderIcon.src = isCat
                ? contextGenderIcon.src = isFemale
                    ? 'static/main/images/cat-female.svg'
                    : 'static/main/images/cat-male.svg'
                : contextGenderIcon.src = isFemale
                    ? 'static/main/images/dog-female.svg'
                    : 'static/main/images/dog-male.svg';
            contextDescription.textContent = description; // Обновляем описание

            // Показываем окно
            contextWindow.style.display = 'flex';
        });
    });

    // Закрытие окна подробностей при клике на крестик
    if (contextCloseButton) {
        contextCloseButton.addEventListener('click', () => {
            contextWindow.style.display = 'none';
        });
    }

    // Закрытие окна подробностей при клике вне его
    window.addEventListener('click', (event) => {
        if (event.target === contextWindow) {
            contextWindow.style.display = 'none';
        }
    });

});

// Фильтр по породе
document.querySelectorAll('.breed-radio').forEach(radio => {
    radio.addEventListener('change', function () {
        const params = new URLSearchParams(window.location.search);
        params.set('breed', this.value);
        window.location.search = params.toString();
    });
});

// Фильтр по полу
document.querySelectorAll('.gender-radio').forEach(radio => {
    radio.addEventListener('change', function () {
        const params = new URLSearchParams(window.location.search);
        params.set('gender', this.value);
        window.location.search = params.toString();
    });
});

// Фильтр по возрасту
document.querySelectorAll('.age-radio').forEach(radio => {
    radio.addEventListener('change', function () {
        const params = new URLSearchParams(window.location.search);
        params.set('age', this.value);
        window.location.search = params.toString();
    });
});