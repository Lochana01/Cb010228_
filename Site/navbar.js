function myFunction() {
  var x = document.getElementById("head_nav");
  if (x.className === "header") {
      x.className += " responsive";
  } 
  else {
      x.className = "header";
  }
}