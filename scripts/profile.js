const time = document.querySelector("#time");
setInterval(() => {
  time.textContent = Date.now() + " ms";
}, 1000);
