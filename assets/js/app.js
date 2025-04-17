document.addEventListener('DOMContentLoaded', () => {
    // фильтры
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

    // регистрация/навигация
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
        const header = document.querySelector('header');
        header.classList.remove('header--cats', 'header--dogs');
    });

    // карточки
    const cards = document.querySelectorAll('.card');
    const contextWindow = document.getElementById('context_window');
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
                ? contextGenderIcon.src = isFemale 
                    ? 'assets/images/cat-female.svg' 
                    : 'assets/images/cat-male.svg'
                : contextGenderIcon.src = isFemale
                    ? 'assets/images/dog-female.svg' 
                    : 'assets/images/dog-male.svg';
            contextDescription.textContent = `Описание для ${name}`; 
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
    // Изменение стиля хедера при нажатии на кнопки "Кошечки" и "Собачки"
    const header = document.querySelector('header');
    const catsBtn = document.querySelector('.nav__btn--cats');
    const dogsBtn = document.querySelector('.nav__btn--dogs');

    catsBtn.addEventListener('click', () => {
        header.classList.remove('header--dogs');
        header.classList.add('header--cats');
    });

    dogsBtn.addEventListener('click', () => {
        header.classList.remove('header--cats');
        header.classList.add('header--dogs');
    });
});