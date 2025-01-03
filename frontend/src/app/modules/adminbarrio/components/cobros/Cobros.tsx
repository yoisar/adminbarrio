import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { KTSVG } from '../../../../../_metronic/helpers'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { Cobro, createCobro, deleteCobro, fetchCobros, fetchMorosos, updateCobro } from '../../services/cobrosService'
import { User } from '../../services/userService'

const MySwal = withReactContent(Swal)

const Cobros = () => {
  const [cobros, setCobros] = useState<Cobro[]>([])
  const [morosos, setMorosos] = useState<User[]>([])
  const [editingCobro, setEditingCobro] = useState<Cobro | null>(null)
  const [newCobro, setNewCobro] = useState<Cobro>({
    id: 0,
    user_id: 0,
    expensa_id: 0,
    monto_pagado: '',
    fecha_pago: '',
    created_at: '',
    updated_at: '',
    user: { id: 0, name: '', email: '', email_verified_at: null, created_at: '', updated_at: '', role: '', avatar: null },
    expensa: { id: 0, fecha_vencimiento: '', total: 0, saldo_anterior: 0, monto_pagado: 0, created_at: '', updated_at: '' }
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getCobros = async () => {
      try {
        const data = await fetchCobros()
        setCobros(data)
      } catch (error) {
        console.error('Error fetching cobros:', error)
      }
    }

    const getMorosos = async () => {
      try {
        const data = await fetchMorosos()
        setMorosos(data)
      } catch (error) {
        console.error('Error fetching morosos:', error)
      }
    }

    getCobros()
    getMorosos()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCobro({ ...newCobro, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCobro) {
        await updateCobro(editingCobro.id, newCobro)
      } else {
        await createCobro(newCobro)
      }
      const data = await fetchCobros()
      setCobros(data)
      setNewCobro({ id: 0, user_id: 0, expensa_id: 0, monto_pagado: '', fecha_pago: '', created_at: '', updated_at: '', user: { id: 0, name: '', email: '', email_verified_at: null, created_at: '', updated_at: '', role: '', avatar: null }, expensa: { id: 0, fecha_vencimiento: '', total: 0, saldo_anterior: 0, monto_pagado: 0, created_at: '', updated_at: '' } })
      setEditingCobro(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving cobro:', error)
    }
  }

  const handleEdit = (cobro: Cobro) => {
    setEditingCobro(cobro)
    setNewCobro(cobro)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingCobro(null)
    setNewCobro({ id: 0, user_id: 0, expensa_id: 0, monto_pagado: '', fecha_pago: '', created_at: '', updated_at: '', user: { id: 0, name: '', email: '', email_verified_at: null, created_at: '', updated_at: '', role: '', avatar: null }, expensa: { id: 0, fecha_vencimiento: '', total: 0, saldo_anterior: 0, monto_pagado: 0, created_at: '', updated_at: '' } })
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
          await deleteCobro(id)
          const data = await fetchCobros()
          setCobros(data)
          MySwal.fire('Borrado', 'El cobro ha sido borrado', 'success')
        } catch (error) {
          console.error('Error deleting cobro:', error)
          MySwal.fire('Error', 'Hubo un error al borrar el cobro', 'error')
        }
      }
    })
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Cobros</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-1' />
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar cobros'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Cobro
            </button>
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Usuario</th>
                  <th className='min-w-140px'>Expensa</th>
                  <th className='min-w-140px'>Monto Pagado</th>
                  <th className='min-w-120px'>Fecha de Pago</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cobros.map((cobro) => (
                  <tr key={cobro.id}>
                    <td>{cobro.user.name}</td>
                    <td>{cobro.expensa.fecha_vencimiento}</td>
                    <td>${Number(cobro.monto_pagado).toFixed(2)}</td>
                    <td>{cobro.fecha_pago}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(cobro)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => handleDelete(cobro.id)}
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
          <Modal.Title>{editingCobro ? 'Editar Cobro' : 'Agregar Cobro'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Usuario</label>
              <input
                type='number'
                name='user_id'
                value={newCobro.user_id}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Expensa</label>
              <input
                type='number'
                name='expensa_id'
                value={newCobro.expensa_id}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Monto Pagado</label>
              <input
                type='number'
                name='monto_pagado'
                value={newCobro.monto_pagado}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Fecha de Pago</label>
              <input
                type='date'
                name='fecha_pago'
                value={newCobro.fecha_pago}
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
                {editingCobro ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Cobros