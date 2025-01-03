import { MenuItem } from './MenuItem'

export function FinanzasMenu() {
    return (
        <>
            <MenuItem title='Sueldos' to='/sueldos' />
            <MenuItem title='Cargas Sociales' to='/cargas-sociales' />
            <MenuItem title='Conceptos' to='/conceptos' />
            <MenuItem title='Expensas' to='/expensas' />
            <MenuItem title='Cobros' to='/cobros' />
        </>
    )
}