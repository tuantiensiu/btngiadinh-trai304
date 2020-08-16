import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_DRAFT_PROFILE_MUTATION = gql`
  mutation DeleteDraftProfileMutation($id: String!) {
    deleteDraftProfile(id: $id) {
      id
    }
  }
`

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

const DraftProfile = ({ draftProfile }) => {
  const { addMessage } = useFlash()
  const [deleteDraftProfile] = useMutation(DELETE_DRAFT_PROFILE_MUTATION, {
    onCompleted: () => {
      navigate(routes.draftProfiles())
      addMessage('DraftProfile deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete draftProfile ' + id + '?')) {
      deleteDraftProfile({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            DraftProfile {draftProfile.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{draftProfile.id}</td>
            </tr>
            <tr>
              <th>Full name</th>
              <td>{draftProfile.fullName}</td>
            </tr>
            <tr>
              <th>National id</th>
              <td>{draftProfile.nationalId}</td>
            </tr>
            <tr>
              <th>Phone number</th>
              <td>{draftProfile.phoneNumber}</td>
            </tr>
            <tr>
              <th>Birthday</th>
              <td>{timeTag(draftProfile.birthday)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDraftProfile({ id: draftProfile.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(draftProfile.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default DraftProfile
