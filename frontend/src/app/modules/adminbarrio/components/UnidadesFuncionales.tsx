import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { PageTitle } from '../../../../_metronic/layout/core'
import { Barrio, createUnidadFuncional, deleteUnidadFuncional, fetchBarrios, fetchInquilinos, fetchPropietarios, fetchUnidadesFuncionales, UnidadFuncional, updateUnidadFuncional, User } from '../services/unidadFuncionalService'

const MySwal = withReactContent(Swal)

const UnidadesFuncionales = () => {
  const [unidadesFuncionales, setUnidadesFuncionales] = useState<UnidadFuncional[]>([])
  const [barrios, setBarrios] = useState<Barrio[]>([])
  const [propietarios, setPropietarios] = useState<User[]>([])
  const [inquilinos, setInquilinos] = useState<User[]>([])
  const [editingUnidadFuncional, setEditingUnidadFuncional] = useState<UnidadFuncional | null>(null)
  const [newUnidadFuncional, setNewUnidadFuncional] = useState<UnidadFuncional>({
    id: 0,
    nombre: '',
    barrio: '',
    propietario: '',
    inquilino: '',
    barrio_id: 0,
    propietario_id: 0,
    inquilino_id: null,
    numero: '',
    saldo_actual: 0,
    estado: '',
    created_at: '',
    updated_at: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    const getUnidadesFuncionales = async () => {
      try {
        const data = await fetchUnidadesFuncionales()
        setUnidadesFuncionales(data)
      } catch (error) {
        console.error('Error fetching unidades funcionales:', error)
      }
    }

    const getBarrios = async () => {
      try {
        const data = await fetchBarrios()
        setBarrios(data)
      } catch (error) {
        console.error('Error fetching barrios:', error)
      }
    }

    const getPropietarios = async () => {
      try {
        const data = await fetchPropietarios()
        setPropietarios(data)
      } catch (error) {
        console.error('Error fetching propietarios:', error)
      }
    }

    const getInquilinos = async () => {
      try {
        const data = await fetchInquilinos()
        setInquilinos(data)
      } catch (error) {
        console.error('Error fetching inquilinos:', error)
      }
    }

    getUnidadesFuncionales()
    getBarrios()
    getPropietarios()
    getInquilinos()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewUnidadFuncional({ ...newUnidadFuncional, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingUnidadFuncional) {
        if (editingUnidadFuncional && editingUnidadFuncional.id !== undefined) {
          await updateUnidadFuncional(editingUnidadFuncional.id, newUnidadFuncional)
        }
      } else {
        await createUnidadFuncional(newUnidadFuncional)
      }
      const data = await fetchUnidadesFuncionales()
      setUnidadesFuncionales(data)
      setNewUnidadFuncional({ id: 0, nombre: '', barrio: '', propietario: '', inquilino: '', barrio_id: 0, propietario_id: 0, inquilino_id: null, numero: '', saldo_actual: 0, estado: '', created_at: '', updated_at: '' })
      setEditingUnidadFuncional(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving unidad funcional:', error)
    }
  }

  const handleEdit = (unidadFuncional: UnidadFuncional) => {
    setEditingUnidadFuncional(unidadFuncional)
    setNewUnidadFuncional(unidadFuncional)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingUnidadFuncional(null)
    setNewUnidadFuncional({ id: 0, nombre: '', barrio: '', propietario: '', inquilino: '', barrio_id: 0, propietario_id: 0, inquilino_id: null, numero: '', saldo_actual: 0, estado: '', created_at: '', updated_at: '' })
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
          await deleteUnidadFuncional(id)
          const data = await fetchUnidadesFuncionales()
          setUnidadesFuncionales(data)
          MySwal.fire('Borrado', 'La unidad funcional ha sido borrada', 'success')
        } catch (error) {
          console.error('Error deleting unidad funcional:', error)
          MySwal.fire('Error', 'Hubo un error al borrar la unidad funcional', 'error')
        }
      }
    })
  }

  // Obtener unidades funcionales actuales
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUnidadesFuncionales = unidadesFuncionales.slice(indexOfFirstItem, indexOfLastItem)

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      <PageTitle breadcrumbs={[]}>Gestión de Unidades Funcionales</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar unidades funcionales'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Unidad Funcional
            </button>
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Número</th>
                  <th className='min-w-140px'>Barrio</th>
                  <th className='min-w-140px'>Propietario</th>
                  <th className='min-w-140px'>Inquilino</th>
                  <th className='min-w-120px'>Saldo Actual</th>
                  <th className='min-w-120px'>Estado</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentUnidadesFuncionales.map((unidadFuncional) => (
                  <tr key={unidadFuncional.id}>
                    <td>{unidadFuncional.numero}</td>
                    <td>{unidadFuncional.barrio}</td>
                    <td>{unidadFuncional.propietario}</td>
                    <td>{unidadFuncional.inquilino}</td>
                    <td>{unidadFuncional.saldo_actual}</td>
                    <td>{unidadFuncional.estado}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(unidadFuncional)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => unidadFuncional.id !== undefined && handleDelete(unidadFuncional.id)}
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
          <Pagination>
            {Array.from({ length: Math.ceil(unidadesFuncionales.length / itemsPerPage) }, (_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUnidadFuncional ? 'Editar Unidad Funcional' : 'Agregar Unidad Funcional'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Número</label>
              <input
                type='text'
                name='numero'
                value={newUnidadFuncional.numero}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Barrio</label>
              <select
                name='barrio_id'
                value={newUnidadFuncional.barrio_id}
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
              <label className='form-label'>Propietario</label>
              <select
                name='propietario_id'
                value={newUnidadFuncional.propietario_id}
                onChange={handleInputChange}
                className='form-control'
                required
              >
                <option value=''>Seleccione un propietario</option>
                {propietarios.map((propietario) => (
                  <option key={propietario.id} value={propietario.id}>
                    {propietario.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Inquilino</label>
              <select
                name='inquilino_id'
                value={newUnidadFuncional.inquilino_id || ''}
                onChange={handleInputChange}
                className='form-control'
              >
                <option value=''>Seleccione un inquilino</option>
                {inquilinos.map((inquilino) => (
                  <option key={inquilino.id} value={inquilino.id}>
                    {inquilino.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Saldo Actual</label>
              <input
                type='number'
                name='saldo_actual'
                value={newUnidadFuncional.saldo_actual}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Estado</label>
              <input
                type='text'
                name='estado'
                value={newUnidadFuncional.estado}
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
                {editingUnidadFuncional ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UnidadesFuncionales