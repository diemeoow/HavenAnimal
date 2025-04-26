document.addEventListener('DOMContentLoaded', () => {
    // --- Фильтры
    const filterButtons = document.querySelectorAll('.filters__button');

    if (filterButtons.length) {
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
    }

    // --- Навигация и регистрация
    const profileButton = document.querySelector('.nav__btn--profile');
    const mainButton = document.querySelector('.nav__btn');
    const modal = document.getElementById('registrationModal'); // исправила
    const mainSections = document.querySelectorAll('main');
    const registrationPage = document.querySelector('main.registration');
    const mainMain = document.querySelector('main.main');

    if (mainSections.length) {
        mainSections.forEach(section => section.style.display = 'none');
        if (mainMain) mainMain.style.display = 'block';
    }

    if (profileButton) {
        profileButton.addEventListener('click', () => {
            mainSections.forEach(section => section.style.display = 'none');
            if (registrationPage) registrationPage.style.display = 'flex';
        });
    }

    if (mainButton) {
        mainButton.addEventListener('click', () => {
            mainSections.forEach(section => section.style.display = 'none');
            if (mainMain) mainMain.style.display = 'block';
            const header = document.querySelector('header');
            if (header) header.classList.remove('header--cats', 'header--dogs');
        });
    }

    const loginForm = document.querySelector('.modal__form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (email && password) {
                localStorage.setItem('isOwner', 'true');
                window.location.href = 'ownerPage.html';
            } else {
                alert('Пожалуйста, заполните все поля!');
            }
        });
    }

    // --- Карточки и модалка подробностей
    const cards = document.querySelectorAll('.card');
    const contextWindow = document.getElementById('context_window');
    if (cards.length && contextWindow) {
        const contextCloseButton = contextWindow.querySelector('.modal__close');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('.card__name').textContent;
                const imageSrc = card.querySelector('.image').src;
                const isFemale = card.classList.contains('card--female');
                const isCat = card.classList.contains('card--cat');

                const contextName = contextWindow.querySelector('.name__pets');
                const contextImage = contextWindow.querySelector('.modal__form .image');
                const contextGenderIcon = contextWindow.querySelector('.modal__header img');
                const contextDescription = contextWindow.querySelector('.modal__form p');

                contextName.textContent = name;
                contextImage.src = imageSrc;
                contextGenderIcon.src = isCat
                    ? isFemale
                        ? 'assets/images/cat-female.svg'
                        : 'assets/images/cat-male.svg'
                    : isFemale
                        ? 'assets/images/dog-female.svg'
                        : 'assets/images/dog-male.svg';
                contextDescription.textContent = `Описание для ${name}`;
                contextWindow.style.display = 'flex';
            });
        });

        if (contextCloseButton) {
            contextCloseButton.addEventListener('click', () => {
                contextWindow.style.display = 'none';
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === contextWindow) {
                contextWindow.style.display = 'none';
            }
        });
    }

    // --- Смена цвета шапки
    const header = document.querySelector('header');
    const catsBtn = document.querySelector('.nav__btn--cats');
    const dogsBtn = document.querySelector('.nav__btn--dogs');

    if (catsBtn) {
        catsBtn.addEventListener('click', () => {
            if (header) {
                header.classList.remove('header--dogs');
                header.classList.add('header--cats');
            }
        });
    }

    if (dogsBtn) {
        dogsBtn.addEventListener('click', () => {
            if (header) {
                header.classList.remove('header--cats');
                header.classList.add('header--dogs');
            }
        });
    }
});
