console.log('Client side file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        return;
      }
      messageOne.textContent = data.forecast;
      messageTwo.textContent = data.location;

      // console.log(data.error);
      // console.log(data);
    });
  });
});
