import React from "react";

export default React.createContext({
  prayers: [
    // { id: 1, title: "Fəcr namazı", time: "00:00" },
    // { id: 2, title: "Günəş", time: "00:20" },
    // { id: 3, title: "Zöhr namazı", time: "00:00" },
    // { id: 4, title: "Əsr namazı", time: "00:00" },
    // { id: 5, title: "Məğrib namazı", time: "00:00" },
    // { id: 6, title: "İşa namazı", time: "00:00" }
    { id: 1, title: "Fəcr namazı" },
    { id: 2, title: "Günəş" },
    { id: 3, title: "Zöhr namazı" },
    { id: 4, title: "Əsr namazı" },
    { id: 5, title: "Məğrib namazı" },
    { id: 6, title: "İşa namazı" }
  ],
  currentPrayer: 5,
  city: 1,
  location: "Berdee",
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
