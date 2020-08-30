import url from 'url'

import axios from 'axios'
import khongdau from 'khong-dau'
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber'

import { db } from 'src/lib/db'

export const formatPhoneNumber = (phoneNumber) => {
  const phoneUtil = PhoneNumberUtil.getInstance()
  const number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'VN')
  const formattedNumber = phoneUtil.format(number, PhoneNumberFormat.E164)
  return formattedNumber
}

export const template = (s, placeholders) => (payload, ...rest) => {
  let result = s
  for (const place in placeholders) {
    if (place in placeholders) {
      const replacer = placeholders[place]
      result = result.replace(
        new RegExp(`{${place}}`, 'g'),
        typeof replacer === 'function' ? replacer(payload, ...rest) : replacer
      )
    }
  }
  return result
}

export const sendSMS = async (phoneNumber, message) => {
  const baseURL =
    'http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get'
  const params = new url.URLSearchParams({
    Phone: phoneNumber,
    Content: khongdau(message),
    ApiKey: process.env.SMS_APIKEY || `3CA9D28C3975CDD621E54083012B54`,
    SecretKey: process.env.SMS_SECRETKEY || `192A989308B9820146A17F07164A94`,
    SmsType: `8`,
  })
  // console.log(baseURL, params.toString())
  if (process.env.SMS_ENABLED === true) {
    return axios.post(baseURL, params.toString())
  }
}

export const getMessage = (formPayload) => {
  // const url = `https://tkmt.btngiadinh.com/ho-so?id=${draftProfile.id}`
  const lastNationDigit = formPayload.data.nationalId.slice(
    formPayload.data.nationalId.length - 5,
    formPayload.data.nationalId.length - 1
  )
  // Get last name and toggle upper case
  let lastName = formPayload.data.fullName.split(' ')
  lastName = (lastName[lastName.length - 1] + '').toUpperCase()
  // Left pad the group name as XX string
  const group =
    formPayload.group < 10 ? `0${formPayload.group}` : formPayload.group

  const { offering, paymentLevel, paymentStage, paymentMethod } = formPayload

  const messageKey = paymentMethod === 'BANK' ? 'BANK' : 'PEOPLE' // Switch case logic here
  // console.log('messageKey', paymentMethod, paymentMethod === 'BANK')

  // Template variables
  const contact = '0902457367'
  const camp = 'TKMT'
  const action = paymentStage === 'FULL' ? 'nộp lệ phí' : 'nộp cọc'
  const bankProvider = 'Vietcombank'
  const bankID = `0531002575122`
  const bankName = `TRUONG THANH NHU NGOC`
  const who =
    paymentMethod === 'BANK'
      ? paymentMethod === 'MANAGER'
        ? 'nhóm trưởng'
        : 'thủ quỹ'
      : ''
  let amount = 0
  try {
    amount = parseInt(paymentLevel) + parseInt(offering > 0 ? offering : 0)
  } catch (err) {
    amount = paymentLevel
  }
  const remainDay = paymentMethod === 'BANK' ? 3 : 7
  const deadlineDay = '20/9'

  // Temp statement
  const bankStatement = `${bankProvider}/${bankID}/${bankName}`
  const transactionCode = `TKMT${group}${lastNationDigit}${lastName}`
  // const s = `${bankStatement}/${transactionCode}`

  const messageTemplates = {
    // DEMO: `Cam on ban da su dung dich vu tai {s}. Hay giup chung toi cai thien chat luong bang cach danh gia theo link ben duoi. Xin cam on Quy khach. {url}`,
    BANK: `Bạn đã đăng ký {camp}. Vui lòng {action} {amount} qua STK: {bankStatement},  nội dung CK: {transactionCode} trong vòng {remainDay} ngày kể từ ngày đăng ký và hoàn tất lệ phí trước ngày {deadlineDay}. Sau {remainDay} ngày hệ thống sẽ tự hủy đơn đăng ký nếu bạn chưa {action}.  Chi tiết liên hệ {contact}.`,
    PEOPLE: `Bạn đã đăng ký {camp}. Vui lòng {action} cho {who} {amount} trong vòng {remainDay} ngày kể từ ngày đăng ký và hoàn tất lệ phí trước ngày {deadlineDay}. Sau {remainDay} ngày hệ thống sẽ tự hủy đơn đăng ký nếu bạn chưa {action}.  Chi tiết liên hệ {contact}.`,
  }

  const variables = {
    contact,
    camp,
    action,
    who,
    amount,
    bankStatement,
    transactionCode,
    remainDay,
    deadlineDay,
  }
  const messageContent = template(messageTemplates[messageKey], variables)({})

  return [messageContent, variables]
}

export const campRegister = async ({ input }) => {
  if (input.meta) {
    const meta = JSON.parse(input.meta)
    const createMap = []
    for (const key in meta) {
      if (key in meta) {
        const payload = {
          key,
          value: String(meta[key]),
          type: 'string',
        }
        createMap.push(payload)
      }
    }

    const payload = {
      data: {
        fullName: input.fullName,
        nationalId: input.nationalId,
        phoneNumber: formatPhoneNumber(input.phoneNumber),
        birthday: input.birthday,
        meta: {
          create: createMap,
        },
      },
    }

    // This payload will not interact with database
    // Support for message response
    const patchedPayload = {
      ...payload,
      group: meta['group'],
      paymentLevel: meta['paymentLevel'],
      paymentStage: meta['paymentStage'],
      paymentMethod: meta['paymentMethod'],
      offering: meta['offering'],
    }
    const [message, variables] = await getMessage(patchedPayload)

    // Push message into meta storage
    payload.data.meta.create.push({
      key: 'message',
      value: message,
      type: 'string',
    })

    // console.log(JSON.stringify(payload, null, 2))

    const draftProfile = await db.draftProfile.create(payload)
    await sendSMS(payload.data.phoneNumber, message)
    return draftProfile
  }
  return null
}
