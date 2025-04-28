// Modelo de simulación para el proceso de tratamiento de cerdaza

// Constantes del proceso
export const PROCESS_CONSTANTS = {
  TANK_CAPACITY: 10000, // litros
  BIOTECH_SUBSTANCE_COST_PER_10000L: 20, // USD
  CYCLE_1_TIME: 15, // minutos
  CYCLE_2_TIME: 15, // minutos
  CYCLE_3_TIME: 45, // minutos
  PH_ADJUSTMENT_TIME: 15, // minutos
  FILTRATION_TIME: 30, // minutos
  SOLIDS_PROCESSING_TIME: 120, // minutos
  LIQUIDS_PROCESSING_TIME: 60, // minutos
  SOLIDS_PERCENTAGE: 0.3, // 30% de sólidos
  LIQUIDS_PERCENTAGE: 0.7, // 70% de líquidos
};

// Tipos para los inputs y outputs
export interface SimulationInputs {
  cerdazaAmount: number; // litros
  biotechSubstanceAmount: number; // cantidad
  biotechSubstanceValue: number; // USD por unidad
  foliarFertilizerValue: number; // USD por unidad
  radicularFertilizerValue: number; // USD por unidad
  systemsCount: number; // número de sistemas completos
}

export interface SimulationOutputs {
  foliarFertilizerAmount: number; // litros o kg
  foliarFertilizerTotalValue: number; // USD
  radicularFertilizerAmount: number; // litros o kg
  radicularFertilizerTotalValue: number; // USD
  totalCycleTime: number; // minutos
  totalProfit: number; // USD
}

// Función principal para calcular los resultados de la simulación
export function calculateSimulationResults(inputs: SimulationInputs): SimulationOutputs {
  // Calcular la cantidad de fertilizante foliar (sólidos)
  const foliarFertilizerAmount = inputs.cerdazaAmount * PROCESS_CONSTANTS.SOLIDS_PERCENTAGE * inputs.systemsCount;
  
  // Calcular la cantidad de fertilizante radicular (líquidos)
  const radicularFertilizerAmount = inputs.cerdazaAmount * PROCESS_CONSTANTS.LIQUIDS_PERCENTAGE * inputs.systemsCount;
  
  // Calcular el valor total del fertilizante foliar
  const foliarFertilizerTotalValue = foliarFertilizerAmount * inputs.foliarFertilizerValue;
  
  // Calcular el valor total del fertilizante radicular
  const radicularFertilizerTotalValue = radicularFertilizerAmount * inputs.radicularFertilizerValue;
  
  // Calcular el costo total de la sustancia biotecnológica
  const totalBiotechSubstanceCost = inputs.biotechSubstanceAmount * inputs.biotechSubstanceValue;
  
  // Calcular el tiempo total del ciclo
  // Base time for one cycle
  const baseTime = PROCESS_CONSTANTS.CYCLE_1_TIME + 
                  PROCESS_CONSTANTS.CYCLE_2_TIME + 
                  PROCESS_CONSTANTS.CYCLE_3_TIME + 
                  PROCESS_CONSTANTS.PH_ADJUSTMENT_TIME + 
                  PROCESS_CONSTANTS.FILTRATION_TIME + 
                  PROCESS_CONSTANTS.SOLIDS_PROCESSING_TIME + 
                  PROCESS_CONSTANTS.LIQUIDS_PROCESSING_TIME;
  
  // Ajustar el tiempo según la cantidad de cerdaza y el número de sistemas
  // Asumimos que más sistemas reducen el tiempo proporcionalmente, pero hay un límite mínimo
  // También asumimos que más cerdaza aumenta el tiempo, pero no linealmente
  const scaleFactor = Math.sqrt(inputs.cerdazaAmount / PROCESS_CONSTANTS.TANK_CAPACITY);
  const systemEfficiency = Math.max(0.5, 1 / inputs.systemsCount); // Más sistemas = menos tiempo, pero con un límite
  
  const totalCycleTime = baseTime * scaleFactor * systemEfficiency;
  
  // Calcular la ganancia total
  const totalRevenue = foliarFertilizerTotalValue + radicularFertilizerTotalValue;
  const totalProfit = totalRevenue - totalBiotechSubstanceCost;
  
  return {
    foliarFertilizerAmount,
    foliarFertilizerTotalValue,
    radicularFertilizerAmount,
    radicularFertilizerTotalValue,
    totalCycleTime,
    totalProfit
  };
}

// Función para formatear valores monetarios
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Función para formatear cantidades
export function formatQuantity(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Función para formatear tiempo
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (hours > 0) {
    return `${hours} h ${mins} min`;
  } else {
    return `${mins} min`;
  }
}
