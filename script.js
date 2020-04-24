fetch("http://rasbery.eu/kph/wp-json/wp/v2/categories?parent=10&orderby=id")
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
    cat.href = "category.html?cat_id=" + nav.id

    document.querySelector(".navm").appendChild(cat);
}

//CURSOR
const cursor = document.querySelector(".cursor")

//everytime mouse moves, adjust style attribute
//change cursor position to mouse position based on mouse move
//pageY and pageX return the locetion of cursor on the page
document.addEventListener("mousemove", e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})

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
