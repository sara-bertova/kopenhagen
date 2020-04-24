fetch("http://rasbery.eu/kph/wp-json/wp/v2/categories?parent=10&orderby=description")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        handleData(data)
    })

function handleData(jsonData) {
    jsonData.forEach(showNav)

}

function showNav(nav) {
    console.log(nav.name)

    const cat = document.createElement("a");
    cat.textContent = `${nav.name}` + " / ";


    document.querySelector(".navm").appendChild(cat);
}
