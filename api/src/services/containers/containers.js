import { db } from 'src/lib/db'

export const containers = () => {
  return db.container.findMany()
}

export const container = ({ id }) => {
  return db.container.findOne({
    where: { id },
  })
}

export const createContainer = ({ input }) => {
  return db.container.create({
    data: input,
  })
}

export const updateContainer = ({ id, input }) => {
  return db.container.update({
    data: input,
    where: { id },
  })
}

export const deleteContainer = ({ id }) => {
  return db.container.delete({
    where: { id },
  })
}

export const Container = {
  profiles: (_obj, { root }) =>
    db.container.findOne({ where: { id: root.id } }).profiles(),
  host: (_obj, { root }) =>
    db.container.findOne({ where: { id: root.id } }).host(),
  type: (_obj, { root }) =>
    db.container.findOne({ where: { id: root.id } }).type(),
}
