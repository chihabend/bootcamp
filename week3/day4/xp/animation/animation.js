setTimeout(() => {
    alert("Hello World");
  }, 2000);
  
  setTimeout(() => {
    const container = document.getElementById('container');
    const p = document.createElement('p');
    p.textContent = "Hello World";
    container.appendChild(p);
  }, 2000);
  
  const container = document.getElementById('container');
  const button = document.getElementById('clear');
  
  let count = 0;
  
  const intervalId = setInterval(() => {
    if (count >= 5) {
      clearInterval(intervalId);
      return;
    }
    const p = document.createElement('p');
    p.textContent = "Hello World";
    container.appendChild(p);
    count++;
  }, 2000);
  
  button.addEventListener('click', () => {
    clearInterval(intervalId);
  });
  