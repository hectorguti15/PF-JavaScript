let shopping_item = document.querySelector(".shopping-item");
let container_add_cart = document.querySelector(".container-add-cart");

shopping_item.addEventListener("click", function () {
  if (container_add_cart.style.display != "none") {
    container_add_cart.style.display = "none";
  } else {
    container_add_cart.style.display = "block";
  }
});

let btns_add_cart = document.querySelectorAll(".add-cart");
for (let btn_add_cart of btns_add_cart) {
  btn_add_cart.addEventListener("click", add_list);
}

let add_cart_list = [];

let total_price = 0;

let quantity_products = parseInt(
  document.getElementById("quantity-products").textContent
);

function set_local_storage() {
  let add_cart_list_JSON = JSON.stringify(add_cart_list);
  localStorage.setItem("ls_add_cart_list", add_cart_list_JSON);

  localStorage.setItem("ls_quantity_products", quantity_products);

  localStorage.setItem("ls_total_products", total_price);
}


function get_local_storage() {
  let gi_ls_add_cart_list = localStorage.getItem("ls_add_cart_list");
  gi_ls_add_cart_list = JSON.parse(gi_ls_add_cart_list);

  add_cart_list = [...gi_ls_add_cart_list];

  if (add_cart_list.length == 0) {
    let purchase = document.querySelector(".purchase");
    purchase.style.display = "none";
    let h2 = document.getElementById("empty-cart");
    h2.style.display = "block";
  } else {
    let h2 = document.getElementById("empty-cart");
    h2.style.display = "none";
    let purchase = document.querySelector(".purchase");
    purchase.style.display = "flex";
  }

  let gi_quantity_products = parseInt(
    localStorage.getItem("ls_quantity_products")
  );
  quantity_products = gi_quantity_products;
  let quantity_products_html = document.getElementById("quantity-products");
  quantity_products_html.innerText = `${quantity_products}`;

  total_price = parseInt(localStorage.getItem("ls_total_products"));

  let total = document.getElementById("total");
  total.innerText = `Total: $${total_price}.00`;
}

get_local_storage();
add_products_cart_html();

function add_list(e) {
  let father = e.target.parentNode;

  let productName = father.querySelector("h3").textContent;
  let productPrice = father.querySelector("span").textContent;

  let product = {
    name: productName,
    quantity: 1,
    price: productPrice,
  };

  let some = add_cart_list.some(function (search) {
    return search.name == product.name;
  });

  if (some == false) {
    add_cart_list.push(product);
  } else {
    add_cart_list.map(function (data) {
      if (data.name == product.name) {
        data.quantity = 1 + data.quantity;
        return data;
      }
    });
  }
  quantity_products += 1;
  let quantity_products_html = document.getElementById("quantity-products");
  quantity_products_html.innerText = `${quantity_products}`;

  let price = parseInt(product.price.substr(1, 2));
  total_price = total_price + price;
  
  let total = document.getElementById("total");
  total.innerText = `Total: $${total_price}.00`;

  Toastify({
    text: "Se agrego correctamente el producto",
    duration: 3100,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #614385, #516395)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  set_local_storage();

  add_products_cart_html();
}

function add_products_cart_html() {
  if (add_cart_list.length > 0) {
    let h2 = document.getElementById("empty-cart");
    h2.style.display = "none";
    let purchase = document.querySelector(".purchase");
    purchase.style.display = "flex";
  }

  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  add_cart_list.forEach(function (show) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<th class="name">${show.name}</th>
                   <th class="quantity">${show.quantity}</th>
                   <th class="price">${show.price}</th>
                   <span class="close material-symbols-outlined">
                  close</span>`;

    tr.className = "th-body";
    tbody.append(tr);

    let btns_close = document.querySelectorAll(".close");
    for (let btn_close of btns_close) {
      btn_close.addEventListener("click", eliminate);
    }
  });
}
function eliminate(e) {
  let btn_father = e.target.parentNode;
  let name_product_eliminate = btn_father.querySelector(".name").textContent;

  add_cart_list.map(function (search_name) {
    if (name_product_eliminate === search_name.name) {
      search_name.quantity = search_name.quantity - 1;
    }
  });
  let filter = add_cart_list.filter(function (filter_quantity) {
    return filter_quantity.quantity > 0;
  });
  add_cart_list = [...filter];
  add_products_cart_html();
  if (add_cart_list.length == 0) {
    let h2 = document.getElementById("empty-cart");
    h2.style.display = "block";
    let purchase = document.querySelector(".purchase");
    purchase.style.display = "none";
  }
  quantity_products -= 1;
  let quantity_products_html = document.getElementById("quantity-products");
  quantity_products_html.innerText = `${quantity_products}`;

  let price_eliminate = btn_father.querySelector(".price").textContent;
  price_eliminate = parseInt(price_eliminate.substr(1, 2));
  total_price = total_price - price_eliminate;
  total.innerText = `Total: $${total_price}.00`;
  
  Toastify({
    text: "Se eliminó correctamente el producto",
    duration: 3100,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #ed213a, #93291e)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  set_local_storage();
}

let btn_purchase = document.getElementById("btn-purchase");

let btn_close_purchase = document.querySelector(".close-buy");
btn_close_purchase.addEventListener("click", function () {
  let container_buy = document.getElementById("container-buy");
  container_buy.style.display = "none";
});

btn_purchase.addEventListener("click", function () {
  let container_buy = document.getElementById("container-buy");
  container_buy.style.display = "grid";
  container_add_cart.style.display = "none";

  let tbody2 = document.getElementById("tbody-2");
  tbody2.innerHTML = "";

  add_cart_list.forEach(function (show) {
    let tr2 = document.createElement("tr");
    tr2.innerHTML = `<th>${show.name}</tr>
                    <th>${show.quantity}</tr>
                    <th>${show.price}<tr>`;

    tbody2.append(tr2);
  });
  let total_2 = document.getElementById("total2");
  total_2.innerText = `Total: $${total_price}.00`;
});

let confirm = document.getElementById("confirm");
confirm.addEventListener("click", function (e) {
  let name_form = document.getElementById("nombre").value;
  let email_form = document.getElementById("email").value;
  if (name_form == "" || email_form == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Llena correctamente los espacios",
    });
  } else {
    let container_buy = document.getElementById("container-buy");
    container_buy.style.display = "none";
    let completed_purchase = document.querySelector(".completed-purchase");
    completed_purchase.style.display = "flex";
    let html_name2 = document.getElementById("name2");
    let html_email2 = document.getElementById("email2");
    let html_total3 = document.getElementById("total3");

    html_name2.innerText = `Nombre: ${name_form}`;
    html_email2.innerText = `Email: ${email_form}`;
    html_total3.innerText = `Total: $${total_price}.00`;

    add_cart_list = [];
    total_price = 0;
    total.innerText = `Total: $${total_price}.00`;
    quantity_products = 0;
    let quantity_products_html = document.getElementById("quantity-products");
    quantity_products_html.innerText = `${quantity_products}`;
    add_products_cart_html();
    let purchase = document.querySelector(".purchase");
    purchase.style.display = "none";
    let h2 = document.getElementById("empty-cart");
    h2.style.display = "block";
  }
  set_local_storage();
  e.preventDefault();
});

let btn_close_buy = document.querySelector(".btn_close_buy");
btn_close_buy.addEventListener("click", function () {
  let completed_purchase = document.querySelector(".completed-purchase");
  completed_purchase.style.display = "none";
});

document.onclick = function (e) {
  if (
    e.target.id !== "container-buy" &&
    e.target.id !== "confirm" &&
    e.target.className !== "product-buy" &&
    e.target.className !== "container-form" &&
    e.target.id !== "btn-purchase" &&
    e.target.id !== "nombre" &&
    e.target.id !== "email" &&
    e.target.id !== "tbody-2" &&
    e.target.id !== "total2" &&
    e.target.className !== "form-item" &&
    e.target.className !== "btn_close_buy"
  ) {
    let container_buy = document.getElementById("container-buy");
    container_buy.style.display = "none";
    let completed_purchase = document.querySelector(".completed-purchase");
    completed_purchase.style.display = "none";
  }
};

async function getCurrency(country) {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const result = await fetch(
      "http://www.floatrates.com/daily/usd.json",
      requestOptions
    ).then((response) => response.text());

    const currencies = JSON.parse(result) ?? result;

    const { alphaCode, rate, date } = currencies[country];

    return { rate, date, alphaCode };
  } catch (error) {
    throw error;
  }
}
let select_country = document.querySelector(".dolar-country");

select_country.addEventListener("change", function (e) {
  let country = e.target.value;
  getCurrency(country).then(function (result) {

    let date = document.querySelector(".date");
    let type = document.querySelector(".type");
    let rate = document.querySelector(".rate");

    date.innerText = `Last Update: ${result.date}`;
    type.innerText = `Moneda: ${result.alphaCode}`;
    rate.innerText = `Valor: ${result.rate}`;
  });
});

