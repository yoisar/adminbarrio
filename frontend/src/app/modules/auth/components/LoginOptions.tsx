import { useIntl } from 'react-intl'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'

export function LoginOptions() {
    const intl = useIntl()

    return (
        <>
            <div className='text-center mb-11'>
                <div className='text-gray-500 fw-semibold fs-6'>
                    {intl.formatMessage({ id: 'AUTH.LOGIN.SUBTITLE' })}
                </div>
            </div>
            {/* begin::Login options */}
            <div className='row g-3 mb-9'>
                {/* begin::Col */}
                <div className='col-md-6'>
                    {/* begin::Google link */}
                    <a
                        href='#'
                        className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
                    >
                        <img
                            alt='Logo'
                            src={toAbsoluteUrl('media/svg/brand-logos/google-icon.svg')}
                            className='h-15px me-3'
                        />
                        {intl.formatMessage({ id: 'AUTH.LOGIN.GOOGLE' })}
                    </a>
                    {/* end::Google link */}
                </div>
                {/* end::Col */}

                {/* begin::Col */}
                <div className='col-md-6'>
                    {/* begin::Apple link */}
                    <a
                        href='#'
                        className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
                    >
                        <img
                            alt='Logo'
                            src={toAbsoluteUrl('media/svg/brand-logos/apple-black.svg')}
                            className='theme-light-show h-15px me-3'
                        />
                        <img
                            alt='Logo'
                            src={toAbsoluteUrl('media/svg/brand-logos/apple-black-dark.svg')}
                            className='theme-dark-show h-15px me-3'
                        />
                        {intl.formatMessage({ id: 'AUTH.LOGIN.APPLE' })}
                    </a>
                    {/* end::Apple link */}
                </div>
                {/* end::Col */}
            </div>
            {/* end::Login options */}

            {/* begin::Separator */}
            <div className='separator separator-content my-14'>
                <span className='w-125px text-gray-500 fw-semibold fs-7'>
                    {intl.formatMessage({ id: 'AUTH.LOGIN.OR_WITH_EMAIL' })}
                </span>
            </div>
            {/* end::Separator */}
        </>
    )
}