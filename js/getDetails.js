function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const id = getQueryParam("id");

const url = `https://nightfox.no/JapanTravelBlog/wp-json/wc/v3/products/${id}?consumer_key=ck_c69945534ca43c9d86de2416bc85941f76ad51b3&consumer_secret=cs_73f299335b404f1004241d0b181562359dd479a3`;

async function getApi() {
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        for (let i = 0 ; i < result.images.length; i++) {
            const image = document.querySelector(".blogcontainer img");
            const modalImage = document.querySelector(".modalcontainer img");
            image.src = result.images[0].src;
            image.alt = result.images[0].alt;
            modalImage.src =  result.images[0].src;
            modalImage.alt =  result.images[0].alt;

        }
        const captionContainer = document.querySelector(".caption");
        captionContainer.textContent = result.name;

        const contentText = document.querySelector(".content-text");
        contentText.innerHTML = result.description;

        const date = document.querySelector(".date");
        date.innerHTML = `Date: ${result.date_created.substr(0,10)}`;


    }
    catch (error) {
    console.log("Ups!!!", error);
    
} finally {
    console.log("Success!!!!");
  }
}

getApi()

const image = document.querySelector(".detailimage img");
const modal = document.querySelector(".modalcontainer");

image.onclick = function showModal() {
    modal.style.display = "flex";
}
modal.onclick = function closeModal() {
    modal.style.display = "none";
}
