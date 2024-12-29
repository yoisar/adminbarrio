import clsx from 'clsx'

import { useEffect, useState } from 'react'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { getUserCount, getUsers, User } from '../services/userService'

type Props = {
  className: string
  description: string
  labelColor: string
  textColor: string
}

const UsersWidget = ({ className, description, labelColor, textColor }: Props) => {
  const [users, setUsers] = useState<User[]>([])
  const [userCount, setUserCount] = useState<number>(0)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers()
        setUsers(usersData)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    const fetchUserCount = async () => {
      try {
        const count = await getUserCount()
        setUserCount(count)
      } catch (error) {
        console.error('Error fetching user count:', error)
      }
    }

    fetchUsers()
    fetchUserCount()
  }, [])

  return (
    <div className={`card card-flush ${className}`}>
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <div className='card-title d-flex flex-column'>
            <span className='fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2'>{userCount}</span>
            <span className='text-gray-500 pt-1 fw-semibold fs-6'>{description}</span>
          </div>
        </div>
      </div>
      <div className='card-body d-flex flex-column justify-content-end pe-0'>
        <span className='fs-6 fw-bolder text-gray-800 d-block mb-2'>Usuarios Activos</span>
        <div className='symbol-group symbol-hover flex-nowrap'>
          {users.slice(0, 6).map((user, index) => (
            <div
              className='symbol symbol-35px symbol-circle'
              data-bs-toggle='tooltip'
              title={user.name}
              key={`user-item-${index}`}
            >
              {user.avatar ? (
                <img alt='Pic' src={toAbsoluteUrl(user.avatar)} />
              ) : (
                <span className={clsx('symbol-label fw-bold', 'bg-primary', 'text-inverse-primary')}>
                  {user.name.charAt(0)}
                </span>
              )}
            </div>
          ))}

          <a href='#' className='symbol symbol-35px symbol-circle'>
            <span className={clsx('symbol-label fs-8 fw-bold', 'bg-' + labelColor, 'text-' + textColor)}>
              +{users.length - 6}
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export { UsersWidget }
