import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../app/modules/auth'
import { toAbsoluteUrl } from '../../../helpers'
import { Languages } from './Languages'

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('media/avatars/300-3.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.first_name} {currentUser?.last_name}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/profile'} className='menu-link px-5'>
          Mi Perfil
        </Link>
      </div>

      <div className='menu-item px-5'>
        <Link to={'/expensas'} className='menu-link px-5'>
          Expensas
        </Link>
      </div>

      {/* <div className='menu-item px-5'>
        <Link to={'/notifications'} className='menu-link px-5'>
          Notificaciones
        </Link>
      </div> */}

      <div className='menu-item px-5'>
        <Link to={'/security'} className='menu-link px-5'>
          Seguridad
        </Link>
      </div>

      <div className='menu-item px-5'>
        <Link to={'/fumigation'} className='menu-link px-5'>
          Fumigación
        </Link>
      </div>

      <div className='menu-item px-5'>
        <Link to={'/services'} className='menu-link px-5'>
          Servicios
        </Link>
      </div>

      <div className='menu-item px-5'>
        <Link to={'/common-areas'} className='menu-link px-5'>
          Áreas Comunes
        </Link>
      </div>    

      {/* <div className='menu-item px-5'>
        <Link to={'/virtual-assembly'} className='menu-link px-5'>
          Asamblea Virtual
        </Link>
      </div> */}

      <div className='menu-item px-5'>
        <Link to={'/reports'} className='menu-link px-5'>
          Reportes
        </Link>
      </div>

      {/* <div className='menu-item px-5'>
        <Link to={'/digital-security'} className='menu-link px-5'>
          Seguridad Digital
        </Link>
      </div> */}

      <div className='separator my-2'></div>

      <Languages />

      <div className='menu-item px-5 my-1'>
        <Link to='/account/settings' className='menu-link px-5'>
          Configuración de la Cuenta
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Cerrar Sesión
        </a>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
