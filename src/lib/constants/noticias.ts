export interface NoticiaArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  content: string;
}

export const NOTICIAS_ARTICLES: NoticiaArticle[] = [
  {
    slug: "como-funciona-el-interes-compuesto",
    title: "Cómo funciona el interés compuesto: la herramienta más poderosa del ahorro",
    description: "Descubre qué es el interés compuesto, por qué es tan poderoso y cómo puedes aprovecharlo en España a través de fondos, planes de pensiones y cuentas remuneradas.",
    category: "Ahorro",
    readingMinutes: 8,
    publishedAt: "2026-04-22",
    content: `## Cómo funciona el interés compuesto: la herramienta más poderosa del ahorro

Albert Einstein supuestamente lo llamó "la octava maravilla del mundo" y, aunque no está claro si la frase es realmente suya, el concepto merece ese apelativo. El interés compuesto es el principio financiero que permite que una cantidad de dinero crezca de forma exponencial con el tiempo, simplemente reinvirtiendo los intereses que genera.

Si llevas tiempo oyendo hablar de él pero nunca has entendido exactamente cómo funciona o por qué es tan poderoso, este artículo es para ti. Te lo explicamos desde cero, con ejemplos prácticos y sin matemáticas complicadas.

---

## ¿Qué es el interés compuesto?

El interés compuesto es el sistema en el que los intereses generados por un capital se suman al capital inicial y, a partir de ese momento, también generan intereses. En otras palabras: **ganas intereses sobre los intereses**.

Esto contrasta con el **interés simple**, en el que los intereses siempre se calculan sobre el capital inicial y no se acumulan.

### Un ejemplo sencillo

Supón que tienes 10.000 € y los inviertes al 5 % anual durante 10 años:

**Con interés simple:**

Cada año recibes siempre el 5 % de los 10.000 € originales: 500 €. Al cabo de 10 años, habrás acumulado 5.000 € de intereses y tu capital total será de **15.000 €**.

**Con interés compuesto:**

- Año 1: 500 € de intereses → capital: 10.500 €
- Año 2: 525 € de intereses (5 % sobre 10.500 €) → capital: 11.025 €
- Año 3: 551,25 € de intereses → capital: 11.576,25 €
- ... y así sucesivamente hasta el año 10.
- **Capital final: 16.288,95 €**

La diferencia es de más de 1.288 €, y eso con un tipo del 5 % y solo 10 años. A medida que aumenta el tiempo o el tipo de interés, la diferencia se dispara exponencialmente.

---

## La fórmula del interés compuesto

La fórmula básica es:

**Capital final = Capital inicial × (1 + tipo de interés)^número de períodos**

O en notación abreviada: **CF = CI × (1 + r)^n**

Donde:
- **CF** = capital final
- **CI** = capital inicial (el dinero que inviertes)
- **r** = tipo de interés anual expresado en decimal (5 % = 0,05)
- **n** = número de años

Con el ejemplo anterior: CF = 10.000 × (1 + 0,05)^10 = 10.000 × 1,6289 = **16.289 €**

No es necesario memorizar la fórmula. Lo importante es entender la lógica: cuanto más tiempo pasa, más rápido crece el dinero, porque la base sobre la que se aplica el porcentaje es cada vez mayor.

---

## El factor más importante: el tiempo

El interés compuesto tiene una característica fascinante: **el tiempo es más poderoso que el tipo de interés o la cantidad invertida**. Empezar pronto, aunque sea con poco dinero, puede generar más riqueza que empezar tarde con mucho dinero.

| Escenario | Capital inicial | Tipo | Años | Capital final |
|---|---|---|---|---|
| A — empieza pronto | 10.000 € | 6 % | 30 años | 57.435 € |
| B — empieza tarde | 10.000 € | 6 % | 15 años | 23.966 € |
| C — más capital, menos tiempo | 20.000 € | 6 % | 15 años | 47.932 € |

Fíjate en algo llamativo: el escenario A, que empieza con 10.000 €, supera al escenario C, que empieza con el doble de capital pero tiene 15 años menos de recorrido. Eso es el poder del tiempo en el interés compuesto.

---

## Interés compuesto con aportaciones periódicas: aún más potente

Los ejemplos anteriores asumen que solo inviertes una vez. Pero en la vida real, la mayoría de los ahorradores hacen **aportaciones periódicas**: por ejemplo, 100 € al mes.

Con aportaciones de 100 € mensuales al 6 % anual, el efecto del interés compuesto se multiplica:

| Años de ahorro | Total aportado | Capital final acumulado |
|---|---|---|
| 10 años | 12.000 € | ~16.388 € |
| 20 años | 24.000 € | ~46.204 € |
| 30 años | 36.000 € | ~100.452 € |
| 40 años | 48.000 € | ~199.149 € |

Aportando solo 100 € al mes durante 40 años, terminas con casi 200.000 €, de los cuales **solo has puesto de tu bolsillo 48.000 €**. El resto —más de 150.000 €— lo ha generado el interés compuesto. Esta es la lógica que hay detrás de los planes de pensiones, los fondos de inversión indexados y cualquier vehículo de ahorro a largo plazo.

---

## La regla del 72: cuánto tarda en doblarse tu dinero

Existe un truco matemático muy útil para estimar mentalmente cuánto tiempo necesita una inversión para duplicarse: **dividir 72 entre el tipo de interés anual**.

- Al 4 %: 72 ÷ 4 = **18 años** para doblar el capital
- Al 6 %: 72 ÷ 6 = **12 años**
- Al 8 %: 72 ÷ 8 = **9 años**
- Al 10 %: 72 ÷ 10 = **7,2 años**

La regla del 72 no es exacta al decimal, pero es una herramienta excelente para hacerse una idea rápida y visual del impacto de diferentes rentabilidades a lo largo del tiempo.

---

## ¿Dónde encontrar interés compuesto en España?

El interés compuesto no es solo un concepto teórico. En España puedes aprovecharlo a través de múltiples vehículos de ahorro e inversión:

### Fondos de inversión indexados acumulativos

Los fondos que replican un índice como el MSCI World reinvierten automáticamente los dividendos dentro del fondo. Esto significa que el crecimiento del capital es puramente compuesto: los rendimientos se suman al capital y generan más rendimientos. Plataformas como MyInvestor, Indexa Capital o Finizens ofrecen acceso a este tipo de fondos con comisiones muy bajas.

### Planes de pensiones

Las aportaciones a planes de pensiones también trabajan con interés compuesto. Además, el dinero crece fiscalmente diferido: no pagas impuestos sobre los rendimientos generados hasta el momento del rescate, lo que potencia aún más el efecto del interés compuesto, ya que la base que crece es mayor al no haberse detraído ninguna cantidad para impuestos.

### Cuentas de ahorro remuneradas

Algunos bancos, especialmente los neobancos online como Trade Republic, Openbank o MyInvestor, ofrecen cuentas remuneradas que capitalizan intereses de forma periódica. Conviene verificar si el banco capitaliza mensualmente (más favorable) o solo al vencimiento de un plazo determinado.

### ETFs acumulativos

Los ETFs de tipo "Acc" (accumulating) reinvierten automáticamente los dividendos en el propio fondo en lugar de distribuirlos al inversor. Esto permite que todo el rendimiento quede dentro del vehículo trabajando al interés compuesto sin necesidad de tributar por los dividendos recibidos.

---

## Los tres enemigos del interés compuesto

Para que el interés compuesto funcione a su máximo potencial, hay que conocer y evitar sus principales obstáculos:

### 1. Las comisiones altas

Una comisión del 2 % anual puede parecer pequeña, pero aplicada durante 30 años puede comerse hasta el 40 % de tu patrimonio final. Por eso los fondos indexados de bajo coste —con TER del 0,1 % al 0,3 %— son tan efectivos a largo plazo: dejan trabajar al interés compuesto casi íntegramente.

Calcula siempre el impacto acumulado de las comisiones antes de contratar cualquier producto de inversión. El rendimiento bruto importa, pero el neto después de gastos es lo que realmente construye tu patrimonio.

### 2. La inflación

La inflación erosiona el poder adquisitivo de tu dinero. Si tu inversión genera un 5 % pero la inflación es del 3 %, tu rentabilidad **real** es solo del 2 %. El interés compuesto sigue funcionando, pero sobre una base real menor. Por eso invertir en activos que históricamente han superado la inflación —como las acciones de empresas globales a través de fondos indexados— es fundamental para que el interés compuesto trabaje de verdad.

### 3. Interrumpir la inversión o retirar dinero antes de tiempo

Cada vez que retiras dinero, rompes la cadena del interés compuesto. Una retirada de 5.000 € a mitad del camino no solo son esos 5.000 €: son también todos los intereses futuros que ese dinero habría generado en los años restantes. Si puedes, mantén tu inversión intacta el mayor tiempo posible y evita tocarla salvo que sea estrictamente necesario.

---

## Consejos prácticos para aprovechar el interés compuesto en España

- **Empieza cuanto antes**: Incluso si solo puedes invertir 50 € al mes, empieza hoy. El tiempo es el factor más importante y no se puede recuperar. Cada año que pasa sin invertir es un año de intereses compuestos que pierdes para siempre.
- **Elige vehículos que capitalicen los intereses automáticamente**: Los fondos acumulativos y los planes de pensiones lo hacen solos, sin que tengas que hacer nada.
- **Mantén las comisiones al mínimo**: Compara siempre el TER de los fondos antes de contratar. Una diferencia de 1 % anual puede suponer decenas de miles de euros en 30 años.
- **No vendas en las caídas del mercado**: El interés compuesto necesita tiempo ininterrumpido para funcionar. Las caídas son temporales; interrumpir la inversión para "protegerse" suele salir muy caro porque se pierde la recuperación posterior.
- **Usa la regla del 72** para visualizar tus objetivos: Si quieres doblar tu dinero en 10 años, necesitas una rentabilidad aproximada del 7,2 % anual.
- **Automatiza las aportaciones**: Configura una transferencia automática mensual a tu fondo o cuenta de ahorro. Lo que no ves, no lo gastas, y el automatismo elimina la tentación de saltarte meses cuando la vida se complica.
- **Aprovecha la ventaja fiscal de los traspasos entre fondos**: En España, traspasar dinero de un fondo a otro no tributa. Esto significa que puedes mantener la base de capital íntegra creciendo con interés compuesto sin que Hacienda recorte las ganancias intermedias.

---

## Conclusión

El interés compuesto no es magia: es matemática pura aplicada durante suficiente tiempo. Su poder radica en que los intereses generan más intereses, y estos a su vez generan aún más intereses, en un ciclo que se acelera de forma exponencial con los años.

La buena noticia es que no necesitas ser un experto financiero ni tener mucho dinero para aprovecharlo. Con constancia, paciencia y los vehículos de inversión adecuados, cualquier persona puede hacer que su dinero trabaje para ella. En España tienes a tu disposición fondos indexados acumulativos, planes de pensiones y cuentas remuneradas que aplican este principio de forma automática y accesible.

La única condición para que funcione es que empieces. Y siempre es mejor hoy que mañana.`,
  },
  {
    slug: "fondos-de-inversion-vs-etfs",
    title: "Fondos de inversión vs ETFs: cuál elegir para invertir en España",
    description: "Comparamos fondos de inversión y ETFs en costes, fiscalidad y flexibilidad para que el inversor español sepa cuál encaja mejor con su estrategia y horizonte temporal.",
    category: "Inversión",
    readingMinutes: 8,
    publishedAt: "2026-04-21",
    content: `## Fondos de inversión y ETFs: dos formas de invertir en el mercado

Cuando decides dar el salto a la inversión en activos financieros, dos opciones aparecen rápidamente en escena: los **fondos de inversión tradicionales** y los **ETFs** (del inglés *Exchange Traded Funds*, o fondos cotizados). Ambos te permiten invertir en una cesta diversificada de activos sin necesidad de comprar cada acción o bono por separado. Sin embargo, tienen diferencias importantes en costes, fiscalidad, flexibilidad y accesibilidad que conviene conocer antes de elegir.

En esta guía te explicamos cómo funciona cada uno, sus ventajas e inconvenientes, y cuál puede encajar mejor con tu perfil de inversor en España.

---

## ¿Qué es un fondo de inversión?

Un fondo de inversión es un vehículo de ahorro colectivo gestionado por una sociedad gestora. Los inversores aportan dinero al fondo, que a su vez invierte ese capital en una cartera de activos (acciones, bonos, inmuebles, divisas…) según la política definida en su folleto.

Cada inversor posee **participaciones** del fondo. El valor de esas participaciones —llamado VL o valor liquidativo— se calcula al final de cada día hábil, reflejando el valor total de los activos del fondo dividido entre el número de participaciones emitidas.

Existen dos grandes tipos de fondos:

### Fondos de gestión activa

La gestora tiene un equipo de analistas que selecciona los valores con el objetivo de batir a un índice de referencia (benchmark). Cobran comisiones más elevadas como compensación por este trabajo de análisis y selección.

### Fondos de gestión pasiva o indexados

Replican un índice de mercado (por ejemplo, el S&P 500 o el MSCI World) sin intentar superarlo. Simplemente compran todos o una muestra representativa de los activos que lo componen. Sus comisiones son mucho más bajas y, en la práctica, su rentabilidad a largo plazo supera a la de la mayoría de fondos activos.

---

## ¿Qué es un ETF?

Un ETF (Exchange Traded Fund) es, en esencia, un fondo de inversión que cotiza en bolsa como si fuera una acción. Esto significa que puedes comprarlo y venderlo en cualquier momento durante el horario de mercado, con el precio fluctuando en tiempo real.

La gran mayoría de los ETFs son de gestión pasiva: replican un índice con comisiones muy reducidas. Sin embargo, también existen ETFs de gestión activa, sectoriales, inversos, apalancados y temáticos para prácticamente cualquier estrategia de inversión.

---

## Diferencias clave entre fondos y ETFs

| Característica | Fondo de inversión | ETF |
|---|---|---|
| Cómo se compra/vende | Órdenes al VL del día | En bolsa, en tiempo real |
| Precio | Valor liquidativo (fin de día) | Precio de mercado (varía durante la sesión) |
| Comisiones (gestión activa) | 1,0 %–2,5 % TER | 0,3 %–1,0 % TER |
| Comisiones (gestión pasiva) | 0,1 %–0,5 % TER | 0,03 %–0,3 % TER |
| Mínimo de inversión | Desde 1 €–10 € | Precio de 1 participación (varía) |
| Traspasos sin tributar en España | Sí | No |
| Requiere cuenta bróker | No siempre | Sí, siempre |
| Dividendos | Generalmente reinvertidos | Pueden distribuirse o acumularse |

---

## La gran ventaja fiscal de los fondos en España: el traspaso

Este es el punto diferencial más importante para el inversor español. Cuando traspasas dinero de un fondo de inversión a otro, **no tributa**. No importa si tienes una plusvalía de 20.000 €: mientras el dinero permanezca dentro del "paraguas" de los fondos, no pagas nada a Hacienda hasta que decides reembolsar definitivamente.

Esto te permite:

- Cambiar de estrategia de inversión sin coste fiscal inmediato.
- Rebalancear tu cartera sin tributar.
- Diferir el pago de impuestos indefinidamente, lo que potencia enormemente el efecto del interés compuesto.

Con un ETF, en cambio, cada vez que vendes —aunque sea para comprar otro ETF de inmediato— estás generando un hecho imponible. Las plusvalías tributan ese mismo ejercicio como rentas del ahorro (entre el 19 % y el 28 %, según el tramo), lo que reduce el capital disponible para seguir creciendo.

Esta diferencia puede valer decenas de miles de euros a largo plazo, y es el principal argumento a favor de los fondos para el inversor español con horizonte de más de diez años.

---

## Costes: ¿cuánto me cobran realmente?

Los costes son uno de los factores más determinantes en la rentabilidad a largo plazo. Una diferencia de comisiones aparentemente pequeña —por ejemplo, un 1 % anual— puede comerse una parte enorme de tus ganancias en 20 o 30 años.

### ETFs indexados: los más baratos del mercado

Los ETFs de gestión pasiva son los instrumentos con menores costes disponibles. El TER (Total Expense Ratio) de ETFs indexados globales de gestoras como Vanguard, iShares o Amundi puede ser de **0,07 % a 0,20 %** anual. Por cada 10.000 € invertidos, pagas entre 7 y 20 € al año en comisiones.

### Fondos indexados: coste similar, ventaja fiscal añadida

Los mejores fondos indexados disponibles en España —accesibles a través de plataformas como MyInvestor, Indexa Capital o Finizens— tienen TER similares a los ETFs equivalentes: **0,10 %–0,40 %** anuales, aunque en algunos casos son ligeramente más caros que su ETF homólogo.

### Fondos de gestión activa: el coste que hay que justificar

Aquí los costes se disparan. Es habitual ver fondos con comisiones del **1,5 %–2,5 %** anual, más posibles comisiones de suscripción o reembolso. La pregunta clave es si esa gestión activa justifica el sobrecoste. La evidencia histórica es contundente: aproximadamente el 80–90 % de los fondos activos no logra batir a su índice de referencia a largo plazo, según los informes SPIVA publicados anualmente.

---

## Cómo tributan en España

Cuando se produce el reembolso de un fondo o la venta de un ETF, la ganancia patrimonial tributa en la **base del ahorro** del IRPF con la siguiente escala:

| Ganancia patrimonial | Tipo aplicable |
|---|---|
| Hasta 6.000 € | 19 % |
| De 6.000 € a 50.000 € | 21 % |
| De 50.000 € a 200.000 € | 23 % |
| Más de 200.000 € | 28 % |

La clave, como se ha explicado, es que los fondos permiten diferir este momento indefinidamente gracias a la figura del traspaso, mientras que los ETFs no tienen esta ventaja fiscal. Además, si tu ETF distribuye dividendos (en lugar de acumularlos), esos dividendos también tributan como rendimientos del capital mobiliario en el año en que se perciben, incluso si no has vendido nada.

---

## ¿Cuándo conviene cada opción?

### Elige un fondo de inversión si:

- Inviertes a **largo plazo** (más de 10 años) y quieres beneficiarte del diferimiento fiscal de los traspasos.
- Prefieres automatizar tus aportaciones sin tener que gestionar un bróker ni operar en bolsa.
- Tu objetivo es una cartera diversificada estable sin necesidad de seguir los mercados día a día.
- Inviertes a través de un plan de pensiones, una EPSV o una cartera gestionada (roboadvisor).

### Elige un ETF si:

- Buscas los **costes más bajos absolutos** y no planeas cambiar de activo con frecuencia.
- Quieres **flexibilidad** para comprar y vender en cualquier momento de la sesión bursátil.
- Inviertes en mercados o sectores específicos con ETFs temáticos que no tienen equivalente en fondos accesibles en España.
- Tu horizonte es más corto o tu estrategia implica ajustes tácticos ocasionales.
- Ya tienes cuenta en un bróker y te resulta cómodo operar en bolsa.

---

## Los roboadvisors: la opción para quien no quiere decidir

En los últimos años han proliferado en España plataformas de inversión automatizada como **Indexa Capital**, **Finizens** o **MyInvestor**. Construyen carteras diversificadas con fondos indexados de bajo coste, adaptadas al perfil de riesgo del inversor, y gestionan automáticamente los rebalanceos sin que el usuario tenga que hacer nada.

Son una excelente opción para quien quiere empezar a invertir de forma sencilla, acceder a fondos con comisiones institucionales bajas y beneficiarse de la ventaja fiscal del traspaso, sin necesidad de conocimientos financieros avanzados ni tiempo para gestionar la cartera.

---

## Errores comunes del inversor español

1. **Invertir en fondos activos caros sin comparar su rentabilidad histórica con su índice de referencia**: la mayoría no lo baten y cobran el doble o el triple de comisiones.
2. **Vender el ETF o el fondo en cuanto cae el mercado**: el comportamiento emocional es el mayor enemigo del inversor particular. Las caídas son parte del proceso y, a largo plazo, los mercados han subido históricamente.
3. **No aprovechar los traspasos de fondos para optimizar la cartera**: muchos inversores aguantan un fondo mediocre por miedo a tributar, sin saber que el traspaso es libre de impuestos.
4. **Elegir el ETF o fondo por el nombre del índice sin leer la ficha**: dos ETFs que replican el "S&P 500" pueden tener estructuras, costes y fiscalidad muy distintos.
5. **Olvidar informar a Hacienda sobre valores en el extranjero**: si tienes ETFs en brókers extranjeros y el valor supera los 50.000 €, puede ser obligatorio presentar el Modelo 720.

---

## Consejos prácticos para elegir entre fondos y ETFs

- **Si no sabes por cuál empezar**, un fondo indexado global (por ejemplo, uno que replique el MSCI World o el MSCI ACWI) con bajas comisiones es una elección sólida y difícil de batir.
- **Compara siempre el TER total**, no solo la comisión de gestión. Algunos fondos tienen gastos corrientes adicionales que no se ven a primera vista.
- **Valora el diferimiento fiscal a largo plazo**: si invertirás durante más de diez años, la ventaja del traspaso de fondos puede valer más que el pequeño diferencial de costes a favor de los ETFs.
- **No te obsesiones con el corto plazo**: tanto los fondos como los ETFs son instrumentos de largo plazo. El inversor que compra y vende frecuentemente casi siempre obtiene peores resultados que el que mantiene su posición con disciplina.
- **Diversifica siempre**: ya sea a través de fondos o ETFs, asegúrate de que tu inversión esté bien repartida por geografía, sector y tipo de activo.
- **Revisa la fiscalidad de tu bróker**: algunos brókers extranjeros no retienen ni informan a la Agencia Tributaria, lo que implica que tendrás que declararlo tú mismo. En España, las entidades nacionales hacen la retención y el reporte automáticamente.
- **Aportaciones periódicas**: tanto en fondos como en ETFs, invertir una cantidad fija mensual (estrategia de coste medio o *dollar cost averaging*) reduce el riesgo de entrar en el peor momento del mercado.

---

## Conclusión

Fondos de inversión y ETFs son dos herramientas poderosas para invertir en los mercados financieros con diversificación y, si se eligen bien, bajo coste. La elección entre uno y otro depende fundamentalmente de tu situación fiscal, tu horizonte de inversión y tu comodidad operando en bolsa.

Para la mayoría de los inversores españoles con horizonte largo plazo, los fondos indexados ofrecen la ventaja del traspaso sin tributar, que en la práctica puede ser decisiva para maximizar el efecto del interés compuesto. Sin embargo, si los costes son tu prioridad absoluta y no planeas cambiar de activo con frecuencia, un ETF indexado puede resultar imbatible en términos de gastos.

Lo que está claro es que, en cualquier caso, elegir un vehículo de bajo coste y mantener una estrategia disciplinada en el tiempo es la receta que la evidencia histórica señala como más eficaz para construir patrimonio a largo plazo. La clave no está en acertar cuál sube más el próximo mes, sino en mantenerse invertido el tiempo suficiente para que el mercado trabaje para ti.`,
  },
  {
    slug: "que-es-el-irpf-y-como-funciona",
    title: "Qué es el IRPF y cómo funciona: guía completa para entender tu declaración de la renta",
    description: "Todo lo que necesitas saber sobre el Impuesto sobre la Renta de las Personas Físicas: quién está obligado a declarar, cómo se calculan los tramos y qué deducciones puedes aplicar.",
    category: "Fiscalidad",
    readingMinutes: 9,
    publishedAt: "2026-04-20",
    content: `## Qué es el IRPF y para qué sirve

El Impuesto sobre la Renta de las Personas Físicas (IRPF) es el principal impuesto directo del sistema tributario español. Grava los ingresos obtenidos por las personas físicas residentes en España durante el año anterior. Dicho de forma simple: es el impuesto que pagas por el dinero que ganas.

La declaración de la renta —también conocida popularmente como "hacer el IRPF"— es el proceso anual mediante el cual cada contribuyente informa a la Agencia Tributaria (Hacienda) de sus ingresos, gastos deducibles y situación personal, para calcular cuánto impuesto le corresponde pagar o, en muchos casos, si tiene derecho a una devolución.

---

## ¿Quién está obligado a presentar la declaración?

No todo el mundo está obligado a presentar la declaración del IRPF. Los principales límites que establece la ley son:

### Asalariados con un único pagador

Si tienes un único empleador y tus ingresos anuales son **inferiores a 22.000 €**, en principio no estás obligado a declarar. Sin embargo, si tienes más de un pagador, el límite baja a **15.000 €** (siempre que el segundo pagador haya abonado más de 1.500 €).

### Otros supuestos de obligación

- Rendimientos del capital mobiliario (dividendos, intereses) superiores a 1.600 €.
- Rentas inmobiliarias imputadas superiores a 1.000 €.
- Ganancias patrimoniales (venta de acciones, inmuebles) superiores a 1.600 €.
- Rendimientos de actividades económicas (autónomos) de cualquier importe.

**Importante**: aunque no estés obligado, puede interesarte declarar si has tenido retenciones superiores a la cuota que te corresponde, ya que así recuperas el dinero.

---

## Cómo se calcula el IRPF: los tramos

El IRPF no aplica un tipo fijo: funciona con una **escala progresiva de tramos**. Cuanto más ganas, mayor es el porcentaje que aplicas al tramo de renta que supera cada umbral. Esta es la escala estatal vigente:

| Base liquidable (€) | Tipo marginal |
|---|---|
| Hasta 12.450 € | 19 % |
| De 12.450 € a 20.200 € | 24 % |
| De 20.200 € a 35.200 € | 30 % |
| De 35.200 € a 60.000 € | 37 % |
| De 60.000 € a 300.000 € | 45 % |
| Más de 300.000 € | 47 % |

*A estos tramos estatales hay que sumar la parte autonómica, que varía según la Comunidad Autónoma de residencia.*

### El "tipo marginal" no es lo que pagas sobre todos tus ingresos

Uno de los malentendidos más comunes: si ganas 36.000 €, no pagas un 37 % sobre toda tu renta. Pagas el 19 % sobre los primeros 12.450 €, el 24 % sobre el tramo siguiente, el 30 % sobre el siguiente, y el 37 % solo sobre los últimos euros que superan los 35.200 €. Tu tipo efectivo real es siempre inferior al marginal.

---

## Las rentas del ahorro: un cajón aparte

Las rentas del ahorro tributan por separado con su propia escala, generalmente más favorable. Incluyen:

- Intereses de cuentas y depósitos bancarios.
- Dividendos de acciones.
- Ganancias patrimoniales por venta de activos (acciones, fondos de inversión, inmuebles).

| Base del ahorro (€) | Tipo |
|---|---|
| Hasta 6.000 € | 19 % |
| De 6.000 € a 50.000 € | 21 % |
| De 50.000 € a 200.000 € | 23 % |
| Más de 200.000 € | 27 % |

Esta separación beneficia a los ahorradores e inversores, ya que sus rendimientos financieros no se suman al resto de ingresos y no escalan hacia los tipos más altos.

---

## Reducciones y deducciones: cómo pagar menos legalmente

El IRPF permite reducir la base imponible y la cuota final gracias a una serie de deducciones y reducciones. Las más importantes son:

### Reducción por trabajo

Los trabajadores por cuenta ajena pueden aplicar una reducción que oscila entre 2.000 € y 7.302 € sobre sus rendimientos netos del trabajo, en función del nivel de ingresos. Es automática y la aplica directamente Hacienda en el borrador.

### Aportaciones a planes de pensiones

Las aportaciones a planes de pensiones individuales reducen la base imponible general, con un límite de **1.500 € anuales** (o el 30 % de los rendimientos netos del trabajo, si es menor). Es una de las deducciones más conocidas y utilizadas en España, aunque conviene tener en cuenta que el rescate del plan tributa en el futuro como rendimiento del trabajo.

### Deducción por maternidad

Las madres trabajadoras con hijos menores de 3 años pueden deducir hasta **1.200 € por hijo** (100 € al mes). Se deduce directamente de la cuota, lo que significa que reduce el importe a pagar euro a euro.

### Mínimos personales y familiares

El mínimo personal es de 5.550 €. Existen mínimos adicionales por descendientes a cargo, ascendientes mayores de 65 años convivientes y personas con discapacidad. Estas cantidades tributan al tipo más bajo y tienen un impacto real en la cuota final.

### Deducciones autonómicas

Cada comunidad autónoma puede establecer sus propias deducciones: por alquiler de vivienda habitual, por nacimiento o adopción de hijos, por gastos de guardería, por inversión en empresas de nueva creación, por donativos, etc. Muchos contribuyentes las desconocen y pierden dinero cada año.

---

## El borrador de la renta: ¿puedes fiarte de él?

Desde hace años, la Agencia Tributaria pone a disposición de los contribuyentes un **borrador de la declaración** con la información que ella misma tiene: retenciones de la empresa, datos bancarios aportados por entidades financieras, datos catastrales, etc.

El borrador es un buen punto de partida, pero **no siempre está completo ni es correcto**. Situaciones que el borrador puede no recoger bien:

- Si has vendido acciones o fondos de inversión y la ganancia o pérdida no fue bien informada por el bróker.
- Si tienes rendimientos de alquiler que no has declarado antes.
- Si has realizado aportaciones a planes de pensiones no vinculados a una empresa.
- Si tienes deducciones autonómicas a las que tienes derecho pero Hacienda no conoce.
- Si has tenido gastos deducibles como trabajador autónomo.

Confirmar el borrador sin revisión puede suponer pagar de más o, en casos más graves, declarar información incorrecta que genere problemas posteriores.

---

## Plazos de la campaña de la renta

La campaña del IRPF en España se abre cada año en abril y cierra a finales de junio. Los plazos habituales son:

- **Presentación online (Renta Web)**: desde principios de abril hasta el 30 de junio.
- **Presentación telefónica con cita previa**: desde mediados de mayo.
- **Presentación presencial en oficinas de la Agencia Tributaria**: desde principios de junio.

Si el resultado es a ingresar y quieres domiciliar el pago, el plazo para hacerlo sin perder el fraccionamiento cierra el 25 de junio.

---

## Errores frecuentes al hacer la declaración

1. **Confirmar el borrador sin revisarlo**: como hemos explicado, puede estar incompleto.
2. **No declarar los ingresos del alquiler como propietario**: Hacienda cruza datos con los inquilinos que se deducen el alquiler. Si el inquilino aplica la deducción y tú no declaras los ingresos, hay un desequilibrio que puede derivar en una inspección.
3. **Olvidar las ganancias por venta de activos**: acciones, criptomonedas, fondos... todas las ganancias patrimoniales deben declararse en el ejercicio en que se producen.
4. **No compensar pérdidas con ganancias**: si en el mismo año has tenido plusvalías y minusvalías, puedes compensarlas para reducir tu base del ahorro y pagar menos.
5. **Desconocer las deducciones autonómicas**: muchos contribuyentes no las conocen y pierden dinero año tras año.
6. **Presentar fuera de plazo**: si la declaración sale a devolver y la presentas tarde, no hay sanción económica. Pero si sale a pagar, los recargos empiezan desde el primer día de retraso (5 %, 10 %, 15 % o 20 % según el tiempo transcurrido, además de intereses de demora).

---

## Consejos prácticos antes de presentar tu declaración

- **Reúne toda la documentación antes de empezar**: certificados de retenciones de tu empresa, datos de cuentas bancarias, justificantes de aportaciones a planes de pensiones, recibos de hipoteca si tienes deducción por vivienda habitual anterior a 2013, etc.
- **Usa el simulador de Hacienda** para comparar declaración individual frente a conjunta, especialmente si uno de los cónyuges no trabaja o tiene ingresos muy bajos.
- **No ignores las pérdidas patrimoniales**: si vendiste acciones o fondos con pérdidas en años anteriores, tienes cuatro años para compensarlas con ganancias futuras.
- **Guarda todos los justificantes al menos cuatro años**: Hacienda puede revisar cualquier ejercicio dentro de ese plazo de prescripción.
- **Plantéate el fraccionamiento del pago**: si la declaración sale a pagar, puedes dividir el importe en dos pagos sin intereses: el 60 % en junio y el 40 % en noviembre.
- **Consulta a un asesor fiscal si tu situación es compleja**: el coste de un gestor para hacer la renta suele oscilar entre 50 y 150 €, y puede ahorrarte mucho más si hay deducciones que desconoces o si tienes rentas de distinta naturaleza.

---

## Conclusión

El IRPF es el impuesto que más toca de cerca a la mayoría de los españoles, pero también el que más posibilidades ofrece de optimización legal. Entender cómo funciona la escala progresiva de tramos, qué reducciones puedes aplicar y cómo revisar el borrador puede marcar una diferencia tangible en lo que pagas —o recuperas— cada año. No dejes la declaración para el último momento: una buena preparación garantiza que no te dejes dinero sobre la mesa ni te enfrentes a sorpresas desagradables.`,
  },
  {
    slug: "hipoteca-fija-vs-variable-2026",
    title: "Hipoteca fija vs variable en 2026: ¿cuál te conviene más?",
    description: "Analizamos las diferencias clave entre hipoteca fija y variable en el contexto actual de tipos de interés para que tomes la mejor decisión en 2026.",
    category: "Hipotecas",
    readingMinutes: 8,
    publishedAt: "2026-04-19",
    content: `## La gran pregunta del comprador de vivienda

Contratar una hipoteca es, probablemente, la decisión financiera más importante de tu vida. Y dentro de esa decisión, elegir entre tipo fijo o tipo variable puede suponer una diferencia de decenas de miles de euros a lo largo del préstamo. En 2026, con el euríbor en niveles que todavía generan dudas sobre su evolución, esta elección es más relevante que nunca.

En este artículo te explicamos, sin tecnicismos innecesarios, cómo funciona cada modalidad, cuáles son sus ventajas e inconvenientes reales, y qué perfil de comprador encaja mejor con cada opción.

---

## ¿Qué es una hipoteca a tipo fijo?

Una hipoteca a tipo fijo es aquella en la que el tipo de interés no varía durante toda la vida del préstamo. Firmas al 3,10 % (por ejemplo) y pagas siempre ese porcentaje, independientemente de lo que haga el euríbor, la inflación o la política del Banco Central Europeo.

### Ventajas de la hipoteca fija

- **Cuota estable**: Sabes exactamente lo que pagarás cada mes durante 20 o 30 años. Eso facilita enormemente la planificación financiera familiar.
- **Tranquilidad psicológica**: No te afectan las subidas del euríbor ni tienes que seguir los mercados financieros.
- **Protección ante escenarios adversos**: Si los tipos suben mucho, la hipoteca fija puede ser mucho más barata que la variable a largo plazo.

### Inconvenientes de la hipoteca fija

- **Cuota inicial más alta**: Históricamente, el tipo fijo suele ser más caro al inicio que el variable.
- **No te beneficias de las bajadas de tipos**: Si el euríbor cae, tu cuota no se reduce.
- **Comisión por amortización anticipada**: Aunque la ley limita estas comisiones, puede haber costes si cancelas anticipadamente.

---

## ¿Qué es una hipoteca a tipo variable?

La hipoteca a tipo variable está referenciada a un índice, normalmente el **euríbor a 12 meses**, al que se suma un diferencial fijo que acuerda el banco. Por ejemplo: euríbor + 0,60 %. Esto significa que tu cuota mensual se revisa (habitualmente cada 6 o 12 meses) y sube o baja según la evolución del euríbor.

### Ventajas de la hipoteca variable

- **Cuota inicial más baja**: Cuando el euríbor está en niveles moderados o negativos (como ocurrió entre 2016 y 2022), la hipoteca variable puede ser significativamente más barata.
- **Te beneficias de las bajadas de tipos**: Si el BCE baja los tipos y el euríbor cae, tu cuota mensual se reduce automáticamente.
- **Mayor flexibilidad**: Suelen tener menos comisiones por amortización anticipada.

### Inconvenientes de la hipoteca variable

- **Incertidumbre**: No sabes lo que pagarás de aquí a dos años. Eso complica la planificación financiera.
- **Riesgo de subidas bruscas**: El período 2022-2024 fue un ejemplo doloroso: el euríbor pasó de niveles negativos al 4 % en poco más de un año, disparando las cuotas de muchas familias.
- **Estrés financiero**: Depender de un índice externo genera ansiedad en muchos hipotecados.

---

## El euríbor en 2026: ¿dónde estamos?

Tras las fuertes subidas de 2022-2023 y la posterior bajada gradual iniciada por el BCE en 2024, el euríbor se encuentra en 2026 en una zona de estabilización moderada. El mercado descuenta que los tipos se mantendrán en niveles controlados, aunque con cierta volatilidad posible si la inflación repunta.

Este contexto hace que la diferencia entre la cuota de una hipoteca fija y una variable sea menor que hace unos años, lo que dificulta la elección pero también la hace más equilibrada.

---

## Comparativa práctica: fija vs variable

La siguiente tabla muestra un ejemplo de una hipoteca de **200.000 €** a **25 años**, con los escenarios típicos de 2026:

| Modalidad | Tipo de interés | Cuota mensual aprox. | Coste total aprox. |
|---|---|---|---|
| Fija | 3,10 % | 960 € | 288.000 € |
| Variable (hoy) | Euríbor 2,8 % + 0,6 % = 3,4 % | 990 € | 297.000 € |
| Variable (si euríbor sube a 4 %) | 4,6 % | 1.110 € | 333.000 € |
| Variable (si euríbor baja a 1,5 %) | 2,1 % | 862 € | 258.600 € |

*Datos orientativos. Las cuotas reales dependen del banco, del plazo y del perfil del cliente.*

La tabla ilustra perfectamente el dilema: la hipoteca variable puede ser más barata si los tipos bajan, pero puede dispararse si suben. La fija ofrece certidumbre a cambio de renunciar a posibles ahorros.

---

## ¿Y qué hay de la hipoteca mixta?

Existe una tercera opción que muchos bancos ofrecen con fuerza en 2026: la **hipoteca mixta**. Funciona con tipo fijo durante los primeros años (habitualmente entre 3 y 10 años) y luego pasa a tipo variable.

Esta modalidad puede ser interesante si:
- Crees que el euríbor bajará en el medio plazo.
- Quieres protección inicial pero asumir variabilidad después.
- Planeas amortizar anticipadamente una parte importante del capital en los primeros años.

Sin embargo, también tiene su complejidad: estás apostando por un escenario concreto del mercado, lo cual siempre implica incertidumbre.

---

## ¿Qué perfil encaja con cada hipoteca?

### Elige hipoteca fija si:
- Tienes aversión al riesgo y necesitas saber exactamente cuánto pagas cada mes.
- Tu presupuesto familiar está ajustado y una subida de cuota te generaría problemas reales.
- Contratas la hipoteca para el largo plazo (20-30 años) y no tienes intención de cancelarla pronto.
- Tu tipo marginal del IRPF es alto y prefieres seguridad a optimización especulativa.

### Elige hipoteca variable si:
- Tienes capacidad financiera para absorber subidas de cuota sin que afecte tu estabilidad.
- Prevés amortizar anticipadamente en los próximos años (reduciendo el impacto de las subidas).
- El plazo del préstamo es corto (menos de 15 años).
- Confías en que los tipos bajarán a medio plazo.

---

## Errores comunes al elegir hipoteca

1. **Fijarse solo en la cuota mensual**: El coste total del préstamo importa tanto como la cuota. Una cuota más baja puede esconder un plazo más largo y un coste total mayor.
2. **Ignorar la TAE**: El tipo nominal no incluye comisiones ni gastos. La TAE (Tasa Anual Equivalente) refleja el coste real.
3. **No comparar varias entidades**: Las diferencias entre bancos pueden ser de cientos de euros al mes. Usa comparadores online y, si el préstamo es grande, considera un bróker hipotecario.
4. **Vincular productos innecesarios**: Seguros de vida, de hogar, tarjetas vinculadas... bonifican el tipo pero pueden costar más de lo que ahorran. Calcula siempre el coste total.
5. **No leer la FEIN**: El banco está obligado a entregarte la Ficha Europea de Información Normalizada antes de firmar. Léela con calma y, si tienes dudas, consúltala con un asesor independiente.

---

## Consejos prácticos antes de firmar

- **Pide al banco la simulación completa** a distintos escenarios de euríbor (1 %, 3 %, 5 %) para que veas el rango de lo que podrías pagar.
- **Compara al menos 3 entidades** antes de decidir: tu banco habitual, uno online y una comparativa en portales especializados.
- **No financies más del 80 % del valor de tasación**: Es el límite habitual y, además, reduce tu riesgo.
- **Asegúrate de que la cuota no supere el 30-35 % de tus ingresos netos mensuales**.
- **Plantéate la amortización anticipada**: Si en algún momento tienes un extra de dinero, amortizar capital reduce drásticamente el coste total, especialmente en los primeros años.

---

## Conclusión

No existe una respuesta universal a la pregunta fija o variable: depende de tu situación económica, tu tolerancia al riesgo y tu visión sobre la evolución de los tipos de interés. Lo que sí es universal es la importancia de comparar, calcular y no dejarte llevar solo por la cuota inicial más baja.

En 2026, con los tipos en niveles moderados y cierta incertidumbre sobre el futuro, la hipoteca fija ofrece paz mental a un precio razonable. La variable puede ahorrar dinero si los tipos continúan bajando, pero exige capacidad de absorber posibles subidas. La decisión, en última instancia, es tuya. Pero ahora la tomas con información.`,
  },
];
