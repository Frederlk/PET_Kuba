import Swiper, { Navigation } from "swiper";

// Базовые стили
import "../../scss/base/swiper.scss";

// Инициализация слайдеров
function initSliders() {
    if (document.querySelector(".slider__swiper")) {
        new Swiper(".slider__swiper", {
            modules: [Navigation],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: true,
            speed: 800,
            loop: true,

            navigation: {
                nextEl: ".slider__arrow_next",
                prevEl: ".slider__arrow_prev",
            },
        });
    }
}

window.addEventListener("load", function (e) {
    initSliders();
});
