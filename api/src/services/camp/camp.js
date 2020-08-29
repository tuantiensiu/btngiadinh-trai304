import { db } from 'src/lib/db'

import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber'

export const formatPhoneNumber = (phoneNumber) => {
  const phoneUtil = PhoneNumberUtil.getInstance()
  const number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'VN')
  const formattedNumber = phoneUtil.format(number, PhoneNumberFormat.E164)
  return formattedNumber
}

export const campRegister = async ({ input }) => {
  if (input.meta) {
    const meta = JSON.parse(input.meta)
    let metaList = []
    for (const key in meta) {
      if (key in meta) {
        const newMeta = await db.meta.create({
          data: {
            key,
            value: String(meta[key]),
            type: 'string',
          },
        })
        metaList.push(newMeta)
      }
    }
    metaList = metaList.map((m) => ({
      id: m.id,
    }))

    const payload = {
      data: {
        fullName: input.fullName,
        nationalId: input.nationalId,
        phoneNumber: input.phoneNumber + '',
        birthday: input.birthday,
        meta: {
          connect: [...metaList],
        },
      },
    }
    const draftProfile = await db.draftProfile.create(payload)
    return draftProfile
  }
  return null
}
