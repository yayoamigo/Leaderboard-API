export class UI {
  constructor() {
    this.list = document.querySelector('#table');
    this.nameInput = document.querySelector('#name');
    this.scoreInput = document.querySelector('#score');
  }

  addToUI(arr) {
    this.list.innerHTML = '';
    const sorted = arr.sort((x, y) => y.score - x.score);
    sorted.forEach((x) => {
      this.list.innerHTML += `<tr>
    <td> ${x.user} : ${x.score}</td></tr>`;
    });
  }

  cleanInputs() {
    this.nameInput.value = '';
    this.scoreInput.value = '';
  }
}

export const createGame = async (gameName) => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
      method: 'POST',
      body: JSON.stringify({
        name: gameName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

export const getScores = async (gameId) => {
  try {
    const responseStart = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`);
    const responseData = await responseStart.json();
    return responseData;
  } catch (error) {
    return error;
  }
};

export const postScore = async (gameId, name, score) => {
  try {
    if (name === '' || score === '') {
      alert('Please enter your name and score');
    }
    const responseStart = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, {
      method: 'POST',
      body: JSON.stringify({
        user: name,
        score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const responseData = await responseStart.json();
    return responseData;
  } catch (error) {
    return error;
  }
};