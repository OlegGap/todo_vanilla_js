import './styles/style.scss';
import { allCards } from './db/cards.json';

const filters = {
  value: '',
  status: 'all',
  priority: 'all',
};

function applyFilter(newFilters, cards) {
  let resultCurds = cards.slice(0);

  if (newFilters.value !== '') {
    const reg = new RegExp(newFilters.value);
    resultCurds = cards.filter(card => card.title.match(reg) !== null);
  }
  if (newFilters.status !== 'all') {
    resultCurds = resultCurds.filter(card => card.status === newFilters.status);
  }
  if (newFilters.priority !== 'all') {
    resultCurds = resultCurds.filter(
      card => card.priority === newFilters.priority,
    );
  }
  loadCards(resultCurds);
}

document
  .querySelector('.navigation__search')
  .addEventListener('submit', hundleCardSearch);

function hundleCardSearch(event) {
  event.preventDefault();
  filters.value = event.target.querySelector('input[name="search"]').value;
  applyFilter(filters, allCards);
}

document
  .querySelector('.navigation__search_filter-status-content')
  .addEventListener('click', hundleChangeStatus);

const filterStatusCurrentNode = document.querySelector(
  '.navigation__search_filter-status-button',
);
function hundleChangeStatus({ target }) {
  const currentSelector = filterStatusCurrentNode.childNodes[0].nodeValue.trim();
  filterStatusCurrentNode.childNodes[0].nodeValue = target.innerText;

  filters.status = target.innerText;
  applyFilter(filters, allCards);

  target.innerText = currentSelector;
}

document
  .querySelector('.navigation__search_filter-priority-content')
  .addEventListener('click', hundleChangePriority);
loadCards(allCards);
const filterPriorityCurrentNode = document.querySelector(
  '.navigation__search_filter-priority-button',
);
function hundleChangePriority({ target }) {
  const currentSelector = filterPriorityCurrentNode.childNodes[0].nodeValue.trim();
  filterPriorityCurrentNode.childNodes[0].nodeValue = target.innerText;

  filters.priority = target.innerText;
  applyFilter(filters, allCards);

  target.innerText = currentSelector;
}

function loadCards(cards) {
  const cardsList = document.querySelector('.cards-list');
  cardsList.innerHTML = '';
  let card;
  cards.map((cardData, idx) => {
    card = document.createElement('div');
    card.className = 'card-wrapper';

    card.innerHTML = `<div data-id="${cardData.id}" class="card"> <div class="card-title">${cardData.title}</div></div>`;
    if (cardData.status === 'done') {
      card.lastChild.innerHTML += `<div class="card-mark">&#10003;</div>`;
      card.classList.add('card-done');
    }
    card.lastChild.innerHTML += `<div class="card-content">${cardData.text}</div>`;

    card.lastChild.innerHTML += `<div class="card__footer"><div class="card__footer-priority">${
      cardData.priority
    }</div><div class="card__footer-dropdown__navigation"><button class="card__footer-dropdown__navigation-button"> ...</button><div class="card__footer-dropdown__navigation-content"><button data-card='status'>${
      cardData.status === 'done' ? 'open' : 'done'
    }</button data-card='edit'><button>edit</button><button data-card='delete'>delete</button></div> </div> </div>`;
    cardsList.appendChild(card);

    const cardCurrentButtonStatusNode = document.querySelectorAll(
      'button[data-card="status"]',
    );
    cardCurrentButtonStatusNode[idx].addEventListener('click', () =>
      hundleChangeCardStatus(cardData.id, cardData.status),
    );

    const cardCurrentButtonDeleteNode = document.querySelectorAll(
      'button[data-card="delete"]',
    );
    cardCurrentButtonDeleteNode[idx].addEventListener('click', () =>
      hundleDeleteCard(cardData.id),
    );
  });
}

function hundleChangeCardStatus(id, status) {
  allCards.map(card => {
    if (card.id === id) {
      card.status = status === 'done' ? 'open' : 'done';
    }
    return card;
  });
  loadCards(allCards);
}

function hundleDeleteCard(id) {
  allCards.map((card, idx) => {
    if (card.id === id) {
      allCards.splice(idx, 1);
    }
    return card;
  });
  loadCards(allCards.filter(card => card.id !== id));
}

const popupContainer = document.querySelector('.popup-container');
document
  .querySelector('.navigation__button-create')
  .addEventListener('click', () => (popupContainer.style.display = 'flex'));

window.addEventListener('click', element => {
  if (element.target === popupContainer) popupContainer.style.display = 'none';
});

const popupPriorityCurrentNode = document.querySelector(
  '.popup__form-priority-button',
);

function hundleCreateCardChangePriority({ target }) {
  const currentSelector = popupPriorityCurrentNode.childNodes[0].nodeValue.trim();

  popupPriorityCurrentNode.childNodes[0].nodeValue = target.innerText;

  target.innerText = currentSelector;
}

document
  .querySelector('.popup__form-priority-content')
  .addEventListener('click', hundleCreateCardChangePriority);

const popupFormTitleError = document.querySelector('.popup__form-title-error');

document
  .querySelector('.popup__form-button-cancel')
  .addEventListener('click', () => {
    popupContainer.style.display = 'none';
  });

document
  .querySelector('.popup__form')
  .addEventListener('submit', hundleSubmitPopupForm);

function hundleSubmitPopupForm(evt) {
  evt.preventDefault();
  const currentTitle = evt.target.querySelector('.popup__form-title').value;
  const currentDescription = evt.target.querySelector(
    '.popup__form-description',
  ).value;

  if (currentTitle.length) {
    popupFormTitleError.style.display = 'none';
    const resultCard = {
      title: currentTitle,
      text: currentDescription,
      priority: popupPriorityCurrentNode.childNodes[0].nodeValue
        .trim()
        .toLowerCase(),
      status: 'open',
      id:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
    };
    allCards.push(resultCard);
    loadCards(allCards);
    evt.target.reset();
    popupContainer.style.display = 'none';
  } else {
    popupFormTitleError.innerText = 'Input title!';
    popupFormTitleError.style.display = 'block';
  }
}
