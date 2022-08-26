//load...
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
fav = [];

let btnAdd=document.getElementById('donate');
btnAdd.addEventListener('click',donation);

function donation(){
    if((document.forms["donation_form"]["fname"].value != "") && (document.forms["donation_form"]["email"].value != "") && (document.forms["donation_form"]["address"].value != "") && (document.forms["donation_form"]["don"].value != "") && (document.forms["donation_form"]["cardtype"].value != "")&&(document.forms["donation_form"]["expmonth"].value != "")&&(document.forms["donation_form"]["expyear"].value != "")&&(document.forms["donation_form"]["ccv"].value != "")){
        alert("Thank You for your Donation");
    }
}


function ready() {
    let removeFavItemButtons = document.getElementsByClassName('btn-remove')

    for (let i = 0; i < removeFavItemButtons.length; i++) {
        let button = removeFavItemButtons[i]
        button.addEventListener('click', removeFavItem)
    }

    let howmanyInputs = document.getElementsByClassName('fav-howmany-input')

    for (let i = 0; i < howmanyInputs.length; i++) {
        let input = howmanyInputs[i]

        input.addEventListener('change', howmanyChanged)
    }

    let addToFavButtons = document.getElementsByClassName('shop-item-button')
    
    for (let i = 0; i < addToFavButtons.length; i++){
        let button = addToFavButtons[i]
        button.addEventListener('click', addToFavClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', favClicked)
}

function favClicked() {    
    var favItems = document.getElementsByClassName('fav-items')[0]
    while (favItems.hasChildNodes()) {
        localStorage.removeItem("favourites")
        localStorage.setItem("favourites", JSON.stringify(fav))
        console.log(localStorage)
        favItems.removeChild(favItems.firstChild)
    }
    updatefavTotal()
}

function removeFavItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateFavTotal()
}

function howmanyChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateFavTotal()
}

function addToFavClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-name')[0].innerText

    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText

    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    
    addItemToFav(title, price, imageSrc)
    updateFavTotal()
    fav.push(title)
}

//adding to fav
function addItemToFav(title, price, imageSrc) {
    let favRow = document.createElement('div')

    favRow.classList.add('fav-row')

    let favItems = document.getElementsByClassName('fav-items')[0]
    
    let favItemNames = favItems.getElementsByClassName('fav-item-name')

    for (let i = 0; i < favItemNames.length; i++) {
        if (favItemNames[i].innerText == title){
            alert("Already in favourites")
            return
        }
    }
    let favRowContents = `
        <div class="fav-item fav-column">
            <img class="fav-item-image" src="${imageSrc}" width="100" height="100">
            <span class="fav-item-name">${title}</span>
        </div>
        <span class="fav-price fav-column">${price}</span>
        <div class="fav-howmany fav-column">
            <input class="fav-howmany-input" type="number" value="1">
            <button class="btn btn-remove" type="button">REMOVE</button>
        </div>`
    favRow.innerHTML = favRowContents
    favItems.append(favRow)

    favRow.getElementsByClassName('fav-howmany-input')[0].addEventListener('change', howmanyChanged)

    favRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeFavItem)
}



//Shop

function updateFavTotal() {
    let favItemContainer = document.getElementsByClassName('fav-items')[0]

    let favRows = favItemContainer.getElementsByClassName('fav-row')

    let total = 0

    for (let i = 0; i < favRows.length; i++) {
        let favRow = favRows[i]

        let priceElement = favRow.getElementsByClassName('fav-price')[0]

        let howmanyElement = favRow.getElementsByClassName('fav-howmany-input')[0]

        let price = parseFloat(priceElement.innerText.replace('$', ''))

        let howmany = howmanyElement.value
        total = total + (price * howmany)
    }

    total = Math.round(total * 100) / 100

    document.getElementsByClassName('fav-total-price')[0].innerText = '$' + total
}

let loyalty = document.getElementById("btnLoyalty");
loyalty.addEventListener("click", checkLoyalty);
function checkLoyalty(){
    let length = fav.length;
    if (length > 3){
        points = length * 20;
        localStorage.setItem('Loyalty points: ', points)
        console.log(localStorage);
        document.getElementById("points").innerText = `You have earned ${points} loyalty points`
    }
    else{
        document.getElementById("points").innerText = 'No loyalty points earned'
    }
}
