import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { KTSVG } from '../../../../../_metronic/helpers'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { Gasto, createGasto, deleteGasto, fetchGastos, updateGasto, fetchCategorias } from '../../services/gastosService'

const MySwal = withReactContent(Swal)

const Gastos = () => {
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [categorias, setCategorias] = useState<any[]>([])
  const [editingGasto, setEditingGasto] = useState<Gasto | null>(null)
  const [newGasto, setNewGasto] = useState<Gasto>({
    id: 0,
    categoria_gasto_id: 0,
    descripcion: '',
    monto: '',
    fecha: '',
    created_at: '',
    updated_at: '',
    categoria: null
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getGastos = async () => {
      try {
        const data = await fetchGastos()
        setGastos(data)
      } catch (error) {
        console.error('Error fetching gastos:', error)
      }
    }

    const getCategorias = async () => {
      try {
        const data = await fetchCategorias()
        setCategorias(data)
      } catch (error) {
        console.error('Error fetching categorias:', error)
      }
    }

    getGastos()
    getCategorias()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewGasto({ ...newGasto, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingGasto) {
        await updateGasto(editingGasto.id!, newGasto)
      } else {
        await createGasto(newGasto)
      }
      const data = await fetchGastos()
      setGastos(data)
      setNewGasto({ id: 0, categoria_gasto_id: 0, descripcion: '', monto: '', fecha: '', created_at: '', updated_at: '', categoria: null })
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
    setNewGasto({ id: 0, categoria_gasto_id: 0, descripcion: '', monto: '', fecha: '', created_at: '', updated_at: '', categoria: null })
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
          const data = await fetchGastos()
          setGastos(data)
          MySwal.fire('Borrado', 'El gasto ha sido borrado', 'success')
        } catch (error) {
          console.error('Error deleting gasto:', error)
          MySwal.fire('Error', 'Hubo un error al borrar el gasto', 'error')
        }
      }
    })
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
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Categoría</th>
                  <th className='min-w-140px'>Descripción</th>
                  <th className='min-w-140px'>Monto</th>
                  <th className='min-w-120px'>Fecha</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {gastos.map((gasto) => (
                  <tr key={gasto.id}>
                    <td>{gasto.categoria?.nombre}</td>
                    <td>{gasto.descripcion}</td>
                    <td>${Number(gasto.monto).toFixed(2)}</td>
                    <td>{gasto.fecha}</td>
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
              <label className='form-label'>Categoría</label>
              <select
                name='categoria_gasto_id'
                value={newGasto.categoria_gasto_id}
                onChange={handleInputChange}
                className='form-control'
                required
              >
                <option value=''>Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
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