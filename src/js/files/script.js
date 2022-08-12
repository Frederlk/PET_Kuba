import { CountUp } from "countup.js";

if (document.querySelectorAll(".cadilac__dot")) {
    let menuParents = document.querySelectorAll(".cadilac__dot");
    for (let index = 0; index < menuParents.length; index++) {
        const menuParent = menuParents[index];
        menuParent.addEventListener("click", function (e) {
            e.preventDefault();
            menuParent.parentElement.classList.toggle("_active");
        });
    }
}

if (document.getElementById("count-up")) {
    const countUpWrap = document.getElementById("count-up");
    let observer = new MutationObserver(function (mutations) {
        for (let mutation of mutations) {
            if (mutation.type === "attributes") {
                if (countUpWrap.classList.contains("_watcher-view")) {
                    const acceleration = {
                        decimal: ",",
                        decimalPlaces: 3,
                    };
                    const batteryOptions = {
                        separator: "",
                    };
                    let trips = new CountUp("trips", 1.92, acceleration);
                    let venues = new CountUp("venues", 271, batteryOptions);
                    let tickets = new CountUp("tickets", 3.321, acceleration);
                    let reviews = new CountUp("reviews", 2.912, acceleration);
                    trips.start();
                    venues.start();
                    tickets.start();
                    reviews.start();
                }
            }
        }
    });

    observer.observe(countUpWrap, { attributes: true });
}
