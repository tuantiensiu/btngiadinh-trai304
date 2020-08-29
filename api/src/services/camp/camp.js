import { db } from 'src/lib/db'

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
        phoneNumber: input.phoneNumber + '',
        birthday: input.birthday,
        meta: {
          create: createMap,
        },
      },
    }
    const draftProfile = await db.draftProfile.create(payload)
    return draftProfile
  }
  return null
}
