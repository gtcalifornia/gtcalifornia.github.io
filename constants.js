const options = [
    {
        "text": "Alicante",
        "value": "ALC"
    },
    {
        "text": "Amsterdam",
        "value": "AMS"
    },
    {
        "text": "Ancona",
        "value": "AOI"
    },
    {
        "text": "Athen",
        "value": null
    },
    {
        "text": "Azoren",
        "value": null
    },
    {
        "text": "Barcelona",
        "value": "BCN"
    },
    {
        "text": "Basel",
        "value": "BSL"
    },
    {
        "text": "Belfast",
        "value": "BFS"
    },
    {
        "text": "Berlin Brandenburg",
        "value": "BER"
    },
    {
        "text": "Bologna",
        "value": "BLQ"
    },
    {
        "text": "Bordeaux",
        "value": "BOD"
    },
    {
        "text": "Bratislava",
        "value": "BTS"
    },
    {
        "text": "Bremen",
        "value": "BRE"
    },
    {
        "text": "Brüssel",
        "value": "BRU"
    },
    {
        "text": "Budapest",
        "value": "BUD"
    },
    {
        "text": "Cologne",
        "value": "CGN"
    },
    {
        "text": "Danzig",
        "value": null
    },
    {
        "text": "Dortmund",
        "value": "DTM"
    },
    {
        "text": "Dresden",
        "value": "DRS"
    },
    {
        "text": "Dublin",
        "value": "DUB"
    },
    {
        "text": "Dusseldorf Weeze",
        "value": "NRN"
    },
    {
        "text": "Edinburgh",
        "value": "EDI"
    },
    {
        "text": "Faro",
        "value": "FAO"
    },
    {
        "text": "Fas",
        "value": "FEZ"
    },
    {
        "text": "Frankfurt-Hahn",
        "value": "HHN"
    },
    {
        "text": "Fuerteventura",
        "value": "FUE"
    },
    {
        "text": "Girona",
        "value": null
    },
    {
        "text": "Glasgow",
        "value": "GLA"
    },
    {
        "text": "Gran Canaria",
        "value": null
    },
    {
        "text": "Hamburg",
        "value": "HAM"
    },
    {
        "text": "Ibiza",
        "value": "IBZ"
    },
    {
        "text": "Kefalonia",
        "value": null
    },
    {
        "text": "Kerry",
        "value": "KIR"
    },
    {
        "text": "Knock Westirland",
        "value": "NOC"
    },
    {
        "text": "Kopenhagen",
        "value": "CPH"
    },
    {
        "text": "Krakau",
        "value": "KRK"
    },
    {
        "text": "Köln",
        "value": "CGN"
    },
    {
        "text": "Lissabon",
        "value": "LIS"
    },
    {
        "text": "Liverpool",
        "value": "LPL"
    },
    {
        "text": "London Gatwick",
        "value": "LGW"
    },
    {
        "text": "London Luton",
        "value": "LTN"
    },
    {
        "text": "London",
        "value": "SEN"
    },
    {
        "text": "Madrid",
        "value": "MAD"
    },
    {
        "text": "Malaga",
        "value": "AGP"
    },
    {
        "text": "Malta",
        "value": "MLA"
    },
    {
        "text": "Manchester",
        "value": "MAN"
    },
    {
        "text": "Marrakesch",
        "value": "RAK"
    },
    {
        "text": "Marseille",
        "value": "MRS"
    },
    {
        "text": "Memmingen",
        "value": "FMM"
    },
    {
        "text": "Neapel",
        "value": "JKR"
    },
    {
        "text": "Newquay Cornwall",
        "value": "NQY"
    },
    {
        "text": "Nizza",
        "value": null
    },
    {
        "text": "Nürnberg",
        "value": "NUE"
    },
    {
        "text": "Oslo",
        "value": "OSL"
    },
    {
        "text": "Palermo",
        "value": "PMO"
    },
    {
        "text": "Paphos",
        "value": "PFO"
    },
    {
        "text": "Paris",
        "value": "PAR"
    },
    {
        "text": "Pescara",
        "value": "PSR"
    },
    {
        "text": "Pisa",
        "value": "PSA"
    },
    {
        "text": "Pisa",
        "value": "PSA"
    },
    {
        "text": "Prag",
        "value": "PRG"
    },
    {
        "text": "Rijeka",
        "value": "RJK"
    },
    {
        "text": "Rome",
        "value": "ROM"
    },
    {
        "text": "Salzburg",
        "value": "SZG"
    },
    {
        "text": "Santander",
        "value": "SDR"
    },
    {
        "text": "Sevilla",
        "value": "SVQ"
    },
    {
        "text": "Shannon",
        "value": "SNN"
    },
    {
        "text": "Sofia",
        "value": "SOF"
    },
    {
        "text": "Split",
        "value": "SPU"
    },
    {
        "text": "Strasbourg",
        "value": "SXB"
    },
    {
        "text": "Tallinn",
        "value": "TLL"
    },
    {
        "text": "Teneriffa",
        "value": "TFN"
    },
    {
        "text": "Valencia",
        "value": "VLC"
    },
    {
        "text": "Venedig",
        "value": "VCE"
    },
    {
        "text": "Warschau",
        "value": "WAW"
    },
    {
        "text": "Zadar",
        "value": "ZAD"
    },
    {
        "text": "Zagreb",
        "value": "ZAG"
    }
]

const selectBox = document.querySelector('select');

for (const o of options) {
  const {
    text,
    value,
    selected
  } = o
  selectBox.options.add(new Option(text, value, selected, selected));
}