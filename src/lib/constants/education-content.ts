export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: "principiante" | "intermedio";
  estimatedMinutes: number;
  topic: string;
  content: string;
}

export const ARTICLES: Article[] = [
  {
    id: "art-001",
    slug: "que-es-un-presupuesto",
    title: "¿Qué es un presupuesto y por qué necesitas uno?",
    description: "Aprende los fundamentos del presupuesto personal y cómo puede transformar tu vida financiera.",
    level: "principiante",
    estimatedMinutes: 5,
    topic: "Presupuesto",
    content: `# ¿Qué es un presupuesto y por qué necesitas uno?

Un presupuesto es simplemente un plan para tu dinero. Te indica cuánto dinero entra, cuánto sale y a dónde va cada euro. Es la herramienta más fundamental de las finanzas personales.

## ¿Por qué necesitas un presupuesto?

Muchas personas evitan hacer un presupuesto porque creen que es complicado o que les quitará libertad. En realidad, ocurre exactamente lo contrario: un presupuesto **te da libertad** porque sabes exactamente en qué puedes gastar sin sentirte culpable.

### Beneficios clave de tener un presupuesto:

1. **Control financiero**: Sabes a dónde va tu dinero en lugar de preguntarte al final del mes por qué no te queda nada.
2. **Menos estrés**: El dinero es una de las principales causas de estrés. Tener un plan reduce la ansiedad financiera.
3. **Metas alcanzables**: Un presupuesto te permite ahorrar para lo que realmente importa: unas vacaciones, la entrada de una casa o tu jubilación.
4. **Evitar deudas**: Al planificar, reduces la probabilidad de gastar más de lo que ganas.

## Cómo funciona un presupuesto básico

Un presupuesto tiene tres partes principales:

- **Ingresos**: Todo el dinero que entra (salario, freelance, alquileres, etc.)
- **Gastos fijos**: Pagos que se repiten cada mes (alquiler, hipoteca, seguros)
- **Gastos variables**: Alimentación, ocio, ropa, transporte

La fórmula básica es: **Ingresos - Gastos = Ahorro**

## El primer paso

Para crear tu primer presupuesto, necesitas saber cuánto gastas actualmente. Durante un mes, anota todos tus gastos. No te juzgues, solo observa. Al final del mes tendrás una imagen clara de tus hábitos financieros.

Con esa información, podrás identificar áreas donde puedes reducir gastos y destinar más dinero a tus objetivos. Recuerda: no existe un presupuesto perfecto, existe el presupuesto que funciona para ti.

## Conclusión

Un presupuesto no es una cárcel financiera; es tu mapa hacia la libertad económica. Empieza hoy con algo sencillo y ajústalo con el tiempo. El simple hecho de prestar atención a tu dinero ya marca una gran diferencia.`,
  },
  {
    id: "art-002",
    slug: "ingresos-y-gastos",
    title: "Entiende tus ingresos y gastos",
    description: "Descubre cómo clasificar correctamente tus fuentes de ingresos y tipos de gastos para tener una visión clara de tu situación financiera.",
    level: "principiante",
    estimatedMinutes: 6,
    topic: "Fundamentos",
    content: `# Entiende tus ingresos y gastos

Para gestionar bien tu dinero, primero debes entender de dónde viene y a dónde va. Esto parece obvio, pero la mayoría de las personas no tiene una imagen clara de su flujo de dinero.

## Tipos de ingresos

### Ingresos activos
Son aquellos por los que intercambias tiempo o trabajo:
- **Salario**: Tu sueldo mensual como empleado
- **Freelance**: Trabajo por proyectos o por horas
- **Comisiones**: Ingresos variables por ventas o rendimiento

### Ingresos pasivos
Dinero que recibes sin necesidad de trabajar activamente:
- **Alquileres**: Si tienes propiedades en alquiler
- **Dividendos**: Beneficios de acciones e inversiones
- **Intereses**: Rendimientos de cuentas de ahorro o bonos
- **Regalías**: Si tienes libros, música u obras con derechos

## Tipos de gastos

### Gastos fijos
Se repiten cada mes con el mismo importe:
- Alquiler o hipoteca
- Cuotas de préstamos
- Seguros (coche, hogar, vida)
- Suscripciones fijas

### Gastos variables esenciales
Necesarios pero con importe variable:
- Alimentación
- Suministros (luz, agua, gas)
- Transporte
- Medicamentos

### Gastos discrecionales
No son esenciales y puedes controlarlos:
- Restaurantes y ocio
- Ropa y complementos
- Viajes y vacaciones
- Suscripciones de entretenimiento

## La importancia de registrar todo

El 80% de las personas subestima cuánto gasta en categorías como restaurantes, ropa o entretenimiento. Registrar tus gastos durante un mes te dará una visión objetiva y, a menudo, sorprendente de tus hábitos.

## Calcula tu saldo mensual

Una vez que conoces tus ingresos y gastos, calcula tu saldo: **Ingresos totales - Gastos totales = Saldo disponible**.

Si el resultado es positivo, ¡estás ahorrando! Si es negativo, estás gastando más de lo que ganas y necesitas tomar medidas. Si es cero, no estás ahorrando nada y eres vulnerable a cualquier imprevisto.

Conocer estas cifras es el punto de partida para cualquier mejora financiera.`,
  },
  {
    id: "art-003",
    slug: "fondo-de-emergencia",
    title: "El fondo de emergencia: tu red de seguridad",
    description: "Por qué necesitas un fondo de emergencia y cómo construirlo paso a paso.",
    level: "principiante",
    estimatedMinutes: 5,
    topic: "Ahorro",
    content: `# El fondo de emergencia: tu red de seguridad

Imagina que mañana pierdes tu trabajo. ¿Cuánto tiempo podrías mantener tu nivel de vida sin ingresos? Si la respuesta es "menos de un mes", necesitas un fondo de emergencia urgentemente.

## ¿Qué es un fondo de emergencia?

Es dinero reservado exclusivamente para imprevistos: perder el trabajo, una reparación urgente del coche, una enfermedad, o cualquier gasto inesperado que no puedes anticipar.

**No es** dinero para vacaciones, para compras, o para "por si acaso tengo ganas de algo". Es solo para emergencias reales.

## ¿Cuánto necesito?

La recomendación estándar es tener entre **3 y 6 meses de gastos** cubiertos. Por ejemplo:
- Si tus gastos mensuales son 1.500 €, tu fondo debería ser entre 4.500 € y 9.000 €.

El importe exacto depende de tu situación:
- **3 meses**: Si tienes pareja con trabajo estable, empleo seguro, sin deudas
- **6 meses**: Si eres autónomo, tienes empleo variable, o dependientes a tu cargo

## ¿Dónde guardar el fondo?

El fondo de emergencia debe estar:
- **Disponible**: Puedes acceder a él en 24-48 horas máximo
- **Separado**: En una cuenta diferente a tu cuenta corriente (para no tentarte)
- **Seguro**: No en inversiones que puedan perder valor

Las mejores opciones son cuentas de ahorro con alta liquidez o depósitos a corto plazo.

## Cómo construirlo

Si empiezas desde cero, el proceso puede parecer abrumador. Aquí tienes un plan por fases:

1. **Fase 1** (urgente): Ahorra 500-1.000 € como colchón mínimo
2. **Fase 2**: Alcanza 1 mes de gastos
3. **Fase 3**: Llega a 3 meses de gastos
4. **Fase 4**: Completa 6 meses si tu situación lo requiere

Destina entre el 10% y el 20% de tus ingresos mensuales hasta completar el fondo. Una vez conseguido, ese dinero ya está trabajando para ti aunque no lo "veas".

## El fondo que te cambia la vida

Tener un fondo de emergencia no es solo financiero, es emocional. La tranquilidad de saber que puedes afrontar un imprevisto sin endeudarte vale mucho más que cualquier interés que pueda generar ese dinero. Es la base de cualquier plan financiero sólido.`,
  },
  {
    id: "art-004",
    slug: "regla-50-30-20",
    title: "La regla 50/30/20 para gestionar tu dinero",
    description: "Un método sencillo y efectivo para distribuir tus ingresos entre necesidades, deseos y ahorro.",
    level: "principiante",
    estimatedMinutes: 4,
    topic: "Presupuesto",
    content: `# La regla 50/30/20 para gestionar tu dinero

Si crear un presupuesto detallado te parece complicado, la regla 50/30/20 es el punto de partida perfecto. Es simple, flexible y funciona para la mayoría de las personas.

## ¿En qué consiste?

La regla divide tus ingresos netos (lo que recibes después de impuestos) en tres categorías:

- **50% → Necesidades**
- **30% → Deseos**
- **20% → Ahorro e inversión**

## El 50%: Necesidades

Son los gastos esenciales para vivir:
- Alquiler o hipoteca
- Alimentación básica
- Suministros (luz, agua, gas, internet)
- Transporte para ir al trabajo
- Seguros esenciales
- Mínimos de deudas

Si este porcentaje supera el 50%, necesitas revisar tus gastos fijos o aumentar tus ingresos.

## El 30%: Deseos

Son gastos que mejoran tu calidad de vida pero no son estrictamente necesarios:
- Restaurantes y ocio
- Ropa más allá de lo básico
- Suscripciones (Netflix, Spotify, gimnasio)
- Viajes y vacaciones
- Hobbies

Esta categoría es donde tienes más flexibilidad. Reducirla es la forma más rápida de mejorar tu situación financiera.

## El 20%: Ahorro e inversión

Este es el porcentaje más importante para tu futuro:
- Fondo de emergencia (primero)
- Ahorro para metas concretas
- Pensión complementaria
- Inversiones a largo plazo
- Amortización anticipada de deudas

## Ejemplo práctico

Si ganas 2.000 € netos al mes:
- **1.000 €** para necesidades
- **600 €** para deseos
- **400 €** para ahorro e inversión

## ¿Y si no puedo llegar al 20% de ahorro?

No pasa nada. Empieza con lo que puedas: 5%, 10%. Lo importante es el hábito. Con el tiempo, a medida que tus ingresos aumenten o reduzcas gastos, irás aumentando ese porcentaje. La clave es empezar.

## La regla no es perfecta

Este método es una guía, no una ley. Si vives en una ciudad cara, quizás el alquiler ya te consume más del 50%. Ajusta los porcentajes a tu realidad y úsalo como punto de referencia, no como una camisa de fuerza.`,
  },
  {
    id: "art-005",
    slug: "deuda-buena-mala",
    title: "Deuda buena vs deuda mala",
    description: "No toda deuda es igual. Aprende a distinguir las deudas que te hacen crecer de las que te frenan.",
    level: "principiante",
    estimatedMinutes: 6,
    topic: "Deudas",
    content: `# Deuda buena vs deuda mala

Cuando escuchamos la palabra "deuda", automáticamente la asociamos con algo negativo. Pero la realidad es más matizada: hay deudas que pueden ayudarte a construir riqueza, y otras que la destruyen.

## ¿Qué hace que una deuda sea "buena"?

Una deuda es buena cuando:
1. Se usa para adquirir un activo que se **revaloriza** o **genera ingresos**
2. Tiene un **tipo de interés bajo**
3. Es **sostenible** en relación a tus ingresos

### Ejemplos de deuda buena:

**Hipoteca para vivienda habitual**
Si la cuota es razonable (menos del 35% de tus ingresos), una hipoteca te permite vivir en un activo que se puede revalorizar con el tiempo.

**Préstamo para estudios rentables**
Si un máster o formación específica te permite acceder a empleos con sueldos significativamente mayores, la inversión tiene sentido. La clave es calcular el retorno real.

**Financiación de negocio productivo**
Si el negocio genera ingresos superiores al coste del préstamo, puede ser una excelente decisión.

## ¿Qué hace que una deuda sea "mala"?

Una deuda es mala cuando:
1. Financia **consumo** (algo que se devalúa o se consume)
2. Tiene **tipo de interés alto**
3. Crea un **ciclo difícil de romper**

### Ejemplos de deuda mala:

**Tarjetas de crédito con saldo pendiente**
Los intereses de las tarjetas pueden llegar al 20-30% anual. Si solo pagas el mínimo, puedes estar pagando años por una compra puntual.

**Préstamos para consumo (coches de lujo, vacaciones, electrónica)**
Financiar bienes que se devalúan rápidamente es una trampa. Un coche pierde el 20% de su valor el primer año.

**Préstamos rápidos y créditos al consumo de alto interés**
Los microcréditos y préstamos rápidos pueden tener TAE superiores al 100%. Son una trampa financiera.

## La regla de oro con las deudas

Antes de contraer cualquier deuda, hazte estas preguntas:
- ¿Este préstamo me ayuda a generar más valor del que cuesta?
- ¿Puedo pagarlo cómodamente con mis ingresos actuales?
- ¿Qué pasa si mis circunstancias cambian?

## Cómo salir de la deuda mala

Si ya tienes deudas malas, prioriza eliminarlas cuanto antes:
1. **Método avalancha**: Paga primero la deuda con mayor interés (ahorra más dinero a largo plazo)
2. **Método bola de nieve**: Paga primero la deuda más pequeña (más motivador psicológicamente)

Liberar el peso de las deudas de alto interés es uno de los mejores "rendimientos" que puedes obtener con tu dinero.`,
  },
  {
    id: "art-006",
    slug: "habitos-financieros",
    title: "7 hábitos financieros que cambiarán tu vida",
    description: "Los comportamientos concretos que separan a las personas que prosperan económicamente del resto.",
    level: "principiante",
    estimatedMinutes: 7,
    topic: "Hábitos",
    content: `# 7 hábitos financieros que cambiarán tu vida

La diferencia entre las personas que alcanzan sus metas financieras y las que no no suele ser el nivel de ingresos. Es el conjunto de hábitos que practican de manera consistente. Aquí están los siete más importantes.

## 1. Págate a ti mismo primero

En el momento en que recibes tu sueldo, antes de pagar ninguna factura o hacer ninguna compra, transfiere automáticamente un porcentaje a tu cuenta de ahorro o inversión.

Este hábito elimina la tentación de gastar ese dinero. Si no lo ves en tu cuenta corriente, no lo gastas. Empieza con el 10% y aumenta gradualmente.

## 2. Registra todos tus gastos

Llevar un registro de lo que gastas, aunque sea durante 30 días, te da una perspectiva objetiva e invaluable de tus hábitos. Muchas personas descubren que gastan cientos de euros en cosas que ni recuerdan.

No necesitas hacerlo para siempre, pero hazlo regularmente para mantener la consciencia financiera.

## 3. Planifica las compras grandes con antelación

Las compras impulsivas son el enemigo del presupuesto. Para cualquier compra significativa (más de 100-200 €), aplica la regla de las 48 horas: espera dos días antes de comprarlo.

Si después de 48 horas sigues queriendo o necesitando el artículo, probablemente sea una compra justificada.

## 4. Automatiza tus finanzas

Configura transferencias automáticas para:
- Ahorro mensual
- Pago de facturas
- Aportaciones a planes de inversión

La automatización elimina la dependencia de la fuerza de voluntad. Lo que se hace automático, se hace siempre.

## 5. Revisa tus gastos recurrentes periódicamente

Las suscripciones se acumulan silenciosamente. Cada 3 meses, revisa todas tus suscripciones y gastos recurrentes. Cancela lo que no uses activamente. Es sorprendente la cantidad de dinero que se puede recuperar con esta práctica.

## 6. Edúcate financieramente de forma continua

Dedica aunque sea 30 minutos a la semana a leer sobre finanzas personales. Libros, pódcasts, artículos. El conocimiento financiero se acumula y te permite tomar mejores decisiones con el tiempo.

Una buena inversión de tiempo puede ahorrarte miles de euros en malas decisiones.

## 7. Establece metas financieras concretas

El ahorro sin propósito no funciona a largo plazo. Necesitas saber por qué estás ahorrando: una casa, un viaje, la jubilación, la libertad financiera.

Las metas deben ser específicas, medibles y con fecha: "Quiero ahorrar 10.000 € para la entrada de un piso en 3 años" es mucho más poderoso que "quiero ahorrar más".

## La clave está en la consistencia

No necesitas aplicar los 7 hábitos a la vez. Empieza con uno, mantenlo durante 30 días hasta que sea automático, y luego añade el siguiente. El progreso lento y constante siempre supera a los cambios drásticos e insostenibles.`,
  },
  {
    id: "art-007",
    slug: "interes-compuesto",
    title: "El interés compuesto: el octavo maravilla del mundo",
    description: "Cómo el interés compuesto puede multiplicar tu patrimonio y por qué empezar cuanto antes es crucial.",
    level: "intermedio",
    estimatedMinutes: 8,
    topic: "Inversión",
    content: `# El interés compuesto: el octavo maravilla del mundo

Albert Einstein supuestamente dijo: "El interés compuesto es la octava maravilla del mundo. Quien lo entiende, lo gana. Quien no, lo paga." Y tenía razón.

## ¿Qué es el interés compuesto?

El interés compuesto es el proceso por el cual los intereses generados se reinvierten y a su vez generan más intereses. Es el "interés sobre el interés".

**Interés simple**: Ganas intereses solo sobre el capital inicial.
**Interés compuesto**: Ganas intereses sobre el capital inicial MÁS los intereses ya generados.

## Un ejemplo que lo cambia todo

Imagina que inviertes 10.000 € al 7% anual durante 30 años:

- **Sin capitalización**: 10.000 + (10.000 × 7% × 30) = 31.000 €
- **Con capitalización anual**: 10.000 × (1,07)^30 = 76.123 €

¡La diferencia es de más de 45.000 €! Solo por reinvertir los intereses.

## El tiempo: el ingrediente más importante

El interés compuesto tiene una característica peculiar: **los últimos años son los más poderosos**. Esto se debe al crecimiento exponencial.

Ejemplo de dos inversores que aportan 200 € al mes al 7% anual:
- **Ana** empieza a los 25 años y para a los 35 (10 años aportando): a los 65 tiene ~233.000 €
- **Pedro** empieza a los 35 años y no para hasta los 65 (30 años aportando): a los 65 tiene ~243.000 €

Ana aportó solo 24.000 € en 10 años. Pedro aportó 72.000 € en 30 años. ¡Casi el mismo resultado! El tiempo es el factor más valioso.

## La regla del 72

Para saber en cuántos años se duplica tu dinero, divide 72 entre la tasa de rentabilidad:

- Al 6%: 72 ÷ 6 = 12 años para duplicar
- Al 9%: 72 ÷ 9 = 8 años para duplicar
- Al 12%: 72 ÷ 12 = 6 años para duplicar

## ¿Dónde encontrar interés compuesto?

- **Fondos de inversión indexados**: Reinvierten los dividendos automáticamente
- **ETFs de acumulación**: Hacen lo mismo que los fondos indexados
- **Planes de pensiones**: Con aportaciones regulares y reinversión
- **Cuentas de ahorro de alto rendimiento**: Menor rentabilidad pero sin riesgo

## El lado oscuro del interés compuesto

Recuerda que el interés compuesto también funciona en tu contra cuando tienes deudas. Una tarjeta de crédito al 20% anual con saldo pendiente crece exponencialmente. Por eso es crucial eliminar las deudas de alto interés antes de invertir.

## Conclusión

Empieza cuanto antes, aunque sea con poco. La cantidad importa menos que el tiempo. Cada año que pospones la inversión te cuesta mucho más de lo que imaginas.`,
  },
  {
    id: "art-008",
    slug: "inversion-basica",
    title: "Primeros pasos en la inversión",
    description: "Una guía práctica para comenzar a invertir con seguridad, incluso si empiezas desde cero.",
    level: "intermedio",
    estimatedMinutes: 10,
    topic: "Inversión",
    content: `# Primeros pasos en la inversión

Invertir parece complicado, reservado para expertos con grandes fortunas. Nada más lejos de la realidad. Hoy es posible empezar a invertir con 50 € al mes y sin conocimientos avanzados.

## Antes de invertir: los prerrequisitos

Antes de poner un solo euro en inversiones, asegúrate de tener:

1. **Fondo de emergencia completo** (3-6 meses de gastos)
2. **Deudas de alto interés saldadas** (tarjetas, préstamos al consumo)
3. **Presupuesto bajo control** (gastos menores que ingresos)

Invertir con deudas al 20% mientras obtienes un 7% de rentabilidad es contraproducente.

## Los activos de inversión más comunes

### Renta variable (acciones)
Compras una parte de una empresa. Mayor riesgo pero mayor rentabilidad histórica a largo plazo. El mercado global ha rentado aproximadamente un 7-10% anual de media en los últimos 100 años.

### Renta fija (bonos)
Prestas dinero a empresas o gobiernos a cambio de intereses. Menor riesgo, menor rentabilidad.

### Fondos de inversión
Agrupan el dinero de muchos inversores para comprar una cartera diversificada. Pueden ser de gestión activa o pasiva.

### ETFs (Fondos cotizados en bolsa)
Como los fondos de inversión pero se compran y venden en bolsa como acciones. Suelen tener comisiones muy bajas.

### Inmobiliario
Compra de propiedades para alquiler o revalorización. Requiere más capital inicial.

## La estrategia más recomendada para principiantes: inversión indexada pasiva

Los fondos indexados replican un índice de mercado (como el S&P 500 o el MSCI World). Ofrecen:

- **Diversificación automática**: Inviertes en cientos de empresas a la vez
- **Comisiones bajas**: 0,1-0,5% anual vs 1,5-2,5% en gestión activa
- **Resultados superiores**: El 85-90% de los fondos activos no supera al índice a largo plazo

## Dónde invertir en España

- **Fondos indexados**: MyInvestor, Indexa Capital, Openbank
- **ETFs**: DEGIRO, Interactive Brokers, Scalable Capital
- **Roboadvisors**: Indexa Capital, inbestMe (gestión automatizada)

## El principio de la diversificación

No pongas todos los huevos en la misma cesta. Distribuye tu inversión entre:
- Diferentes geografías (Europa, EEUU, mercados emergentes)
- Diferentes activos (renta variable + renta fija)
- Diferentes sectores

Una cartera clásica para principiantes podría ser 80% renta variable global + 20% renta fija.

## Errores que debes evitar

1. **Intentar predecir el mercado**: Nadie puede hacerlo de forma consistente
2. **Vender en pánico cuando baja**: Las caídas son normales y temporales
3. **Invertir dinero que puedes necesitar**: Solo invierte lo que no necesitarás en los próximos 5-10 años
4. **Pagar comisiones excesivas**: Las comisiones altas destruyen la rentabilidad

## El horizonte temporal lo es todo

La inversión solo tiene sentido a largo plazo (5 años mínimo, idealmente 10+). A corto plazo, los mercados son imprevisibles. A largo plazo, históricamente siempre han subido.`,
  },
  {
    id: "art-009",
    slug: "ratio-ahorro",
    title: "¿Cuánto deberías ahorrar cada mes?",
    description: "Descubre cuál es tu tasa de ahorro óptima y cómo calcular cuándo podrías alcanzar la independencia financiera.",
    level: "intermedio",
    estimatedMinutes: 7,
    topic: "Ahorro",
    content: `# ¿Cuánto deberías ahorrar cada mes?

La respuesta estándar es "el 20% de tus ingresos". Pero eso es una generalización. La cantidad correcta depende de tus circunstancias, objetivos y cuándo quieres alcanzar la libertad financiera.

## La tasa de ahorro: el indicador más importante

La tasa de ahorro es el porcentaje de tus ingresos netos que destinas al ahorro e inversión:

**Tasa de ahorro = (Ingresos - Gastos) / Ingresos × 100**

Un ejemplo: Si ganas 2.500 € y gastas 2.000 €, tu tasa de ahorro es del 20%.

## ¿Cuántos años de trabajo te quedan?

La tasa de ahorro determina directamente cuánto tiempo necesitas trabajar para alcanzar la independencia financiera. Esta tabla te sorprenderá:

| Tasa de ahorro | Años trabajando hasta la independencia |
|---|---|
| 5% | ~66 años |
| 10% | ~51 años |
| 20% | ~37 años |
| 30% | ~28 años |
| 50% | ~17 años |
| 70% | ~8,5 años |

*Basado en una rentabilidad del 5% y la regla del 4% de retirada.*

## La regla del 4%

Para calcular cuánto necesitas ahorrar para la independencia financiera, se usa la "regla del 4%": necesitas ahorrar suficiente para que el 4% de tu cartera cubra tus gastos anuales.

Si gastas 20.000 € al año, necesitas 500.000 € (20.000 / 0,04).

## Objetivos por etapas de vida

No existe una tasa perfecta universal, pero estas son guías orientativas:

- **20-30 años**: 15-20% mínimo. Aprovecha el máximo potencial del interés compuesto.
- **30-40 años**: 20-30%. Período de mayores ingresos y también mayores gastos (familia, hipoteca).
- **40-50 años**: 25-35%. El "punto de inflexión" donde el interés compuesto empieza a ser visible.
- **50+ años**: Tanto como sea posible. El tiempo se acorta.

## Cómo aumentar tu tasa de ahorro

### Por el lado de los gastos:
- Revisa suscripciones y servicios que no uses
- Optimiza la factura de luz, gas e internet
- Reduce los gastos de restaurantes (¡uno de los mayores drenadores de presupuesto!)
- Negocia seguros y servicios anualmente

### Por el lado de los ingresos:
- Negocia un aumento de sueldo (el momento más impactante para tu economía)
- Desarrolla habilidades demandadas
- Crea fuentes de ingresos adicionales
- Vende objetos que no uses

## El truco psicológico: aumentar el ahorro gradualmente

Cada vez que recibas un aumento de sueldo, destina al menos el 50% del incremento a ahorro. Si ganas 200 € más al mes, ahorra 100 € más y gasta solo 100 € más.

Este método te permite mejorar tu nivel de vida Y aumentar tu tasa de ahorro simultáneamente, sin sentir que te "privas" de nada.`,
  },
  {
    id: "art-010",
    slug: "planificacion-jubilacion",
    title: "Planifica tu jubilación desde hoy",
    description: "Por qué no puedes confiar solo en la pensión pública y cómo complementarla con ahorro privado.",
    level: "intermedio",
    estimatedMinutes: 9,
    topic: "Jubilación",
    content: `# Planifica tu jubilación desde hoy

El sistema de pensiones público está bajo presión en toda Europa. Vivimos más años, hay menos trabajadores por jubilado, y las pensiones futuras probablemente serán inferiores a las actuales. Planificar desde hoy no es pesimismo, es realismo.

## La brecha de jubilación

La "brecha de jubilación" es la diferencia entre lo que percibirás de la pensión pública y lo que necesitas para mantener tu nivel de vida.

En España, la pensión media ronda el 70-80% del último salario. Pero ese porcentaje está cayendo y seguirá cayendo. Si ganas 3.000 € y la pensión te da 2.000 €, tienes una brecha de 1.000 € mensuales que cubrir de alguna manera.

## Cuánto necesitas para jubilarte

La fórmula básica es:
**Capital necesario = Gasto anual en jubilación × 25**

Por ejemplo, si quieres vivir con 1.500 € al mes (18.000 € al año) de tus ahorros:
18.000 × 25 = **450.000 €** en tu cartera de inversión

Este cálculo usa la regla del 4% anual de retirada, que históricamente ha permitido que la cartera dure 30+ años.

## Los instrumentos de ahorro para jubilación en España

### Plan de pensiones individual
- Ventaja fiscal: Reduce la base imponible en el IRPF (hasta 1.500 € anuales desde 2022)
- Inconveniente: El dinero está bloqueado hasta la jubilación (salvo casos especiales)
- Comisiones: Muy variables; busca los más baratos

### EPSV (País Vasco)
- Similar al plan de pensiones pero con ventajas fiscales más generosas para residentes vascos

### Fondos de inversión
- Mayor flexibilidad: Puedes rescatar cuando quieras
- Sin ventajas fiscales directas, pero permiten diferir el pago de impuestos
- Los fondos indexados son la opción más eficiente

### PIAS (Plan Individual de Ahorro Sistemático)
- Ventaja: Si mantienes las aportaciones 5+ años, la plusvalía al rescate tributa al 0-1% (seguro de vida-ahorro)

## La estrategia por edades

**A los 25-35 años**:
- Prioriza fondos de inversión indexados (más flexibles y mejor rentabilidad histórica)
- Usa el plan de pensiones si tu tipo marginal en el IRPF es alto (>30%)

**A los 35-45 años**:
- Aumenta las aportaciones aprovechando mayores ingresos
- Considera diversificar entre activos: fondos, inmobiliario, plan de pensiones

**A los 45-55 años**:
- Incrementa progresivamente la parte de renta fija (reducir riesgo)
- Maximiza la aportación al plan de pensiones

**A los 55-65 años**:
- Reduce la exposición a renta variable gradualmente
- Planifica el modo de rescate (capital único vs renta periódica)

## La pensión de la Seguridad Social: cómo maximizarla

- Cada año cotizado suma; intenta no tener lagunas de cotización
- Los últimos 25 años son los que se toman como base de cálculo
- Retrasar la jubilación 2-3 años puede incrementar la pensión significativamente

## Empieza hoy, aunque sea poco

Con 30 años, aportando 200 € mensuales a un fondo indexado con un 7% de rentabilidad media, a los 65 años tendrías aproximadamente **320.000 €**. Si esperas a los 40, la misma aportación te daría apenas **149.000 €**. La diferencia de 10 años cuesta más de 170.000 €.`,
  },
  {
    id: "art-011",
    slug: "seguros-necesarios",
    title: "¿Qué seguros realmente necesitas?",
    description: "Una guía para entender qué seguros son esenciales, cuáles son opcionales y cómo no pagar de más.",
    level: "intermedio",
    estimatedMinutes: 8,
    topic: "Seguros",
    content: `# ¿Qué seguros realmente necesitas?

Los seguros son un componente esencial de las finanzas personales, pero también uno de los más mal gestionados. Muchas personas pagan por coberturas innecesarias mientras carecen de protección en áreas críticas.

## El principio básico de los seguros

Un seguro sirve para protegerte de eventos que **no puedes asumir económicamente**. Si puedes pagar algo con tus ahorros sin poner en riesgo tu estabilidad financiera, probablemente no necesitas asegurarlo.

Pregunta clave antes de contratar cualquier seguro: **¿Podría afrontar este gasto con mi fondo de emergencia?**

## Los seguros esenciales

### Seguro de salud
- **¿Quién lo necesita?** Todo el mundo, aunque en España la sanidad pública cubre lo básico.
- **¿Cuándo añadir el privado?** Si valoras rapidez, especialistas sin lista de espera o tienes condiciones crónicas que requieren seguimiento frecuente.
- **Coste aproximado**: 50-200 €/mes según edad y cobertura.

### Seguro de vida
- **¿Quién lo necesita?** Si tienes dependientes (hijos, cónyuge sin ingresos propios, padres a cargo).
- **¿Cuánto capital asegurar?** 10 veces tus ingresos anuales como referencia mínima.
- **¿Quién NO lo necesita?** Solteros sin dependientes con buen fondo de emergencia.
- **Coste aproximado**: 20-80 €/mes según edad, salud y capital asegurado.

### Seguro de hogar
- **¿Quién lo necesita?** Todo propietario de vivienda. Si eres inquilino, al menos el seguro de contenido.
- **Cobertura mínima**: Incendio, daños por agua, responsabilidad civil.

### Seguro de coche (obligatorio)
- El seguro a terceros es obligatorio en España.
- ¿Merece la pena el todo riesgo? Generalmente sí si el coche vale más de 10.000-15.000 €. Para coches viejos, el seguro a terceros suele ser suficiente.

### Seguro de responsabilidad civil
- Muchos seguros de hogar lo incluyen. Cubre daños que causes a terceros (también a través de tus hijos o mascotas).

## Los seguros opcionales (según situación)

### Seguro de decesos
- Cubre gastos de funeral (~4.000-8.000 €). Opcional si tienes suficientes ahorros.

### Seguro de dependencia
- Muy recomendable a partir de los 50-55 años. Cubre la necesidad de cuidados si pierdes autonomía.

### Seguro dental
- Útil si necesitas tratamientos frecuentes. Evalúa si el coste anual supera lo que gastarías sin seguro.

## Los seguros que probablemente no necesitas

- **Seguro de móvil o electrónica**: Las comisiones mensuales suelen superar el coste de reposición.
- **Garantía extendida de electrodomésticos**: Raramente compensa.
- **Seguro de cancelación de viajes para viajes baratos**: Solo tiene sentido para viajes de alto coste.

## Cómo optimizar tus seguros

1. **Compara anualmente**: Los precios varían mucho entre aseguradoras
2. **Agrupa seguros en la misma compañía**: Suele dar descuentos del 10-20%
3. **Sube las franquicias**: Pagas más en caso de siniestro, pero la prima anual baja
4. **Revisa coberturas duplicadas**: Muchas tarjetas de crédito premium incluyen seguro de viaje o de alquiler de coches

## La regla de oro

Contrata seguros para catástrofes, no para inconveniencias. Asegúrate de lo que podría arruinarte financieramente, no de lo que simplemente te molestaría pagar.`,
  },
  {
    id: "art-012",
    slug: "patrimonio-neto",
    title: "Cómo calcular y aumentar tu patrimonio neto",
    description: "El patrimonio neto es el indicador más completo de tu salud financiera. Aprende a calcularlo y a hacerlo crecer.",
    level: "intermedio",
    estimatedMinutes: 8,
    topic: "Patrimonio",
    content: `# Cómo calcular y aumentar tu patrimonio neto

El salario que cobras cada mes es un flujo. El patrimonio neto es el stock: lo que realmente tienes acumulado. Es el indicador más honesto de tu salud financiera real.

## ¿Qué es el patrimonio neto?

**Patrimonio neto = Total activos - Total pasivos (deudas)**

En otras palabras: lo que tienes menos lo que debes.

- Si tienes activos por 300.000 € y deudas por 150.000 €, tu patrimonio neto es 150.000 €.
- Si tienes activos por 50.000 € y deudas por 70.000 €, tu patrimonio neto es **-20.000 €** (situación de insolvencia técnica).

## Tus activos: lo que tienes

### Activos líquidos
- Efectivo y cuentas corrientes
- Cuentas de ahorro
- Fondos de inversión y ETFs

### Activos semi-líquidos
- Planes de pensiones (valor actual aunque no se pueda rescatar fácilmente)
- Acciones individuales

### Activos no líquidos
- Valor de tu vivienda habitual
- Otras propiedades inmobiliarias
- Negocios propios
- Joyas, obras de arte, colecciones de valor

## Tus pasivos: lo que debes

- Saldo pendiente de hipoteca
- Préstamos personales
- Saldo de tarjetas de crédito
- Préstamos de coches
- Cualquier otra deuda

## Cómo calcular tu patrimonio neto ahora mismo

1. Lista todos tus activos con su valor de mercado actual
2. Lista todas tus deudas con el saldo pendiente actual
3. Suma los activos, suma las deudas
4. Resta: Activos - Deudas = Patrimonio neto

Hazlo ahora, aunque el resultado te sorprenda (o te asuste). El primer paso para mejorar es conocer el punto de partida.

## Cómo aumentar tu patrimonio neto

### Estrategia 1: Aumentar activos
- Invierte regularmente en fondos indexados
- Amortiza tu hipoteca anticipadamente (reduce deuda y aumenta equity)
- Adquiere propiedades que se revaloricen
- Desarrolla habilidades que aumenten tu valor profesional

### Estrategia 2: Reducir pasivos
- Paga las deudas de alto interés primero
- Evita nuevas deudas de consumo
- Refinancia deudas a mejores condiciones cuando sea posible

### Estrategia 3: Optimizar la tasa de ahorro
La palanca más poderosa es ahorrar e invertir consistentemente. Incluso pequeñas mejoras en la tasa de ahorro tienen un impacto enorme en el patrimonio a largo plazo.

## ¿Cuánto patrimonio neto deberías tener según tu edad?

Una fórmula de referencia (T. Stanley, "El Millonario de al Lado"):
**Patrimonio neto esperado = Edad × Ingresos anuales brutos / 10**

Si tienes 35 años y ganas 40.000 €/año: 35 × 40.000 / 10 = 140.000 €

No es una regla exacta, pero sirve de referencia. Si estás muy por debajo, es señal de que hay trabajo que hacer.

## El seguimiento regular: clave del éxito

Calcula tu patrimonio neto cada 3-6 meses. Ver el número crecer mes a mes es un poderoso motivador. Y si baja (por caídas de mercado o gastos extraordinarios), te ayuda a reaccionar a tiempo.

El patrimonio neto es el marcador que de verdad cuenta en las finanzas personales. No el sueldo, no el coche, no las apariencias.`,
  },
];
