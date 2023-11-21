let currentIndex = 0;
const arrowRight = document.querySelector(".arrow.right");
const arrowLeft = document.querySelector(".arrow.left");
const carouselContainer = document.querySelector(".slider");
const loader = document.querySelector(".loader");

const url = "https://nightfox.no/JapanTravelBlog/wp-json/wc/v3/products/?per_page=20&consumer_key=ck_c69945534ca43c9d86de2416bc85941f76ad51b3&consumer_secret=cs_73f299335b404f1004241d0b181562359dd479a3";
// api call
async function getApi(startIndex) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    loader.style.display = "none";
    // checks if there is more content to load
    if (startIndex >= result.length) {
      arrowRight.style.display = "none";
      return;
    } else {
      arrowRight.style.display = "grid";
    }
    // reset the containers
    carouselContainer.innerHTML = "";

    for (let i = startIndex; i < startIndex + 4 && i < result.length; i++) {
      const container = createBlogContainer(result[i]);
      container.setAttribute("data-id", result[i].id)
      carouselContainer.appendChild(container);
    }
    
    currentIndex = startIndex;
    // handles the display of the left arrow > if more index more than 4 its displayed
    if (startIndex >= 4) {
      arrowLeft.style.display = "grid";
    } else {
      arrowLeft.style.display = "none";
    }
    const displayedContainers = document.querySelectorAll(".blogcontainer");
    if (displayedContainers.length < 4) {
        arrowRight.style.display = "none";
    }
    
  } catch (error) {
    console.log("Ups!!!", error);
  } finally {
    console.log("Success!!!!");
  }
}

// dynamically adds containers to fill with content
function createBlogContainer(item) {
    
  const blogContainer = document.createElement("div");
  blogContainer.classList.add("blogcontainer");
  
    carouselContainer.appendChild(blogContainer);
  
  

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("blog", "imagecontainer");
  const image = document.createElement("img");
  image.src = item.images[0]?.src || ""; 
  image.alt = "Image";
  imageContainer.appendChild(image);
  blogContainer.appendChild(imageContainer);

  const categories = document.createElement("p");
  categories.classList.add("categories");
  const categoriesList = item.categories;
      for (let y = 0; y < categoriesList.length; y++) {
        const categoryItem = categoriesList[y].name;
        categories.textContent += " "+categoryItem  ;

        if (y < categoriesList.length - 1) {
          categories.textContent += ",";
        }
      }
      
  blogContainer.appendChild(categories);

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
  link.setAttribute("id" ,"link");
  contentContainer.appendChild(link);
  
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const datasetId = blogContainer.getAttribute("data-id"); 
    const detailsUrl = `details.html?id=${datasetId}`;
    window.location.href = detailsUrl;
  }); 
  
  

  return blogContainer;
}

// handles to load the next 4 results
function loadNextResults() {
  currentIndex += 4;
  getApi(currentIndex);
}
// handles to load the 4 previous results
function loadPreviousResults() {
  currentIndex -= 4;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  getApi(currentIndex);
}
// handles click on the arrows
arrowRight.addEventListener("click", loadNextResults);
arrowLeft.addEventListener("click", loadPreviousResults);

getApi(currentIndex);
