// Подключение основного файла стилей
import "../scss/style.scss";

// ========================================================================================================================================================================================================================================================
// Функционал ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as flsFunctions from "./files/functions.js";

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
/* (i) необходимо для корректного отображения webp из css  */
flsFunctions.isWebp();
/* Учет плавающей панели на мобильных устройствах при 100vh */
flsFunctions.fullVHfix();

// Модуль работы со спойлерами
flsFunctions.spollers();

// ========================================================================================================================================================================================================================================================
// Работа со слайдером (Swiper) ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import "./files/sliders.js";

// Наблюдатель за объектами c атрибутом data-watch
import "./libs/watcher.js";

/* Динамический адаптив */
import "./libs/dynamic_adapt.js";

/* Подключаем файлы со своим кодом */
import "./files/script.js";
