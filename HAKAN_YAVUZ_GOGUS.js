(() => {
    if (typeof window.jQuery === "undefined") {
      const s = document.createElement("script");
      s.src = "https://code.jquery.com/jquery-3.6.0.min.js";
      s.onload = initCarousel;
      document.head.appendChild(s);
    } else {
      initCarousel();
    }
  
    function initCarousel() {
      const $ = window.jQuery;
      if (!$(".product-detail").length) {
        return;
      }
  
      let products = [];
      let favorites = [];
      let currentIndex = 0;
      let itemsToShow = 4;
      const LS_PRODUCTS = "carouselProducts";
      const LS_FAVORITES = "carouselFavorites";
  
      if (localStorage.getItem(LS_FAVORITES)) {
        favorites = JSON.parse(localStorage.getItem(LS_FAVORITES));
      }
      if (localStorage.getItem(LS_PRODUCTS)) {
        products = JSON.parse(localStorage.getItem(LS_PRODUCTS));
        setupCarousel();
      } else {
        fetch("https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json")
          .then((res) => res.json())
          .then((data) => {
            products = data;
            localStorage.setItem(LS_PRODUCTS, JSON.stringify(products));
            setupCarousel();
          })
          .catch((err) => console.error("Error fetching products:", err));
      }
  
      function setupCarousel() {
        buildHTML();
        buildCSS();
        setEvents();
        updateItems();
        updatePosition();
      }
  
      function buildHTML() {
        const html = `
          <div class="carousel-container">
            <h2 class="carousel-title">You Might Also Like</h2>
            <div class="carousel-wrapper">
              <button class="carousel-arrow arrow-left">&lt;</button>
              <div class="carousel-track"></div>
              <button class="carousel-arrow arrow-right">&gt;</button>
            </div>
          </div>
        `;
        $(".product-detail").append(html);
  
        let trackHTML = "";
        products.forEach((p) => {
          const favClass = favorites.includes(p.id) ? "favorite" : "";
          trackHTML += `
            <div class="carousel-item">
              <a href="${p.url}" target="_blank" class="product-link">
                <img src="${p.img}" alt="${p.name}" class="product-img"/>
                <div class="product-info">
                  <p class="product-name">${p.name}</p>
                </div>
              </a>
              <p class="product-price">${p.price} TL</p>
              <div class="heart-icon ${favClass}" data-id="${p.id}"></div>
            </div>
          `;
        });
        $(".carousel-track").html(trackHTML);
      }
  
      function buildCSS() {
        const css = `
          .carousel-container {
            margin: 30px auto;
            max-width: 1200px;
            padding: 10px 0;
            background: #fff;
          }
          .carousel-title {
            font-size: 1.4rem;
            margin: 0 0 15px 20px;
            font-weight: 600;
          }
          .carousel-wrapper {
            position: relative;
            overflow: hidden;
            padding: 0 40px;
          }
          .carousel-track {
            display: flex;
            transition: transform 0.3s ease-in-out;
          }
          .carousel-item {
            position: relative;
            min-width: 160px;
            max-width: 160px;
            margin-right: 16px;
            text-align: center;
            background: #fff;
            border: 1px solid #eee;
            border-radius: 4px;
          }
          .carousel-item:hover {
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          }
          .product-img {
            width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          .product-info {
            padding: 10px;
          }
          .product-name {
            font-size: 0.9rem;
            margin: 0 0 4px;
            color: #333;
          }
          .product-price {
            font-size: 1rem;
            color: #007bff;
            font-weight: 600;
            margin: 5px 0 0;
          }
          .heart-icon {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            background-image: url('data:image/svg+xml;utf8,<svg fill="%23aaa" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>');
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
          }
          .heart-icon.favorite {
            background-image: url('data:image/svg+xml;utf8,<svg fill="%23007bff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>');
          }
          .carousel-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2;
            width: 30px;
            height: 30px;
            border: none;
            background-color: rgba(255,255,255,0.7);
            color: #333;
            font-size: 18px;
            cursor: pointer;
            display: none;
          }
          .carousel-wrapper:hover .carousel-arrow {
            display: block;
          }
          .arrow-left { left: 0; }
          .arrow-right { right: 0; }
          @media (max-width: 1200px) { .carousel-item { max-width: 140px; } }
          @media (max-width: 992px) { .carousel-item { max-width: 130px; } }
          @media (max-width: 768px) { .carousel-item { max-width: 120px; } }
          @media (max-width: 576px) {
            .carousel-item { max-width: 110px; }
            .carousel-title { font-size: 1.2rem; }
          }
        `;
        $("<style>").attr("type", "text/css").html(css).appendTo("head");
      }
  
      function setEvents() {
        $(".heart-icon").click(function (e) {
          e.preventDefault();
          e.stopPropagation();
          const id = $(this).data("id");
          if (favorites.includes(id)) {
            favorites = favorites.filter((f) => f !== id);
            $(this).removeClass("favorite");
          } else {
            favorites.push(id);
            $(this).addClass("favorite");
          }
          localStorage.setItem(LS_FAVORITES, JSON.stringify(favorites));
        });
        $(".arrow-left").click(() => {
          currentIndex = Math.max(currentIndex - 1, 0);
          updatePosition();
        });
        $(".arrow-right").click(() => {
          const maxIndex = products.length - itemsToShow;
          currentIndex = Math.min(currentIndex + 1, maxIndex);
          updatePosition();
        });
        $(window).resize(() => {
          updateItems();
          updatePosition();
        });
      }
  
      function updateItems() {
        const w = $(window).width();
        if (w < 576) {
          itemsToShow = 2;
        } else if (w < 768) {
          itemsToShow = 3;
        } else if (w < 992) {
          itemsToShow = 3;
        } else {
          itemsToShow = 4;
        }
      }
  
      function updatePosition() {
        const itemW = $(".carousel-item").outerWidth(true);
        $(".carousel-track").css("transform", `translateX(${-currentIndex * itemW}px)`);
      }
    }
  })();
  