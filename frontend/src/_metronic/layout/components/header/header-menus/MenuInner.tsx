import { useIntl } from 'react-intl'
import { AppsMenu } from './AppsMenu'
import { CraftedMenu } from './CraftedMenu'
import { FinanzasMenu } from './FinanzasMenu'
import { MegaMenu } from './MegaMenu'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MenuItem } from './MenuItem'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/dashboard' />
      <MenuInnerWithSub
        title='Finanzas'
        to='/finanzas'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <FinanzasMenu />
      </MenuInnerWithSub>
      <MenuItem title='Layout Builder' to='/builder' />
      <CraftedMenu />
      <AppsMenu />
      <MenuInnerWithSub
        isMega={true}
        title='Layouts'
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />
      </MenuInnerWithSub>
      <MenuInnerWithSub
        title='Administración'
        to='/administracion'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem title='Usuarios' to='/usuarios' />
        <MenuItem title='Barrios' to='/barrios' />
        <MenuItem title='Unidades Funcionales' to='/unidades-funcionales' />
        <MenuItem title='Expensas' to='/expensas' />
        <MenuItem title='Gastos' to='/gastos' />
        <MenuItem title='Servicios' to='/servicios' />
        <MenuItem title='Facturas' to='/facturas' />
        <MenuItem title='Sueldos' to='/sueldos' />
        <MenuItem title='Morosidad' to='/morosidad' />
      </MenuInnerWithSub>
    </>
  )
}
