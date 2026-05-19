document.addEventListener("DOMContentLoaded", () => {

  const base = [
    { name: "MacBook Air", price: 52000, type: "laptop", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
    { name: "Dell XPS", price: 48000, type: "laptop", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853" },
    { name: "HP Pavilion", price: 30000, type: "laptop", img: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28" },
    { name: "Lenovo ThinkPad", price: 35000, type: "laptop", img: "https://images.unsplash.com/photo-1527430253228-e93688616381" },
    { name: "iPad Pro", price: 35000, type: "tablet", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0" },
    { name: "Samsung Tab", price: 20000, type: "tablet", img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04" },
    { name: "iPhone 13", price: 35000, type: "phone", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { name: "Samsung S23", price: 33000, type: "phone", img: "https://images.unsplash.com/photo-1580910051074-3eb694886505" }
  ];

  let products = [];
  for (let i = 0; i < 6; i++) {
    base.forEach(p => {
      products.push({ ...p, name: p.name + " " + (i + 1) });
    });
  }

  let cart = [];
  let filters = {
    type: "all",
    search: "",
    sort: "",
    min: 0,
    max: 999999
  };

  /* ===== ELEMENTS SAFE ===== */
  const box = document.getElementById("products");
  const cartBox = document.getElementById("cart");
  const cartBtn = document.getElementById("cartBtn");
  const cartCount = document.getElementById("cartCount");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const min = document.getElementById("min");
  const max = document.getElementById("max");
  const priceBtn = document.getElementById("priceBtn");
  const toTop = document.getElementById("toTop");
  const homeBtn = document.getElementById("homeBtn");

  /* ===== RENDER ===== */
  function render() {
    if (!box) return;

    let list = [...products];

    if (filters.type !== "all")
      list = list.filter(p => p.type === filters.type);

    if (filters.search)
      list = list.filter(p =>
        p.name.toLowerCase().includes(filters.search)
      );

    list = list.filter(p =>
      p.price >= filters.min && p.price <= filters.max
    );

    if (filters.sort === "name")
      list.sort((a, b) => a.name.localeCompare(b.name));

    if (filters.sort === "price")
      list.sort((a, b) => a.price - b.price);

    box.innerHTML = "";

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
    <img src="${p.img}">
    <div class="card-content">
      <h3>${p.name}</h3>
      <p class="price">${p.price} грн</p>
      <button class="buy">Купити</button>
    </div>
  `;

      const btn = card.querySelector(".buy");

      btn.onclick = () => {
        cart.push(p);
        updateCart();
      };

      box.appendChild(card);
    });
  }

  /* ===== CART FIX ===== */
  function updateCart() {
    if (cartCount) cartCount.textContent = cart.length;

    if (!cartBox) return;

    cartBox.innerHTML = "<h3>Кошик</h3>";

    let sum = 0;

    cart.forEach(p => {
      sum += p.price;
      cartBox.innerHTML += `<p>${p.name} - ${p.price} грн</p>`;
    });

    cartBox.innerHTML += `<hr><b>Сума: ${sum} грн</b>`;
  }

  /* toggle cart */
  if (cartBtn) {
    cartBtn.onclick = () => {
      cartBox.classList.toggle("hidden");
    };
  }

  /* ===== FILTER BUTTONS FIX ===== */
  document.querySelectorAll("[data-type]").forEach(btn => {
    btn.onclick = () => {

      document.querySelectorAll("[data-type]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      filters.type = btn.dataset.type;
      render();
    };
  });

  /* ===== SEARCH FIX ===== */
  if (search) {
    search.addEventListener("input", e => {
      filters.search = e.target.value.toLowerCase();
      render();
    });
  }

  /* ===== SORT FIX ===== */
  if (sort) {
    sort.addEventListener("change", e => {
      filters.sort = e.target.value;
      render();
    });
  }

  /* ===== PRICE FIX ===== */
  if (priceBtn) {
    priceBtn.onclick = () => {
      filters.min = +min.value || 0;
      filters.max = +max.value || 999999;
      render();
    };
  }

  /* ===== CAROUSEL SAFE ===== */
  const slides = document.getElementById("slides");

  if (slides) {
    base.slice(0, 5).forEach(p => {
      const s = document.createElement("div");
      s.className = "slide";
      s.style.backgroundImage = `url(${p.img})`;
      slides.appendChild(s);
    });

    let i = 0;
    setInterval(() => {
      i = (i + 1) % 5;
      slides.style.transform = `translateX(-${i * 100}%)`;
    }, 3000);
  }

  /* ===== TOP + HOME FIX ===== */
  window.addEventListener("scroll", () => {

    if (toTop) {
      toTop.style.display = window.scrollY > 300 ? "block" : "none";
    }

    if (homeBtn) {
      homeBtn.style.display = window.scrollY > 300 ? "block" : "none";
    }

  });

  /* scroll up */
  if (toTop) {
    toTop.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  /* home */
  if (homeBtn) {
    homeBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  /* ===== INIT ===== */
  render();
  updateCart();

});
/* ===== AD LOGIC ===== */
setTimeout(() => {
  const ad = document.getElementById("ad");
  const btn = document.getElementById("closeAd");

  if (!ad || !btn) return;

  ad.classList.remove("hidden");
  ad.classList.add("show");

  let t = 2;
  btn.disabled = true;
  btn.textContent = t;

  const timer = setInterval(() => {
    t--;
    btn.textContent = t;

    if (t <= 0) {
      clearInterval(timer);
      btn.disabled = false;
      btn.textContent = "Закрити";
    }
  }, 1000);

  btn.onclick = () => {
    ad.classList.remove("show");
    setTimeout(() => ad.classList.add("hidden"), 500);
  };

}, 2000);