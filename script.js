// inputs
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

// display
const dayOutput = document.querySelector(".display__days");
const monthOutput = document.querySelector(".display__months");
const yearOutput = document.querySelector(".display__years");

const form = document.querySelector("form");

// current date
const date = new Date();
let curDay = date.getDate();
let curMonth = 1 + date.getMonth();
let curYear = date.getFullYear();

const monthsDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const validateInput = (input, maxValue , minValue, message) => {
  if(!input.value){
    input.parentElement.querySelector("small").innerText = "This field is required.";
    input.parentElement.querySelector("label").setAttribute("data-error", true);
    input.setAttribute("data-error", true);
    return false;
  }
  else if (input.value > maxValue || minValue > input.value) {
    input.parentElement.querySelector("small").innerText = message;
    input.parentElement.querySelector("label").setAttribute("data-error", true);
    input.setAttribute("data-error", true);
    return false;
  } 
  else {
    input.parentElement.querySelector("small").innerText = "";
    input.parentElement.querySelector("label").setAttribute("data-error", false);
    input.setAttribute("data-error", false);
    return true;
  }
}

const validate = () => {
  const inputs = document.querySelectorAll("input");
  let validateDay, validateMonth, validateYear = true;
  let validation = true;

  inputs.forEach((input) => {
      if (input.id === "day") {
        validateDay = validateInput(input, 31, 1, "Must be a valid day");
      }
      if (input.id === "month") {
        validateMonth = validateInput(input, 12, 1, "Must be a valid month");
      }
      if (input.id === "year") {
        validateYear = validateInput(input, year, 1, "Must be a valid year");
      }
  });

  if (validateDay === false || validateMonth === false || validateYear == false){
    validation = false;
  }

  return validation;
};

const ageCalculator = (b) => {
  if (b.day > curDay) {
    curDay = curDay + monthsDays[curMonth - 1];
    curMonth = curMonth - 1;
  }

  if (b.month > curMonth) {
    curMonth = curMonth + 12;
    curYear = curYear - 1;
  }

  const years = curYear - b.year;
  const months = curMonth - b.month;
  const days = curDay - b.day;

  return { years, months, days };
};

const handleSubmit = (e) => {
  e.preventDefault();

  console.log(validate())

  if (validate()) {
    const birthdate = {
      year: yearInput.value,
      month: monthInput.value,
      day: dayInput.value,
    };

    const { years, months, days } = ageCalculator(birthdate);

    dayOutput.innerHTML = days;
    monthOutput.innerHTML = months;
    yearOutput.innerHTML = years;
  }
};

form.addEventListener("submit", handleSubmit);