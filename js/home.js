const burgerIcon = document.querySelector("#burgerIcon");
const overlayMenu = document.querySelector(".overlaymenu");
const overlayGrey = document.querySelector(".overlay");
const closeIcon = document.querySelector(".overlaymenu .fa-x");
const searchIcon = document.querySelector("#searchIcon");
const searchBar  = document.querySelector(".searchbar");
const closeIconSearch = document.querySelector(".closeIcon");
const houseIcon = document.querySelector(".fa-house");
// handles click on burgericon and display of menu and overlay
burgerIcon.onclick = function showOverlays() {
        
    overlayMenu.style.transform = "translateX(0)";
    overlayGrey.style.transform = "translateX(0)";
}
houseIcon.onclick = function backToIndex() {
    window.location.href = 'index.html';
}
// handles if burgermenu is visible then transition (important for desktop mode)
function handleBurgerIconDisplayChange() {
    const burgerIconStyle = window.getComputedStyle(burgerIcon);
if (burgerIconStyle.display !== "none") { 
    overlayMenu.style.transition = ".7s ";
    overlayGrey.style.transition = ".6s ease-out";
} else {
        overlayMenu.style.transition = "none";
        overlayGrey.style.transition = "none";
}
}
// checks if window is resized and if burgericon is visible
window.addEventListener('resize', handleBurgerIconDisplayChange);
handleBurgerIconDisplayChange();

// handles click on X icon in overlaymenu
closeIcon.onclick = function hideOverlays() {
    overlayMenu.style.transform = "";
    overlayGrey.style.transform = "";
}
// handles click on searchicon > displays searchbar
searchIcon.onclick = function showSearch() {
    searchBar.style.display = "flex";
}
// handles click on X in searchbar > closes bar
closeIconSearch.onclick = function closeSearch() {
    searchBar.style.display = "none";
}
const imageContainer = document.querySelector(".gallery .imageContainer");
const images = imageContainer.querySelectorAll(".gallery img");
let index = 0;
const revealDelay = 5000; 
// handles the gallery > if class active put that image first in line
function revealImage() {
    if (index < images.length) {
        const image = images[index];
        images.forEach((img) => {
            img.classList.remove("active");
          });
        
        imageContainer.insertBefore(image, imageContainer.firstChild);
        image.classList.add("active");
        index++;
    
        
        setTimeout(revealImage, revealDelay);
      } else {
        // restart
        index = 0;
        revealImage();
      }
    }
    
    revealImage();
    
    
    

