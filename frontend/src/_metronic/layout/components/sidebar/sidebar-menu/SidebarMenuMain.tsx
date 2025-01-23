import { useIntl } from 'react-intl'
import { SidebarMenuItem } from './SidebarMenuItem'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'

const SidebarMenuMain = () => {
    const intl = useIntl()

    return (
        <>
            <SidebarMenuItem
                to='/dashboard'
                icon='element-11'
                title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
                fontIcon='bi-app-indicator'
            />

            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Administración</span>
                </div>
            </div>

            <SidebarMenuItemWithSub
                to='/gastos'
                icon='wallet'
                title='Gastos'
                fontIcon='bi-wallet'
            >
                <SidebarMenuItem to='/gastos' title='Gastos' />
                <SidebarMenuItem to='/categorias-gasto' title='Categorización de Gastos' />
                <SidebarMenuItem to='/subcategorias-gastos' title='Subcategorías de Gastos' />
            </SidebarMenuItemWithSub>

            {/* <SidebarMenuItemWithSub
                to='/servicios'
                icon='tools'
                title='Servicios'
                fontIcon='bi-tools'
            >
                <SidebarMenuItem to='/servicios/registro' title='Registro de Servicios' />
                <SidebarMenuItem to='/servicios/configuracion' title='Configuración de Servicios' />
            </SidebarMenuItemWithSub> */}

            {/* <SidebarMenuItemWithSub
                to='/sueldos'
                icon='currency-dollar'
                title='Sueldos'
                fontIcon='bi-currency-dollar'
            >
                <SidebarMenuItem to='/sueldos/calculo' title='Cálculo de Sueldos' />
                <SidebarMenuItem to='/sueldos/recibos' title='Generación de Recibos' />
            </SidebarMenuItemWithSub> */}

            <SidebarMenuItemWithSub
                to='/expensas'
                icon='cash'
                title='Expensas'
                fontIcon='bi-cash'
            >
                <SidebarMenuItem to='/expensas' title='Expensas' />
                {/* <SidebarMenuItem to='/expensas/desglose' title='Desglose de Gastos' /> */}
            </SidebarMenuItemWithSub>

            <SidebarMenuItemWithSub
                to='/cobros'
                icon='credit-card'
                title='Cobros'
                fontIcon='bi-credit-card'
            >
                <SidebarMenuItem to='/cobros' title='Pagos' />
                {/* <SidebarMenuItem to='/cobros/seguimiento' title='Seguimiento de Pagos' /> */}
            </SidebarMenuItemWithSub>

            <SidebarMenuItem to='/usuarios' icon='person' title='Usuarios' fontIcon='bi-person' />
            <SidebarMenuItem to='/barrios' icon='building' title='Barrios' fontIcon='bi-building' />
            <SidebarMenuItem to='/unidades-funcionales' icon='house' title='Unidades Funcionales' fontIcon='bi-house' />
            <SidebarMenuItem to='/facturas' icon='file-earmark' title='Facturas' fontIcon='bi-file-earmark' />
            <SidebarMenuItem to='/morosidad' icon='exclamation-triangle' title='Morosidad' fontIcon='bi-exclamation-triangle' />
        </>
    )
}

export { SidebarMenuMain }
