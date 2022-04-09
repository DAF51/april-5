//This creates a node list of data centers that will be needed later

let dcList = document.querySelectorAll("select.dc") 
let serverList = document.querySelectorAll("select.server")
let findButton = document.querySelector("button.find")
document.querySelector(".server").selectedIndex = -1
document.querySelector(".region").addEventListener("change",regionSelect)
//This applies the event listener to every data center object, giving them all access
//to the dataCenterSelect function in a way that allows that function to be updated whenever you 
//click on a new datacenter, instead of when you select an entirely new region, as was the case back
//when these function calls were within the region select switch statement
dcList.forEach(dc => dc.addEventListener("change",dataCenterSelect))
serverList.forEach(dc => dc.addEventListener("change", serverSelect))
findButton.addEventListener("click",findCharacter)




function regionSelect() {
  let selection = document.querySelector(".region").value
  
  switch(selection){
    case "North America":
      //This first line is used to hide any selects that may have been opened by a previous selection
      dcList.forEach(dc => dc.style.display= "none")
      //These lines make the data center selection list visible
      document.querySelector(".dc.select").style.display = "block"
      document.querySelector(".dc.NA").style.display = "block"
      //This resets the value of the lower drop down lists when you click on something above them
      //for example, if you select a new region, the data center will be select box will be cleared out
      //forcing the user to select a new data center
      document.querySelector(".dc.NA").selectedIndex = -1
      break;

    case "Europe":
      dcList.forEach(dc => dc.style.display= "none")
      document.querySelector(".dc.select").style.display = "block"
      document.querySelector(".dc.EUR").style.display = "block"
      document.querySelector(".dc.EUR").selectedIndex = -1
      break;

    case "Oceania":
        dcList.forEach(dc => dc.style.display= "none")
        document.querySelector(".dc.select").style.display = "block"
        document.querySelector(".dc.OCE").style.display = "block"
        document.querySelector(".dc.OCE").selectedIndex = -1
      break;

      case "Japan":
        dcList.forEach(dc => dc.style.display= "none")
        document.querySelector(".dc.select").style.display = "block"
        document.querySelector(".dc.JPN").style.display = "block"
        document.querySelector(".dc.JPN").selectedIndex = -1
      break;
  }
}

function dataCenterSelect() {
  //The DC list needs to be converted into an array so that I can use the .find function on it. This allows
  //the program to figure out which region has been selected by looking for whichever region is active 
  //(In other words, it has a display value of block). It then takes the value from that active select list
  let dcArray= Array.from(dcList)
  let currentDC = dcArray.find(dc => dc.style.display === "block").value

  switch(currentDC){
    case "Aether":
      serverList.forEach(server => server.style.display= "none")
      document.querySelector(".server.select").style.display = "block"
      document.querySelector(".server.Aether").style.display = "block"
      document.querySelector(".server.Aether").selectedIndex = -1
      break;

    case "Primal":
      serverList.forEach(server => server.style.display= "none")
      document.querySelector(".server.select").style.display = "block"
      document.querySelector(".server.Primal").style.display = "block"
      document.querySelector(".server.Primal").selectedIndex = -1
      break;

     case "Crystal":
      serverList.forEach(server => server.style.display= "none")
      document.querySelector(".server.select").style.display = "block"
      document.querySelector(".server.Crystal").style.display = "block"
      document.querySelector(".server.Crystal").selectedIndex = -1
      break;

    case "Chaos":
      serverList.forEach(server => server.style.display= "none")
      document.querySelector(".server.select").style.display = "block"
      document.querySelector(".server.Chaos").style.display = "block"
      document.querySelector(".server.Chaos").selectedIndex = -1
      break;  

     case "Light":
      serverList.forEach(server => server.style.display= "none")
      document.querySelector(".server.select").style.display = "block"
      document.querySelector(".server.Light").style.display = "block"
      document.querySelector(".server.Light").selectedIndex = -1
      break;

    case "Materia":
      serverList.forEach(server => server.style.display= "none")
      document.querySelector(".server.select").style.display = "block"
      document.querySelector(".server.Materia").style.display = "block"
      document.querySelector(".server.Materia").selectedIndex = -1
      break;

    case "Elemental":
      serverList.forEach(server => server.style.display= "none")
      document.querySelector(".server.select").style.display = "block"
      document.querySelector(".server.Elemental").style.display = "block"
      document.querySelector(".server.Elemental").selectedIndex = -1
      break;

    case "Gaia":
      serverList.forEach(server => server.style.display= "none")
      document.querySelector(".server.select").style.display = "block"
      document.querySelector(".server.Gaia").style.display = "block"
      document.querySelector(".server.Gaia").selectedIndex = -1
      break;

    case "Mana":
        serverList.forEach(server => server.style.display= "none")
        document.querySelector(".server.select").style.display = "block"
        document.querySelector(".server.Mana").style.display = "block"
        document.querySelector(".server.Mana").selectedIndex = -1
        break;               
  }
}

function serverSelect() {
  
  findButton.style.display = "block"
}

function findCharacter() {
  event.preventDefault()
  //This normalizes the character names a bit so that the API can read them
  let characterName = document.querySelector("input").value;
  characterName = characterName.replace(" ", "+")

  //This lets me get the name of the current server
  let serverArray = Array.from(serverList)
  let currentServer = serverArray.find(server => server.style.display ==="block").value


  let apiURL = "https://xivapi.com/character/search?name=[name]&server=[server]"
  apiURL= apiURL.replace("[name]", characterName)
  apiURL= apiURL.replace("[server]", currentServer)


  let lodeStoneID =fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      let lodestoneID =data.Results[0].ID
      return lodestoneID
    })
    //I needed to do a second fetch here, but the return lodestoneID wouldn't return the ID
    //It returned a promise, since it would take a sec for the ID to go through. The only way to ensure
    //that the promise went through was to put the next fetch within another .then. The .thens only run
    //when the previous .then is done, so by placing the next Fetch there, I can ensure that I have
    //the Id that I need.
    .then(id => {
      let lodestoneURL = "https://xivapi.com/character/[lodeID]"
      lodestoneURL = lodestoneURL.replace("[lodeID]", id)

      let charName;
      let charClass;
      let charPicture;

      fetch(lodestoneURL)
        .then(response => response.json())
        .then(data => {
          charName = data.Character.Name;
          charClass= data.Character.ActiveClassJob.Name;
          charPicture = data.Character.Portrait

          document.querySelector("h1").innerText = `Name: ${charName}`
          document.querySelector("h2").innerText = `Class: ${charClass}`
          document.querySelector("img").setAttribute("src", charPicture)
        })
    })



    

}
