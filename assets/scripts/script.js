const selec = (el) => document.querySelector(el);
const selecAll = (el) => document.querySelectorAll(el);

pizzaJson.map((item, key) => {
  let pizzaItem = selec(".models .pizza-item").cloneNode(true);

  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    selec(".pizzaWindowArea").style.display = "flex";
  });

  selec(".pizza-area").append(pizzaItem);
});
