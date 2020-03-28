import React from "react";

export default React.createContext({
  prayers: [
    { id: 1, title: "Fəcr namazı", time: "--:--" },
    { id: 2, title: "Günəş", time: "--:--" },
    { id: 3, title: "Zöhr namazı", time: "--:--" },
    { id: 4, title: "Əsr namazı", time: "--:--" },
    { id: 5, title: "Məğrib namazı", time: "--:--" },
    { id: 6, title: "İşa namazı", time: "--:--" }
  ],
  currentPrayer: 5,
  city: 1,
  location: "Bakı",
  cities: [
    "Bakı",
    "Ağdam",
    "Astara",
    "Gəncə",
    "Qazax",
    "Quba",
    "Lənkəran",
    "Saatlı",
    "Sabirabad",
    "Şamaxı",
    "Şəki",
    "Xaçmaz",
    "Yevlax",
    "Naxçıvan",
    "Göycay",
    "Zaqatala"
  ],
  updatePrayers: prayers => {}
});
