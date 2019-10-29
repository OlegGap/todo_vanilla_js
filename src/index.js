import './styles/style.scss';
import cards from './db/cards.json';

const filters = {
  value: 'all',
  status: 'all',
  priority: 'all',
};

const filterStatusContentNode = document.querySelector(
  '.navigation__search_filter-status-content',
);
const filterStatusCurrentNode = document.querySelector(
  '.navigation__search_filter-status-button',
);
const hundleChangeStatus = ({ target }) => {
  const currentSelector = filterStatusCurrentNode.childNodes[0].nodeValue.trim();
  filterStatusCurrentNode.childNodes[0].nodeValue = target.innerText;
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
  target.innerText = currentSelector;
};
filterPriorityContentNode.addEventListener('click', hundleChangePriority);

const cardsList = document.querySelector('.cards-list');
let card;
cards.map((cardData, idx) => {
  card = document.createElement('div');
  card.className = 'card-wrapper';

  card.innerHTML = `<div data-id="${idx}" class="card"> <div class="card-title">${cardData.title}</div></div>`;
  card.lastChild.innerHTML += `<div class="card-content">${cardData.text}</div>`;

  card.lastChild.innerHTML += `<div class="card__footer"><div class="card__footer-priority">${cardData.priority}</div><div class="card__footer-dropdown__navigation"><button class="card__footer-dropdown__navigation-button"> ...</button><div class="card__footer-dropdown__navigation-content"><button>done</button><button>edit</button><button>delete</button></div> </div> </div>`;
  cardsList.appendChild(card);
});
