import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { reInitMenu } from '../helpers'
import { ActivityDrawer, DrawerMessenger, InviteUsers, UpgradePlan } from '../partials'
import { FooterWrapper } from './components/footer'
import { HeaderWrapper } from './components/header'
import { ScrollTop } from './components/scroll-top'
import { Sidebar } from './components/sidebar'
import { PageDataProvider } from './core'

const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    reInitMenu()
  }, [location.key])

  return (
    <PageDataProvider>
      <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
        <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
          <HeaderWrapper />
          <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
            <Sidebar />
            <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
              <div className='d-flex flex-column flex-column-fluid'>
                <Outlet />
              </div>
              <FooterWrapper />
            </div>
          </div>
        </div>
      </div>

      {/* begin:: Drawers */}
      <ActivityDrawer />
      {/* <RightToolbar /> */}
      <DrawerMessenger />
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <InviteUsers />
      <UpgradePlan />
      {/* end:: Modals */}
      <ScrollTop />
    </PageDataProvider>
  )
}

export { MasterLayout }

