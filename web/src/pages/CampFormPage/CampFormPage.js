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

import GridRadio from 'src/components/GridRadio'
import gql from 'graphql-tag'

const CAMP_REGISTER = gql`
  mutation campRegister($input: CreateCampRegisterInput!) {
    campRegister(input: $input) {
      id
    }
  }
`

export default function FormPage() {
  const { addMessage } = useFlash()
  const [register] = useMutation(CAMP_REGISTER, {
    onCompleted: (data) => {
      navigate(routes.campPostSubmit())
      console.log(`Response: `, data)
      addMessage('Đăng ký thành công!', { classes: 'rw-flash-success' })
    },
  })

  const [meta, setMeta] = useState({
    clothesSize: 'M',
    group: 1,
    joinAge: 'trên 3 tháng',
    paymentLevel: 'Tiền cọc: 400.000đ',
    offering: '0',
    paymentMethod: 'Nộp trực tiếp cho Ban Tổ Chức',
    season: new Date().getFullYear() + '',
  })
  const onSubmit = (data) => {
    register({
      variables: {
        input: {
          fullName: String(data.fullName),
          nationalId: String(data.nationalId),
          phoneNumber: String(data.phoneNumber),
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
    setMeta({ ...meta, [key]: value })
  }
  return (
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
                  * Nhận đăng ký và hoàn tất lệ phí: 26/07/2020 - 13/09/2020
                </li>
                <li className="mt-2">
                  * Nhận đăng ký và đặt cọc: 26/07/2020 - 06/09/2020
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
                  className="input h-16 rounded text-2xl p-4 mt-2"
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
                  className="h-16 rounded text-2xl p-4 mt-2"
                  name="nationalId"
                  placeholder="261506123"
                  validation={{ required: true }}
                />
                <FieldError name="fullName" className="error-message" />
              </div>
              <div className="flex flex-col mt-8">
                <Label name="phoneNumber" className="text-lg">
                  Số điện thoại
                </Label>
                <TextField
                  className="h-16 rounded text-2xl p-4 mt-2"
                  name="phoneNumber"
                  placeholder="0913173626"
                  validation={{ required: true }}
                />
                <FieldError name="fullName" className="error-message" />
              </div>
              <div className="flex flex-col mt-8">
                <Label className="text-lg">Ngày sinh</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <NumberField
                    className="h-16 rounded text-2xl p-4 mt-2"
                    type="text"
                    name="dayOfBirth"
                    placeholder="31"
                    validation={{ required: true }}
                  />
                  <NumberField
                    className="h-16 rounded text-2xl p-4 mt-2"
                    type="text"
                    name="monthOfBirth"
                    placeholder="04"
                    validation={{ required: true }}
                  />
                  <NumberField
                    className="h-16 rounded text-2xl p-4 mt-2"
                    type="text"
                    name="yearOfBirth"
                    placeholder="1996"
                    validation={{ required: true }}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Size áo</label>
                <GridRadio
                  list={['S', 'M', 'L', 'XL', 'XXL', 'Khác']}
                  onSelect={(value) => onChangeRadio('clothesSize')(value)}
                />
              </div>
            </div>
          </div>
          <hr className="mt-8 bg-gray-700" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Thông tin nhóm lại</h3>
              <span className="text-gray-500 text-opacity-75">
                Nhóm nhỏ, thời gian bạn sinh hoạt tại Ban thanh niên Gia Định
              </span>
            </div>
            <div className="">
              <div className="flex flex-col">
                <label className="text-lg">Nhóm nhỏ</label>
                <GridRadio
                  // eslint-disable-next-line prefer-spread
                  list={Array.apply(null, { length: 15 })
                    .map(Number.call, Number)
                    .map((i) => i + 1)}
                  cols={5}
                  onSelect={(value) => onChangeRadio('group')(value)}
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Thời gian nhóm lại</label>
                <GridRadio
                  list={['Dưới 3 tháng', 'trên 3 tháng']}
                  cols={2}
                  onSelect={(value) => onChangeRadio('joinAge')(value)}
                />
              </div>
            </div>
          </div>
          <hr className="mt-8 bg-gray-700" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Lệ Phí</h3>
              <span className="text-gray-500 text-opacity-75">
                Thông tin đóng cọc, cách đóng lệ phí
              </span>
            </div>
            <div className="">
              <div className="flex flex-col">
                <label className="text-lg">Mức lệ phí</label>
                <GridRadio
                  list={[
                    'Tiền cọc: 400.000đ',
                    'Sinh viên, thu nhập dưới 3 triệu: 700.000đ',
                    'Thu nhập 3-5 triệu: 950.000đ',
                    'Thu nhập trên 5-7 triệu: 1.150.000đ',
                    'Thu nhập trên 7 triệu: 1.350.000đ',
                  ]}
                  cols={1}
                  onSelect={(value) => onChangeRadio('paymentLevel')(value)}
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Dâng hiến:</label>
                <input
                  className="h-16 rounded text-2xl p-4 mt-2"
                  type="text"
                  name="phoneNumber"
                  placeholder="Nhập số tiền dâng..."
                />
              </div>
              <div className="flex flex-col mt-8">
                <label className="text-lg">Hình thức nộp lệ phí</label>
                <GridRadio
                  list={[
                    'Nộp trực tiếp cho Ban Tổ Chức',
                    'Nộp cho nhóm trưởng (tiền mặt)',
                  ]}
                  cols={1}
                  onSelect={(value) => onChangeRadio('paymentMethod')(value)}
                />
                <span className="text-gray-500 text-opacity-75">
                  Chi tiết về việc đăng ký liên hệ Thủ quỹ Ban Thanh Niên: Như
                  Ngọc 0902457367
                </span>
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
