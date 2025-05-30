const boot = document.getElementById("boot");
const setup = document.getElementById("setup");
const setupDetails = document.getElementById("setupDetails");
const loading = document.getElementById("loading");

let setupData = JSON.parse(localStorage.getItem("noos_config")) || { setup: false };

// Bootscreen mit Escape-Option
document.addEventListener("DOMContentLoaded", () => {
  let time = Math.random() * 7000 + 5000;
  setTimeout(() => {
    boot.classList.add("hidden");
    if (setupData.setup) {
      startLoading();
    } else {
      setup.classList.remove("hidden");
      rotateHello();
    }
  }, time);
});

// "o" für Boot-Menü
document.addEventListener("keydown", e => {
  if (e.key === "o") {
    window.location.href = "bootmenu.html";
  }
});

// Setup-Schritte
document.getElementById("startSetup").onclick = () => {
  setup.classList.add("hidden");
  setupDetails.classList.remove("hidden");
};

// Avatar-Vorschau
document.getElementById("avatar").addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("avatarPreview").src = e.target.result;
  };
  if (file) reader.readAsDataURL(file);
});

// Setup abschließen
document.getElementById("finishSetup").onclick = () => {
  const name = document.getElementById("name").value;
  const pass = document.getElementById("pass").value;
  const avatar = document.getElementById("avatar").files[0];

  if (!name || !pass) return alert("Bitte Name & Passwort angeben.");

  if (avatar) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const path = `images/${name.toLowerCase()}.png`;
      localStorage.setItem("noos_config", JSON.stringify({
        setup: true,
        name,
        pass,
        avatarPath: path,
        avatarData: e.target.result
      }));
      setupDetails.classList.add("hidden");
      startLoading();
    };
    reader.readAsDataURL(avatar);
  } else {
    localStorage.setItem("noos_config", JSON.stringify({
      setup: true,
      name,
      pass,
      avatarPath: null
    }));
    setupDetails.classList.add("hidden");
    startLoading();
  }
};

// Zufälliger Ladebalken
function startLoading() {
  loading.classList.remove("hidden");
  const delay = Math.random() * 12000 + 8000;
  setTimeout(() => {
    window.location.href = "system.html";
  }, delay);
}

// Mehrsprachiges „Hallo“
function rotateHello() {
  const messages = ["Hallo", "Hello", "Bonjour", "Hola", "Ciao", "Hej", "Salam"];
  let i = 0;
  setInterval(() => {
    document.getElementById("hello").textContent = messages[i];
    i = (i + 1) % messages.length;
  }, 1000);
}
