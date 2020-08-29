import { useState } from 'react'
import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import {
  Form,
  TextField,
  Submit,
  FieldError,
  Label,
  NumberField,
} from '@redwoodjs/forms'

import Lottie from 'lottie-react-web'
import animation from './form-submitting.json'

import GridRadio from 'src/components/GridRadio'
import gql from 'graphql-tag'

const CAMP_REGISTER = gql`
  mutation campRegister($input: CreateCampRegisterInput!) {
    campRegister(input: $input) {
      id
    }
  }
`
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
    { value: 'lt3', title: 'Dưới 3 tháng' },
    { value: 'gt3', title: 'Trên 3 tháng' },
  ],
  paymentLevel: {
    newMember: [
      { value: '500000', title: 'Tiền cọc|500.000đ' },
      { value: '1500000', title: 'Bạn mới|1.500.000đ' },
    ],
    activeMember: [
      { value: '500000', title: 'Tiền cọc|500.000đ' },
      { value: '750000', title: 'Sinh viên, thu nhập dưới 3 triệu|750.000đ' },
      { value: '1100000', title: 'Thu nhập 3-5 triệu|1.100.000đ' },
      { value: '1300000', title: 'Thu nhập trên 5-7 triệu|1.300.000đ' },
      { value: '1500000', title: 'Thu nhập trên 7 triệu|1.500.000đ' },
    ],
  },
  paymentMethod: [
    { value: 'BANK', title: 'Chuyển khoản trực tiếp cho BTC' },
    { value: 'GROUP_LEADER', title: 'Nộp tiền mặt trực tiếp cho nhóm trưởng' },
    { value: 'MANAGER', title: 'Nộp tiền mặt trực tiếp cho thủ quỹ' },
  ],
}

export default function FormPage() {
  const { addMessage } = useFlash()
  const [register, { loading }] = useMutation(CAMP_REGISTER, {
    onCompleted: (data) => {
      navigate(routes.campPostSubmit(data.campRegister.id))
      addMessage('Đăng ký thành công!', { classes: 'rw-flash-success' })
    },
  })

  const [meta, setMeta] = useState({
    clothesSize: 'M',
    group: 1,
    joinAge: 'lt3',
    paymentLevel: '500000',
    offering: 0,
    paymentMethod: 'BANK',
    season: new Date().getFullYear() + '',
    sms: false, // Is sms sent?
    active: true, // Is the form active?
    completed: false, // Is the form completed payment
    status: 'NO_PAYMENT',
    amount: 0,
  })

  const onSubmit = (data) => {
    // Switch to custom value
    if (meta.clothesSize === 'Other') {
      meta.clothesSize = data.clothesSize
    }
    // Map meta input
    meta.offering = data.offering
    register({
      variables: {
        input: {
          fullName: String(data.fullName),
          nationalId: String(data.nationalId),
          phoneNumber: data.phoneNumber,
          birthday: new Date(
            data.yearOfBirth,
            data.monthOfBirth,
            data.dayOfBirth
          ),
          meta: JSON.stringify(meta),
        },
      },
    })
  }

  const onChangeRadio = (key) => (value) => {
    setMeta({ ...meta, [key]: value.value })
  }

  return loading ? (
    <Lottie
      style={{
        position: 'absolute',
      }}
      options={{
        loop: false,
        animationData: animation,
      }}
    />
  ) : (
    <Form onSubmit={onSubmit}>
      <div className="gap-4 h-auto p-4 md:p-8 min-w-full max-w-md mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg font-bold uppercase">
            Phiếu Đăng Ký Thánh Kinh Mùa Thu 2020
          </h1>
          <div>
            <div className="bg-gray-700 mt-8 p-4 text-white rounded">
              <h2 className="text-lg font-semibold">
                <em>Quy Định</em>
              </h2>
              <ul className="mt-4 text-lg">
                <li className="mt-2">
                  * Nhận đăng ký và hoàn tất lệ phí: 30/08/2020 - 20/09/2020
                </li>
                <li className="mt-2">
                  * Nhận đăng ký và đặt cọc: 30/08/2020 - 13/09/2020
                </li>
                <li className="mt-2">
                  * Hoàn trả lệ phí nếu hủy đăng ký: Hết ngày 23/09/2020 (Sau
                  thời điểm này nếu hủy đăng ký sẽ không được hoàn cọc)
                </li>
                <li>
                  * Đối tượng được đóng lệ phí theo mức đóng hỗ trợ: Thành viên
                  có thời gian sinh hoạt tại BTN Gia Định trên 3 tháng.
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <span>
                Để thuận tiện cho công tác tổ chức, vui lòng điền đầy đủ các
                thông tin sau
              </span>
              <hr className="mt-8 bg-gray-700" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
              <span className="text-gray-500 text-opacity-75">
                Bao gồm các thông tin cơ bản về bạn để BTC đăng ký thủ tục xe,
                khách sạn, chia phòng...
              </span>
            </div>
            <div className="">
              <div className="flex flex-col">
                <Label
                  name="fullName"
                  className="label text-lg"
                  errorClassName="label text-lg error"
                >
                  Họ và tên
                </Label>
                <TextField
                  name="fullName"
                  className="input h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  errorClassName="input error"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  validation={{ required: true }}
                />
                <FieldError name="fullName" className="error-message" />
              </div>
              <div className="flex flex-col mt-8">
                <Label
                  name="nationalId"
                  className="text-lg"
                  errorClassName="label text-lg error"
                >
                  Số CMND
                </Label>
                <NumberField
                  className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  name="nationalId"
                  placeholder="261506123"
                  validation={{
                    required: true,
                    pattern: {
                      value: /^[0-9]{9,12}$/,
                    },
                  }}
                />
                <FieldError name="nationalId" className="error-message" />
              </div>
              <div className="flex flex-col mt-8">
                <Label name="phoneNumber" className="text-lg">
                  Số điện thoại
                </Label>
                <TextField
                  className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  name="phoneNumber"
                  placeholder="0913173626"
                  validation={{
                    required: true,
                    pattern: {
                      value: /^\+?[0-9]{9,14}$/,
                    },
                  }}
                />
                <FieldError name="phoneNumber" className="error-message" />
              </div>
              <div className="flex flex-col mt-8">
                <Label className="text-lg">Ngày sinh</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <NumberField
                    className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                    name="dayOfBirth"
                    placeholder="ngày"
                    max={31}
                    min={1}
                    validation={{ required: true }}
                  />
                  <NumberField
                    className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                    name="monthOfBirth"
                    placeholder="tháng"
                    max={12}
                    min={1}
                    validation={{ required: true }}
                  />
                  <NumberField
                    className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                    name="yearOfBirth"
                    placeholder="năm"
                    max={2010}
                    min={1980}
                    validation={{ required: true }}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Size áo</label>
                <GridRadio
                  list={FORM_MODELS.clothesSize}
                  onSelect={(value) => onChangeRadio('clothesSize')(value)}
                  cols={2}
                />
                {meta.clothesSize === 'Other' && (
                  <TextField
                    name="clothesSize"
                    className="input h-14 bg-gray-300 rounded text-2xl p-4 mt-2"
                    errorClassName="input error"
                    type="text"
                    placeholder="Nhập size áo khác"
                    validation={{ required: true }}
                  />
                )}
              </div>
            </div>
          </div>
          <hr className="mt-8 bg-gray-700" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Thông tin nhóm</h3>
              <span className="text-gray-500 text-opacity-75">
                Chọn nhóm nhỏ bạn đang sinh hoạt, thời gian bạn nhóm lại tại Ban
                thanh niên Gia Định
              </span>
            </div>
            <div className="">
              <div className="flex flex-col">
                <label className="text-lg">Nhóm nhỏ</label>
                <GridRadio
                  // eslint-disable-next-line prefer-spread
                  list={FORM_MODELS.groups}
                  cols={3}
                  onSelect={(value) => onChangeRadio('group')(value)}
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Thời gian nhóm lại</label>
                <GridRadio
                  list={FORM_MODELS.joinAge}
                  cols={2}
                  onSelect={(value) => onChangeRadio('joinAge')(value)}
                />
              </div>
            </div>
          </div>
          <hr className="mt-8 bg-gray-700" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Lệ Phí & Dâng Hiến</h3>
              <span className="text-gray-500 text-opacity-75">
                Chọn các mức đóng lệ phí, và dâng hiến cho kì trại.
              </span>
              <br />
              <span className="text-pink-500 text-opacity-75">
                Lưu ý: Nếu bạn nhóm lại cùng thanh niên chưa đủ tối thiểu 3
                tháng, bạn cần đóng đủ lệ phí của một trại viên.
              </span>
            </div>
            <div className="">
              <div className="flex flex-col">
                <label className="text-lg">Mức lệ phí</label>
                <GridRadio
                  list={
                    meta.joinAge === 'lt3'
                      ? FORM_MODELS.paymentLevel.newMember
                      : FORM_MODELS.paymentLevel.activeMember
                  }
                  cols={1}
                  onSelect={(value) => onChangeRadio('paymentLevel')(value)}
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Dâng hiến:</label>
                <NumberField
                  className="h-14 rounded text-2xl p-4 mt-2 bg-gray-300"
                  name="offering"
                  placeholder="Nhập số tiền dâng..."
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Hình thức nộp lệ phí</label>
                <GridRadio
                  list={FORM_MODELS.paymentMethod}
                  cols={1}
                  onSelect={(value) => onChangeRadio('paymentMethod')(value)}
                />

                <strong className="mt-4">
                  Chi tiết về việc đăng ký liên hệ Thủ quỹ Ban Thanh Niên:
                  <span className="text-green-500"> Như Ngọc 0902457367</span>
                </strong>
              </div>
            </div>
          </div>
          <hr className="mt-8 bg-gray-700" />
          <div className="flex flex-row mt-8">
            <span className="flex-1" />
            <Submit className="button p-2 pr-8 pl-8 bg-green-500 text-white">
              Nộp Đơn Đăng Ký
            </Submit>
          </div>
        </div>
      </div>
    </Form>
  )
}
