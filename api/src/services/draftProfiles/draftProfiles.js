import { db } from 'src/lib/db'

export const draftProfiles = () => {
  return db.draftProfile.findMany()
}

export const draftProfile = ({ id }) => {
  return db.draftProfile.findOne({
    where: { id },
  })
}

export const createDraftProfile = ({ input }) => {
  return db.draftProfile.create({
    data: input,
  })
}

export const updateDraftProfile = ({ id, input }) => {
  return db.draftProfile.update({
    data: input,
    where: { id },
  })
}

export const deleteDraftProfile = ({ id }) => {
  return db.draftProfile.delete({
    where: { id },
  })
}

export const DraftProfile = {
  meta: (_obj, { root }) =>
    db.draftProfile.findOne({ where: { id: root.id } }).meta(),
}
