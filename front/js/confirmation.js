//Milestone 11

const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");

const idConfirmation = document.getElementById("orderId");
idConfirmation.textContent = `${orderId}`;
