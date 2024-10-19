const API_KEY = "API_KEY"

const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("#fromCurr");
const toCurr = document.querySelector("#toCurr");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {

  for (currCode in countryList) {

    let newOption = document.createElement("option");
    newOption.innerText = `${currCode} (${countryList[currCode]})`;
    newOption.value = currCode;

    if (select.name === "fromCurr" && currCode === "INR")
      newOption.selected = "selected";

    else if (select.name === "toCurr" && currCode === "USD")
      newOption.selected = "selected";
    
    select.append(newOption);
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");

  img.src = newSrc;
};

btn.addEventListener("click", async (event) => {

  event.preventDefault();

  let amt = document.querySelector("input").value;

  if (isNaN(parseFloat(amt)) || parseFloat(amt) <= 0) {
    msg.innerText = `Please enter a valid amount`;
  } 

  else {
    msg.innerText = "Loading...";

    const from = fromCurr.value;
    const URL = `${BASE_URL}currencies=${fromCurr.value}&base_currency=${toCurr.value}`;

    let response = await fetch(URL);
    let val = await response.json();
    let rate = `${val.data[from]}`;

    const result = (amt / rate).toFixed(2);

    msg.innerText = `${amt} ${fromCurr.value} = ${result} ${toCurr.value}`;
  }
});
