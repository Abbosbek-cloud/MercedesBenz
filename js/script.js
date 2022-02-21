window.addEventListener("DOMContentLoaded", () => {
  console.log("Document is loaded");

  // Loader

  const loader = document.querySelector(".loader");
  setTimeout(function () {
    loader.style.opacity = "0";
    setTimeout(function () {
      loader.style.display = "none";
    });
  }, 2500);

  // Tabs

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    headerParents = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  headerParents.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("tabheader__item")) {
      console.log(1);
      tabs.forEach((item, i) => {
        if (event.target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Modals

  const modalsBtn = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalClose = document.querySelector("[data-close]");

  modalsBtn.forEach((btn) => {
    btn.addEventListener("click", openModalWindow);
  });

  modalClose.addEventListener("click", closeModalWindow);

  function openModalWindow() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
  }

  function closeModalWindow() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalWindow();
    }
  });

  const modalTimer = setTimeout(openModalWindow, 5000);

  function showMyModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModalWindow();
      window.removeEventListener("scroll", showMyModalByScroll);
    }
  }

  window.addEventListener("scroll", showMyModalByScroll);

  // DATES

  const deadLine = "2022-12-12";

  function getTimes(endTime) {
    const time = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(time / (1000 * 60 * 60 * 24)),
      hours = Math.floor((time / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((time / (1000 * 60)) % 60),
      seconds = Math.floor((time / 1000) % 60);
    return {
      total: time,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setTimes(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const time = getTimes(endTime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);
      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setTimes(".timer", deadLine);

  // CLASSES

  class CardCars {
    constructor(
      src,
      alt,
      title,
      description,
      price,
      parentSelector,
      ...classes
    ) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.classes = classes;
      this.parentSelector = document.querySelector(parentSelector);
      this.transferMoney = 10.85;
      this.changeToUSDfromTransferMoney();
    }

    changeToUSDfromTransferMoney() {
      this.price = this.price * this.transferMoney;
    }

    render() {
      const div = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        div.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => div.classList.add(className));
      }

      div.innerHTML = `
        <div class="menu__item">
          <img src=${this.src} alt=${this.alt} />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.description}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Price:</div>
            <div class="menu__item-total"><span>${this.price}</span> $</div>
          </div>
        </div>
      `;
      this.parentSelector.append(div);
    }
  }

  new CardCars(
    "img/tabs/1.jpg",
    "vegy",
    "2021-Mersedes-Benz C-Class",
    `
      The 2021 Mercedes-Benz C-Class finishes in the top half of our luxury small car rankings. It's powerful and upscale, but it hasso-so handli...,
    `,
    300000,
    ".menu .container"
  ).render();
  new CardCars(
    "img/tabs/2.jpg",
    "vegy",
    "2021 Mercedes-Benz CLA-Class",
    `
      The 2021 Mercedes-Benz CLA offers punchy powertrains, an elegant
      interior, and easy-to-use tech features, but it also has a firm
      ride and a ..
    `,
    300000,
    ".menu .container"
  ).render();
  new CardCars(
    "img/tabs/3.jpg",
    "vegy",
    "2021 Mercedes-Benz SCLA-Class",
    `
      The German luxury car-manufacturer has been around for more than a
      century, having elegantly drifted rough curves of automobile.
    `,
    300000,
    ".menu .container"
  ).render();

  // // Slider qismi (Easy way)

  // const sliders = document.querySelectorAll(".offer__slide"),
  //   prev = document.querySelector(".offer__slider-prev"),
  //   next = document.querySelector(".offer__slider-next"),
  //   current = document.querySelector("#current"),
  //   total = document.querySelector("#total");

  // let sliderIndex = 1;
  // show(sliderIndex);

  // function show(i) {
  //   // agar sliderni uzunzligidan o'tib ketsa bu conditional bilan uni joyiga qaytarib qo'yamiz

  //   if (i > sliders.length) {
  //     sliderIndex = 1; // agar index oshib ketsa uni birinchi indexga qaytaradi
  //   }
  //   if (i < 1) {
  //     sliderIndex = sliders.length; // agar index 1dan kicik bo'lib qolsa eng oxirgi sliderga o'tkazib qo'yadi
  //   }

  //   sliders.forEach((item) => {
  //     item.style.display = "none"; // bu yerda barcha sliderlarning dastlabki holatini display none qilib qo'ydik
  //   }); // forEach methodi yordamida chunki querySelectorAll bilan catch qilingan classlar massiv sifatida qo'shiladi
  //   sliders[sliderIndex - 1].style.display = "block"; // sliderimiz qaysi indexga kelib qolsa shu index ostidagi rasm yoki buyumni ko'rinadigan qildik
  //   if (sliders.length < 10) {
  //     // bunda
  //     current.textContent = `0${sliderIndex}`;
  //   } else {
  //     current.textContent = sliderIndex;
  //   }
  // }

  // function sliderPlus(i) {
  //   show((sliderIndex += 1));
  // }

  // prev.addEventListener("click", () => {
  //   sliderPlus(-1);
  // });

  // next.addEventListener("click", () => {
  //   sliderPlus(1);
  // });

  // 2-nd way professional way

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"), // get a parent div of all slides
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(".offer__slider_inner");

  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";

  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";
  let indicator = document.createElement("ol"),
    dots = [];

  indicator.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none
  `;

  slider.append(indicator);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin: 0 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transform: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicator.append(dot);
    dots.push(dot);
  }
  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      // 650
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  // Accordion

  const accordion = document.querySelectorAll(".accordion");

  accordion.forEach((acc) => {
    acc.addEventListener("click", () => {
      acc.classList.toggle("active");
      const panel = acc.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});
