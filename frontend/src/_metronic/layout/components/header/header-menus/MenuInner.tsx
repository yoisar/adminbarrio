import { useIntl } from 'react-intl'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MenuItem } from './MenuItem'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/dashboard' />
      <MenuInnerWithSub
        title='Administración'
        to='/administracion'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuInnerWithSub
          title='Gestión de Gastos'
          to='/gastos'
          menuPlacement='right-start'
          menuTrigger='click'
        >
          <MenuItem title='Registro de Gastos' to='/gastos/registro' />
          <MenuItem title='Categorización de Gastos' to='/gastos/categorizacion' />
        </MenuInnerWithSub>
        <MenuInnerWithSub
          title='Gestión de Servicios'
          to='/servicios'
          menuPlacement='right-start'
          menuTrigger='click'
        >
          <MenuItem title='Registro de Servicios' to='/servicios/registro' />
          <MenuItem title='Configuración de Servicios' to='/servicios/configuracion' />
        </MenuInnerWithSub>
        <MenuInnerWithSub
          title='Liquidación de Sueldos'
          to='/sueldos'
          menuPlacement='right-start'
          menuTrigger='click'
        >
          <MenuItem title='Cálculo de Sueldos' to='/sueldos/calculo' />
          <MenuItem title='Generación de Recibos' to='/sueldos/recibos' />
        </MenuInnerWithSub>
        <MenuInnerWithSub
          title='Liquidación de Expensas'
          to='/expensas'
          menuPlacement='right-start'
          menuTrigger='click'
        >
          <MenuItem title='Generación de Expensas' to='/expensas/generacion' />
          <MenuItem title='Desglose de Gastos' to='/expensas/desglose' />
        </MenuInnerWithSub>
        <MenuInnerWithSub
          title='Gestión de Cobros'
          to='/cobros'
          menuPlacement='right-start'
          menuTrigger='click'
        >
          <MenuItem title='Registro de Pagos' to='/cobros/registro' />
          <MenuItem title='Seguimiento de Pagos' to='/cobros/seguimiento' />
        </MenuInnerWithSub>
        <MenuItem title='Usuarios' to='/usuarios' />
        <MenuItem title='Barrios' to='/barrios' />
        <MenuItem title='Unidades Funcionales' to='/unidades-funcionales' />
        <MenuItem title='Facturas' to='/facturas' />
        <MenuItem title='Morosidad' to='/morosidad' />
      </MenuInnerWithSub>
    </>
  )
}
