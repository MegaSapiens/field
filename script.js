// Получаем ссылку на форму и кнопку
const form = document.querySelector('.field form');
const createButton = document.querySelector('.field button');
let isSubmitting = false; // Флаг для предотвращения многократных отправок

// Функция, которая будет отправлять данные на сервер с помощью AJAX
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
      return response.text().then(text => { throw new Error(text); });
    }
  })
  .catch(error => {
    showNotification('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз. Ошибка: ' + error.message, true);
    console.error('Error:', error);
  })
  .finally(() => {
    isSubmitting = false; // Сбрасываем флаг после завершения отправки
  });
}

// Добавляем обработчик события на кнопку
createButton.addEventListener('click', (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  // Проверяем, если форма уже отправляется
  if (isSubmitting) return;
  isSubmitting = true; // Устанавливаем флаг отправки

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
    isSubmitting = false; // Сбрасываем флаг при ошибке валидации
    // Показываем всплывающее уведомление об ошибке
    showNotification('Пожалуйста, заполните оба поля!', true);
  }
});

// Функция для показа всплывающего уведомления
function showNotification(message, isError = false) {
  // Проверяем на существование предыдущего уведомления
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

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
