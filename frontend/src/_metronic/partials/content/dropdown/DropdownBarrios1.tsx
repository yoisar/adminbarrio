import { useEffect, useState } from 'react'
import { Barrio, fetchBarrios } from '../../../../app/modules/adminbarrio/services/barrioService'


export function DropdownBarrios1() {
  const [barrios, setBarrios] = useState<Barrio[]>([])
  const [selectedBarrio, setSelectedBarrio] = useState<string>('')
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const barriosData = await fetchBarrios()
      setBarrios(barriosData)
    }

    fetchData()
  }, [])

  const handleApply = () => {
    const filters = {
      barrio: selectedBarrio,
      month: selectedMonth,
      year: selectedYear,
    }
    localStorage.setItem('filters', JSON.stringify(filters))
    // Aquí puedes agregar la lógica para aplicar los filtros en tu aplicación
  }

  const handleReset = () => {
    setSelectedBarrio('')
    setSelectedMonth('')
    setSelectedYear('')
    localStorage.removeItem('filters')
    // Aquí puedes agregar la lógica para resetear los filtros en tu aplicación
  }

  return (
    <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
      <div className='px-7 py-5'>
        <div className='fs-5 text-gray-900 fw-bolder'>Opciones de Filtro</div>
      </div>

      <div className='separator border-gray-200'></div>

      <div className='px-7 py-5'>
        <div className='mb-10'>
          <label className='form-label fw-bold'>Barrio:</label>
          <div>
            <select
              className='form-select form-select-solid'
              value={selectedBarrio}
              onChange={(e) => setSelectedBarrio(e.target.value)}
            >
              <option value=''>Seleccione un barrio</option>
              {barrios.map((barrio) => (
                <option key={barrio.id} value={barrio.id}>
                  {barrio.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='mb-10'>
          <label className='form-label fw-bold'>Mes:</label>
          <div>
            <select
              className='form-select form-select-solid'
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value=''>Seleccione un mes</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='mb-10'>
          <label className='form-label fw-bold'>Año:</label>
          <div>
            <select
              className='form-select form-select-solid'
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value=''>Seleccione un año</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='d-flex justify-content-end'>
          <button
            type='reset'
            className='btn btn-sm btn-light btn-active-light-primary me-2'
            onClick={handleReset}
          >
            Reset
          </button>

          <button type='button' className='btn btn-sm btn-primary' onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}