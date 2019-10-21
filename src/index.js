import "./styles/fonts.scss"
import "./styles/style.scss";

const popup = document.querySelector("#form-popup"),
    popupToggle = document.querySelector("#myBtn"),
    popupClose = document.querySelector('.close-btn'),
    // congratulations = document.querySelector('.congratulations');
    errorText = document.querySelector('.error-text');

popupToggle.addEventListener('click', () => popup.style.display = 'block');
popupClose.addEventListener('click', () => popup.style.display = 'none');
window.addEventListener('click', (element) => {
    if (element.target === popup) popup.style.display = "none"
});

const popupInputName = document.querySelector(".form-name > input"),
    popupInputEmail = document.querySelector(".form-email > input"),
    popupInputPhone = document.querySelector(".form-phone > input"),
    popupSubmit = document.querySelector(".popup-form");

popupSubmit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let error = "Ошибка: ";

    let checkName = /[А-ЯA-Z][а-яa-z]/,
        checkEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        checkPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

    if (!checkName.test(popupInputName.value)) {
        error += "Формат имени неверный!";
    }
    if (!checkEmail.test(popupInputEmail.value)) {
        error += "Формат E-mail неверный!";
    }
    if (!checkPhone.test(popupInputPhone.value)) {
        error += "Формат телефона неверный!";
    }
    if (error === "Ошибка: ") {
        popup.style.display = "none";
        window.location.assign("congratulations.html");
    } else {                                    //show error
        errorText.textContent = error;
    }
});

