document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const data = {
        nom: nom,
        prenom: prenom
    };
    let prev = document.getElementById('json-result');
    if (prev) prev.remove();

    const pre = document.createElement('pre');
    pre.id = 'json-result';
    pre.textContent = JSON.stringify(data);
    document.body.appendChild(pre);
});
