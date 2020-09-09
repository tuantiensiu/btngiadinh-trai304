import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'
import _ from 'lodash'

const FORM_MODELS = {
  clothesSize: [
    { value: 'S', title: 'S|< 50 kg' },
    { value: 'M', title: 'M|50-60 kg' },
    { value: 'L', title: 'L|60-70 kg' },
    { value: 'XL', title: 'XL|< 80 kg' },
    { value: 'XXL', title: 'XXL|> 80 kg' },
    { value: 'Other', title: 'Khác' },
  ],
  // eslint-disable-next-line prefer-spread
  groups: Array.apply(null, { length: 15 })
    .map(Number.call, Number)
    .map((i) => ({ value: i + 1, title: i + 1 })),
  joinAge: [
    { value: 'gt3', title: 'Trên 3 tháng' },
    { value: 'lt3', title: 'Dưới 3 tháng' },
  ],
  paymentLevel: {
    lt3: [{ value: '1500000', title: 'Bạn mới|1.500.000đ' }],
    gt3: [
      { value: '750000', title: 'Sinh viên, thu nhập dưới 3 triệu|750.000đ' },
      { value: '1100000', title: 'Thu nhập 3-5 triệu|1.100.000đ' },
      { value: '1300000', title: 'Thu nhập trên 5-7 triệu|1.300.000đ' },
      { value: '1500000', title: 'Thu nhập trên 7 triệu|1.500.000đ' },
    ],
  },
  paymentMethod: [
    { value: 'BANK', title: 'Chuyển khoản trực tiếp cho thủ quỹ' },
    { value: 'GROUP_LEADER', title: 'Nộp tiền mặt trực tiếp cho nhóm trưởng' },
    { value: 'MANAGER', title: 'Nộp tiền mặt trực tiếp cho thủ quỹ' },
  ],
  paymentStage: [
    { value: 'FULL', title: 'Đóng đủ một lần' },
    { value: 'PARTIAL', title: 'Đặt cọc|500.000đ' },
  ],
  gender: [
    { value: 'MALE', title: 'Nam' },
    { value: 'FEMALE', title: 'Nữ' },
  ],
}

const mapArrayAsKeys = (params) =>
  _.chain(params).keyBy('key').mapValues('value').value()

const DELETE_DRAFT_PROFILE_MUTATION = gql`
  mutation DeleteDraftProfileMutation($id: String!) {
    deleteDraftProfile(id: $id) {
      id
    }
  }
`

const currency = (amount) => {
  if (amount > 0) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
    return formatter.format(amount)
  }
  return null
}

const metaTitle = (model, metaValue) => {
  for (const meta of FORM_MODELS[model]) {
    if (meta.value === metaValue) {
      return meta.title
    }
  }
  return metaValue
}

const DraftProfile = ({ draftProfile }) => {
  const { addMessage } = useFlash()
  const [deleteDraftProfile] = useMutation(DELETE_DRAFT_PROFILE_MUTATION, {
    onCompleted: () => {
      navigate(routes.draftProfiles())
      addMessage('DraftProfile deleted.', { classes: 'rw-flash-success' })
    },
  })

  draftProfile.metaKey = {}
  for (const meta of draftProfile.meta) {
    draftProfile.metaKey[meta.key] = meta
  }

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
              <th>Giới tính</th>
              <td>{metaTitle('gender', draftProfile.meta.gender)}</td>
            </tr>
            <tr>
              <th>Quy cách thanh toán</th>
              <td>
                {metaTitle('paymentStage', draftProfile.meta.paymentStage)}
              </td>
            </tr>
            <tr>
              <th>Số tiền đã nộp</th>
              <td>{currency(draftProfile.meta.amount)}</td>
              <td>
                <Link
                  to={routes.editMeta({ id: draftProfile.metaKey.amount.id })}
                  title={'Cập nhật lệ phí cho ' + draftProfile.fullName}
                  className="rw-button rw-button-small"
                >
                  Sửa
                </Link>
              </td>
            </tr>
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
