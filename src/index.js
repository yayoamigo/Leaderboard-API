import './styles.css';
import {
  createGame, getScores, postScore, UI,
} from './modules.js';

const addForm = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const scoreInput = document.querySelector('#score');
const refresh = document.querySelector('#score-btn');

let gameId;
const render = new UI();
const getScores1 = async () => {
  const response = await getScores(gameId);
  const result = await response.result;
  render.addToUI(result);
};

const createGame1 = async () => {
  const response = await createGame('microverseGame');
  const data = await response.result.split(' ');
  [gameId] = [data[3]];
};

const postScore1 = (e) => {
  postScore(gameId, nameInput.value, scoreInput.value);
  render.cleanInputs();

  e.preventDefault();
};

document.addEventListener('DOMContentLoaded', createGame1);
addForm.addEventListener('submit', postScore1);
refresh.addEventListener('click', getScores1);
