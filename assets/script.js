var catDropDown = document.getElementById("cats");
var imgContainer = document.getElementById("image-container");

catDropDown.addEventListener("change", (event) => {
    catID = event.target.value;
    fetch('https://api.thecatapi.com/v1/images/search?breed_ids=' + catID, {
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
                        imgContainer.src = catImage;
                        //appends image to body of document (TODO: change to inside container element)
                        document.body.append(catImageEl);
                        });
                
                }
            }
        );
});