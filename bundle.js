//Getting Elements
const bill = document.getElementById("bill");
const people = document.getElementById("people");
const peopleError = document.getElementById("peopleError");

const tipAmount = document.getElementById("tipAmount");
const totalAmount = document.getElementById("totalAmount");

const resetBtn = document.getElementById("reset");

const cards = document.querySelectorAll(".card");


let tipPercent = 0;

// Validation

function validateInputs() {

    let valid = true;

    // Bill Validation
    if (bill.value === "" || Number(bill.value) <= 0) {
        bill.classList.add("error");
        valid = false;
    }
    else {
        bill.classList.remove("error");
    }

    // People Validation
    if (people.value === "" || Number(people.value) === 0) {
        people.classList.add("error");
        peopleError.textContent = "Can't be zero";
        valid = false;
    } 
    else {
        people.classList.remove("error");
        peopleError.textContent = "";
    }

    return valid;
}

//Calculation 
function calculate() {

    if (!validateInputs()) {
        tipAmount.textContent = "$0.00";
        totalAmount.textContent = "$0.00";
        return;
    }

    if (tipPercent === 0) {
        tipAmount.textContent = "$0.00";
        totalAmount.textContent = totalAmount.textContent = "$" + (Number(bill.value) / Number(people.value)).toFixed(2);
        return;
    }

    const billValue = Number(bill.value);
    const peopleValue = Number(people.value);

    const totalTip = billValue * tipPercent / 100;

    const tipPerPerson = totalTip / peopleValue;

    const totalPerPerson = (billValue + totalTip) / peopleValue;

    tipAmount.textContent = "$" + tipPerPerson.toFixed(2);
    totalAmount.textContent = "$" + totalPerPerson.toFixed(2);
}

//Tip Buttons 

cards.forEach((card) => {

    card.addEventListener("click", () => {
        cards.forEach((c) => {
            c.classList.remove("active");
        });

        card.classList.add("active");

        custom.value = "";

        tipPercent = parseInt(card.textContent);

        calculate();

    });

});

//Custom Tip 

custom.addEventListener("input", () => {

    cards.forEach((card) => {
        card.classList.remove("active");
    });

    tipPercent = Number(custom.value);

    calculate();

});

//Live Calculation 

bill.addEventListener("input", calculate);
people.addEventListener("input", calculate);

//Reset

resetBtn.addEventListener("click", () => {

    bill.value = "";
    people.value = "";
    custom.value = "";

    tipPercent = 0;

    bill.classList.remove("error");
    people.classList.remove("error");

    peopleError.textContent = "";

    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";

    cards.forEach((card) => {
        card.classList.remove("active");
    });

});



