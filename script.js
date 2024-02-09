const url ="https://api.le-systeme-solaire.net/rest/bodies/"

const planetImages = {
  Earth: "https://upload.wikimedia.org/wikipedia/commons/2/22/Earth_Western_Hemisphere_transparent_background.png",
  Uranus: "https://upload.wikimedia.org/wikipedia/commons/3/34/Transparent_Uranus.png",
  Neptune: "https://upload.wikimedia.org/wikipedia/commons/2/20/Neptune_cutout.png",
  Mars: "https://upload.wikimedia.org/wikipedia/commons/6/68/Mars_%2816716283421%29_-_Transparent_background.png",
  Jupiter: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Jupiter_%28transparent%29.png",
  Saturn: "https://upload.wikimedia.org/wikipedia/commons/4/43/Saturnx.png",
  Pluto: "https://upload.wikimedia.org/wikipedia/commons/9/94/Pluto-transparent.png",
  Mercury: "https://upload.wikimedia.org/wikipedia/commons/2/24/Transparent_Mercury.png",
  Sun: "https://upload.wikimedia.org/wikipedia/commons/8/89/Sun_in_February_%28transparent%29.png",
  Venus: "https://upload.wikimedia.org/wikipedia/commons/9/93/Venus_globe_-_transparent_background.png",
}


if (!document.URL.includes("earth.html")) {
  const form = document.querySelector("form");
  
  form.addEventListener("submit", handleSubmit);
  
  function handleSubmit(e) {
    e.preventDefault()
    
    const planetIdTag = e.target[0].value   
    console.log(planetIdTag)
    
    fetch(`${url}{${planetIdTag}}`)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      getInfo(res);
    });
  }
} else {
  const anchors = document.querySelectorAll(".planet");

  function displayData() {
    const planet = JSON.parse(localStorage.getItem("planet"))
    
    const planetPicture = document.querySelector(".picture")
    const planetSection = document.querySelector(".planetId")
    const infoContainer = document.querySelector(".info")

    let mockPlanetPictureHTML = ` 
      <img class="earth" src="${planetImages[planet.englishName]}" 
      width="300" height="300">
      `
    
    let mockPlanetSectionHTML = `
      <img class="icon" src="${planetImages[planet.englishName]}"
      width="50" height="50">
      <h3 id="planetName">${planet.englishName}</h3>
    `

    let mockHTML = `
      <h3 id="planetInfo">Information</h3>
      <p>Discovered by: ${planet.discoveredBy || "No one"}</p>
      <p>Date discovered in: ${planet.discoveryDate || "N/A"}</p>
      <p>Sideral orbit: ${planet.sideralOrbit} days</p>
      <p>Sideral rotation: ${planet.sideralRotation} hrs</p>
      <p>No of moons: ${planet?.moons?.length || "No Moons"}</p>
    `;

    planetPicture.innerHTML = ""
    planetSection.innerHTML = ""
    infoContainer.innerHTML = ""


    planetPicture.insertAdjacentHTML("beforeend", mockPlanetPictureHTML)
    planetSection.insertAdjacentHTML("beforeend", mockPlanetSectionHTML)
    infoContainer.insertAdjacentHTML("beforeend", mockHTML);
  }

  displayData()

  anchors.forEach(anchor => {
    anchor.addEventListener("click", handleClick);
  })
  

  function handleClick(e) {
    const planetSelected = e.target.dataset.planetname

    fetch(`${url}{${planetSelected}}`)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      localStorage.setItem("planet", JSON.stringify(res))
      displayData()
    });
  }
}



function getInfo(planet) {
  localStorage.setItem("planet", JSON.stringify(planet))

  location.href = "./earth.html"
}