const url = "https://nightfox.no/JapanTravelBlog/wp-json/wc/v3/comments/consumer_key=ck_c69945534ca43c9d86de2416bc85941f76ad51b3&consumer_secret=cs_73f299335b404f1004241d0b181562359dd479a3";
async function getApi() {
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      
    } catch (error) {
      console.log("Ups!!!", error);
    } finally {
      console.log("Success!!!!");
    }
  }