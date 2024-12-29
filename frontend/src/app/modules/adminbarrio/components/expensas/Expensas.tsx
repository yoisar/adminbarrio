import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { KTSVG } from '../../../../../_metronic/helpers'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { createExpensa, deleteExpensa, Expensa, fetchExpensas, updateExpensa } from '../../services/expensasService'

const MySwal = withReactContent(Swal)

const Expensas = () => {
  const [expensas, setExpensas] = useState<Expensa[]>([])
  const [editingExpensa, setEditingExpensa] = useState<Expensa | null>(null)
  const [newExpensa, setNewExpensa] = useState<Expensa>({
    fecha_vencimiento: '',
    total: 0,
    saldo_anterior: 0,
    monto_pagado: 0,
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getExpensas = async () => {
      try {
        const data = await fetchExpensas()
        setExpensas(data)
      } catch (error) {
        console.error('Error fetching expensas:', error)
      }
    }

    getExpensas()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewExpensa({ ...newExpensa, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingExpensa) {
        await updateExpensa(editingExpensa.id!, newExpensa)
      } else {
        await createExpensa(newExpensa)
      }
      const data = await fetchExpensas()
      setExpensas(data)
      setNewExpensa({ fecha_vencimiento: '', total: 0, saldo_anterior: 0, monto_pagado: 0 })
      setEditingExpensa(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving expensa:', error)
    }
  }

  const handleEdit = (expensa: Expensa) => {
    setEditingExpensa(expensa)
    setNewExpensa(expensa)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingExpensa(null)
    setNewExpensa({ fecha_vencimiento: '', total: 0, saldo_anterior: 0, monto_pagado: 0 })
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
          await deleteExpensa(id)
          const data = await fetchExpensas()
          setExpensas(data)
          MySwal.fire('Borrado', 'La expensa ha sido borrada', 'success')
        } catch (error) {
          console.error('Error deleting expensa:', error)
          MySwal.fire('Error', 'Hubo un error al borrar la expensa', 'error')
        }
      }
    })
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Expensas</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-1' />
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar expensas'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Expensa
            </button>
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Fecha de Vencimiento</th>
                  <th className='min-w-140px'>Total</th>
                  <th className='min-w-120px'>Saldo Anterior</th>
                  <th className='min-w-120px'>Monto Pagado</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {expensas.map((expensa) => (
                  <tr key={expensa.id}>
                    <td>{expensa.fecha_vencimiento}</td>
                    <td>${Number(expensa.total).toFixed(2)}</td>
                    <td>${Number(expensa.saldo_anterior).toFixed(2)}</td>
                    <td>${Number(expensa.monto_pagado).toFixed(2)}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(expensa)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => handleDelete(expensa.id!)}
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
          <Modal.Title>{editingExpensa ? 'Editar Expensa' : 'Agregar Expensa'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Fecha de Vencimiento</label>
              <input
                type='date'
                name='fecha_vencimiento'
                value={newExpensa.fecha_vencimiento}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Total</label>
              <input
                type='number'
                name='total'
                value={newExpensa.total}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Saldo Anterior</label>
              <input
                type='number'
                name='saldo_anterior'
                value={newExpensa.saldo_anterior}
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
                value={newExpensa.monto_pagado}
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
                {editingExpensa ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Expensas