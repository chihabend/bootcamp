const input = document.getElementById("lettersOnly");

input.addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-Z]/g, "");
});
