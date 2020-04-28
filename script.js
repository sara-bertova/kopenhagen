fetch("http://rasbery.eu/kph/wp-json/wp/v2/categories?parent=13&orderby=id")
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


//NAV MENU
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
if(document.querySelector("#calendar")){
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
}

}


//Artists slider
const urlParams = new URLSearchParams(window.location.search);
const the_artist_id = urlParams.get("artist_id");

if (the_artist_id) {
    fetch("http://rasbery.eu/kph/wp-json/wp/v2/artist/" + the_artist_id + "?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showSingleArt(data)
        })
} else {
    fetch("http://rasbery.eu/kph/wp-json/wp/v2/artist?orderby=id")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            handleArtistsData(data)
        })
}


function handleArtistsData(jsonData) {
    jsonData.reverse();
    jsonData.forEach(showArt)
}

function showArt(art) {

    if (document.querySelector("#slider-template")) {
        const slider_template = document.querySelector("#slider-template").content;

        var copy = slider_template.cloneNode(true);

        const artis_link = copy.querySelector(".read-more-btn");
        if (artis_link) {
            artis_link.href += art.id;
        }

        copy.querySelector(".artist-name").textContent = art.title.rendered;
        $('.artists').slick('slickAdd', copy);
    }
}

function showSingleArt(art) {

    if (document.querySelector("#single-artist-template")) {
        const single_artist_template = document.querySelector("#single-artist-template").content;
        var copy = single_artist_template.cloneNode(true);

        copy.querySelector("#artist-name").textContent = art.title.rendered;
        copy.querySelector(".single-artist-event-date").textContent = art.date_of_event;
        copy.querySelector(".single-artist-event").textContent = art.name_of_event;

        document.querySelector(".single-artist").appendChild(copy);

    }
}

/*-------GO TO TOP BTN------------------------------*/

//enable/disable scroll button based on scroller position
function scrollFunction() {
    var topBtn = document.getElementById("topBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

window.onscroll = function () {
    scrollFunction()
};


/*---GO TO TOP BTN-------------------------------------*/

// When the user clicks on the button, scroll to the top of the document
function topFunction() { // eslint-disable-line no-unused-vars
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


//AUTOMATIC SLIDESHOW - for upcoming events
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

/*

//CURSOR
const cursor = document.querySelector(".cursor")

//everytime mouse moves, adjust style attribute
//change cursor position to mouse position based on mouse move
//pageY and pageX return the locetion of cursor on the page
document.addEventListener("mousemove", e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})
*/
