// Получаем ссылку на форму и кнопку
const form = document.querySelector('.field form');
const createButton = document.querySelector('.field button');

// Добавляем обработчик события на кнопку
createButton.addEventListener('click', (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем значения из полей ввода
    const form1Value = document.getElementById('form1').value;
    const form2Value = document.getElementById('form2').value;

    // Проверяем, что оба поля заполнены
    if (form1Value.trim() !== '' && form2Value.trim() !== '') {
        // Показываем всплывающее уведомление
        showNotification('Ilicoins created successfully!');

        // Очищаем поля ввода
        document.getElementById('form1').value = '';
        document.getElementById('form2').value = '';
    } else {
        // Показываем всплывающее уведомление об ошибке
        showNotification('Please fill in both fields.', true);
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

    // Автоматически скрываем уведомление через 3 секунды
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
