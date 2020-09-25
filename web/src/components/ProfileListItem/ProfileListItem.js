import { useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
import classNames from 'classnames'

const ProfileListItem = ({ profile, index }) => {
  const meta = JSON.parse(profile.metaByKeys)
  const [showButtons, setShowButtons] = useState(false)

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="flex flex-row justify-between p-4 hover:bg-yellow-500 h-16"
    >
      <Link
        to={routes.draftProfile({ id: profile.id })}
        title={`Click để xem thông tin hồ sơ`}
        className="font-medium text-sm hover:text-blue-500"
      >
        {index + 1}. {profile.fullName}
      </Link>
      {!showButtons && (
        <span className="font-semibold text-sm">Nhóm {meta.group}</span>
      )}
      <button
        className={classNames('rw-button', showButtons ? 'visible' : 'hidden')}
      >
        Gỡ bỏ
      </button>
    </div>
  )
}

export default ProfileListItem
