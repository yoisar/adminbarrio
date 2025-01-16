import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { CategoriaGasto, createSubcategoriaGasto, deleteSubcategoriaGasto, fetchCategorias, fetchSubcategorias, SubcategoriaGasto, updateSubcategoriaGasto } from '../../services/gastosService'

const MySwal = withReactContent(Swal)

const SubcategoriasGasto = () => {
  const [subcategorias, setSubcategorias] = useState<SubcategoriaGasto[]>([])
  const [categorias, setCategorias] = useState<CategoriaGasto[]>([])
  const [editingSubcategoria, setEditingSubcategoria] = useState<SubcategoriaGasto | null>(null)
  const [newSubcategoria, setNewSubcategoria] = useState<SubcategoriaGasto>({
    id: 0,
    categoria_gasto_id: 0,
    nombre: '',
    descripcion: '',
    created_at: '',
    updated_at: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    const getSubcategorias = async () => {
      try {
        const data = await fetchSubcategorias()
        setSubcategorias(data)
      } catch (error) {
        console.error('Error fetching subcategorias:', error)
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

    getSubcategorias()
    getCategorias()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewSubcategoria({ ...newSubcategoria, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingSubcategoria) {
        if (editingSubcategoria && editingSubcategoria.id !== undefined) {
          await updateSubcategoriaGasto(editingSubcategoria.id, newSubcategoria)
        }
      } else {
        await createSubcategoriaGasto(newSubcategoria)
      }
      const data = await fetchSubcategorias()
      setSubcategorias(data)
      setNewSubcategoria({ id: 0, categoria_gasto_id: 0, nombre: '', descripcion: '', created_at: '', updated_at: '' })
      setEditingSubcategoria(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving subcategoria:', error)
    }
  }

  const handleEdit = (subcategoria: SubcategoriaGasto) => {
    setEditingSubcategoria(subcategoria)
    setNewSubcategoria(subcategoria)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingSubcategoria(null)
    setNewSubcategoria({ id: 0, categoria_gasto_id: 0, nombre: '', descripcion: '', created_at: '', updated_at: '' })
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
          await deleteSubcategoriaGasto(id)
          const data = await fetchSubcategorias()
          setSubcategorias(data)
          MySwal.fire('Borrado', 'La subcategoría ha sido borrada', 'success')
        } catch (error) {
          console.error('Error deleting subcategoria:', error)
          MySwal.fire('Error', 'Hubo un error al borrar la subcategoría', 'error')
        }
      }
    })
  }

  // Obtener subcategorías actuales
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSubcategorias = subcategorias.slice(indexOfFirstItem, indexOfLastItem)

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      <PageTitle breadcrumbs={[]}>Gestión de Subcategorías de Gastos</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar subcategorías'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Subcategoría
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
                  <th className='min-w-140px'>Categoría</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentSubcategorias.map((subcategoria) => (
                  <tr key={subcategoria.id}>
                    <td>{subcategoria.nombre}</td>
                    <td>{subcategoria.descripcion}</td>
                    <td>{subcategoria.categoria?.nombre}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(subcategoria)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => subcategoria.id !== undefined && handleDelete(subcategoria.id)}
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
            {Array.from({ length: Math.ceil(subcategorias.length / itemsPerPage) }, (_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingSubcategoria ? 'Editar Subcategoría' : 'Agregar Subcategoría'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input
                type='text'
                name='nombre'
                value={newSubcategoria.nombre}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Descripción</label>
              <textarea
                name='descripcion'
                value={newSubcategoria.descripcion}
                onChange={handleInputChange}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Categoría</label>
              <select
                name='categoria_gasto_id'
                value={newSubcategoria.categoria_gasto_id}
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
            <div className='d-flex justify-content-end'>
              <button type='button' className='btn btn-secondary me-2' onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type='submit' className='btn btn-primary'>
                {editingSubcategoria ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SubcategoriasGasto