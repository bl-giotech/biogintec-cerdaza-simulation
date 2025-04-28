'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { 
  SimulationInputs, 
  SimulationOutputs, 
  calculateSimulationResults,
  formatCurrency,
  formatQuantity,
  formatTime
} from '@/lib/simulationModel';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function SimulationForm() {
  const [results, setResults] = useState<SimulationOutputs | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SimulationInputs>({
    defaultValues: {
      cerdazaAmount: 10000,
      biotechSubstanceAmount: 1,
      biotechSubstanceValue: 20,
      foliarFertilizerValue: 5,
      radicularFertilizerValue: 3,
      systemsCount: 1
    }
  });
  
  const onSubmit: SubmitHandler<SimulationInputs> = (data) => {
    const simulationResults = calculateSimulationResults(data);
    setResults(simulationResults);
  };
  
  // Datos para el gráfico de distribución de fertilizantes
  const fertilizerDistributionData = {
    labels: ['Fertilizante Foliar', 'Fertilizante Radicular'],
    datasets: [
      {
        label: 'Distribución de Fertilizantes',
        data: results ? [results.foliarFertilizerAmount, results.radicularFertilizerAmount] : [30, 70],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Datos para el gráfico de valor de fertilizantes
  const fertilizerValueData = {
    labels: ['Fertilizante Foliar', 'Fertilizante Radicular'],
    datasets: [
      {
        label: 'Valor de Fertilizantes (USD)',
        data: results ? [results.foliarFertilizerTotalValue, results.radicularFertilizerTotalValue] : [0, 0],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Opciones para el gráfico de barras
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Valor de Fertilizantes Producidos',
      },
    },
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Simulación del Proceso de Tratamiento de Cerdaza</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario de entrada */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Parámetros de Entrada</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cantidad de Cerdaza (litros)
              </label>
              <input
                type="number"
                {...register('cerdazaAmount', { required: true, min: 1 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.cerdazaAmount && <span className="text-red-500 text-sm">Este campo es requerido y debe ser mayor a 0</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cantidad de Sustancia Biotecnológica
              </label>
              <input
                type="number"
                step="0.1"
                {...register('biotechSubstanceAmount', { required: true, min: 0.1 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.biotechSubstanceAmount && <span className="text-red-500 text-sm">Este campo es requerido y debe ser mayor a 0</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor de Sustancia Biotecnológica (USD por unidad)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('biotechSubstanceValue', { required: true, min: 0.01 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.biotechSubstanceValue && <span className="text-red-500 text-sm">Este campo es requerido y debe ser mayor a 0</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor de Mercado del Fertilizante Foliar (USD por unidad)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('foliarFertilizerValue', { required: true, min: 0.01 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.foliarFertilizerValue && <span className="text-red-500 text-sm">Este campo es requerido y debe ser mayor a 0</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor de Mercado del Fertilizante Radicular (USD por unidad)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('radicularFertilizerValue', { required: true, min: 0.01 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.radicularFertilizerValue && <span className="text-red-500 text-sm">Este campo es requerido y debe ser mayor a 0</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número de Sistemas Completos
              </label>
              <input
                type="number"
                {...register('systemsCount', { required: true, min: 1 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.systemsCount && <span className="text-red-500 text-sm">Este campo es requerido y debe ser mayor a 0</span>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calcular Resultados
            </button>
          </form>
        </div>
        
        {/* Resultados de la simulación */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resultados de la Simulación</h2>
          
          {results ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-700">Fertilizante Foliar</h3>
                  <p className="text-2xl font-bold">{formatQuantity(results.foliarFertilizerAmount)} L</p>
                  <p className="text-sm text-gray-500">Valor: {formatCurrency(results.foliarFertilizerTotalValue)}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-700">Fertilizante Radicular</h3>
                  <p className="text-2xl font-bold">{formatQuantity(results.radicularFertilizerAmount)} L</p>
                  <p className="text-sm text-gray-500">Valor: {formatCurrency(results.radicularFertilizerTotalValue)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-700">Tiempo del Ciclo</h3>
                  <p className="text-2xl font-bold">{formatTime(results.totalCycleTime)}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-700">Ganancia Total</h3>
                  <p className={`text-2xl font-bold ${results.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.totalProfit)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Distribución de Fertilizantes</h3>
                  <Pie data={fertilizerDistributionData} />
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Valor de Fertilizantes</h3>
                  <Bar options={barOptions} data={fertilizerValueData} />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Ingrese los parámetros y haga clic en &quot;Calcular Resultados&quot; para ver la simulación.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Diagrama del proceso */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Diagrama del Proceso</h2>
        
        <div className="overflow-x-auto">
          <div className="flex flex-col items-center space-y-4 min-w-[800px]">
            {/* Fase 1: Carga */}
            <div className="bg-blue-100 p-4 rounded-lg w-64 text-center">
              <h3 className="font-bold">FASE 1: CARGA</h3>
              <p>Cerdaza + Sustancia Biotecnológica</p>
            </div>
            
            <div className="h-8 w-0.5 bg-gray-400"></div>
            
            {/* Fase 2: Tratamiento Térmico */}
            <div className="bg-red-100 p-4 rounded-lg w-64 text-center">
              <h3 className="font-bold">FASE 2: TRATAMIENTO TÉRMICO</h3>
              <p>Ciclo 1: 15 min (Activación)</p>
              <p>Ciclo 2: 15 min (Estabilización)</p>
              <p>Ciclo 3: 45 min (Reacciones)</p>
              <p>Ajuste de pH</p>
            </div>
            
            <div className="h-8 w-0.5 bg-gray-400"></div>
            
            {/* Fase 3: Separación */}
            <div className="bg-green-100 p-4 rounded-lg w-64 text-center">
              <h3 className="font-bold">FASE 3: SEPARACIÓN</h3>
              <p>Filtración y Separación Sólidos-Líquidos</p>
            </div>
            
            <div className="flex items-center justify-center w-full">
              <div className="flex-1 h-0.5 bg-gray-400"></div>
              <div className="mx-4 text-gray-500">Separación</div>
              <div className="flex-1 h-0.5 bg-gray-400"></div>
            </div>
            
            <div className="flex justify-between w-full">
              {/* Fase 4: Procesamiento de Sólidos */}
              <div className="bg-yellow-100 p-4 rounded-lg w-64 text-center">
                <h3 className="font-bold">FASE 4: PROCESAMIENTO DE SÓLIDOS</h3>
                <p>Túnel Ventilado (Secado)</p>
                <p>Tanque 6,000L</p>
              </div>
              
              {/* Fase 5: Procesamiento de Líquidos */}
              <div className="bg-purple-100 p-4 rounded-lg w-64 text-center">
                <h3 className="font-bold">FASE 5: PROCESAMIENTO DE LÍQUIDOS</h3>
                <p>Tanque Móvil 2,000L</p>
                <p>Tanque Cónico 4,000L</p>
              </div>
            </div>
            
            <div className="flex justify-between w-full">
              <div className="h-8 w-0.5 bg-gray-400 mx-auto"></div>
              <div className="h-8 w-0.5 bg-gray-400 mx-auto"></div>
            </div>
            
            {/* Fase 6: Producto Final */}
            <div className="bg-green-200 p-4 rounded-lg w-full max-w-lg text-center">
              <h3 className="font-bold">FASE 6: PRODUCTO FINAL</h3>
              <div className="flex justify-around mt-2">
                <div>
                  <p className="font-semibold">Fertilizantes Foliares</p>
                  {results && <p>{formatQuantity(results.foliarFertilizerAmount)} L</p>}
                </div>
                <div>
                  <p className="font-semibold">Fertilizantes Radiculares</p>
                  {results && <p>{formatQuantity(results.radicularFertilizerAmount)} L</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2025 BIOGINTEC - Simulación del Proceso de Tratamiento de Cerdaza</p>
      </footer>
    </div>
  );
}
