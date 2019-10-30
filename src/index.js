import './styles/style.scss';
import { allCards } from './db/cards.json';

const filters = {
  value: '',
  status: 'all',
  priority: 'all',
};

const applyFilter = (newFilters, cards) => {
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
};

const hundleCardSearch = event => {
  event.preventDefault();
  filters.value = event.target.querySelector('input[name="search"]').value;
  applyFilter(filters, allCards);
};
const serchForm = document.querySelector('.navigation__search');
serchForm.addEventListener('submit', hundleCardSearch);

const filterStatusContentNode = document.querySelector(
  '.navigation__search_filter-status-content',
);
const filterStatusCurrentNode = document.querySelector(
  '.navigation__search_filter-status-button',
);
const hundleChangeStatus = ({ target }) => {
  const currentSelector = filterStatusCurrentNode.childNodes[0].nodeValue.trim();
  filterStatusCurrentNode.childNodes[0].nodeValue = target.innerText;

  filters.status = target.innerText;
  applyFilter(filters, allCards);

  target.innerText = currentSelector;
};
filterStatusContentNode.addEventListener('click', hundleChangeStatus);

const filterPriorityContentNode = document.querySelector(
  '.navigation__search_filter-priority-content',
);
const filterPriorityCurrentNode = document.querySelector(
  '.navigation__search_filter-priority-button',
);
const hundleChangePriority = ({ target }) => {
  const currentSelector = filterPriorityCurrentNode.childNodes[0].nodeValue.trim();
  filterPriorityCurrentNode.childNodes[0].nodeValue = target.innerText;

  filters.priority = target.innerText;
  applyFilter(filters, allCards);

  target.innerText = currentSelector;
};
filterPriorityContentNode.addEventListener('click', hundleChangePriority);
loadCards(allCards);

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
