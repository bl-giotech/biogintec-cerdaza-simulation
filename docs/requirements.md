# Análisis de Requisitos para la Simulación del Proceso de Tratamiento de Cerdaza

## Inputs Requeridos (según solicitud del usuario)
1. **Cantidad de cerdaza** (entrada inicial)
2. **Cantidad de sustancia biotecnológica** (y su valor)
3. **Valor de mercado del fertilizante foliar** (por unidad)
4. **Valor de mercado del fertilizante radicular** (por unidad)
5. **Número de sistemas completos** (multiplicador para la producción)

## Outputs Requeridos (según solicitud del usuario)
1. **Cantidad de fertilizante foliar producido** (y su valor total)
2. **Cantidad de fertilizante radicular producido** (y su valor total)
3. **Tiempo del ciclo completo**
4. **Ganancia total** (ingresos - costos)

## Parámetros del Proceso (basados en documentación previa)
- Capacidad del tanque principal: 10,000 litros
- Costo de la sustancia biotecnológica: 20 USD por cada 10,000 litros
- Ciclo 1: 15 minutos (Activación)
- Ciclo 2: 15 minutos (Estabilización)
- Ciclo 3: 45 minutos (Reacciones Biotecnológicas)
- Tiempo para ajuste de pH: estimado en 15 minutos
- Tiempo para filtración y separación: estimado en 30 minutos
- Tiempo para procesamiento de sólidos: estimado en 120 minutos
- Tiempo para procesamiento de líquidos: estimado en 60 minutos

## Suposiciones para el Modelo de Simulación
- La entrada de cerdaza se mide en litros
- Por cada 10,000 litros de cerdaza tratada, se obtiene:
  * Aproximadamente 30% de sólidos (para fertilizante foliar)
  * Aproximadamente 70% de líquidos (para fertilizante radicular)
- El tiempo total del ciclo incluye todos los procesos desde la carga hasta la obtención del producto final
- El número de sistemas completos funciona como un multiplicador directo de la capacidad de procesamiento
- Los costos incluyen solo el valor de la sustancia biotecnológica (para simplificar)
- La ganancia se calcula como: (Valor total de fertilizantes producidos) - (Costo total de sustancia biotecnológica)

## Cálculos Necesarios
1. **Cantidad de sustancia biotecnológica necesaria**:
   - (Cantidad de cerdaza / 10,000) * Cantidad especificada por el usuario

2. **Costo total de la sustancia biotecnológica**:
   - (Cantidad de sustancia biotecnológica) * (Valor por unidad)

3. **Cantidad de fertilizante foliar producido**:
   - (Cantidad de cerdaza * 0.3) * Número de sistemas

4. **Cantidad de fertilizante radicular producido**:
   - (Cantidad de cerdaza * 0.7) * Número de sistemas

5. **Valor total del fertilizante foliar**:
   - (Cantidad de fertilizante foliar) * (Valor de mercado por unidad)

6. **Valor total del fertilizante radicular**:
   - (Cantidad de fertilizante radicular) * (Valor de mercado por unidad)

7. **Tiempo total del ciclo**:
   - Tiempo base (15 + 15 + 45 + 15 + 30 + 120 + 60 = 300 minutos)
   - Ajuste según cantidad de cerdaza y número de sistemas

8. **Ganancia total**:
   - (Valor total de fertilizantes) - (Costo total de sustancia biotecnológica)

## Componentes de la Interfaz de Usuario
1. **Sección de Entrada de Datos**:
   - Campo para cantidad de cerdaza (litros)
   - Campo para cantidad de sustancia biotecnológica
   - Campo para valor de la sustancia biotecnológica (USD)
   - Campo para valor de mercado del fertilizante foliar (USD/unidad)
   - Campo para valor de mercado del fertilizante radicular (USD/unidad)
   - Campo para número de sistemas completos

2. **Sección de Resultados**:
   - Visualización de cantidad de fertilizante foliar producido y su valor
   - Visualización de cantidad de fertilizante radicular producido y su valor
   - Visualización del tiempo total del ciclo
   - Visualización de la ganancia total

3. **Visualización del Proceso**:
   - Representación gráfica simplificada del diagrama de proceso
   - Indicadores visuales para cada fase del proceso

## Tecnologías a Utilizar
- **Next.js** como framework principal
- **React** para componentes de interfaz de usuario
- **Tailwind CSS** para estilos
- **Chart.js** o similar para visualizaciones gráficas
- **React Hook Form** para manejo de formularios
