
const Units =(Total)=>{
    switch(Total)
    {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
        default: return "";
    }    
}

const Tens =(Total)=>{
    let tens = Math.floor(Total/10);
    let unit = Total - (tens * 10);

    switch(tens)
    {
        case 1:
            switch(unit)
            {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + Units(unit);
            }
        case 2:
            switch(unit)
            {
                case 0: return "VEINTE";
                default: return "VEINTI" + Units(unit);
            }
        case 3: return TensWith("TREINTA", unit);
        case 4: return TensWith("CUARENTA", unit);
        case 5: return TensWith("CINCUENTA", unit);
        case 6: return TensWith("SESENTA", unit);
        case 7: return TensWith("SETENTA", unit);
        case 8: return TensWith("OCHENTA", unit);
        case 9: return TensWith("NOVENTA", unit);
        case 0: return Units(unit);
        default: return "";
    }
}

const TensWith =(strUnit, units)=> {
    if (units > 0)
        return strUnit + " Y " + Units(units)

    return strUnit;
}

const Hundreds = (Total)=>{
   let hundreds = Math.floor(Total / 100);
   let tens = Total - (hundreds * 100);

    switch(hundreds)
    {
        case 1:
            if (tens > 0)
                return "CIENTO " + Tens(tens);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Tens(tens);
        case 3: return "TRESCIENTOS " + Tens(tens);
        case 4: return "CUATROCIENTOS " + Tens(tens);
        case 5: return "QUINIENTOS " + Tens(tens);
        case 6: return "SEISCIENTOS " + Tens(tens);
        case 7: return "SETECIENTOS " + Tens(tens);
        case 8: return "OCHOCIENTOS " + Tens(tens);
        case 9: return "NOVECIENTOS " + Tens(tens);
        default: return Tens(tens);
    }
}

const Section = (Total , Divisor, StrUnit, StrPlural)=>{
    
    let hundreds = Math.floor(Total / Divisor)
    let subtract = Total - (hundreds * Divisor)
    let word = "";

    if (hundreds > 0)
        if (hundreds > 1)
            word = Hundreds(hundreds) + " " + StrPlural;
        else
            word = StrUnit;

    if (subtract > 0)
        word += "";

    return word;
}

const Miles =(Total)=>{
    let divisor = 1000;
    let hundreds = Math.floor(Total / divisor)
    let subtract = Total - (hundreds * divisor)

    let strMiles = Section(Total, divisor, "UN MIL", "MIL");
    let strHundreds = Hundreds(subtract);

    if(strMiles === "")
        return strHundreds;

    return strMiles + " " + strHundreds;
}

const Millions =(Total)=> {
    let divisor  = 1000000;
    let hundreds = Math.floor(Total / divisor)
    let subtract = Total - (hundreds * divisor)

    let strMillons = Section(Total, divisor, "UN MILLON", "MILLONES");
    let strMiles = Miles(subtract);

    if(strMillons === "")
        return strMiles;

    return strMillons + " " + strMiles;
}

const NumberToWords = (Total) => {
    let data = 
    {
        number  : Total,
        integers: Math.floor(Total),
        cent    : (((Math.round(Total * 100)) - (Math.floor(Total) * 100))),
        wordCent: "",
        wordCurrencyPlural: 'LEMPIRAS',
        wordCurrencysingular: 'LEMPIRA', 
        wordCurrencyCoinPlural: "CENTAVOS",
        wordCurrencyCoinSingular: "CENTAVO"
    };

    if (data.cent > 0) 
    {
        data.wordCent = "CON " + (function (){
            if (data.cent === 1)
                return Millions(data.cent) + " " + data.wordCurrencyCoinSingular;
            else
                return Millions(data.cent) + " " + data.wordCurrencyCoinPlural;
            })();
    };

    if(data.integers === 0)
        return "CERO " + data.wordCurrencyPlural + " " + data.wordCent;
    if (data.integers === 1)
        return Millions(data.integers) + " " + data.wordCurrencysingular + " " + data.wordCent;
    else
        return Millions(data.integers) + " " + data.wordCurrencyPlural + " " + data.wordCent;

}


export default NumberToWords;