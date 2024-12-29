import { KTIcon } from '../../../helpers'

const SidebarFooter = () => {
  return (
    <div className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6' id='kt_app_sidebar_footer'>
      <a
        href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL}
        target='_blank'
        className='btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100'
        data-bs-toggle='tooltip'
        data-bs-trigger='hover'
        data-bs-dismiss-='click'
        title='AdminBarrio Docs & Components'
      >
        <span className='btn-label'>AdminBarrio Docs & Components</span>
        <KTIcon iconName='document' className='btn-icon fs-2 m-0' />
      </a>
      <a
        href='https://adminbarrio.com/contact'
        target='_blank'
        className='btn btn-flex flex-center btn-custom btn-secondary overflow-hidden text-nowrap px-0 h-40px w-100 mt-2'
        data-bs-toggle='tooltip'
        data-bs-trigger='hover'
        data-bs-dismiss-='click'
        title='Contact Support'
      >
        <span className='btn-label'>Contact Support</span>
        <KTIcon iconName='support' className='btn-icon fs-2 m-0' />
      </a>
    </div>
  )
}

export { SidebarFooter }

