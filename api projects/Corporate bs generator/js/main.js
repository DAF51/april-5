const corpButton = document.querySelector("button")
const speechSpace = document.querySelector(".dialogue")
corpButton.addEventListener("click", corpSpeak)


function corpSpeak(){
  let para = document.createElement("p")
  let url = "https://corporatebs-generator.sameerkumar.website/"

  fetch(url)
    .then(response => response.json())
    .then(data => {
      para = para.innerText = `${data.phrase}`
      speechSpace.innerText = para
    })
}