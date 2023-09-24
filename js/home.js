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
const arrowRight = document.querySelector(".arrow.right");
const arrowLeft = document.querySelector(".arrow.left");
const carouselContainer = document.querySelector(".slider");
const url = "https://nightfox.no/JapanTravelBlog/wp-json/wc/v3/products/?per_page=20&consumer_key=ck_c69945534ca43c9d86de2416bc85941f76ad51b3&consumer_secret=cs_73f299335b404f1004241d0b181562359dd479a3";

async function getApi(startIndex) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    const loader = document.querySelector(".loader");
    
    // Check if there is data to load
    if (startIndex >= result.length) {
      arrowRight.style.display = "none";
      return;
    } else {
      arrowRight.style.display = "grid";
    }

   
    

    // Clear existing containers
    carouselContainer.innerHTML = "";

    for (let i = startIndex; i < startIndex + 4 && i < result.length; i++) {
      // Create a new blog container for each item
      const container = createBlogContainer(result[i]);
      
      carouselContainer.appendChild(container);
    }

    currentIndex = startIndex;

    if (startIndex >= 4) {
      arrowLeft.style.display = "grid";
    } else {
      arrowLeft.style.display = "none";
    }
  } catch (error) {
    console.log("Ups!!!", error);
  } finally {
    console.log("Success!!!!");
  }
}

function createBlogContainer(item) {
    
  const blogContainer = document.createElement("div");
  blogContainer.classList.add("blogcontainer");
    carouselContainer.appendChild(blogContainer);

  const loader = document.createElement("div");
  loader.classList.add("loader");
  blogContainer.appendChild(loader);
  loader.style.display = "none";

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("blog", "imagecontainer");
  const image = document.createElement("img");
  image.src = item.images[0]?.src || ""; 
  image.alt = "Image";
  imageContainer.appendChild(image);
  blogContainer.appendChild(imageContainer);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("contentcontainer");
  blogContainer.appendChild(contentContainer);

  const contentHeadline = document.createElement("h2");
  contentHeadline.classList.add("content-headline");
  contentHeadline.textContent = item.name;
  contentContainer.appendChild(contentHeadline);

  const contentText = document.createElement("p");
  contentText.classList.add("content-text");
  contentText.innerHTML = item.short_description;
  contentContainer.appendChild(contentText);

  const link = document.createElement("a");
  link.innerHTML = "Find out more";
  contentContainer.appendChild(link);

  

  return blogContainer;
}

function loadNextResults() {
  currentIndex += 4;
  getApi(currentIndex);
}

function loadPreviousResults() {
  currentIndex -= 4;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  getApi(currentIndex);
}

arrowRight.addEventListener("click", loadNextResults);
arrowLeft.addEventListener("click", loadPreviousResults);

getApi(currentIndex);

const imageContainer = document.querySelector(".imageContainer");
const images = imageContainer.querySelectorAll("img");
let index = 0;
const revealDelay = 5000; 

function revealImage() {
    if (index < images.length) {
        const image = images[index];
        images.forEach((img) => {
            img.classList.remove("active");
          });
        // Make the current image the first child in the container
        imageContainer.insertBefore(image, imageContainer.firstChild);
        
        // Add the 'active' class to reveal the image with a fade-in effect
        image.classList.add("active");
        
        index++;
    
        // Call the next revealImage after a delay
        setTimeout(revealImage, revealDelay);
      } else {
        // Reset the index to show images from the beginning
        index = 0;
        revealImage();
      }
    }
    
    // Call the function to start the animation
    revealImage();
