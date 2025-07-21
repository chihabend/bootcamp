const form = document.getElementById('sunriseForm');
const resultsDiv = document.getElementById('results');
const city1Result = document.getElementById('city1Result');
const city2Result = document.getElementById('city2Result');

async function getSunriseTime(lat, lng) {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const lat1 = document.getElementById('lat1').value;
    const lng1 = document.getElementById('lng1').value;
    const lat2 = document.getElementById('lat2').value;
    const lng2 = document.getElementById('lng2').value;
    
    try {
        const [city1Data, city2Data] = await Promise.all([
            getSunriseTime(lat1, lng1),
            getSunriseTime(lat2, lng2)
        ]);
        
        if (city1Data.status === 'OK' && city2Data.status === 'OK') {
            const sunrise1 = new Date(city1Data.results.sunrise);
            const sunrise2 = new Date(city2Data.results.sunrise);
            
            city1Result.innerHTML = `
                <h4>Ville 1 (${lat1}, ${lng1})</h4>
                <p><strong>Heure du lever du soleil:</strong> ${sunrise1.toLocaleTimeString()}</p>
                <p><strong>Date:</strong> ${sunrise1.toLocaleDateString()}</p>
            `;
            
            city2Result.innerHTML = `
                <h4>Ville 2 (${lat2}, ${lng2})</h4>
                <p><strong>Heure du lever du soleil:</strong> ${sunrise2.toLocaleTimeString()}</p>
                <p><strong>Date:</strong> ${sunrise2.toLocaleDateString()}</p>
            `;
            
            resultsDiv.style.display = 'block';
        } else {
            throw new Error('Erreur lors de la récupération des données');
        }
    } catch (error) {
        alert('Erreur: ' + error.message);
        console.error('Erreur:', error);
    }
}

form.addEventListener('submit', handleFormSubmit);
