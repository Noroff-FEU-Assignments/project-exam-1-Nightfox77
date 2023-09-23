const burgerIcon = document.querySelector("#burgerIcon");
const overlayMenu = document.querySelector(".overlaymenu");
const overlayGrey = document.querySelector(".overlay");
const closeIcon = document.querySelector(".overlaymenu .fa-x");
const searchIcon = document.querySelector("#searchIcon");
const searchBar  = document.querySelector(".searchbar");
const closeIconSearch = document.querySelector(".closeIcon");

burgerIcon.onclick = function showOverlays() {
        
    overlayMenu.style.transform = "translateX(0)";
    overlayGrey.style.transform = "translateX(0)";
}
function handleBurgerIconDisplayChange() {
    const burgerIconStyle = window.getComputedStyle(burgerIcon);
if (burgerIconStyle.display !== "none") { 
    overlayMenu.style.transition = "1s";
    overlayGrey.style.transition = ".5s";
} else {
        overlayMenu.style.transition = "none";
        overlayGrey.style.transition = "none";
}
}
window.addEventListener('resize', handleBurgerIconDisplayChange);
handleBurgerIconDisplayChange();


closeIcon.onclick = function hideOverlays() {
    overlayMenu.style.transform = "";
    overlayGrey.style.transform = "";
}
searchIcon.onclick = function showSearch() {
    searchBar.style.display = "flex";
}
closeIconSearch.onclick = function closeSearch() {
    searchBar.style.display = "none";
}


let currentIndex = 0;
const containers = document.querySelectorAll(".blogcontainer");
const arrowRight = document.querySelector('.arrow.right');
const arrowLeft = document.querySelector('.arrow.left');

const url = 'https://nightfox.no/JapanTravelBlog/wp-json/wc/v3/products/?per_page=20&consumer_key=ck_c69945534ca43c9d86de2416bc85941f76ad51b3&consumer_secret=cs_73f299335b404f1004241d0b181562359dd479a3';

async function getApi(startIndex) {
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        const loader = document.querySelector('.loader');
       
        for (let i = 0; i < containers.length; i++) {
            
            
            const container = containers[i];
            const dataIndex = startIndex + i;

            if (dataIndex < result.length) {
                const item = result[dataIndex];
                const images = item.images;
                loader.style.display = "none";
                
                container.dataset.id = item.id;
                const name = container.querySelector(".content-headline");
                const text = container.querySelector(".content-text");
                const imageElement = container.querySelector(".blog.imagecontainer img");
                
                name.textContent = item.name;
                text.innerHTML = item.short_description;

                if (images && images.length > 0) {
                    imageElement.src = images[0].src; 
                } else {
                    
                    imageElement.src = ""; 
                }
            } 
            if (startIndex + containers.length >= result.length) {
                
                arrowRight.style.display = "none";
            } else {
                arrowRight.style.display = "grid"; 
            }
            console.log(startIndex);
            if (startIndex >= 4) {
                arrowLeft.style.display = "grid";
            } else  {
                arrowLeft.style.display = "none";
            }
        }
    } catch (error) {
        console.log("Ups!!!", error);
    } finally {
        console.log("Success!!!!");
    }
    containers.forEach((container) => {
        const loader = container.querySelector('.loader');
        loader.style.display = 'none';
    });
}

function loadNextResults() {
    currentIndex += 4;
    getApi(currentIndex);
}
function loadPreviousResults() {
    currentIndex -= 4;
    getApi(currentIndex);
}


arrowRight.addEventListener('click', loadNextResults);
arrowLeft.addEventListener('click', loadPreviousResults);
getApi(currentIndex);
