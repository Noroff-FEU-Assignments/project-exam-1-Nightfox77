const burgerIcon = document.querySelector(".fa-bars");
const overlayMenu = document.querySelector(".overlaymenu");
const overlayGrey = document.querySelector(".overlay");
const closeIcon = document.querySelector(".fa-x");
const searchIcon = document.querySelector("#searchIcon");
const searchBar  = document.querySelector(".searchbar");

burgerIcon.onclick = function showOverlays() {
    overlayMenu.style.transform = "translateX(0)";
    overlayGrey.style.transform = "translateX(0)";
}
closeIcon.onclick = function hideOverlays() {
    overlayMenu.style.transform = "";
    overlayGrey.style.transform = "";
}
searchIcon.onclick = function showSearch() {
    searchBar.style.display = "flex";
}

const url = 'https://nightfox.no/JapanTravelBlog/wp-json/wc/v3/products?consumer_key=ck_c69945534ca43c9d86de2416bc85941f76ad51b3&consumer_secret=cs_73f299335b404f1004241d0b181562359dd479a3';
async function getApi() {
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result); 
        
        for  (let i = 0; i < 4; i++) {
            const images = result[i].images;
            const name = document.querySelectorAll(".content-headline");
            const text = document.querySelectorAll(".content-text");
            name[i].textContent = result[i].name;
            text[i].innerHTML = result[i].short_description;

            for ( let x = 0; x < images.length; x++){
                const imageUrl = images[x].src;
                console.log(imageUrl);
                const imageElement = document.querySelectorAll(".blog.imagecontainer img");
                imageElement[i].src = imageUrl;
            }
            
           
           
            
        }
    }
    catch(error) {
        console.log("Ups!!!")
        }
    finally {
        console.log("Success!!!!")
        }
}
getApi();