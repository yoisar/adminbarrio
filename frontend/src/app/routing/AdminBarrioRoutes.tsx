import { Route, Routes } from 'react-router-dom'
import Barrios from '../modules/adminbarrio/components/Barrios'
import CategoriasGasto from '../modules/adminbarrio/components/CategoriasGasto'
import Gastos from '../modules/adminbarrio/components/gastos/Gastos'
import UnidadesFuncionales from '../modules/adminbarrio/components/UnidadesFuncionales'
import Usuarios from '../modules/adminbarrio/components/Usuarios'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
// import Barrios from '../modules/adminbarrio/pages/Barrios'
// import CargasSociales from '../modules/adminbarrio/pages/CargasSociales'
// import Cobros from '../modules/adminbarrio/pages/Cobros'
// import CobrosRegistro from '../modules/adminbarrio/pages/CobrosRegistro'
// import CobrosSeguimiento from '../modules/adminbarrio/pages/CobrosSeguimiento'

// import ExpensaDetail from '../modules/adminbarrio/pages/ExpensaDetail'
// import Expensas from '../modules/adminbarrio/pages/Expensas'
// import ExpensasDesglose from '../modules/adminbarrio/pages/ExpensasDesglose'
// import ExpensasGeneracion from '../modules/adminbarrio/pages/ExpensasGeneracion'
// import ExpensasList from '../modules/adminbarrio/pages/ExpensasList'
// import Facturas from '../modules/adminbarrio/pages/Facturas'

// import Morosidad from '../modules/adminbarrio/pages/Morosidad'
// import NotFound from '../modules/adminbarrio/pages/NotFound'
// import ServiciosConfiguracion from '../modules/adminbarrio/pages/ServiciosConfiguracion'
// import ServiciosRegistro from '../modules/adminbarrio/pages/ServiciosRegistro'
// import SueldosCalculo from '../modules/adminbarrio/pages/SueldosCalculo'
// import SueldosRecibos from '../modules/adminbarrio/pages/SueldosRecibos'
// import UnidadesFuncionales from '../modules/adminbarrio/pages/UnidadesFuncionales'
// import Usuarios from '../modules/adminbarrio/pages/Usuarios'

const AdminBarrioRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardWrapper />} />
      <Route path="/barrios" element={<Barrios />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/unidades-funcionales" element={<UnidadesFuncionales />} />
      <Route path="/categorias-gasto" element={<CategoriasGasto />} />
       <Route path="/gastos" element={<Gastos />} />
      {/* <Route path="/expensas" element={<Expensas />} /> 
      <Route path="/expensas-lista" element={<ExpensasList />} />
      <Route path="/expensas-detail/:id" element={<ExpensaDetail />} />
      <Route path="/cobros" element={<Cobros />} />
      <Route path="/cargas-sociales" element={<CargasSociales />} />
      <Route path="/servicios/registro" element={<ServiciosRegistro />} />
      <Route path="/servicios/configuracion" element={<ServiciosConfiguracion />} />
      <Route path="/sueldos/calculo" element={<SueldosCalculo />} />
      <Route path="/sueldos/recibos" element={<SueldosRecibos />} />
      <Route path="/expensas/generacion" element={<ExpensasGeneracion />} />
      <Route path="/expensas/desglose" element={<ExpensasDesglose />} />
      <Route path="/cobros/registro" element={<CobrosRegistro />} />
      <Route path="/cobros/seguimiento" element={<CobrosSeguimiento />} />
      
      
      <Route path="/unidades-funcionales" element={<UnidadesFuncionales />} />
      <Route path="/facturas" element={<Facturas />} />
      <Route path="/morosidad" element={<Morosidad />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default AdminBarrioRoutes