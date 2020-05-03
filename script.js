//AUTOMATIC SLIDESHOW - make it dynamic
if (document.querySelector(".slideshow-container")) {
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
        artist.textContent = `${oneEvent.artist}` + ", " + `${oneEvent.gallery}`;
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
}


//FILTER
const modal = document.querySelector(".modal-background");
const modal_btn = document.querySelector(".modal-btn");
const cross = document.querySelector(".cross");
if (modal_btn) {
    modal_btn.addEventListener("click", () => {
        modal.classList.add("hide");
    });
}
if (cross) {
    cross.addEventListener("click", () => {
        modal.classList.add("hide");
    });
}

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
        const section = document.createElement("section");
        const name = oneMon.name;
        section.id = name;

        const h2 = document.createElement("h2");
        h2.textContent = oneMon.name;
        h2.classList.add("blue-heading");

        section.appendChild(h2);

        const filter = document.createElement("img");
        filter.src = "icons/filter-small.png";
        filter.classList.add("contact-icon");
        /*filter.classList.add("filter-btn");*/
        filter.addEventListener("click", showFilter);

        function showFilter(data) {
            modal.classList.remove("hide");
        }
        section.appendChild(filter);
        document.querySelector("#calendar").appendChild(section);

        const eventSection = document.createElement("section");
        eventSection.class = "artguide" + oneMon.name;
        eventSection.classList.add("cal-slider");

        section.appendChild(eventSection);

        $(eventSection).slick({
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [{
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                        infinite: true
                    }
                    },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        infinite: true
                    }
                    }
                ]
        });


        const month_id = oneMon.id;
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

            const template = document.querySelector("#AllEvents").content;
            const clone = template.cloneNode(true);

            clone.querySelector(".eventImage").src = me.slider_image.guid;
            clone.querySelector("h3").textContent = me.title.rendered;
            clone.querySelector(".location").textContent = me.gallery;
            clone.querySelector(".date").textContent = me.date_of_event;
            clone.querySelector(".artistev").textContent = me.artist;
            clone.querySelector(".type").textContent = me.type_of_event;
            const event_link = clone.querySelector(".read-more-btn");
            if (event_link) {
                event_link.href += me.id;
            }

            $(eventSection).slick('slickAdd', clone)
        }
    }
}

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

    if (document.querySelector("#ddartists")) {
        const dropdown_location = document.createElement("option");
        dropdown_location.nodeValue = event.gallery;
        dropdown_location.textContent = event.gallery;
        document.querySelector("#location").appendChild(dropdown_location);

        const dropdown_artist = document.createElement("option");
        dropdown_artist.nodeValue = event.artist;
        dropdown_artist.textContent = event.artist;
        document.querySelector("#ddartists").appendChild(dropdown_artist);
    }
}

function showSingleEvent(ev) {

    if (document.querySelector("#single-event")) {
        const single_event_template = document.querySelector("#single-event").content;
        var copy = single_event_template.cloneNode(true);

        copy.querySelector("h2").textContent = `${ev.artist}` + " - " + `${ev.title.rendered}`;
        copy.querySelector(".date span").textContent = ev.date_of_event;
        copy.querySelector(".longDes").textContent = ev.long_description;
        copy.querySelector(".quote").textContent = ev.quote;
        copy.querySelector(".oh span").textContent = ev.opening_hours;
        copy.querySelector(".e-mail span").textContent = ev.email;
        copy.querySelector(".phone span").textContent = ev.phone;
        copy.querySelector(".web span mark").textContent = ev.web;
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


//ARTISTS SLIDER
const the_artist_id = urlParams.get("artist_id");

if (the_artist_id) {
    fetch("http://rasbery.eu/kph/wp-json/wp/v2/artist/" + the_artist_id + "?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showSingleArt(data)
        })
} else if (document.querySelector(".alphabet")){
    generateAlphabet();
    fetchArtistData("A");
}

function fetchArtistData(artistAlphabet) {

    markSelectedAlphabet(artistAlphabet);

    fetch("http://rasbery.eu/kph/wp-json/wp/v2/artist?orderby=id")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            handleArtistsData(data, artistAlphabet)
        })
}

function markSelectedAlphabet(alphabet) {
    const adiv = document.querySelector(".alphabet").children;
    for (i in adiv) {
        if (adiv[i].classList != null) {
            if (alphabet == adiv[i].textContent) {
                adiv[i].classList.add("alphabet-selected");
                adiv[i].classList.remove("alphabet-other");
            } else {
                adiv[i].classList.add("alphabet-other");
                adiv[i].classList.remove("alphabet-selected");
            }
        }
    }
}

function handleArtistsData(jsonData, artistAlphabet) {
    jsonData.reverse();
    jsonData.forEach(function (item, index) {
        showArt(item, artistAlphabet);
    });
}

function showArt(art, artistAlphabet) {
    if (art.alphabet != artistAlphabet) {
        return;
    }

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
        copy.querySelector(".single-artist-event").href = art.link_to_event;

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

//GALLERY
const the_gallery_id = urlParams.get("gallery_id");

if (the_gallery_id) {
    fetch("http://rasbery.eu/kph/wp-json/wp/v2/gallery/" + the_gallery_id + "?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showSingleGallery(data)
        })
} else {
    if (document.querySelector("#gallery-template")) {
        fetch("http://rasbery.eu/kph/wp-json/wp/v2/gallery?orderby=id")
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                handleGalleryData(data)
            })
    }
}


function handleGalleryData(jsonData) {
    jsonData.reverse();
    jsonData.forEach(showGal);
}

if (document.querySelector("#gallery-template")) {

}

function showGal(gallery) {

    const gallery_template = document.querySelector("#gallery-template").content;

    var copy = gallery_template.cloneNode(true);

    const gallery_link = copy.querySelector(".gallery-link");
    if (gallery_link) {
        gallery_link.href += gallery.id;
    }

    copy.querySelector("#date").textContent = gallery.date_of_event;
    copy.querySelector("#name").textContent = gallery.title.rendered;
    copy.querySelector("#imageName").src = gallery.images[gallery.images.length-1].guid;

    document.querySelector(".event-date").appendChild(copy);
}

function showSingleGallery(gallery) {

    if (document.querySelector("#sub-gallery-template")) {
        const sub_gallery_template = document.querySelector("#sub-gallery-template").content;
        var copy = sub_gallery_template.cloneNode(true);

        copy.querySelector("#date").textContent = gallery.date_of_event;
        copy.querySelector("#name").textContent = gallery.title.rendered;
        for (i = 0; i < gallery.images.length; i++) {
            const gal_img = document.createElement("img");
            gal_img.src = gallery.images[i].guid;
            copy.querySelector(".sub-pic-gallery").append(gal_img);
        }

        document.querySelector(".singleGallery").appendChild(copy);
    }
}

function alphabetClick(char) {
    $('.artists').slick('slickRemove', null, null, true);
    fetchArtistData(char.textContent);
}

function generateAlphabet() {
    const at = document.querySelector("#alphabet-template");
    if (at) {
        var start = 'A'.charCodeAt(0);
        var last = 'Z'.charCodeAt(0);
        for (var i = start; i <= last; ++i) {
            var copy = at.content.cloneNode(true);
            copy.querySelector(".alphabet-other").textContent = String.fromCharCode(i);

            document.querySelector(".alphabet").appendChild(copy);
        }
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

// When the user clicks on the button, scroll to the top of the document
function topFunction() { // eslint-disable-line no-unused-vars
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
