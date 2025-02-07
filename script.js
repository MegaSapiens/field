// Получаем ссылку на форму и кнопку
const form = document.querySelector('.field form');
const createButton = document.querySelector('.field button');

// функцию, которая будет отправлять данные на сервер с помощью AJAX
function sendDataToServer(form1Value, form2Value) {
  const formData = new FormData();
  formData.append('form1', form1Value);
  formData.append('form2', form2Value);

  fetch('/submit-form', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      showNotification('Заявка на создание монеты успешно отправлена валидаторам!');
    } else {
      showNotification('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.', true);
    }
  })
  .catch(error => {
    showNotification('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.', true);
    console.error('Error:', error);
  });
}

// Добавляем обработчик события на кнопку
createButton.addEventListener('click', (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение формы
    
  // Получаем значения из полей ввода
  const form1Value = document.getElementById('form1').value;
  const form2Value = document.getElementById('form2').value;

    // Проверяем, что оба поля заполнены
  if (form1Value.trim() !== '' && form2Value.trim() !== '') {
    sendDataToServer(form1Value, form2Value);

    // Очищаем поля ввода после успешной отправки
    document.getElementById('form1').value = '';
    document.getElementById('form2').value = '';
  } else {
    // Показываем всплывающее уведомление об ошибке
    showNotification('Пожалуйста, заполните оба поля!', true);
  }
});

// Функция для показа всплывающего уведомления
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    if (isError) {
        notification.classList.add('error');
    }
    notification.textContent = message;
    document.body.appendChild(notification);

    // Автоматически скрываем уведомление через 5 секунд
    setTimeout(() => {
        notification.remove();
    }, 5000);
}
