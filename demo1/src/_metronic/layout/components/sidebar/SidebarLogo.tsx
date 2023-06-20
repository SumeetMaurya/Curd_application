import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'

const SidebarLogo = () => {
  const {config} = useLayout()
  const appSidebarDefaultMinimizeDesktopEnabled =
    config?.app?.sidebar?.default?.minimize?.desktop?.enabled
  const appSidebarDefaultCollapseDesktopEnabled =
    config?.app?.sidebar?.default?.collapse?.desktop?.enabled
  const toggleType = appSidebarDefaultCollapseDesktopEnabled
    ? 'collapse'
    : appSidebarDefaultMinimizeDesktopEnabled
    ? 'minimize'
    : ''
  const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? 'active' : ''
  const appSidebarDefaultMinimizeDefault = config.app?.sidebar?.default?.minimize?.desktop?.default
  return (
    <div className='app-sidebar-logo px-6' id='kt_app_sidebar_logo'>
      <Link to='/crafted/pages/profile/projects'>
        {config.layoutType === 'dark-sidebar' ? (
          <img
            alt='Logo'
            src="https://play-lh.googleusercontent.com/21lQ4ZGn-aamztMXMkv3qVNjwNTr1Cee4r6Y-avQCU9B5W5188RUow2Ceyt-dAm0MA"
            className='h-55px app-sidebar-logo-default'

          />
        ) : (
          <>
            <img
              alt='Logo'
              src="https://play-lh.googleusercontent.com/21lQ4ZGn-aamztMXMkv3qVNjwNTr1Cee4r6Y-avQCU9B5W5188RUow2Ceyt-dAm0MA"
              className='h-25px app-sidebar-logo-default theme-light-show'
            />
            <img
              alt='Logo'
              src="https://play-lh.googleusercontent.com/21lQ4ZGn-aamztMXMkv3qVNjwNTr1Cee4r6Y-avQCU9B5W5188RUow2Ceyt-dAm0MA"
              className='h-25px app-sidebar-logo-default theme-dark-show'
            />
          </>
        )}

        <img
          alt='Logo'
          src="https://www.nourishgenie.com/public/desktop/img/registration/nourish_family_logo@2x.png"
          className='h-20px app-sidebar-logo-minimize'
        />
      </Link>

      {(appSidebarDefaultMinimizeDesktopEnabled || appSidebarDefaultCollapseDesktopEnabled) && (
        <div
          id='kt_app_sidebar_toggle'
          className={clsx(
            'app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate',
            {active: appSidebarDefaultMinimizeDefault}
          )}
          data-kt-toggle='true'
          data-kt-toggle-state={toggleState}
          data-kt-toggle-target='body'
          data-kt-toggle-name={`app-sidebar-${toggleType}`}
        >
          <KTSVG path='/media/icons/duotune/arrows/arr079.svg' className='svg-icon-2 rotate-180' />
        </div>
      )}
    </div>

  )
}

export {SidebarLogo}
