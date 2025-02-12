
document.addEventListener("DOMContentLoaded", function() {
    // Изначально скрываем шапку, основной контент и подвал
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    
    header.style.display = "none";
    main.style.display = "none";
    footer.style.display = "none";

    let timer;
    let showElements = false;

    // Функция для отображения элементов через 3 секунды
    function showAfterDelay() {
        if (showElements) return; // Предотвращаем многократное срабатывание
        showElements = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
            header.style.display = "block";
            main.style.display = "block";
            footer.style.display = "block";
        }, 3000);
    }

    // Обработчики событий для кликов мыши и её движения
    document.addEventListener("click", showAfterDelay);
    document.addEventListener("mousemove", showAfterDelay);
});
