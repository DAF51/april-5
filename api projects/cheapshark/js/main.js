
document.querySelector(".deal").addEventListener("click",findDeal)

function findDeal(){
  //This code deletes whatever list is already there, just in case the user wants to look for
  //multiple games without refreshing the page
  let gameList = document.querySelector(".game-list")
  while(gameList.firstChild){
    gameList.removeChild(gameList.firstChild)
  }

  document.querySelector("p").style.display = "block"

  let searchVal = document.querySelector("input").value;
  let url = "https://www.cheapshark.com/api/1.0/games?title=[name]"
  url = url.replace("[name]", searchVal)

  fetch(url)
    .then(response => response.json())
    .then(data => {
      
      data.forEach(currentGame => {
        let li = document.createElement("li")
        li.innerText= `Name:${currentGame.external}     |     Price:${currentGame.cheapest}`
        console.log(li)
        gameList.appendChild(li)
      })
    })
}