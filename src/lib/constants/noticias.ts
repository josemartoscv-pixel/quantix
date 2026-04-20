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
