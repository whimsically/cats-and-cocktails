//gets a cat image from the cat API and appends it to the document
function getCat () {
    var catImage = '';
    //var catDesc = '';
    var catImageEl = document.createElement("img");

    //currently using bengal as placeholder
    //TODO: check for breed selected and use appropriate URL
    fetch('https://api.thecatapi.com/v1/images/search?breed_ids=beng', {
        'x-api-key' : 'live_dzFZqaVgKQBAScnhGBofCjWwQKgSKVTqFzeKy0TuyK0lFEOfK4Auoy6aFsTSWu5s'
    })
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log(response.status);
                    return
                } else {
                    response.json().then(function(data) {
                        //image is stored in an array, so we need to access it with [0] index
                        catImage = data[0].url;
                        //adds url to "src" attribute
                        catImageEl.setAttribute("src", catImage);
                        //setting width of image to 200px
                        catImageEl.setAttribute("width", "200px");
                        //appends image to body of document (TODO: change to inside container element)
                        document.body.append(catImageEl);
                        });
                
                }
            }
        );
}

getCat();