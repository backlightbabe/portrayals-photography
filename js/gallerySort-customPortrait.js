
//Version 1
// document.querySelector("#customPortrait").addEventListener("click", showContempPortrait);
//
// function showContempPortrait() {
//   window.location.href= "gallery.html";
//   getElementByID("#contempPortBtn").click();
// }



// Version 2 - go to gallery.html and click the "custom portrait" button

function openGalleryToCustomPort() {

  // Get the "custom portrait" button element from the index.html DOM
  const btnA = document.getElementByID("customPortrait");

  // Add a click event listener to the "custom portrait" button in index.html
  btnA.addEventListener("click", () => {
    //When "custom portrait" is clicked, open gallery.html
    window.location.href="gallery.html";
// get the "custom portrait" button element from the gallery.html DOM
const btnB = document.getElementByID("customPortrait");

  // Add event listener to the "custom portrait" button in gallery.html
  btnB.addEventListener("click", () => {
    //Perform some action wheb btnB is clicked
    console.log("btnB was clicked!");
  });

});
}




  // Do I have to call some function from the "selectivr-min.js" file?

//
//
