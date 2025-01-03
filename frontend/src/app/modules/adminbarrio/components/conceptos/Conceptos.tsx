import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { KTSVG } from '../../../../../_metronic/helpers'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { Concepto, createConcepto, deleteConcepto, fetchConceptos, updateConcepto } from '../../services/conceptosService'

const MySwal = withReactContent(Swal)

const Conceptos = () => {
  const [conceptos, setConceptos] = useState<Concepto[]>([])
  const [editingConcepto, setEditingConcepto] = useState<Concepto | null>(null)
  const [newConcepto, setNewConcepto] = useState<Concepto>({
    sueldo_id: 0,
    carga_social_id: 0 as number | null,
    nombre: '',
    monto: 0,
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getConceptos = async () => {
      try {
        const data = await fetchConceptos()
        setConceptos(data)
      } catch (error) {
        console.error('Error fetching conceptos:', error)
      }
    }

    getConceptos()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewConcepto({ ...newConcepto, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingConcepto) {
        await updateConcepto(editingConcepto.id!, newConcepto)
      } else {
        await createConcepto(newConcepto)
      }
      const data = await fetchConceptos()
      setConceptos(data)
      setNewConcepto({ sueldo_id: 0, carga_social_id: 0, nombre: '', monto: 0 })
      setEditingConcepto(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving concepto:', error)
    }
  }

  const handleEdit = (concepto: Concepto) => {
    setEditingConcepto(concepto)
    setNewConcepto(concepto)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingConcepto(null)
    setNewConcepto({ sueldo_id: 0, carga_social_id: 0, nombre: '', monto: 0 })
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
          await deleteConcepto(id)
          const data = await fetchConceptos()
          setConceptos(data)
          MySwal.fire('Borrado', 'El concepto ha sido borrado', 'success')
        } catch (error) {
          console.error('Error deleting concepto:', error)
          MySwal.fire('Error', 'Hubo un error al borrar el concepto', 'error')
        }
      }
    })
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Conceptos</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-1' />
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar conceptos'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Concepto
            </button>
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Nombre</th>
                  <th className='min-w-140px'>Monto</th>
                  <th className='min-w-120px'>Sueldo ID</th>
                  <th className='min-w-120px'>Carga Social ID</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {conceptos.map((concepto) => (
                  <tr key={concepto.id}>
                    <td>{concepto.nombre}</td>
                    <td>${Number(concepto.monto).toFixed(2)}</td>
                    <td>{concepto.sueldo_id}</td>
                    <td>{concepto.carga_social_id}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(concepto)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => handleDelete(concepto.id!)}
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
          <Modal.Title>{editingConcepto ? 'Editar Concepto' : 'Agregar Concepto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input
                type='text'
                name='nombre'
                value={newConcepto.nombre}
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
                value={newConcepto.monto}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Sueldo ID</label>
              <input
                type='number'
                name='sueldo_id'
                value={newConcepto.sueldo_id}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Carga Social ID</label>
              <input
                type='number'
                name='carga_social_id'
                value={newConcepto.carga_social_id ?? ''}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <div className='d-flex justify-content-end'>
              <button type='button' className='btn btn-secondary me-2' onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type='submit' className='btn btn-primary'>
                {editingConcepto ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Conceptos