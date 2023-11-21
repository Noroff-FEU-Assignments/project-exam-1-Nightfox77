let currentIndex = 0;
const arrow = document.querySelector(".bloggrid .arrow.plus");
const blogsContainer = document.querySelector(".bloggrid");
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
    for (let i = startIndex; i < startIndex + 10 && i < result.length; i++) {
      const container = createBlogContainer(result[i]);
      container.setAttribute("data-id", result[i].id)
      
      blogsContainer.appendChild(container);
    }
    currentIndex = startIndex;
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
  
    blogsContainer.appendChild(blogContainer);
  
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
function loadNextResults() {
    currentIndex += 10;
    getApi(currentIndex);
  }
  

getApi(currentIndex);
// handles click on the arrows
arrow.addEventListener("click", loadNextResults);




