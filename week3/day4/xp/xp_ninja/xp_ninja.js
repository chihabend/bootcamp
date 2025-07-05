// EX 1
function calculateTip() {
    const billAmount = parseFloat(document.getElementById("billAmt").value);
    const serviceQuality = parseFloat(document.getElementById("serviceQual").value);
    let numberOfPeople = parseInt(document.getElementById("numOfPeople").value);
    const tipElement = document.getElementById("tip");
    const each = document.getElementById("each");
    const totalTip = document.getElementById("totalTip");
  
    if (isNaN(billAmount) || serviceQuality === 0) {
      alert("Please enter a bill amount and select service quality.");
      return;
    }
  
    if (isNaN(numberOfPeople) || numberOfPeople < 1) {
      numberOfPeople = 1;
      each.style.display = "none";
    } else {
      each.style.display = "inline";
    }
  
    const total = ((billAmount * serviceQuality) / numberOfPeople).toFixed(2);
    tipElement.textContent = total;
    totalTip.style.display = "block";
  }
  
  document.getElementById("calculate").onclick = calculateTip;
  document.getElementById("totalTip").style.display = "none";
  
  // EX 2
  document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const result = document.getElementById("result");
  
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (regex.test(email)) {
      result.textContent = "Valid email!";
      result.style.color = "green";
    } else {
      result.textContent = "Invalid email!";
      result.style.color = "red";
    }
  });
  
// EX 3
  function getLocation() {
    const output = document.getElementById("output");
  
    if (!navigator.geolocation) {
      output.textContent = "Geolocation is not supported by your browser.";
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        output.textContent = `Latitude: ${lat}\nLongitude: ${lon}`;
      },
      () => {
        output.textContent = "Unable to retrieve your location.";
      }
    );
  }
  