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
        "text": "Brüssel",
        "value": "BRU"
    },
    {
        "text": "Budapest",
        "value": "BUD"
    },
    {
        "text": "Danzig",
        "value": null
    },
    {
        "text": "Dublin",
        "value": "DUB"
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
        "text": "Köln",
        "value": "CGN"
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
        "text": "Lissabon",
        "value": "LIS"
    },
    {
        "text": "Liverpool",
        "value": "LPL"
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
        "text": "Split",
        "value": "SPU"
    },
    {
        "text": "Strasbourg",
        "value": "SXB"
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
        "text": "Berlin Brandenburg",
        "value": "BER"
    },
    {
        "text": "Bremen",
        "value": "BRE"
    },
    {
        "text": "Cologne",
        "value": "CGN"
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
        "text": "Memmingen",
        "value": "FMM"
    },
    {
        "text": "Pisa",
        "value": "PSA"
    },
    {
        "text": "Pescara",
        "value": "PSR"
    },
    {
        "text": "Sofia",
        "value": "SOF"
    },
    {
        "text": "Zadar",
        "value": "ZAD"
    },
    {
        "text": "Zagreb",
        "value": "ZAG"
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
        "text": "Dusseldorf Weeze",
        "value": "NRN"
    },
    {
        "text": "Frankfurt-Hahn",
        "value": "HHN"
    },
    {
        "text": "Hamburg",
        "value": "HAM"
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