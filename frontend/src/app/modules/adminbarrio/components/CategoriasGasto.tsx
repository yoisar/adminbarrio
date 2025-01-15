import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { PageTitle } from '../../../../_metronic/layout/core'
import { CategoriaGasto, createCategoriaGasto, deleteCategoriaGasto, fetchCategorias, updateCategoriaGasto } from '../services/gastosService'

const MySwal = withReactContent(Swal)

const CategoriasGasto = () => {
  const [categorias, setCategorias] = useState<CategoriaGasto[]>([])
  const [editingCategoria, setEditingCategoria] = useState<CategoriaGasto | null>(null)
  const [newCategoria, setNewCategoria] = useState<CategoriaGasto>({
    id: 0,
    nombre: '',
    descripcion: '',
    created_at: '',
    updated_at: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const data = await fetchCategorias()
        setCategorias(data)
      } catch (error) {
        console.error('Error fetching categorias:', error)
      }
    }

    getCategorias()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCategoria({ ...newCategoria, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCategoria) {
        if (editingCategoria && editingCategoria.id !== undefined) {
          await updateCategoriaGasto(editingCategoria.id, newCategoria)
        }
      } else {
        await createCategoriaGasto(newCategoria)
      }
      const data = await fetchCategorias()
      setCategorias(data)
      setNewCategoria({ id: 0, nombre: '', descripcion: '', created_at: '', updated_at: '' })
      setEditingCategoria(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving categoria:', error)
    }
  }

  const handleEdit = (categoria: CategoriaGasto) => {
    setEditingCategoria(categoria)
    setNewCategoria(categoria)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingCategoria(null)
    setNewCategoria({ id: 0, nombre: '', descripcion: '', created_at: '', updated_at: '' })
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
          await deleteCategoriaGasto(id)
          const data = await fetchCategorias()
          setCategorias(data)
          MySwal.fire('Borrado', 'La categoría ha sido borrada', 'success')
        } catch (error) {
          console.error('Error deleting categoria:', error)
          MySwal.fire('Error', 'Hubo un error al borrar la categoría', 'error')
        }
      }
    })
  }

  // Obtener categorías actuales
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCategorias = categorias.slice(indexOfFirstItem, indexOfLastItem)

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      <PageTitle breadcrumbs={[]}>Gestión de Categorías de Gastos</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar categorías'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Categoría
            </button>
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Nombre</th>
                  <th className='min-w-140px'>Descripción</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentCategorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.descripcion}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(categoria)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => categoria.id !== undefined && handleDelete(categoria.id)}
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
            {Array.from({ length: Math.ceil(categorias.length / itemsPerPage) }, (_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCategoria ? 'Editar Categoría' : 'Agregar Categoría'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input
                type='text'
                name='nombre'
                value={newCategoria.nombre}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Descripción</label>
              <textarea
                name='descripcion'
                value={newCategoria.descripcion}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <div className='d-flex justify-content-end'>
              <button type='button' className='btn btn-secondary me-2' onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type='submit' className='btn btn-primary'>
                {editingCategoria ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CategoriasGasto