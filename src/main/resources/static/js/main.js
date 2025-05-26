const registrationForm = document.getElementById("registrationForm");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const containerDiv = document.getElementById("containerDiv");
const reg = document.getElementById("sendDataReg");

let isFormRendered = false;
let generatedDiv = null;
let objects = [];

registerBtn.addEventListener("click", () => {
  registrationForm.classList.toggle("d-none");
});

loginBtn.addEventListener("click", () => {
  if (!isFormRendered) {
    containerDiv.appendChild(generateOverlayDiv());
    isFormRendered = true;
    generatedDiv = document.getElementById("overlayDiv");
    generatedDiv.addEventListener("click", (e) => {
      if (e.target === generatedDiv) {
        generatedDiv.classList.add("d-none");
      }
    });
  } else {
    generatedDiv = document.getElementById("overlayDiv");
  }
  generatedDiv.classList.remove("d-none");
});

function generateOverlayDiv() {
  let overlayDiv = document.createElement("div");
  overlayDiv.setAttribute("id", "overlayDiv");
  overlayDiv.classList.add(
    "position-fixed", "top-0", "start-0", "w-100", "h-100",
    "bg-dark", "bg-opacity-75", "d-flex", "justify-content-center", "align-items-center", "d-none"
  );

  let formDiv = document.createElement("div");
  formDiv.classList.add("bg-white", "p-4", "rounded", "shadow");
  formDiv.style.minWidth = "300px";

  let loginInputGroup = document.createElement("div");
  loginInputGroup.classList.add("mb-3");
  let loginLabel = document.createElement("label");
  loginLabel.classList.add("form-label");
  loginLabel.textContent = "Login:";
  loginLabel.setAttribute("for", "overlayLogin");
  let loginInput = document.createElement("input");
  loginInput.setAttribute("id", "overlayLogin");
  loginInput.setAttribute("type", "text");
  loginInput.classList.add("form-control");

  loginInputGroup.appendChild(loginLabel);
  loginInputGroup.appendChild(loginInput);

  let passwordInputGroup = document.createElement("div");
  passwordInputGroup.classList.add("mb-3");
  let passwordLabel = document.createElement("label");
  passwordLabel.classList.add("form-label");
  passwordLabel.textContent = "Password:";
  passwordLabel.setAttribute("for", "overlayPsw");
  let passwordInput = document.createElement("input");
  passwordInput.setAttribute("id", "overlayPsw");
  passwordInput.setAttribute("type", "password");
  passwordInput.classList.add("form-control");

  passwordInputGroup.appendChild(passwordLabel);
  passwordInputGroup.appendChild(passwordInput);

  formDiv.appendChild(loginInputGroup);
  formDiv.appendChild(passwordInputGroup);

  overlayDiv.appendChild(formDiv);

  return overlayDiv;
}

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createArrayOfObjects();
});

function createArrayOfObjects() {
  const fieldValue = document.getElementById("zipField").value.trim();

  if (!fieldValue) {
    alert("Please fill out the ZIP code field!");
    return;
  }

  const obj1 = { zip: fieldValue };
  objects.push(obj1);
  alert("Submission successful!");

  document.getElementById("zipField").value = "";
  console.log("Objects array length:", objects.length);
}

const products = [
  { id: 1, name: "Product A", price: 25, image: "https://via.placeholder.com/200x150" },
  { id: 2, name: "Product B", price: 45, image: "https://via.placeholder.com/200x150" }
];

const productsContainer = document.createElement("div");
productsContainer.classList.add("container", "mt-5", "d-flex", "gap-3");

products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";

  const img = document.createElement("img");
  img.src = product.image;
  img.classList.add("card-img-top");
  img.style.cursor = "pointer";

  img.dataset.name = product.name;
  img.dataset.price = product.price;

  img.addEventListener("click", () => {
    showProductOverlay(product);
  });

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = product.name;

  const price = document.createElement("p");
  price.classList.add("card-text");
  price.textContent = `Price: $${product.price}`;

  cardBody.appendChild(title);
  cardBody.appendChild(price);

  card.appendChild(img);
  card.appendChild(cardBody);
  productsContainer.appendChild(card);
});

containerDiv.appendChild(productsContainer);

function showProductOverlay(product) {
  let overlay = document.createElement("div");
  overlay.classList.add(
    "position-fixed", "top-0", "start-0", "w-100", "h-100",
    "bg-dark", "bg-opacity-75", "d-flex", "justify-content-center", "align-items-center"
  );

  let card = document.createElement("div");
  card.classList.add("card", "p-3");
  card.style.minWidth = "300px";

  let title = document.createElement("h4");
  title.textContent = product.name;

  let price = document.createElement("p");
  price.textContent = `Price: $${product.price}`;

  let closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.classList.add("btn", "btn-secondary");
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(closeBtn);
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", e => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}

const collapsibleBtn = document.createElement("button");
collapsibleBtn.classList.add("btn", "btn-info", "mt-5");
collapsibleBtn.setAttribute("data-bs-toggle", "collapse");
collapsibleBtn.setAttribute("data-bs-target", "#moreInfo");
collapsibleBtn.textContent = "Show More Info";

const collapsibleDiv = document.createElement("div");
collapsibleDiv.classList.add("collapse", "mt-3");
collapsibleDiv.setAttribute("id", "moreInfo");
collapsibleDiv.innerHTML = `
  <div class="card card-body">
    This information is hidden until you click the button above.
  </div>
`;

containerDiv.appendChild(collapsibleBtn);
containerDiv.appendChild(collapsibleDiv);

productsContainer.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseover", () => {
    card.classList.add("border", "border-primary");
  });
  card.addEventListener("mouseout", () => {
    card.classList.remove("border", "border-primary");
  });
});

document.getElementById("zipField").addEventListener("keydown", e => {
  console.log("Key pressed in ZIP field:", e.key);
});

function calculateTotal(products) {
  return products.reduce((acc, p) => acc + p.price, 0);
}
console.log("Total price of products:", calculateTotal(products));