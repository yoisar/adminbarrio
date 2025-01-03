import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { KTSVG } from '../../../../../_metronic/helpers'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { CargaSocial, createCargaSocial, deleteCargaSocial, fetchCargasSociales, updateCargaSocial } from '../../services/cargasSocialesService'

const MySwal = withReactContent(Swal)

const CargasSociales = () => {
  const [cargasSociales, setCargasSociales] = useState<CargaSocial[]>([])
  const [editingCargaSocial, setEditingCargaSocial] = useState<CargaSocial | null>(null)
  const [newCargaSocial, setNewCargaSocial] = useState<CargaSocial>({
    id: 0,
    sueldo_id: 0,
    monto: 0,
    descripcion: '',    
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getCargasSociales = async () => {
      try {
        const data = await fetchCargasSociales()
        setCargasSociales(data)
      } catch (error) {
        console.error('Error fetching cargas sociales:', error)
      }
    }

    getCargasSociales()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCargaSocial({ ...newCargaSocial, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCargaSocial) {
        await updateCargaSocial(editingCargaSocial.id!, newCargaSocial)
      } else {
        await createCargaSocial(newCargaSocial)
        setNewCargaSocial({ id: undefined, sueldo_id: 0, monto: 0, descripcion: '', created_at: undefined, updated_at: undefined })
        const data = await fetchCargasSociales()
        setCargasSociales(data)
        setNewCargaSocial({ sueldo_id: 0, monto: 0, descripcion: '' })
        setEditingCargaSocial(null)
        setShowModal(false)
      }
    } catch (error) {
      console.error('Error saving carga social:', error)
    }
  }

  const handleEdit = (cargaSocial: CargaSocial) => {
    setEditingCargaSocial(cargaSocial)
    setNewCargaSocial(cargaSocial)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingCargaSocial(null)
    setNewCargaSocial({ sueldo_id: 0, monto: 0, descripcion: '' })
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
          await deleteCargaSocial(id)
          const data = await fetchCargasSociales()
          setCargasSociales(data)
          MySwal.fire('Borrado', 'La carga social ha sido borrada', 'success')
        } catch (error) {
          console.error('Error deleting carga social:', error)
          MySwal.fire('Error', 'Hubo un error al borrar la carga social', 'error')
        }
      }
    })
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Cargas Sociales</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-1' />
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar cargas sociales'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Carga Social
            </button>
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Sueldo ID</th>
                  <th className='min-w-140px'>Monto</th>
                  <th className='min-w-120px'>Descripción</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cargasSociales.map((cargaSocial) => (
                  <tr key={cargaSocial.id}>
                    <td>{cargaSocial.sueldo_id}</td>
                    <td>${Number(cargaSocial.monto).toFixed(2)}</td>
                    <td>{cargaSocial.descripcion}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(cargaSocial)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => handleDelete(cargaSocial.id!)}
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
          <Modal.Title>{editingCargaSocial ? 'Editar Carga Social' : 'Agregar Carga Social'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Sueldo ID</label>
              <input
                type='number'
                name='sueldo_id'
                value={newCargaSocial.sueldo_id}
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
                value={newCargaSocial.monto}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Descripción</label>
              <input
                type='text'
                name='descripcion'
                value={newCargaSocial.descripcion}
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
                {editingCargaSocial ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CargasSociales