import { useState } from 'react'
import { useMutation, TextField } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import classNames from 'classnames'

// const ADD_NOTE_TO_PROFILE_ON_CONTAINER = gql``

const ProfileListInput = () => {}

const ProfileListItem = ({ profile, index, onRemove }) => {
  const meta = JSON.parse(profile.metaByKeys)
  const [showButtons, setShowButtons] = useState(false)
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [noteInput, setNoteInput] = useState()

  const toggleNoteInput = () => {
    setShowNoteInput(!showNoteInput)
  }

  const remove = () => {
    onRemove(profile.id)
  }

  const onNoteChange = (e) => {
    console.log(e.target.value)
    setNoteInput(e.target.value)
  }
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
      {showNoteInput && <input value={noteInput} onChange={onNoteChange} />}
      {!showButtons && (
        <span className="font-semibold text-sm">Nhóm {meta.group}</span>
      )}
      <button
        className={classNames('rw-button', showButtons ? 'visible' : 'hidden')}
        onClick={toggleNoteInput}
      >
        Ghi chú
      </button>
      <button
        className={classNames('rw-button', showButtons ? 'visible' : 'hidden')}
        onClick={remove}
      >
        Gỡ bỏ
      </button>
    </div>
  )
}

export default ProfileListItem
