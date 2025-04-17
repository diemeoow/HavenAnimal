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
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });

    registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        modal.classList.add('hidden');
        modal.classList.remove('flex');

        mainSections.forEach((section) => {
            section.classList.add('hidden');
        });

        const adminMain = document.querySelector('main.admin');
        if (adminMain) {
            adminMain.classList.remove('hidden');
            adminMain.classList.add('block');
        }
    });

    mainButton.addEventListener('click', () => {
        mainSections.forEach((section) => {
            section.classList.add('hidden');
        });

        const mainMain = document.querySelector('main.main');
        if (mainMain) {
            mainMain.classList.remove('hidden');
            mainMain.classList.add('block');
        }
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
                ? isFemale
                    ? 'assets/images/cat-female.svg'
                    : 'assets/images/cat-male.svg'
                : isFemale
                    ? 'assets/images/dog-female.svg'
                    : 'assets/images/dog-male.svg';
            contextDescription.textContent = `Описание для ${name}`;
            contextWindow.classList.remove('hidden');
            contextWindow.classList.add('flex');
        });
    });

    if (contextCloseButton) {
        contextCloseButton.addEventListener('click', () => {
            contextWindow.classList.add('hidden');
            contextWindow.classList.remove('flex');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === contextWindow) {
            contextWindow.classList.add('hidden');
            contextWindow.classList.remove('flex');
        }
    });
});