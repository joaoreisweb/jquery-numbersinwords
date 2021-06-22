# jquery-numbersinwords
Number to words converter 

# Write Numbers in Words
Script to write numbers in full

Pequeno script para escrever números por extenso


> **Short scale**
> Every new term greater than million is one thousand times larger than the previous term. 
> Thus, billion means a thousand millions 10(9), trillion means a thousand billions 10(12), and so on. 
> Thus, an n-illion equals 10(3n + 3).

> **Long scale**
> Every new term greater than million is one million times larger than the previous term. 
> Thus, billion means a million millions 10(12), trillion means a million billions 10(18), and so on. 
> Thus, an n-illion equals 10(6n). 


> A **escala curta** corresponde a um sistema de nomenclatura de números em que cada novo termo superior ao milhão é 1.000 vezes maior que o termo anterior. 
> Por exemplo, bilião ou bilhão é equivalente a mil milhões 10(9), um trilião ou trilhão é equivalente a mil biliões 10(12) e assim em diante.

> A **escala longa** corresponde a um sistema de nomenclatura de números em que cada novo termo superior ao milhão é 1.000.000 de vezes maior que o termo anterior. 
> Por exemplo, um bilião é equivalente a um milhão de milhões 10(12); um trilião é equivalente a um milhão de biliões 10(18), e assim por diante.

*fonte wikipédia* [wiki/Long_and_short_scales](https://en.wikipedia.org/wiki/Long_and_short_scales)



NUMBERS IN WORDS
Números por Extenso v.3.2
+
- v.3.2  15.06.2021 jquery version
- v.3.1  02.04.2020 jquery version
- v.3    02.04.2020
- v.2    29.05.2013
- v.1    11.04.2012

created by: João Reis
- joaoreis.pt

1. Numbers in words

OPTIONS 
 - short scale    BR US
 - long scale     PT UK

><small><em>For most of the 19th and 20th centuries, the United Kingdom uniformly used the long scale, while the United States of America used the short scale, so that usage of the two systems was often referred to as “British” and “American” respectively. In 1974 the government of the UK abandoned the long scale, so that the UK now applies the short scale interpretation exclusively in mass media  and official usage.</em></small>

><small><em>Durante a maior parte dos séculos 19 e 20, o Reino Unido a escala longa, enquanto os Estados Unidos da América usaram a escala curta, de modo que o uso dos dois sistemas foi frequentemente referido como "britânico" e "americano", respectivamente. Em 1974, o governo do Reino Unido abandonou a escala longa, de forma que agora o Reino Unido aplica a interpretação da escala curta exclusivamente na mídia de massa e no uso oficial.</em></small>

<br/>
  
@string number to convert<br/>
@string scale - default long scale PT

```javascript
$('#id').numbersinwords('1575,20','PT');
```
mil, quinhentos e setenta e cinco vírgula vinte
```javascript
$('#id').numbersinwords('1575,20','UK');
```
one thousand, five hundred and seventy five and twenty

2. Money in words

OPTIONS 
- short scale    BR US
- long scale     PT UK
- coin           EUR USD

@string number to convert<br/>
@string scale - default long scale PT<br/>
@string coin  - default EUR<br/>

```javascript
$('#id').moneyinwords('1575,20','PT','EUR');
```
mil, quinhentos e setenta e cinco euros e vinte cêntimos

```javascript
$('#id').moneyinwords('1575,20','US','USD');
```
one thousand, five hundred and seventy five dollars and twenty cents
