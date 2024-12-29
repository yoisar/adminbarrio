import { FC, useEffect, useState } from 'react'
import { fetchTotalCobros, fetchTotalExpensas } from '../../services/expensasService'

type Props = {
  className: string
  description: string
  color: string
  img: string
}

const PaymentsWidget: FC<Props> = ({ className, description, color, img }) => {
  const [totalCobros, setTotalCobros] = useState<number>(0)
  const [totalExpensas, setTotalExpensas] = useState<number>(0)
  const [cobrosRealizados, setCobrosRealizados] = useState<number>(0)
  const [porcentajeCobros, setPorcentajeCobros] = useState<number>(0)

  useEffect(() => {
    const getData = async () => {
      try {
        const totalCobrosData = await fetchTotalCobros()
        setTotalCobros(totalCobrosData)

        const totalExpensasData = await fetchTotalExpensas()
        setTotalExpensas(totalExpensasData)

        const cobrosRealizadosData = await fetchTotalCobros()
        setCobrosRealizados(cobrosRealizadosData)

        const porcentajeCobrosData = (totalCobrosData / totalExpensasData) * 100
        setPorcentajeCobros(porcentajeCobrosData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getData()
  }, [])

  return (
    <div
      className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end ${className}`}
      style={{
        backgroundColor: color,
        backgroundImage: `url('${img}')`,
      }}
    >
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <span className='fs-2hx fw-bold text-white me-2 lh-1 ls-n2'>
            ${isNaN(totalCobros) ? '0.00' : totalCobros.toFixed(2)}
          </span>
          <span className='text-white opacity-75 pt-1 fw-semibold fs-6'>{description}</span>
        </div>
      </div>
      <div className='card-body d-flex align-items-end pt-0'>
        <div className='d-flex align-items-center flex-column mt-3 w-100'>
          <div className='d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2'>
            <span>{cobrosRealizados} Pagos Realizados</span>
            <span>{isNaN(porcentajeCobros) ? '0' : porcentajeCobros.toFixed(2)}%</span>
          </div>

          <div className='h-8px mx-3 w-100 bg-white bg-opacity-50 rounded'>
            <div
              className='bg-white rounded h-8px'
              role='progressbar'
              style={{ width: `${isNaN(porcentajeCobros) ? 0 : porcentajeCobros}%` }}
              aria-valuenow={porcentajeCobros}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { PaymentsWidget }
