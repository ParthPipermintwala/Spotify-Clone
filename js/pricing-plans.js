// Premium page JavaScript functionality
const pricingToggleBtn = document.getElementById("pricingToggleBtn");
const prices = {
  individual: document.getElementById("individualPrice"),
  duo: document.getElementById("duoPrice"),
  family: document.getElementById("familyPrice"),
  student: document.getElementById("studentPrice"),
};

let isYearly = false;

function animatePriceChange(priceElement, newValue) {
  priceElement.classList.add("fade-out");
  setTimeout(() => {
    priceElement.textContent = newValue;
    priceElement.classList.remove("fade-out");
  }, 500);
}

pricingToggleBtn.addEventListener("click", () => {
  isYearly = !isYearly;
  pricingToggleBtn.textContent = isYearly
    ? "Switch to Monthly Plans"
    : "Switch to Yearly Plans";
  animatePriceChange(
    prices.individual,
    isYearly ? "1799₹/yr" : "119₹/mo"
  );
  animatePriceChange(prices.duo, isYearly ? "2500₹/yr" : "149₹/mo");
  animatePriceChange(prices.family, isYearly ? "3000₹/yr" : "179₹/mo");
  animatePriceChange(prices.student, isYearly ? "800₹/yr" : "59₹/mo");
});
