import { db } from 'src/lib/db'

export const campRegister = ({ input }) => {
  return db.draftProfile.create({
    data: input,
  })
}
