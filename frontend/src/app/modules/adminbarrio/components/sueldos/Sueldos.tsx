import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { KTSVG } from '../../../../../_metronic/helpers'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { createSueldo, deleteSueldo, Sueldo, fetchSueldos, updateSueldo } from '../../services/sueldosService'

const MySwal = withReactContent(Swal)

const Sueldos = () => {
  const [sueldos, setSueldos] = useState<Sueldo[]>([])
  const [editingSueldo, setEditingSueldo] = useState<Sueldo | null>(null)
  const [newSueldo, setNewSueldo] = useState<Sueldo>({
    id: 0,
    user_id: 0,
    monto: '',
    fecha: '',
    created_at: '',
    updated_at: '',
    user: { id: 0, name: '', email: '', email_verified_at: null, created_at: '', updated_at: '', role: '', avatar: null }
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getSueldos = async () => {
      try {
        const data = await fetchSueldos()
        setSueldos(data)
      } catch (error) {
        console.error('Error fetching sueldos:', error)
      }
    }

    getSueldos()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewSueldo({ ...newSueldo, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingSueldo) {
        await updateSueldo(editingSueldo.id, newSueldo)
      } else {
        await createSueldo(newSueldo)
      }
      const data = await fetchSueldos()
      setSueldos(data)
      setNewSueldo({ id: 0, user_id: 0, monto: '', fecha: '', created_at: '', updated_at: '', user: { id: 0, name: '', email: '', email_verified_at: null, created_at: '', updated_at: '', role: '', avatar: null } })
      setEditingSueldo(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving sueldo:', error)
    }
  }

  const handleEdit = (sueldo: Sueldo) => {
    setEditingSueldo(sueldo)
    setNewSueldo(sueldo)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingSueldo(null)
    setNewSueldo({ id: 0, user_id: 0, monto: '', fecha: '', created_at: '', updated_at: '', user: { id: 0, name: '', email: '', email_verified_at: null, created_at: '', updated_at: '', role: '', avatar: null } })
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
          await deleteSueldo(id)
          const data = await fetchSueldos()
          setSueldos(data)
          MySwal.fire('Borrado', 'El sueldo ha sido borrado', 'success')
        } catch (error) {
          console.error('Error deleting sueldo:', error)
          MySwal.fire('Error', 'Hubo un error al borrar el sueldo', 'error')
        }
      }
    })
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Sueldos</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-1' />
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar sueldos'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Sueldo
            </button>
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Usuario</th>
                  <th className='min-w-140px'>Monto</th>
                  <th className='min-w-120px'>Fecha</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sueldos.map((sueldo) => (
                  <tr key={sueldo.id}>
                    <td>{sueldo.user.name}</td>
                    <td>${Number(sueldo.monto).toFixed(2)}</td>
                    <td>{sueldo.fecha}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(sueldo)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => handleDelete(sueldo.id)}
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
          <Modal.Title>{editingSueldo ? 'Editar Sueldo' : 'Agregar Sueldo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Usuario</label>
              <input
                type='number'
                name='user_id'
                value={newSueldo.user_id}
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
                value={newSueldo.monto}
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
                value={newSueldo.fecha}
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
                {editingSueldo ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Sueldos