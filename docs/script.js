const chargingSound = document.getElementById("chargingSound");
const chargeImg = document.querySelector("#charge");
const unchargeImg = document.querySelector("#uncharge");
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );

        if ("getBattery" in navigator) {
          navigator.getBattery().then(function (battery) {
            // isCharging?
            if (battery.charging) {
              unchargeImg.style.display = "none";
              chargeImg.style.display = "block";
            }

            // change state on charge
            battery.addEventListener("chargingchange", function () {
              if (battery.charging) {
                unchargeImg.style.display = "none";
                chargeImg.style.display = "block";
                chargingSound.play();
              } else {
                unchargeImg.style.display = "block";
                chargeImg.style.display = "none";
              }
            });
          });
        } else {
          console.log("Battery Status API not supported.");
        }
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
