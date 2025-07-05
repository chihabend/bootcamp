function myMove() {
  const box = document.getElementById("animate");
  let pos = 0;
  const containerWidth = 400;
  const boxWidth = 50;

  const interval = setInterval(() => {
    if (pos >= containerWidth - boxWidth) {
      clearInterval(interval);
    } else {
      pos++;
      box.style.left = pos + "px";
    }
  }, 1);
}
