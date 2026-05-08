const asksNode = document.querySelector("#asks");
const bidsNode = document.querySelector("#bids");
const midPriceNode = document.querySelector("#mid-price");
const lastPriceNode = document.querySelector("#last-price");
const spreadNode = document.querySelector("#spread");
const form = document.querySelector(".access-form");
const note = document.querySelector("#form-note");

let mid = 42.168;

const format = (value, digits = 3) => value.toFixed(digits);

function makeRow(price, size, total, depth, side) {
  const row = document.createElement("div");
  row.className = "book-row";
  row.style.setProperty("--depth", `${depth}%`);
  row.innerHTML = `
    <span>${format(price)}</span>
    <span>${format(size, 2)}</span>
    <span>${format(total, 2)}</span>
  `;
  row.setAttribute("aria-label", `${side} ${format(size, 2)} at ${format(price)}`);
  return row;
}

function renderBook() {
  const drift = (Math.random() - 0.5) * 0.018;
  mid = Math.max(40.5, mid + drift);
  const spread = 0.004 + Math.random() * 0.003;

  const askFragment = document.createDocumentFragment();
  const bidFragment = document.createDocumentFragment();
  let askTotal = 0;
  let bidTotal = 0;

  for (let index = 6; index >= 1; index -= 1) {
    const size = 8 + Math.random() * 34;
    askTotal += size;
    askFragment.append(
      makeRow(mid + spread / 2 + index * 0.012, size, askTotal, 16 + Math.random() * 76, "ask")
    );
  }

  for (let index = 1; index <= 6; index += 1) {
    const size = 8 + Math.random() * 34;
    bidTotal += size;
    bidFragment.append(
      makeRow(mid - spread / 2 - index * 0.012, size, bidTotal, 16 + Math.random() * 76, "bid")
    );
  }

  asksNode.replaceChildren(askFragment);
  bidsNode.replaceChildren(bidFragment);
  midPriceNode.textContent = format(mid);
  lastPriceNode.textContent = format(mid + (Math.random() - 0.5) * 0.01);
  spreadNode.textContent = format(spread);
}

renderBook();
setInterval(renderBook, 1400);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const email = data.get("email");

  if (!email) {
    return;
  }

  note.textContent = "Request received. We will follow up as private launch access opens.";
  form.reset();
});
