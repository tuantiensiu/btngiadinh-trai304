import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'
import _ from 'lodash'

const mapArrayAsKeys = (params) =>
  _.chain(params).keyBy('key').mapValues('value').value()

const DELETE_DRAFT_PROFILE_MUTATION = gql`
  mutation DeleteDraftProfileMutation($id: String!) {
    deleteDraftProfile(id: $id) {
      id
    }
  }
`
const DraftProfile = ({ draftProfile }) => {
  const { addMessage } = useFlash()
  const [deleteDraftProfile] = useMutation(DELETE_DRAFT_PROFILE_MUTATION, {
    onCompleted: () => {
      navigate(routes.draftProfiles())
      addMessage('DraftProfile deleted.', { classes: 'rw-flash-success' })
    },
  })

  draftProfile.meta = mapArrayAsKeys(draftProfile.meta)

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
            Đăng ký thành công
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Họ tên</th>
              <td>{draftProfile.fullName}</td>
            </tr>
            {draftProfile.meta.paymentMethod === 'BANK' && (
              <tr>
                <th>Nội dung chuyển khoản</th>
                <td>{draftProfile.meta.transactionCode}</td>
              </tr>
            )}
            <tr>
              <th>Thông báo</th>
              <td>{draftProfile.meta.message}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDraftProfile({ id: draftProfile.id })}
          className="rw-button rw-button-blue"
        >
          Sửa
        </Link>
        {/* <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(draftProfile.id)}
        >
          Xóa
        </a> */}
      </nav>
    </>
  )
}

export default DraftProfile
