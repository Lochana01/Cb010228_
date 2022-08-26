// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready()
// }


// function ready(){
//     document.getElementById(curOrder).innerHTML = localAdult.value;
// }

//Tickets
const foreignAdultTikcket = 5000;
const foreignKidsTicket = 2500;
const localAdultTicket = 2500;
const localBabiesTicket = 500;
const localKidsTicket = 1000;

//Duration:
const localThreeHours = 0;
const foreignThreeHours = 1000;

const localHalfDay = 250;
const foreignHalfDay = 500;

const foreignFullDay = 1000;
const localFullDay = 500;

const localTwodays = 1000;
const foreignTwodays = 2000;

//Extras
const anualPass = 5000;
const foodtoken = 500;

//TAKING DATA
//how many?
let localAdult = document.getElementById('localpass');
let localBabies = document.getElementById('babies');
let localKids = document.getElementById('kids');

let foreignAdult = document.getElementById('foreigneradult');
let foreignerkid = document.getElementById('foreignerkid');

//time
let localTime = document.getElementById("localTime");
let foreignTime = document.getElementById('foreignerTime');

//extras
let foodtokenamount = document.getElementById("foodtk");
let anualPassamount = document.getElementById("anualps");


//Show Totals in area
let txtPeople=document.getElementById('total');

let btnAdd=document.getElementById("add");
btnAdd.addEventListener('click',adding);

let overallOrder = document.getElementById("overOrder");
let overallTotal = document.getElementById("total");
let displayedOverallOrder = 0;
let displayedOverallOrderCost = 0;
function showOverallOrder() {
    displayedOverallOrder += parseInt(foreignAdult.value) + parseInt(foreignerkid.value) + (parseInt(localAdult.value) + parseInt(localBabies.value) + parseInt(localKids.value));
    overallOrder.innerText = displayedOverallOrder;
    displayedOverallOrderCost += currentOrderCost;
    overallTotal.innerText = displayedOverallOrderCost;
}

function adding() {
    console.log(displayedOverallOrder);
    showOverallOrder()
    currentOrder.innerText = 0;
    currentTotal.innerText = 0;
}

let currentOrderCost;
function CalculateCost() {
    currentOrderCost = localAdult.value * 2500 + localBabies.value * 500 + localKids.value * 1000 + foreignAdult.value * 3000 + foreignerkid.value * 2500;

    if (localTime.value = "3hrs") {
        currentOrderCost += 0
    }
    else if (localTime.value = "HalfDay") {
        currentOrderCost += 250 * (localAdult.value + localBabies.value + localKids.value)
    }
    else if (localTime.value = "FullDay") {
        currentOrderCost += 500 * (localAdult.value + localBabies.value + localKids.value)
    }
    else if (localTime.value = "TwoDays") {
        currentOrderCost += 1000 * (localAdult.value + localBabies.value + localKids.value)
    }

    if (foreignTime.value = "threeHours") {
        currentOrderCost += 1000 * (parseInt(foreignAdult.value) + parseInt(foreignerkid.value))
    }
    else if (foreignTime.value = "halfday") {
        currentOrderCost += 500 * (parseInt(foreignAdult.value) + parseInt(foreignerkid.value))
    }
    else if (foreignTime.value = "fullday") {
        currentOrderCost += 1000 * (parseInt(foreignAdult.value) + parseInt(foreignerkid.value))
    }
    else if (foreignTime.value = "twoDays") {
        currentOrderCost += 2000 * (parseInt(foreignAdult.value) + parseInt(foreignerkid.value))
    }

    currentOrderCost += foodtokenamount.value * 500;
    currentOrderCost += anualPassamount.value *5000;
}

let currentOrder = document.getElementById("curOrder");
let currentTotal = document.getElementById("curTot");
function showCurrentOrder() {
    currentOrder.innerText = parseInt(foreignAdult.value) + parseInt(foreignerkid.value) + (parseInt(localAdult.value) + parseInt(localBabies.value) + parseInt(localKids.value));
    currentTotal.innerText = currentOrderCost
}

localAdult.addEventListener("change", () => {
    CalculateCost();
    showCurrentOrder()
});

localBabies.addEventListener("change", () => {
    CalculateCost();
    showCurrentOrder()
});

localKids.addEventListener("change", () => {
    CalculateCost();
    showCurrentOrder()
});

foreignAdult.addEventListener("change", () => {
    CalculateCost();
    showCurrentOrder()
});

foreignerkid.addEventListener("change", () => {
    CalculateCost();
    showCurrentOrder()
});

localTime.addEventListener("change", () => {
    CalculateCost();
    showCurrentOrder()
});

foreignTime.addEventListener("change", () => {
    CalculateCost();
    showCurrentOrder()
});

foodtokenamount.addEventListener("change", () => {
    CalculateCost();
    showCurrentOrder()
});

anualPassamount.addEventListener("change", () => {
    CalculateCost();
    showCurrentOrder()
});

let placeOrder=document.getElementById("placeOrder");
placeOrder.addEventListener('click',order);

function order(){
    let adventure = document.getElementById('adventure').value;


    if((document.getElementById("overOrder").innerHTML != "0") && (document.getElementById("total").innerHTML != "0")){
        alert("Your Order for "+ adventure +" has been placed!!");
    }
    else{
        alert("Please book!");
    }
}