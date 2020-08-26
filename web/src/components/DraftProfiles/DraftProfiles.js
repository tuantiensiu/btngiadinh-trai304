import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

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
            <th>CMND</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Sinh nhật</th>
            <th>Nhóm Nhỏ</th>
            <th>Size Áo</th>
            <th>Thời gian nhóm lại</th>
            <th>Mức đóng lệ phí</th>
            <th>Hình thức đóng phí</th>
            <th>Dâng thêm</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {draftProfiles.map((draftProfile) => (
            <tr key={draftProfile.id}>
              <td>{truncate(draftProfile.nationalId)}</td>
              <td>{truncate(draftProfile.fullName)}</td>
              <td>{truncate(draftProfile.phoneNumber)}</td>
              <td>{dayjs(draftProfile.birthday).utc().format('DD/MM/YYYY')}</td>
              <td>{truncate(draftProfile.meta[1].value)}</td>
              <td>{truncate(draftProfile.meta[0].value)}</td>
              <td>{truncate(draftProfile.meta[2].value)}</td>
              <td>{truncate(draftProfile.meta[3].value)}</td>
              <td>{truncate(draftProfile.meta[5].value)}</td>
              <td>{truncate(draftProfile.meta[4].value)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.draftProfile({ id: draftProfile.id })}
                    title={'Show draftProfile ' + draftProfile.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Xem
                  </Link>
                  <Link
                    to={routes.editDraftProfile({ id: draftProfile.id })}
                    title={'Edit draftProfile ' + draftProfile.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Sửa
                  </Link>
                  {/* <a
                    href="#"
                    title={'Delete draftProfile ' + draftProfile.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(draftProfile.id)}
                  >
                    Xóa
                  </a> */}
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
