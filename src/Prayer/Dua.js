import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const Dua = ({ time }) => {
  const duas = [
    {
      id: 3,
      title: "İftar duası",
      content: [
        "Allahumma inni laka sumtu wa bika aamantu [wa ‘alayka tawakkaltu]wa ‘ala rizq-ika aftarth",
        "Zahabadh-dhama’u wabtallatil-‘urooqu, wa thabatal-ajru inshaa-Allaahu",
      ],
    },
    {
      id: 5,
      title: "Vitr Qunutu",
      content: [
        "Allâhumma hdinî fîman hadayta wa câfinî fîman câfayta, wa tawallanî fîman tawallayta, wa bârik lî fîmâ actayta, wa qinî sharra mâ qadayta. Fa-innaka taqdî wa lâ yuqdâ calayka. Innahu lâ yadhillu man wâlayta [wa lâ yacizzu man câdayta]. Tabârakata rabbanâ wa tacâlayta.",
        "Allâhumma innî acudhu bi-ridâka min sakhattika, wa bi-mucâfâtika min cuqûbatika. Wa acûdhu bika minka. Lâ uhs thanâ'an calayka, anta kama athnayta calâ nafsik.",
        "Allâhumma iyyâka nacbudu, wa laka nusallî wa nasjudu, wa ilayka nascâ wa nahfidu, najrû rahmataka wa nakhshâ cadhâbaka, inna cadhâbaka bi-l-kâfirîna mulhaqun. Allâhumma innâ nastacînuka wa nastaghfiruka, wa nuthnî calayka-l-khayra wa lâ nakfuruka, wa nu'minu bika, wa nakhdacu laka, wa nakhlacu man yakfuruka.",
      ],
    },
  ];

  return (
    <blockquote className="ayah">
      <FaQuoteLeft style={{ color: "#66cc66" }} />
      {duas.map((dua, index) => {
        return (
          <ul className="list-group list-group-flush" key={index}>
            <li className="list-group-item disabled">
              <cite>
                <strong>{dua.title}</strong>
              </cite>
            </li>
            {dua.content.map((d, i) => {
              return (
                <li className="list-group-item" key={i}>
                  {d}
                </li>
              );
            })}
          </ul>
        );
      })}
    </blockquote>
  );
};

export default Dua;
