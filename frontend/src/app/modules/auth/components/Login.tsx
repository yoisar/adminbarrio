import clsx from 'clsx'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { getUserByToken, login } from '../core/_requests'
import { useAuth } from '../core/Auth'

// Lista de roles permitidos
const roles = [
  'super_admin',
  'admin',
  'propietario',
  'inquilino',
  'empleado',
]

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  role: Yup.string()
    .oneOf(roles, 'Invalid role')
    .required('Role is required'),
})

const initialValues = {
  email: 'admin@demo.com',
  password: 'demo',
  role: 'admin',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()
  const intl = useIntl()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const auth = await login(values.email, values.password, values.role)
        saveAuth(auth)
        const { data: user } = await getUserByToken(auth.api_token)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus(intl.formatMessage({ id: 'AUTH.VALIDATION.INVALID_LOGIN' }))
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <Link to='/'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/custom-1.png')} className='h-75px mb-5' />
        </Link>
        <h1 className='text-gray-900 fw-bolder mb-3'>
          {intl.formatMessage({ id: 'AUTH.LOGIN.TITLE' })}
        </h1>        
      </div>
      {/* begin::Heading */}

      {/* <LoginOptions /> */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>
              {intl.formatMessage({ id: 'AUTH.LOGIN.USE_YOUR_EMAIL' })}{' '}
              <strong>{intl.formatMessage({ id: 'AUTH.LOGIN.AND_PASSWORD' })}</strong>{' '}
              {intl.formatMessage({ id: 'AUTH.LOGIN.TO_CONTINUE' })}
            </div>
          </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-gray-900'>
          {intl.formatMessage({ id: 'AUTH.INPUT.EMAIL' })}
        </label>
        <input
          placeholder={intl.formatMessage({ id: 'AUTH.INPUT.EMAIL' })}
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>
          {intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
        </label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>
          {intl.formatMessage({ id: 'AUTH.INPUT.ROLE' })}
        </label>
        <select
          {...formik.getFieldProps('role')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.role && formik.errors.role,
            },
            {
              'is-valid': formik.touched.role && !formik.errors.role,
            }
          )}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {formik.touched.role && formik.errors.role && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.role}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          {intl.formatMessage({ id: 'AUTH.LOGIN.FORGOT_PASSWORD' })}
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>{intl.formatMessage({ id: 'AUTH.LOGIN.CONTINUE' })}</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              {intl.formatMessage({ id: 'AUTH.LOGIN.PLEASE_WAIT' })}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        {intl.formatMessage({ id: 'AUTH.LOGIN.NOT_A_MEMBER' })}{' '}
        <Link to='/auth/registration' className='link-primary'>
          {intl.formatMessage({ id: 'AUTH.LOGIN.SIGN_UP' })}
        </Link>
      </div>
    </form>
  )
}
