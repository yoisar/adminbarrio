import { useIntl } from 'react-intl'
import { FinanzasMenu } from './FinanzasMenu'
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
            {/* <MenuItem title='Layout Builder' to='/builder' />
            <CraftedMenu />
            <AppsMenu /> */}
            {/* <MenuInnerWithSub
                isMega={true}
                title='Layouts'
                to='/mega-menu'
                menuPlacement='bottom-start'
                menuTrigger='click'
            >
                <MegaMenu />
            </MenuInnerWithSub> */}
        </>
    )
}
