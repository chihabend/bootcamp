const planets = [
    { name: "Mercury", color: "gray", moons: 0 },
    { name: "Venus", color: "goldenrod", moons: 0 },
    { name: "Earth", color: "blue", moons: 1 },
    { name: "Mars", color: "red", moons: 2 },
    { name: "Jupiter", color: "orange", moons: 79 },
    { name: "Saturn", color: "khaki", moons: 83 },
    { name: "Uranus", color: "lightblue", moons: 27 },
    { name: "Neptune", color: "darkblue", moons: 14 }
  ];
  
  const section = document.querySelector(".listPlanets");
  
  planets.forEach((planet) => {
    const planetDiv = document.createElement("div");
    planetDiv.classList.add("planet");
    planetDiv.style.backgroundColor = planet.color;
    planetDiv.textContent = planet.name;
  
    for (let i = 0; i < planet.moons; i++) {
      const moon = document.createElement("div");
      moon.classList.add("moon");
  
      moon.style.top = `${Math.random() * 80}px`;
      moon.style.left = `${Math.random() * 80}px`;
  
      planetDiv.appendChild(moon);
    }
  
    section.appendChild(planetDiv);
  });
  