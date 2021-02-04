let cart = [];
let modalQt = 1;
let modalKey = 0;

const selec = (el) => document.querySelector(el);
const selecAll = (el) => document.querySelectorAll(el);

//Listagem de Pizzas
pizzaJson.map((item, index) => {
  let pizzaItem = selec(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();

    let key = e.target.closest(".pizza-item").getAttribute("data-key");
    modalQt = 1;
    modalKey = key;

    selec(".pizzaBig img").src = pizzaJson[key].img;
    selec(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    selec(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
    selec(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[
      key
    ].price.toFixed(2)}`;

    selec(".pizzaInfo--size.selected").classList.remove("selected");
    selecAll(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add("selected");
      }
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    selec(".pizzaWindowArea").style.opacity = 0;
    selec(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      selec(".pizzaWindowArea").style.opacity = 1;
    }, 200);
  });

  selec(".pizza-area").append(pizzaItem);
});

//Eventos MODAL
function closeModal() {
  selec(".pizzaWindowArea").style.opacity = 0;
  setTimeout(() => {
    selec(".pizzaWindowArea").style.display = "none";
  }, 500);
}

selecAll(".pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton").forEach(
  (item) => {
    item.addEventListener("click", closeModal);
  }
);

selec(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQt > 1) {
    modalQt--;
    selec(".pizzaInfo--qt").innerHTML = modalQt;
  }
});

selec(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQt++;
  selec(".pizzaInfo--qt").innerHTML = modalQt;
});

selecAll(".pizzaInfo--size").forEach((size, sizeIndex) => {
  size.addEventListener("click", () => {
    selec(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

selec(".pizzaInfo--addButton").addEventListener("click", () => {
  let size = parseInt(
    selec(".pizzaInfo--size.selected").getAttribute("data-key")
  );

  let identifier = pizzaJson[modalKey].id + "@" + size;

  let key = cart.findIndex((item) => item.identifier == identifier);

  if (key > -1) {
    cart[key].qt += modalQt;
  } else {
    cart.push({
      identifier: identifier,
      id: pizzaJson[modalKey].id,
      size: size,
      qt: modalQt,
    });
  }
  updateCart();
  closeModal();
});

function updateCart() {
  if (cart.length > 0) {
    selec("aside").classList.add("show");
  } else {
    selec("aside").classList.remove("show");
  }
}
