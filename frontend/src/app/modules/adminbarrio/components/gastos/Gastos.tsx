import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { KTSVG } from '../../../../../_metronic/helpers'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { getUserFromLocalStorage } from '../../services/authServices'
import { Barrio, fetchBarrios } from '../../services/barrioService'
import { createGasto, deleteGasto, exportGastos, fetchGastosByBarrio, fetchSubcategorias, Gasto, importGastos, updateGasto } from '../../services/gastosService'
import { fetchProveedores, Proveedor } from '../../services/proveedorService'

const MySwal = withReactContent(Swal)

const initialGastoState: Gasto = {
  id: 0,
  subcategoria_gasto_id: 0,
  barrio_id: 0,
  proveedor_id: 0,
  descripcion: '',
  monto: 0,
  fecha: '',
  nro_factura: '',
  created_at: '',
  updated_at: '',
  subcategoria: null,
  categoria: null,
  categoriaYSubcategoria: null,
  barrio: null,
  proveedor: ''
}

const Gastos = () => {
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [subcategorias, setSubcategorias] = useState<any[]>([])
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [barrios, setBarrios] = useState<Barrio[]>([])
  const [editingGasto, setEditingGasto] = useState<Gasto | null>(null)
  const [newGasto, setNewGasto] = useState<Gasto>(initialGastoState)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getUserFromLocalStorage();
        if (user) {
          const [gastosData, subcategoriasData, proveedoresData, barriosData] = await Promise.all([
            fetchGastosByBarrio(user.id),
            fetchSubcategorias(),
            fetchProveedores(),
            fetchBarrios(user.id)
          ])
          setGastos(gastosData)
          setSubcategorias(subcategoriasData)
          setProveedores(proveedoresData)
          setBarrios(barriosData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewGasto({ ...newGasto, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = getUserFromLocalStorage();
      if (user) {
        newGasto.barrio_id = user.id
      }
      if (editingGasto) {
        await updateGasto(editingGasto.id!, newGasto)
      } else {
        await createGasto(newGasto)
      }
      const data = await fetchGastosByBarrio(barrio.id)
      setGastos(data)
      setNewGasto(initialGastoState)
      setEditingGasto(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving gasto:', error)
    }
  }

  const handleEdit = (gasto: Gasto) => {
    setEditingGasto(gasto)
    setNewGasto(gasto)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingGasto(null)
    setNewGasto(initialGastoState)
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGasto(id)
          const user = getUserFromLocalStorage()
          if (user) {
            const data = await fetchGastosByBarrio(user.id)
            setGastos(data)
          }
          MySwal.fire('Borrado', 'El gasto ha sido borrado', 'success')
        } catch (error) {
          console.error('Error deleting gasto:', error)
          MySwal.fire('Error', 'Hubo un error al borrar el gasto', 'error')
        }
      }
    })
  }

  const handleExport = async () => {
    try {
      await exportGastos()
      MySwal.fire('Exportado', 'Los gastos han sido exportados correctamente', 'success')
    } catch (error) {
      console.error('Error exporting gastos:', error)
      MySwal.fire('Error', 'Hubo un error al exportar los gastos', 'error')
    }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        await importGastos(file)
        const user = getUserFromLocalStorage()
        if (user) {
          const data = await fetchGastosByBarrio(user.id)
          setGastos(data)
        }
        MySwal.fire('Importado', 'Los gastos han sido importados correctamente', 'success')
      } catch (error) {
        console.error('Error importing gastos:', error)
        MySwal.fire('Error', 'Hubo un error al importar los gastos', 'error')
      }
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Gastos</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-1' />
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar gastos'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Gasto
            </button>
            <button className='btn btn-secondary ms-2' onClick={handleExport}>
              <i className='bi bi-file-earmark-excel'></i> Exportar
            </button>
            <label className='btn btn-secondary ms-2'>
              <i className='bi bi-file-earmark-excel'></i> Importar
              <input type='file' accept='.xlsx' onChange={handleImport} hidden />
            </label>
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Subcategoría</th>
                  <th className='min-w-140px'>Descripción</th>
                  <th className='min-w-140px'>Monto</th>
                  <th className='min-w-120px'>Fecha</th>
                  <th className='min-w-150px'>Proveedor</th>
                  <th className='min-w-140px'>Nro Factura</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {gastos.map((gasto) => (
                  <tr key={gasto.id}>
                    <td>{gasto.categoriaYSubcategoria}</td>
                    <td>{gasto.descripcion}</td>
                    <td>${Number(gasto.monto).toFixed(2)}</td>
                    <td>{gasto.fecha}</td>
                    <td>{gasto.proveedor}</td>
                    <td>{gasto.nro_factura}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(gasto)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => handleDelete(gasto.id!)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <i className='bi bi-trash-fill text-danger'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingGasto ? 'Editar Gasto' : 'Agregar Gasto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Barrio</label>
              <select
                name='barrio_id'
                value={newGasto.barrio_id}
                onChange={handleInputChange}
                className='form-control'
                required
              >
                <option value=''>Seleccione un barrio</option>
                {barrios.map((barrio) => (
                  <option key={barrio.id} value={barrio.id}>
                    {barrio.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Subcategoría</label>
              <select
                name='subcategoria_gasto_id'
                value={newGasto.subcategoria_gasto_id}
                onChange={handleInputChange}
                className='form-control'
                required
              >
                <option value=''>Seleccione una subcategoría</option>
                {subcategorias.map((subcategoria) => (
                  <option key={subcategoria.id} value={subcategoria.id}>
                    {subcategoria.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Descripción</label>
              <input
                type='text'
                name='descripcion'
                value={newGasto.descripcion}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Monto</label>
              <input
                type='number'
                name='monto'
                value={newGasto.monto}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Fecha</label>
              <input
                type='date'
                name='fecha'
                value={newGasto.fecha}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Proveedor</label>
              <select
                name='proveedor_id'
                value={newGasto.proveedor_id}
                onChange={handleInputChange}
                className='form-control'
              >
                <option value=''>Seleccione un proveedor</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.id} value={proveedor.id}>
                    {proveedor.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Nro Factura</label>
              <input
                type='text'
                name='nro_factura'
                value={newGasto.nro_factura}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <div className='d-flex justify-content-end'>
              <button type='button' className='btn btn-secondary me-2' onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type='submit' className='btn btn-primary'>
                {editingGasto ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Gastos