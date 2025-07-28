const API_KEY = '41b46a4335830597fc2717b3'; 
const API_BASE = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
let fromCurrency, toCurrency, amountInput, resultDiv, errorDiv, swapBtn, form;
let currencyCodes = [];


function initializeElements() {
  fromCurrency = document.getElementById('fromCurrency');
  toCurrency = document.getElementById('toCurrency');
  amountInput = document.getElementById('amount');
  resultDiv = document.getElementById('result');
  errorDiv = document.getElementById('error');
  swapBtn = document.getElementById('swapBtn');
  form = document.getElementById('converterForm');

  if (!fromCurrency || !toCurrency || !amountInput || !resultDiv || !errorDiv || !swapBtn || !form) {
    console.error('Erreur: Un ou plusieurs éléments HTML ne sont pas trouvés!');
    console.log('fromCurrency:', fromCurrency);
    console.log('toCurrency:', toCurrency);
    console.log('amountInput:', amountInput);
    console.log('resultDiv:', resultDiv);
    console.log('errorDiv:', errorDiv);
    console.log('swapBtn:', swapBtn);
    console.log('form:', form);
    return false;
  }
  
  return true;
}

async function fetchCurrencies() {
  try {
    console.log('Début de la récupération des devises...');
    
    if (!fromCurrency || !toCurrency || !errorDiv) {
      console.error('Éléments DOM non disponibles');
      return;
    }
    
    fromCurrency.innerHTML = '<option value="">Chargement...</option>';
    toCurrency.innerHTML = '<option value="">Chargement...</option>';
    
    const res = await fetch(`${API_BASE}/codes`);
    console.log('Réponse reçue, status:', res.status);
    
    const data = await res.json();
    console.log('Données reçues:', data);
    
    if (data.result === "success" && data.supported_codes) {
      currencyCodes = data.supported_codes;
      console.log('Nombre de devises récupérées:', currencyCodes.length);
      populateCurrencySelects();
    } else {
      console.error('Erreur API:', data);
      errorDiv.textContent = "Erreur lors du chargement des devises.";
    }
  } catch (err) {
    console.error('Erreur de réseau:', err);
    if (errorDiv) {
      errorDiv.textContent = "Erreur de connexion. Vérifiez votre internet.";
    }
  }
}

function populateCurrencySelects() {
  console.log('Population des listes déroulantes...');
  
  if (!fromCurrency || !toCurrency) {
    console.error('Éléments de devise non disponibles');
    return;
  }
  
  fromCurrency.innerHTML = '';
  toCurrency.innerHTML = '';
  
  currencyCodes.sort((a, b) => a[0].localeCompare(b[0]));
  
  currencyCodes.forEach(([code, name]) => {
    const opt1 = document.createElement('option');
    opt1.value = code;
    opt1.textContent = `${code} - ${name}`;
    fromCurrency.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = code;
    opt2.textContent = `${code} - ${name}`;
    toCurrency.appendChild(opt2);
  });
  
  fromCurrency.value = 'USD';
  toCurrency.value = 'EUR';
  
  const zwlExists = currencyCodes.some(([code]) => code === 'ZWL');
  console.log('ZWL présent dans la liste:', zwlExists);
  
  console.log('Listes remplies avec succès!');
  if (errorDiv) {
    errorDiv.textContent = ''; 
  }
}

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;
  
  if (!amount || amount <= 0) {
    errorDiv.textContent = "Veuillez entrer un montant valide.";
    return;
  }
  
  if (!from || !to) {
    errorDiv.textContent = "Veuillez sélectionner les devises.";
    return;
  }
  
  try {
    resultDiv.textContent = "Conversion en cours...";
    errorDiv.textContent = "";
    
    const res = await fetch(`${API_BASE}/pair/${from}/${to}/${amount}`);
    const data = await res.json();
    
    if (data.result === "success") {
      const convertedAmount = data.conversion_result;
      const exchangeRate = data.conversion_rate;
      
      resultDiv.innerHTML = `
        <strong>${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}</strong><br>
        <small>Taux: 1 ${from} = ${exchangeRate.toFixed(4)} ${to}</small>
      `;
    } else {
      errorDiv.textContent = "Erreur lors de la conversion.";
      resultDiv.textContent = "";
    }
  } catch (err) {
    console.error('Erreur de conversion:', err);
    errorDiv.textContent = "Erreur lors de la conversion.";
    resultDiv.textContent = "";
  }
}

function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  
  if (amountInput.value && parseFloat(amountInput.value) > 0) {
    convertCurrency();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Page chargée, initialisation...');
  
  setTimeout(() => {
    if (!initializeElements()) {
      console.error('Impossible d\'initialiser les éléments DOM');
      return;
    }
    
    console.log('Éléments DOM initialisés avec succès');
    
    fetchCurrencies();
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      convertCurrency();
    });
    
    swapBtn.addEventListener('click', swapCurrencies);
    
    fromCurrency.addEventListener('change', () => {
      if (amountInput.value && parseFloat(amountInput.value) > 0) {
        convertCurrency();
      }
    });
    
    toCurrency.addEventListener('change', () => {
      if (amountInput.value && parseFloat(amountInput.value) > 0) {
        convertCurrency();
      }
    });
    
    amountInput.addEventListener('input', () => {
      if (amountInput.value && parseFloat(amountInput.value) > 0) {
        clearTimeout(window.convertTimeout);
        window.convertTimeout = setTimeout(convertCurrency, 500);
      }
    });
  }, 100); 
});
