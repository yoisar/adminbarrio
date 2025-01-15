import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { PageTitle } from '../../../../_metronic/layout/core'
import { createUser, deleteUser, fetchUsuarios, updateUser, User } from '../services/usuariosService'

const MySwal = withReactContent(Swal)

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<User[]>([])
  const [editingUsuario, setEditingUsuario] = useState<User | null>(null)
  const [newUsuario, setNewUsuario] = useState<User>({
    id: 0,
    name: '',
    email: '',
    role: '',
    telefono: '',
    direccion: '',
    created_at: '',
    updated_at: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const data = await fetchUsuarios()
        setUsuarios(data)
      } catch (error) {
        console.error('Error fetching usuarios:', error)
      }
    }

    getUsuarios()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUsuario({ ...newUsuario, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingUsuario) {
        if (editingUsuario && editingUsuario.id !== undefined) {
          await updateUser(editingUsuario.id, newUsuario)
        }
      } else {
        await createUser(newUsuario)
      }
      const data = await fetchUsuarios()
      setUsuarios(data)
      setNewUsuario({ id: 0, name: '', email: '', role: '', telefono: '', direccion: '', created_at: '', updated_at: '' })
      setEditingUsuario(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving usuario:', error)
    }
  }

  const handleEdit = (usuario: User) => {
    setEditingUsuario(usuario)
    setNewUsuario(usuario)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingUsuario(null)
    setNewUsuario({ id: 0, name: '', email: '', role: '', telefono: '', direccion: '', created_at: '', updated_at: '' })
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
          await deleteUser(id)
          const data = await fetchUsuarios()
          setUsuarios(data)
          MySwal.fire('Borrado', 'El usuario ha sido borrado', 'success')
        } catch (error) {
          console.error('Error deleting usuario:', error)
          MySwal.fire('Error', 'Hubo un error al borrar el usuario', 'error')
        }
      }
    })
  }

  // Obtener usuarios actuales
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsuarios = usuarios.slice(indexOfFirstItem, indexOfLastItem)

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      <PageTitle breadcrumbs={[]}>Gestión de Usuarios</PageTitle>
      <div className='card'>
        <div className='card-header border-0 pt-6'>
          <div className='card-title'>
            <div className='d-flex align-items-center position-relative my-1'>
              <input
                type='text'
                data-kt-customer-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Buscar usuarios'
              />
            </div>
          </div>
          <div className='card-toolbar'>
            <button className='btn btn-primary' onClick={handleAdd}>
              <i className='bi bi-plus-lg'></i> Agregar Usuario
            </button>
          </div>
        </div>
        <div className='card-body py-4'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Nombre</th>
                  <th className='min-w-140px'>Email</th>
                  <th className='min-w-140px'>Rol</th>
                  <th className='min-w-120px'>Teléfono</th>
                  <th className='min-w-120px'>Dirección</th>
                  <th className='min-w-100px text-end'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentUsuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.role}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.direccion}</td>
                    <td className='text-end'>
                      <button
                        onClick={() => handleEdit(usuario)}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill text-primary'></i>
                      </button>
                      <button
                        onClick={() => usuario.id !== undefined && handleDelete(usuario.id)}
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
            {Array.from({ length: Math.ceil(usuarios.length / itemsPerPage) }, (_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUsuario ? 'Editar Usuario' : 'Agregar Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input
                type='text'
                name='name'
                value={newUsuario.name}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                name='email'
                value={newUsuario.email}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Rol</label>
              <input
                type='text'
                name='role'
                value={newUsuario.role}
                onChange={handleInputChange}
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Teléfono</label>
              <input
                type='text'
                name='telefono'
                value={newUsuario.telefono}
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
                value={newUsuario.direccion}
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
                {editingUsuario ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Usuarios