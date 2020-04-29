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

if (document.querySelector("#gallery")) {
    fetch("http://rasbery.eu/kph/wp-json/wp/v2/gallery?orderby=id")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            handleGalleryData(data)
        })

    function handleGalleryData(jsonData) {
        jsonData.reverse();
        jsonData.forEach(showGal)
    }

    function showGal(galData) {
        const gal_template = document.querySelector("#gallery-template").content;
        var copy = gal_template.cloneNode(true);

        copy.querySelector("#date").textContent = galData.date_of_event;

       /* const cat = document.createElement("a");
    cat.textContent = nav.name;*/

        for (i = 0; i < galData.images.length; i++) {
            const gal_img = document.createElement("img");
            gal_img.src = galData.images[i].guid;
            copy.querySelector(".gallery-images").append(gal_img);
        }

        document.querySelector(".event-date").appendChild(copy);
    }
}
