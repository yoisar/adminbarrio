import { useIntl } from 'react-intl'
import { SidebarMenuItem } from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Finanzas</span>
        </div>
      </div>
      <SidebarMenuItem to='/expensas' icon='cash' title='Expensas' fontIcon='bi-cash' />
      <SidebarMenuItem to='/presupuestos' icon='graph-up' title='Presupuestos' fontIcon='bi-graph-up' />
      <SidebarMenuItem to='/gastos' icon='wallet' title='Gastos' fontIcon='bi-wallet' />
      <SidebarMenuItem to='/cobros' icon='credit-card' title='Cobros' fontIcon='bi-credit-card' />
      <SidebarMenuItem to='/sueldos' icon='currency-dollar' title='Sueldos' fontIcon='bi-currency-dollar' />
      <SidebarMenuItem to='/cargas-sociales' icon='people' title='Cargas Sociales' fontIcon='bi-people' />
      <SidebarMenuItem to='/conceptos' icon='list' title='Conceptos' fontIcon='bi-list' />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Servicios</span>
        </div>
      </div>
      <SidebarMenuItem to='/mantenimiento' icon='tools' title='Mantenimiento' fontIcon='bi-tools' />
      <SidebarMenuItem to='/historial-reparaciones' icon='clock-history' title='Historial de Reparaciones' fontIcon='bi-clock-history' />
      <SidebarMenuItem to='/solicitudes-mantenimiento' icon='file-earmark' title='Solicitudes de Mantenimiento' fontIcon='bi-file-earmark' />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Áreas Comunes</span>
        </div>
      </div>
      <SidebarMenuItem to='/reservas' icon='calendar-check' title='Reservas' fontIcon='bi-calendar-check' />
      <SidebarMenuItem to='/reglamentos' icon='book' title='Reglamentos' fontIcon='bi-book' />
      <SidebarMenuItem to='/control-acceso-areas' icon='shield-check' title='Control de Acceso' fontIcon='bi-shield-check' />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Comunicación</span>
        </div>
      </div>
      <SidebarMenuItem to='/notificaciones' icon='bell' title='Notificaciones' fontIcon='bi-bell' />
      <SidebarMenuItem to='/tablero-anuncios' icon='board' title='Tablero de Anuncios' fontIcon='bi-board' />
      <SidebarMenuItem to='/chat-comunitario' icon='chat' title='Chat Comunitario' fontIcon='bi-chat' />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Seguridad</span>
        </div>
      </div>
      <SidebarMenuItem to='/control-acceso' icon='shield' title='Control de Acceso' fontIcon='bi-shield' />
      <SidebarMenuItem to='/reportes-seguridad' icon='file-earmark' title='Reportes de Seguridad' fontIcon='bi-file-earmark' />
      <SidebarMenuItem to='/seguimiento-servicios' icon='eye' title='Seguimiento de Servicios' fontIcon='bi-eye' />
      <SidebarMenuItem to='/monitoreo-camaras' icon='camera' title='Monitoreo de Cámaras' fontIcon='bi-camera' />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Fumigación</span>
        </div>
      </div>
      <SidebarMenuItem to='/planificacion-fumigaciones' icon='calendar' title='Planificación de Fumigaciones' fontIcon='bi-calendar' />
      <SidebarMenuItem to='/notificaciones-fumigacion' icon='bell' title='Notificaciones y Alertas' fontIcon='bi-bell' />
      <SidebarMenuItem to='/seguimiento-fumigacion' icon='check-circle' title='Seguimiento y Reportes' fontIcon='bi-check-circle' />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Asambleas</span>
        </div>
      </div>
      <SidebarMenuItem to='/convocatorias' icon='calendar-event' title='Convocatorias' fontIcon='bi-calendar-event' />
      <SidebarMenuItem to='/votaciones-online' icon='check-square' title='Votaciones Online' fontIcon='bi-check-square' />
      <SidebarMenuItem to='/historial-decisiones' icon='journal' title='Historial de Decisiones' fontIcon='bi-journal' />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Reportes</span>
        </div>
      </div>
      <SidebarMenuItem to='/analisis-gastos' icon='bar-chart' title='Análisis de Gastos' fontIcon='bi-bar-chart' />
      <SidebarMenuItem to='/reporte-incidentes' icon='exclamation-triangle' title='Reporte de Incidentes' fontIcon='bi-exclamation-triangle' />
      <SidebarMenuItem to='/encuestas' icon='clipboard' title='Encuestas' fontIcon='bi-clipboard' />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Seguridad Digital</span>
        </div>
      </div>
      <SidebarMenuItem to='/perfiles-usuario' icon='person' title='Perfiles de Usuario' fontIcon='bi-person' />
      <SidebarMenuItem to='/acceso-seguro' icon='lock' title='Acceso Seguro' fontIcon='bi-lock' />
      <SidebarMenuItem to='/cifrado-datos' icon='shield-lock' title='Cifrado de Datos' fontIcon='bi-shield-lock' />
    </>
  )
}

export { SidebarMenuMain }

