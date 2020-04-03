(function ($) {

    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //// NUMBERS IN WORDS
    //// Números por Extenso v.3.1
    ////
    //// v.3.1 02.04.2020 jquery version
    //// v.3 02.04.2020
    //// v.2 29.05.2013
    //// v.1 11.04.2012
    ////
    //// created by: João Reis
    //// joaoreis.pt
    ////
    //// 1 - Numbers in words
    //// OPTIONS 
    //// short scale    BR US
    //// long scale     PT UK

    //// @string number to convert
    //// @string scale - default long scale PT
    ////
    //// $('#id').numbersinwords('1523,45','PT');
    ////
    ////
    ////
    //// 2 - Money in words
    //// OPTIONS 
    //// short scale    BR US
    //// long scale     PT UK
    //// coin           EUR USD

    //// @string number to convert
    //// @string scale - default long scale PT
    //// @string coin  - default EUR
    ////
    //// $('#id').moneyinwords('1523,45','PT','EUR');
    ////
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    // ------- Properties -------
    var numUnidadesArrPT = new Array("zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "catorze", "quinze", "dezasseis", "dezassete", "dezoito", "dezanove");
    var numUnidadesArrBR = new Array("zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove");
    var numDezenasArr = new Array("dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa", "cem");
    var numCentenasArr = new Array("cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos", "mil");
    var numMilharesCurtaArr = new Array("", "mil", "milhão", "bilião", "trilião", "quatrilhão", "quintilião", "sextilião", "septilião", "octilião", "nonilião", "decilião", "undecilião", "duodecilião", "tredecilião", "quatridecilião", "quindecilião", "sexdecilião", "septendecilião", "octodecilião", "novendecilião", "vigintilião", "unvigintilião", "duovigintilião", "trivigintilião", "quatrivigintilião", "quinquavigintilião");
    var numMilharesLongaArr = new Array("", "mil", "milhão", "mil milhões", "bilião", "mil biliões", "trilião", "mil triliões", "quatrilião", "mil quatriliões", "quintilião", "mil quintiliões", "sextilião", "mil sextiliões", "septilião", "mil septiliões", "octilião", "mil octiliões", "nonilião", "mil noniliões", "decilião", "mil deciliões", "undecilião", "mil undeciliões", "duodecilião", "mil duodeciliões", "tredecilião", "mil tredeciliões", "quatridecilião", "mil quatrideciliões", "quindecilião", "mil quindeciliões", "sexdecilião", "mil sexdeciliões", "septendecilião", "mil septendeciliões", "octodecilião", "mil octodeciliões", "novendecilião", "mil novendeciliões", "vigintilião");

    var numUnidadesArrEN = new Array("nought", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen");
    var numDezenasArrEN = new Array("ten", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety", "one hundred");
    var numCentenasArrEN = new Array("one hundred", "two hundred", "three hundred", "four hundred", "five hundred", "six hundred", "seven hundred", "eight hundred", "nine hundred", "one hundred");
    var numMilharesCurtaArrEN = new Array("", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion", "unvigintillion", "duovigintillion", "trevigintillion", "quattuorvigintillion", "quinvigintillion", "sexvigintillion", "septenvigintillion", "octovigintillion", "novemvigintillion", "trigintillion");
    var numMilharesLongaArrEN = new Array("", "thousand", "million", "thousand million", "billion", "thousand billion", "trillion", "thousand trillion", "quadrillion", "thousand quadrillion", "quintillion", "thousand quintillion", "sextillion", "thousand sextillion", "septillion", "thousand septillion", "octillion", "thousand octillion", "nonillion", "thousand nonillion", "decillion", "thousand decillion", "undecillion", "thousand undecillion", "duodecillion", "thousand duodecillion", "tredecillion", "thousand tredecillion", "quattuordecillion", "thousand quattuordecillion", "quindecillion", "thousand quindecillion", "sexdecillion", "thousand sexdecillion", "septendecillion", "thousand septendecillion", "octodecillion", "thousand octodecillion", "novemdecillion", "thousand novemdecillion", "vigintillion", "thousand vigintillion");
    var tipoNum = [{ id: "EUR", leftSingular: "euro", leftPlural: "euros", rightSingular: "cêntimo", rightPlural: "cêntimos" },
    { id: "USD", leftSingular: "dollar", leftPlural: "dollars", rightSingular: "cent", rightPlural: "cents" }];

    var valornumerico = valornumericocheck = "";
    var lang;
    var nomeMoeda = "euro";
    var resultadoExtenso = "";
    var nS = "";
    var nSc = "";
    var e = 0;
    var centavos = false;
    var centavosFindInicial = /[\.]/;
    var centavosFind = /[\,]/;
    var unidezcemCentavos;
    var centavosExtenso = "";
    var extensoNumeros = "";
    var extensoCentavos = "";



    $.fn.numbersinwords = function (valornumerico, langSigla="PT") {

        lang = langSigla;
        nS = nSc = "";
        nS = String(valornumerico).replace(" ", "").replace(".", ",").trim();
        e = Number(nS);

        //verificar a existencia de centavos
        if (nS.search(centavosFind) != -1) {
            centavos = true;
            var arr = [];
            arr = nS.split(centavosFind, 2);
            nS = String(arr[0]);
            e = Number(arr[0]);
            nSc = String(arr[1]).substr(0, 2);


        }


        unidezcemCentavos = Number(nSc.substr(0, 2));

        //conta quantas centenas existem
        /// 000 000 000 000 000 = 5
        /// 00 000 000 = 3
        /// 0 000 000 000 = 4
        var cNum = parseInt(Math.ceil(nS.length / 3));

        //escreve de centena em centena pela ordem crescente
        // 00 000 000 000
        // 1   2   3   4
        for (var i = 0; i < cNum; i++) {
            var espaco = " ";
            var separador = "";
            var singularPlural = "";
            var n;

            //conta quantas unidades existe na ultima centena
            /// X00 000 000 000 = 3
            /// X0 000 000 000 = 2
            /// X 000 000 000 = 1
            var r = parseInt(3 - (((3 * cNum) - nS.length)));

            if (i == 0) {
                n = Number(nS.substr(0, r));
            } else {
                n = Number(nS.substr(r + (3 * (i - 1)), 3));
            }

            if (n != 0) {
                if (i > 0) {
                    //se a centena for menor que 100 ou seja de dois numeros
                    //e se forem valores inteiros 100 200 300 ... 900 usa o separador " e "
                    //e se não estiver na primeira ou na ultima centena
                    if (lang == "PT" || lang == "BR") {
                        if (n >= 1 && n < 100) {
                            separador = " e ";
                            if (i != cNum - 1) {
                                separador = ", ";
                            }
                        } else {
                            //separador = ", ";
                            if (i == cNum - 1 && Number(String(n).substr(-2, 2) == 00)) {
                                separador = " e ";
                            } else {
                                separador = ", ";
                            }
                        }
                    }
                    if (lang == "UK" || lang == "US") {
                        if (n >= 1 && n < 100) {
                            separador = " and ";
                            if (i != cNum - 1) {
                                separador = ", ";
                            }
                        } else {
                            //separador = ", ";
                            if (i == cNum - 1 && Number(String(n).substr(-2, 2) == 00)) {
                                separador = " and ";
                            } else {
                                separador = ", ";
                            }
                        }
                    }
                }

                //verifica plural das palavras
                //caso valor da centena n maior que 1
                if (n > 1 && (cNum) - (i + 1) > 1) {

                    if (lang == "BR") {
                        //CURTA mudar de ão para ões
                        singularPlural = String(numMilharesCurtaArr[(cNum) - (i + 1)]).substr(0, numMilharesCurtaArr[(cNum) - (i + 1)].length - 2) + "ões";
                    }
                    if (lang == "PT") {
                        //LONGA mudar de ão para ões
                        if (String(numMilharesLongaArr[(cNum) - (i + 1)]).substr(-2, 2) == "ão") {
                            singularPlural = String(numMilharesLongaArr[(cNum) - (i + 1)]).substr(0, numMilharesLongaArr[(cNum) - (i + 1)].length - 2) + "ões";
                        } else {
                            singularPlural = numMilharesLongaArr[(cNum) - (i + 1)];
                        }
                    }

                    if (lang == "US") {
                        //CURTA
                        singularPlural = String(numMilharesCurtaArrEN[(cNum) - (i + 1)]) + "s";
                    }
                    if (lang == "UK") {
                        //Longa
                        singularPlural = String(numMilharesLongaArrEN[(cNum) - (i + 1)]) + "s";
                    }


                } else {
                    //CURTA usar ão
                    if (lang == "BR") {
                        singularPlural = numMilharesCurtaArr[(cNum) - (i + 1)];
                    }
                    //LONGA usar ão
                    if (lang == "PT") {
                        singularPlural = numMilharesLongaArr[(cNum) - (i + 1)];
                    }
                    //CURTA 
                    if (lang == "US") {
                        singularPlural = numMilharesCurtaArrEN[(cNum) - (i + 1)];
                    }
                    //LONGA 
                    if (lang == "UK") {
                        singularPlural = numMilharesLongaArrEN[(cNum) - (i + 1)];
                    }
                }
                //verifica se o número é diferente de 1
                //verifica se o número ésta na casa dos milhares e começa por 1
                if (n == 1 && e <= 1999 && e > 1) {
                    n = 0;
                    espaco = " ";
                    separador = "";
                    if (lang == "UK" || lang == "US") {
                        // one thousand
                        separador = " one ";
                    }
                }
                if (lang == "PT" || lang == "UK") {
                    //milhares de milhao
                    if (n == 1 && (nS.length == 10 || nS.length == 16 || nS.length == 22 || nS.length == 28 || nS.length == 34)) {
                        n = 0;
                    }
                }
                //escreve resultado na variavel
                resultadoExtenso += separador + centenasValor(n) + espaco + singularPlural;
            } else {
                //se a ultima centena for zero acrescenta um espaço
                if (i == cNum - 1) {
                    if (resultadoExtenso.substr(-3, 3) == "ões") {
                        espaco = " de ";
                    }
                    resultadoExtenso += espaco;
                }
            }
        }


        //limpar texto quando não existirem valores
        //ou o valor for igual a zero

        if (e == 0 || nS.length == 0) {
            nomeMoeda = "";
            resultadoExtenso = "";
            centavosExtenso = "";
        }
        extensoNumeros = resultadoExtenso;

        //centavos

        if (centavos) {
            if (nSc.length == 1) {
                unidezcemCentavos = unidezcemCentavos * 10;
            }
            if (e == 0) {
                resultadoExtenso = dezenasUnidadesValor(unidezcemCentavos);
            } else {
                if (lang == "PT" || lang == "BR") {
                    centavosExtenso = " vírgula " + dezenasUnidadesValor(unidezcemCentavos);
                }
                if (lang == "UK" || lang == "US") {
                    centavosExtenso = " and " + dezenasUnidadesValor(unidezcemCentavos);
                }
            }
        }
        //extensoCentavos=centavosExtenso;
        //acrescentar moeda + centavos na variavel
        resultadoExtenso += centavosExtenso;

        //escrever resultado

        valorextenso = resultadoExtenso;

        return this.html( valorextenso );

    };



    $.fn.moneyinwords = function (valornumerico, langSigla = "PT", coin = "") {

        lang = langSigla;

        resultadoExtenso = centavosExtenso = nomeMoeda = separadorDecimal = textCentimos = unidezcemCentavos = "";


        this.numbersinwords(valornumerico, lang);
        resultadoExtenso = extensoNumeros;


        var tiposelected = [];

        for (var i in tipoNum) {
            if (tipoNum[i].id == coin) {
                tiposelected = tipoNum[i];
            }
        }
        //definir plural da moeda
        if (e == 0) {
            nomeMoeda = "";
        } else if (e == 1) {
            nomeMoeda = (typeof tiposelected['leftSingular'] !== 'undefined') ? tiposelected['leftSingular'] : "";

        } else {
            nomeMoeda = (typeof tiposelected['leftPlural'] !== 'undefined') ? tiposelected['leftPlural'] : "";
        }


        if (centavos) {

            var n = Number(nSc);

            if (coin != "") {
                if (unidezcemCentavos == 01) {
                    textCentimos = (typeof tiposelected['rightSingular'] !== 'undefined') ? " " + tiposelected['rightSingular'] : "";
                } else {
                    textCentimos = (typeof tiposelected['rightPlural'] !== 'undefined') ? " " + tiposelected['rightPlural'] : "";
                }
            }

            if (n == 0) {
                textCentimos = "";
            }
            if (String(valornumerico).search(/[,.]/g) != -1 && n > 0) {

                if (lang == "PT" || lang == "BR") {
                    separadorDecimal = " e ";
                }
                if (lang == "UK" || lang == "US") {
                    separadorDecimal = " and ";
                }
            }

            if (e == 0) {
                resultadoExtenso = dezenasUnidadesValor(unidezcemCentavos) + textCentimos ;
            } else {
                centavosExtenso = separadorDecimal + dezenasUnidadesValor(unidezcemCentavos) + textCentimos ;
            }


        }
        //acrescentar moeda + centavos na variavel
        resultadoExtenso += nomeMoeda + centavosExtenso;

        return this.html(resultadoExtenso);

    };

    //////////////////////////////////////////////////////////////////////////
    //FUNCITONS
    //////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////unidades + dezenas
    var dezenasUnidadesValor = function (uni) {
        //0X
        var primeiroNum = Number(String(uni).substr(-1, 1));
        //X0
        var segundoNum = Number(String(uni).substr(-2, 1));
        var dezenasUnidadesValor = "";
        //unidades e dezenas
        if (uni > 0 && uni < 20) {
            if (lang == "PT") {
                dezenasUnidadesValor = String(numUnidadesArrPT[uni]);
            }
            if (lang == "BR") {
                dezenasUnidadesValor = String(numUnidadesArrBR[uni]);
            }
            if (lang == "UK" || lang == "US") {
                dezenasUnidadesValor = String(numUnidadesArrEN[uni]);
            }


        }
        if (uni >= 20 && uni <= 99) {
            // X0
            if (primeiroNum == 0) {
                if (lang == "PT" || lang == "BR") {
                    dezenasUnidadesValor = String(numDezenasArr[segundoNum - 1]);
                }
                if (lang == "UK" || lang == "US") {
                    dezenasUnidadesValor = String(numDezenasArrEN[segundoNum - 1]);
                }

            }
            // XX
            if (primeiroNum != 0) {
                if (lang == "PT" || lang == "BR") {
                    dezenasUnidadesValor = String(numDezenasArr[segundoNum - 1]) + " e " + String(numUnidadesArrPT[primeiroNum]);
                }
                if (lang == "UK" || lang == "US") {
                    dezenasUnidadesValor = String(numDezenasArrEN[segundoNum - 1]) + " " + String(numUnidadesArrEN[primeiroNum]);
                }
            }
        }
        return dezenasUnidadesValor;
    }


    //////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////centenas
    var centenasValor = function (v) {
        var centenasValor = "";
        if (v != 0) {
            //00X
            var unidade = Number(String(v).substr(-1, 1));
            //0X0
            var dezena = Number(String(v).substr(-2, 1));
            //0XX
            var dezenas = Number(String(v).substr(-2, 2));
            //X00
            var centena = Number(String(v).substr(-3, 1));
            //centenas
            if (lang == "PT" || lang == "BR") {
                var valorCentenas = String(numCentenasArr[centena - 1]);
            }
            if (lang == "UK" || lang == "US") {
                var valorCentenas = String(numCentenasArrEN[centena - 1]);
            }

            if (v < 100) {
                centenasValor = dezenasUnidadesValor(dezenas);
            }
            if (v == 100) {
                if (lang == "PT" || lang == "BR") {
                    centenasValor = "cem";
                }
                if (lang == "UK" || lang == "US") {
                    centenasValor = "one hundred";
                }
            }
            if (v > 100 && v <= 199) {

                if (lang == "PT" || lang == "BR") {
                    centenasValor = "cento" + " e " + dezenasUnidadesValor(dezenas);
                }
                if (lang == "UK" || lang == "US") {
                    centenasValor = "one hundred" + " and " + dezenasUnidadesValor(dezenas);
                }
            }
            if (v >= 200 && v < 1000) {
                // X00
                if (centena != 0 && dezena == 0 && unidade == 0) {
                    centenasValor = valorCentenas;
                } else {// 0X0  00X  XX0  0XX  X0X  XXX 
                    if (lang == "PT" || lang == "BR") {
                        centenasValor = valorCentenas + " e " + dezenasUnidadesValor(dezenas);
                    }
                    if (lang == "UK" || lang == "US") {
                        centenasValor = valorCentenas + " and " + dezenasUnidadesValor(dezenas);
                    }
                }
            }
        }
        return centenasValor;
    }

}(jQuery));