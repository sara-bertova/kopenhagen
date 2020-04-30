/*//NAV MENU
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
}*/

//AUTOMATIC SLIDESHOW - make it dynamic
fetch("http://www.rasbery.eu/kph/wp-json/wp/v2/event?per_page=4&orderby=date")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        handleSlide(data)
    })

function handleSlide(jsonData) {
    jsonData.forEach(createEvents)
}

function createEvents(oneEvent) {
    console.log(oneEvent)
    const div = document.createElement("div");
    div.classList.add("mySlides");
    div.classList.add("fade");
    const img = document.createElement("img");
    img.src = oneEvent.image.guid;
    img.style.width = "100%";
    const text = document.createElement("div");
    text.classList.add("text");
    text.textContent = oneEvent.title.rendered;
    const artist = document.createElement("div");
    artist.classList.add("eventArtist");
    artist.textContent = oneEvent.artist;
    const date = document.createElement("div");
    date.classList.add("eventDate");
    date.textContent = oneEvent.date_of_event;
    div.appendChild(img);
    div.appendChild(text);
    div.appendChild(artist);
    div.appendChild(date);
    if (".slideshow-container") {
        document.querySelector(".slideshow-container").appendChild(div);
    }
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
}

//FILTER
const modal = document.querySelector(".modal-background");
const modal_btn = document.querySelector(".modal-btn");
if (modal_btn) {
    modal_btn.addEventListener("click", () => {
        modal.classList.add("hide");
    });
}

/*document.querySelector(".filter-btn").addEventListener("click", showFilter);
function showFilter(data) {
    modal.classList.remove("hide");
}*/

//DYNAMIC MONTHS IN CALENDAR, EVENTS ACCORDING TO MONTHS
if (document.querySelector("#calendar")) {
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
        const section = document.createElement("section");
        const name = oneMon.name;
        section.id = name;
        const h2 = document.createElement("h2");
        h2.textContent = oneMon.name;
        h2.classList.add("blue-heading");
        section.appendChild(h2);
        const filter = document.createElement("img");
        filter.src = "icons/filter-small.png";
        /*filter.classList.add("filter-btn");*/
        filter.addEventListener("click", showFilter);

        function showFilter(data) {
            modal.classList.remove("hide");
        }
        section.appendChild(filter);
        document.querySelector("#calendar").appendChild(section);

        const month_id = oneMon.id;
        /*const link = "http://www.rasbery.eu/kph/wp-json/wp/v2/event?_embed&categories=" + month_id;
        console.log(link)*/
        fetch("http://www.rasbery.eu/kph/wp-json/wp/v2/event?_embed&categories=" + month_id)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                showMData(data)
            })

        function showMData(jsonData) {
            jsonData.forEach(showMonthEvents)
        }

        function showMonthEvents(me) {
            /*console.log(`#${month_id}`)*/
            console.log(month_id)
            const template = document.querySelector("#AllEvents").content;
            const clone = template.cloneNode(true);

            /*clone.querySelector(".eventImage").src = me.image.guid;*/
            clone.querySelector("h3").textContent = me.title.rendered;
            clone.querySelector(".location").textContent = `${me.gallery}` + ", " + `${me.address}`;
            clone.querySelector(".date").textContent = me.date_of_event;
            clone.querySelector(".artistev").textContent = me.artist;
            clone.querySelector(".type").textContent = me.type_of_event;
            clone.querySelector(".excerpt").innerHTML = me.excerpt.rendered;
            const event_link = clone.querySelector(".read-more-btn-events");
            if (event_link) {
                event_link.href += me.id;
            }
            document.querySelector(`#${name}`).appendChild(clone);

        }
    }

}



/*//Calendar in the filter
const calendar = document.querySelector(".input");
calendar.addEventListener("click", () => {
    calendar.classList.add("hide");
});

document.querySelector(".when").addEventListener("click", showCalendar);
function showCalendar(data) {
    calendar.classList.remove("hide");
}*/

//ADD EVENTS TO CALENDAR
const urlParams = new URLSearchParams(window.location.search);
const the_event_id = urlParams.get("event_id");

if (the_event_id) {
    fetch("http://rasbery.eu/kph/wp-json/wp/v2/event/" + the_event_id + "?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showSingleEvent(data)
        })
} else {
    fetch("http://www.rasbery.eu/kph/wp-json/wp/v2/event")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })
}




function showData(jsonData) {
    jsonData.forEach(showEvent)
}


function showEvent(event) {
    /*console.log(event)
    const template = document.querySelector("#AllEvents").content;
    const clone = template.cloneNode(true);

    clone.querySelector(".eventImage").src = event.image.guid;
    clone.querySelector("h3").textContent = event.title.rendered;
    clone.querySelector(".location").textContent = `${event.gallery}` + ", " + `${event.address}`;
    clone.querySelector(".date").textContent = event.date_of_event;
    clone.querySelector(".artistev").textContent = event.artist;
    clone.querySelector(".type").textContent = event.type_of_event;
    clone.querySelector(".excerpt").innerHTML = event.excerpt.rendered;
    const event_link = clone.querySelector(".read-more-btn-events");
    if (event_link) {
        event_link.href += event.id;
    }
    document.querySelector("#calendar").appendChild(clone);*/

    const dropdown_location = document.createElement("option");
    dropdown_location.nodeValue = event.gallery;
    dropdown_location.textContent = event.gallery;
    document.querySelector("#location").appendChild(dropdown_location);

    const dropdown_artist = document.createElement("option");
    dropdown_artist.nodeValue = event.artist;
    dropdown_artist.textContent = event.artist;
    document.querySelector("#ddartists").appendChild(dropdown_artist);



}



function showSingleEvent(ev) {

    if (document.querySelector("#single-event")) {
        const single_event_template = document.querySelector("#single-event").content;
        var copy = single_event_template.cloneNode(true);

        copy.querySelector("h2").textContent = `${ev.artist}` + " - " + `${ev.title.rendered}`;
        copy.querySelector(".date span").textContent = ev.date_of_event;
        copy.querySelector(".longDes").textContent = ev.long_description;
        /*copy.querySelector(".longDes").textContent = ev.long_description.split("\n");*/
        copy.querySelector(".quote").textContent = ev.quote;
        copy.querySelector(".oh span").textContent = ev.opening_hours;
        copy.querySelector(".e-mail span").textContent = ev.email;
        copy.querySelector(".phone span").textContent = ev.phone;
        copy.querySelector(".web").textContent = ev.web;
        copy.querySelector(".web").href = ev.web;
        copy.querySelector(".evimg").src = ev.image.guid;
        copy.querySelector(".gallogo").src = ev.logo.guid;
        copy.querySelector(".location span").textContent = `${ev.gallery}` + ", " + `${ev.address}`;


        if (ev.price) {
            copy.querySelector(".price span").textContent = ev.price;
        } else {
            copy.querySelector(".price").style.display = "none";
        }

        if (ev.facebook) {
            copy.querySelector(".fb").href = ev.facebook;
        } else {
            copy.querySelector(".fb").style.display = "none";
        }

        if (ev.twitter) {
            copy.querySelector(".tw").href = ev.twitter;
        } else {
            copy.querySelector(".tw").style.display = "none";
        }

        if (ev.instagram) {
            copy.querySelector(".ig").href = ev.price;
        } else {
            copy.querySelector(".ig").style.display = "none";
        }

        if (ev.linkedin) {
            copy.querySelector(".in").href = ev.linkedin;
        } else {
            copy.querySelector(".in").style.display = "none";
        }

        document.querySelector("#event").appendChild(copy);

    }
}


//Artists slider
/*const urlParams = new URLSearchParams(window.location.search);*/
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
        copy.querySelector(".artimg").src = art.image_of_artist.guid;
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

        if (art.short_description) {
            copy.querySelector(".short-description-holder").style.display = "inline";
            copy.querySelector(".short-description").textContent = art.short_description;
        }

        if (art.about_artist) {
            var readmore_btn = copy.querySelector(".singleartist-readmore-btn");
            var long_description = copy.querySelector(".readmore-content")
            readmore_btn.style.display = "inline";
            readmore_btn.addEventListener("click", () => {
                readmore_btn.style.display = "none";
                long_description.style.display = "inline";


            })

            copy.querySelector(".about-artist-holder").style.display = "inline";
            copy.querySelector(".about-artist").textContent = art.about_artist;

        }

        if (art.about_event) {
            copy.querySelector(".about-event-holder").style.display = "inline";
            copy.querySelector(".about-event").textContent = art.about_event;
        }

        if (art.images_of_work) {
            copy.querySelector(".art-images").style.display = "inline";
            for (i = 0; i < art.images_of_work.length; i++) {
                const art_img = document.createElement("img");
                art_img.src = art.images_of_work[i].guid;
                copy.querySelector(".art-images").append(art_img);
            }
        }


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
