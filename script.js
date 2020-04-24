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
    cat.textContent = `${nav.name}` + " / ";

    document.querySelector(".navm").appendChild(cat);
}
