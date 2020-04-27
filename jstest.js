//JS FOR TRYING OUT STUFF


/*fetch("http://rasbery.eu/kph/wp-json/wp/v2/categories?parent=13&orderby=id")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        handleData(data)
    })

function handleData(jsonData) {
    jsonData.reverse();
    jsonData.forEach(showNav)

}


//Nav menu
function showNav(nav) {
    console.log(nav.name)

    const cat = document.createElement("a");
    cat.textContent = nav.name;


    if (nav.name == "Contact") {
        cat.href = "contact.html"
    } else {
        cat.href = "category.html?cat_id=" + nav.id;
    }

    document.querySelector(".navm").appendChild(cat);
}


//DYNAMIC MONTHS IN CALENDAR

fetch("http://www.rasbery.eu/kph/wp-json/wp/v2/categories?per_page=12&parent=26&orderby=id&order=desc")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        handleCat(data)
    })

function handleCat(jsonData) {
    jsonData.forEach(createMonths)
}
function createMonths(oneMon) {
        console.log(oneMon)

        const h2 = document.createElement("h2");
        h2.textContent = oneMon.name;
        h2.classList.add("blue-heading");
        document.querySelector("#calendar").appendChild(h2);

    }*/


