import { FC, useEffect, useRef, useState } from 'react'
import { getCSSVariableValue } from '../../../../../_metronic/assets/ts/_utils'
import { KTIcon } from '../../../../../_metronic/helpers'
import { useThemeMode } from '../../../../../_metronic/partials'
import { Cobro, fetchCobros } from '../../services/cobrosService'
import { Expensa, fetchExpensas } from '../../services/expensasService'
import { Gasto, fetchGastos } from '../../services/gastosService'
import { fetchMorosos } from '../../services/morososService'

type Props = {
  className: string
  chartSize?: number
  chartLine?: number
  chartRotate?: number
}

const DashboardWidget: FC<Props> = ({
  className,
  chartSize = 70,
  chartLine = 11,
  chartRotate = 145,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const { mode } = useThemeMode()
  const [expensas, setExpensas] = useState<Expensa[]>([])
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [cobros, setCobros] = useState<Cobro[]>([])
  const [morosos, setMorosos] = useState<number>(0)

  useEffect(() => {
    const getData = async () => {
      try {
        const expensasData = await fetchExpensas()
        setExpensas(expensasData)

        const gastosData = await fetchGastos()
        setGastos(gastosData)

        const cobrosData = await fetchCobros()
        setCobros(cobrosData)

        const morososData = await fetchMorosos()
        setMorosos(morososData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getData()
  }, [])

  useEffect(() => {
    refreshChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    setTimeout(() => {
      initChart(chartSize, chartLine, chartRotate)
    }, 10)
  }

  const totalExpensas = expensas.reduce((acc, expensa) => acc + expensa.total, 0)
  const totalGastos = gastos.reduce((acc, gasto) => acc + parseFloat(gasto.monto), 0)
  const totalCobros = cobros.reduce((acc, cobro) => acc + parseFloat(cobro.monto_pagado), 0)

  return (
    <div className={`card card-flush ${className}`}>
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <div className='d-flex align-items-center'>
            <span className='fs-4 fw-semibold text-gray-500 me-1 align-self-start'>$</span>
            <span className='fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2'>
              {isNaN(totalExpensas) ? '0.00' : totalExpensas.toFixed(2)}
            </span>
            <span className='badge badge-light-success fs-base'>
              <KTIcon iconName='arrow-up' className='fs-5 text-success ms-n1' /> 2.2%
            </span>
          </div>
          <span className='text-gray-500 pt-1 fw-semibold fs-6'>Total Expensas</span>
        </div>
      </div>

      <div className='card-body pt-2 pb-4 d-flex flex-wrap align-items-center'>
        <div className='d-flex flex-center me-5 pt-2'>
          <div
            id='kt_card_widget_17_chart'
            ref={chartRef}
            style={{ minWidth: chartSize + 'px', minHeight: chartSize + 'px' }}
            data-kt-size={chartSize}
            data-kt-line={chartLine}
          ></div>
        </div>

        <div className='d-flex flex-column content-justify-center flex-row-fluid'>
          <div className='d-flex fw-semibold align-items-center'>
            <div className='bullet w-8px h-3px rounded-2 bg-success me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Total Gastos</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>
              {isNaN(totalGastos) ? '0.00' : totalGastos.toFixed(2)}
            </div>
          </div>
          <div className='d-flex fw-semibold align-items-center my-3'>
            <div className='bullet w-8px h-3px rounded-2 bg-primary me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Total Cobros</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>
              {isNaN(totalCobros) ? '0.00' : totalCobros.toFixed(2)}
            </div>
          </div>
          <div className='d-flex fw-semibold align-items-center'>
            <div className='bullet w-8px h-3px rounded-2 me-3' style={{ backgroundColor: '#E4E6EF' }}></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Total Morosos</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>{morosos}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const initChart = function (
  chartSize: number = 70,
  chartLine: number = 11,
  chartRotate: number = 145
) {
  const el = document.getElementById('kt_card_widget_17_chart')
  if (!el) {
    return
  }
  el.innerHTML = ''

  const options = {
    size: chartSize,
    lineWidth: chartLine,
    rotate: chartRotate,
  }

  const canvas = document.createElement('canvas')
  const span = document.createElement('span')

  //@ts-ignore
  if (typeof G_vmlCanvasManager !== 'undefined') {
    //@ts-ignore
    G_vmlCanvasManager.initElement(canvas)
  }

  const ctx = canvas.getContext('2d')
  canvas.width = canvas.height = options.size

  el.appendChild(span)
  el.appendChild(canvas)

  ctx?.translate(options.size / 2, options.size / 2) // change center
  ctx?.rotate((-1 / 2 + options.rotate / 180) * Math.PI) // rotate -90 deg

  const radius = (options.size - options.lineWidth) / 2

  const drawCircle = function (color: string, lineWidth: number, percent: number) {
    percent = Math.min(Math.max(0, percent || 1), 1)
    if (!ctx) {
      return
    }

    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false)
    ctx.strokeStyle = color
    ctx.lineCap = 'round' // butt, round or square
    ctx.lineWidth = lineWidth
    ctx.stroke()
  }

  drawCircle('#E4E6EF', options.lineWidth, 100 / 100)
  drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, 100 / 150)
  drawCircle(getCSSVariableValue('--bs-success'), options.lineWidth, 100 / 250)
}

export { DashboardWidget }
