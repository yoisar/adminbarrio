import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { KTSVG } from '../../../../../_metronic/helpers'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { Barrio, createBarrio, deleteBarrio, fetchBarrios, updateBarrio } from '../../services/barrioService'

const MySwal = withReactContent(Swal)

const Barrios = () => {
  const [barrios, setBarrios] = useState<Barrio[]>([])
  const [editingBarrio, setEditingBarrio] = useState<Barrio | null>(null)
  const [newBarrio, setNewBarrio] = useState<Barrio>({
    id: 0,
    nombre: '',
    direccion: '',
    descripcion: '',
    created_at: '',
    updated_at: '',
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getBarrios = async () => {
      try {
        const data = await fetchBarrios()
        setBarrios(data)
      } catch (error) {
        console.error('Error fetching barrios:', error)
      }
    }

    getBarrios()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewBarrio({ ...newBarrio, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingBarrio) {
        await updateBarrio(editingBarrio.id, newBarrio)
      } else {
        await createBarrio(newBarrio)
      }
      const data = await fetchBarrios()
      setBarrios(data)
      setNewBarrio({ id: 0, nombre: '', direccion: '', descripcion: '', created_at: '', updated_at: '' })
      setEditingBarrio(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving barrio:', error)
    }
  }

  const handleEdit = (barrio: Barrio) => {
    setEditingBarrio(barrio)
    setNewBarrio(barrio)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingBarrio(null)
    setNewBarrio({ id: 0, nombre: '', direccion: '', descripcion: '', created_at: '', updated_at: '' })
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
          await deleteBarrio(id)
          const data = await fetchBarrios()
          setBarrios(data)
          MySwal.fire('Borrado', 'El barrio ha sido borrado', 'success')
        } catch (error) {
          console.error('Error deleting barrio:', error)
          MySwal.fire('Error', 'Hubo un error al borrar el barrio', 'error')
        }
      }
    })
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Barrios</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-1' />
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar barrios'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Barrio
            </button>
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Nombre</th>
                  <th className='min-w-140px'>Dirección</th>
                  <th className='min-w-140px'>Descripción</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {barrios.map((barrio) => (
                  <tr key={barrio.id}>
                    <td>{barrio.nombre}</td>
                    <td>{barrio.direccion}</td>
                    <td>{barrio.descripcion}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(barrio)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => handleDelete(barrio.id)}
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
          <Modal.Title>{editingBarrio ? 'Editar Barrio' : 'Agregar Barrio'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input
                type='text'
                name='nombre'
                value={newBarrio.nombre}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Dirección</label>
              <input
                type='text'
                name='direccion'
                value={newBarrio.direccion}
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
                value={newBarrio.descripcion}
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
                Guardar
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Barrios