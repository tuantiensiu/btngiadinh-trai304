import { db } from 'src/lib/db'

export const campRegister = async ({ input }) => {
  if (input.meta) {
    const meta = JSON.parse(input.meta)
    let metaList = []
    for (const key in meta) {
      if (key in meta) {
        const newMeta = await db.meta.create({
          data: {
            key,
            value: meta[key] + '',
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
