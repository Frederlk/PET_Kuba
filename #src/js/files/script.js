//  CountUp
window.onload = function () {
   const acceleration = {
      decimal: ',',
      decimalPlaces: 3,
   };
   const batteryOptions = {
      separator: '',
   };
   let trips = new CountUp('trips', 1.920, acceleration);
   let venues = new CountUp('venues', 271, batteryOptions);
   let tickets = new CountUp('tickets', 3.321, acceleration);
   let reviews = new CountUp('reviews', 2.912, acceleration);
   trips.start();
   venues.start();
   tickets.start();
   reviews.start();
}


let menuParents = document.querySelectorAll('.cadilac__dot');
for (let index = 0; index < menuParents.length; index++) {
   const menuParent = menuParents[index];
   menuParent.addEventListener("click", function (e) {
      menuParent.parentElement.classList.toggle('_active');
      e.preventDefault();
   });
}

//Spollers
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
   //получение обычных споллеров
   const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
   });
   // инициализация обычных спойлеров
   if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
   }
   //получение спойлеров с медия запросом
   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(",")[0];
   });

   //инициализация спойлеров с медия запросом
   if (spollersMedia.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach(item => {
         const params = item.dataset.spollers;
         const breakpoint = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });

      //Получаем уникальные брейкпойнты
      let mediaQueries = breakpointsArray.map(function (item) {
         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
         return self.indexOf(item) === index;
      });

      //работаем с каждым брейкпойнтом
      mediaQueries.forEach(breakpoint => {
         const paramsArray = breakpoint.split(",");
         const mediaBreakpoint = paramsArray[1];
         const mediaType = paramsArray[2];
         const matchMedia = window.matchMedia(paramsArray[0]);

         //объекты с нужными условиями
         const spollersArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
               return true;
            }
         });
         // событие 
         matchMedia.addListener(function () {
            initSpollers(spollersArray, matchMedia);
         });
         initSpollers(spollersArray, matchMedia);
      });
   }
   // инициализация 
   function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach(spollersBlock => {
         spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
         if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add('_init');
            initSpollerBody(spollersBlock);
            spollersBlock.addEventListener("click", setSpollerAction);
         } else {
            spollersBlock.classList.remove('init');
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
         }
      });
   }
   // работа с контентом 
   function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length > 0) {
         spollerTitles.forEach(spollerTitle => {
            if (hideSpollerBody) {
               spollerTitle.removeAttribute('tabindex');
               if (!spollerTitle.classList.contains('_active')) {
                  spollerTitle.nextElementSibling.hidden = true;
               }
            } else {
               spollerTitle.setAttribute('tabindex', '-1');
               spollerTitle.nextElementSibling.hidden = false;
            }
         });
      }
   }
   function setSpollerAction(e) {
      const el = e.target;
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
         const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
         const spollersBlock = spollerTitle.closest('[data-spollers]');
         const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
         if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_active')) {
               hideSpollerBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollerTitle.nextElementSibling, 500);
         }
         e.preventDefault();
      }
   }
   function hideSpollerBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
      if (spollerActiveTitle) {
         spollerActiveTitle.classList.remove('_active');
         _slideUp(spollerActiveTitle.nextElementSibling, 500);
      }
   }
}
