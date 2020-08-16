import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_DRAFT_PROFILE_MUTATION = gql`
  mutation DeleteDraftProfileMutation($id: String!) {
    deleteDraftProfile(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const DraftProfilesList = ({ draftProfiles }) => {
  const { addMessage } = useFlash()
  const [deleteDraftProfile] = useMutation(DELETE_DRAFT_PROFILE_MUTATION, {
    onCompleted: () => {
      addMessage('DraftProfile deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete draftProfile ' + id + '?')) {
      deleteDraftProfile({
        variables: { id },
        refetchQueries: ['DRAFT_PROFILES'],
      })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Full name</th>
            <th>National id</th>
            <th>Phone number</th>
            <th>Birthday</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {draftProfiles.map((draftProfile) => (
            <tr key={draftProfile.id}>
              <td>{truncate(draftProfile.id)}</td>
              <td>{truncate(draftProfile.fullName)}</td>
              <td>{truncate(draftProfile.nationalId)}</td>
              <td>{truncate(draftProfile.phoneNumber)}</td>
              <td>{timeTag(draftProfile.birthday)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.draftProfile({ id: draftProfile.id })}
                    title={'Show draftProfile ' + draftProfile.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDraftProfile({ id: draftProfile.id })}
                    title={'Edit draftProfile ' + draftProfile.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete draftProfile ' + draftProfile.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(draftProfile.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DraftProfilesList
