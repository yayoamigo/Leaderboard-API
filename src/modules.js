// First we create a function to update the UI
export const addToUI = (arr) => {
  const list = document.querySelector('#table');
  list.innerHTML = '';
  const sorted = arr.sort((x, y) => y.score - x.score);
  sorted.forEach((x) => {
    list.innerHTML += `<tr>
    <td> ${x.user} : ${x.score}</td></tr>`;
  });
};
// This function will reset the inputs
export const cleanInputs = () => {
  const nameInput = document.querySelector('#name');
  const scoreInput = document.querySelector('#score');
  nameInput.value = '';
  scoreInput.value = '';
};
// The first step is geting the id for the new game
export const createGame = async (gameName) => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: gameName,
      }),
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
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        user: name,
        score,
      }),
    });
    const responseData = await responseStart.json();
    return responseData;
  } catch (error) {
    return error;
  }
};