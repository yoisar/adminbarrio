// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import CargasSociales from '../modules/adminbarrio/components/cargasSociales/CargasSociales'
import Cobros from '../modules/adminbarrio/components/cobros/Cobros'
import Conceptos from '../modules/adminbarrio/components/conceptos/Conceptos'
import Expensas from '../modules/adminbarrio/components/expensas/Expensas'
import Gastos from '../modules/adminbarrio/components/gastos/Gastos'
import Sueldos from '../modules/adminbarrio/components/sueldos/Sueldos'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
// import AccesoSeguro from './pages/AccesoSeguro'
// import AnalisisGastos from './pages/AnalisisGastos'
// import ChatComunitario from './pages/ChatComunitario'
// import CifradoDatos from './pages/CifradoDatos'
// import Cobros from './pages/Cobros'
// import ControlAcceso from './pages/ControlAcceso'
// import ControlAccesoAreas from './pages/ControlAccesoAreas'
// import Convocatorias from './pages/Convocatorias'
// import Dashboard from './pages/Dashboard'
// import Encuestas from './pages/Encuestas'
// import Expensas from './pages/Expensas'
// import Gastos from './pages/Gastos'
// import HistorialDecisiones from './pages/HistorialDecisiones'
// import HistorialReparaciones from './pages/HistorialReparaciones'
// import Mantenimiento from './pages/Mantenimiento'
// import MonitoreoCamaras from './pages/MonitoreoCamaras'
// import Notificaciones from './pages/Notificaciones'
// import NotificacionesFumigacion from './pages/NotificacionesFumigacion'
// import PerfilesUsuario from './pages/PerfilesUsuario'
// import PlanificacionFumigaciones from './pages/PlanificacionFumigaciones'
// import Presupuestos from './pages/Presupuestos'
// import Reglamentos from './pages/Reglamentos'
// import ReporteIncidentes from './pages/ReporteIncidentes'
// import ReportesSeguridad from './pages/ReportesSeguridad'
// import Reservas from './pages/Reservas'
// import SeguimientoFumigacion from './pages/SeguimientoFumigacion'
// import SeguimientoServicios from './pages/SeguimientoServicios'
// import SolicitudesMantenimiento from './pages/SolicitudesMantenimiento'
// import TableroAnuncios from './pages/TableroAnuncios'
// import VotacionesOnline from './pages/VotacionesOnline'

const AdminBarrioRoutes = () => {
  return (
    <Routes>
      {/* <Switch> */}
        <Route path='/dashboard' element={<DashboardWrapper />} />
        <Route path='/expensas' element={<Expensas />} />
        <Route path='/cargas-sociales' element={<CargasSociales />} />
        <Route path='/sueldos' element={<Sueldos />} />
        <Route path='/conceptos' element={<Conceptos />} />
        <Route path='/cobros' element={<Cobros />} />
        <Route path='/gastos' element={<Gastos />} />
        {/* <Route path='/presupuestos' element={<Presupuestos />} />
        <Route path='/gastos' element={<Gastos />} />
        <Route path='/cobros' element={<Cobros />} />
        <Route path='/mantenimiento' element={<Mantenimiento />} />
        <Route path='/historial-reparaciones' element={<HistorialReparaciones />} />
        <Route path='/solicitudes-mantenimiento' element={<SolicitudesMantenimiento />} />
        <Route path='/reservas' element={<Reservas />} />
        <Route path='/reglamentos' element={<Reglamentos />} />
        <Route path='/control-acceso-areas' element={<ControlAccesoAreas />} />
        <Route path='/notificaciones' element={<Notificaciones />} />
        <Route path='/tablero-anuncios' element={<TableroAnuncios />} />
        <Route path='/chat-comunitario' element={<ChatComunitario />} />
        <Route path='/control-acceso' element={<ControlAcceso />} />
        <Route path='/reportes-seguridad' element={<ReportesSeguridad />} />
        <Route path='/seguimiento-servicios' element={<SeguimientoServicios />} />
        <Route path='/monitoreo-camaras' element={<MonitoreoCamaras />} />
        <Route path='/planificacion-fumigaciones' element={<PlanificacionFumigaciones />} />
        <Route path='/notificaciones-fumigacion' element={<NotificacionesFumigacion />} />
        <Route path='/seguimiento-fumigacion' element={<SeguimientoFumigacion />} />
        <Route path='/convocatorias' element={<Convocatorias />} />
        <Route path='/votaciones-online' element={<VotacionesOnline />} />
        <Route path='/historial-decisiones' element={<HistorialDecisiones />} />
        <Route path='/analisis-gastos' element={<AnalisisGastos />} />
        <Route path='/reporte-incidentes' element={<ReporteIncidentes />} />
        <Route path='/encuestas' element={<Encuestas />} />
        <Route path='/perfiles-usuario' element={<PerfilesUsuario />} />
        <Route path='/acceso-seguro' element={<AccesoSeguro />} />
        <Route path='/cifrado-datos' element={<CifradoDatos />} /> */}
      {/* </Switch> */}
    </Routes>
  )
}

export default AdminBarrioRoutes