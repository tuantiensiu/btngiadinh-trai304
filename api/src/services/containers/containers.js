import { db } from 'src/lib/db'

export const containers = () => {
  return db.container.findMany({ select: { type: true, host: true } })
}

export const container = ({ id }) => {
  return db.container.findOne({
    where: { id },
  })
}

export const createContainer = async ({ input }) => {
  const { containerTypeId, containerHostId, ...params } = input
  const cType = await db.containerType.findOne({
    where: { id: containerTypeId },
  })
  const cHost = await db.containerHost.findOne({
    where: { id: containerHostId },
  })

  const connectWithType = {
    type: {
      connect: { id: cType.id },
    },
  }
  const connectWithHost = cHost
    ? {
        host: {
          connect: { id: cHost.id },
        },
      }
    : undefined
  const connect = {
    ...connectWithType,
    ...connectWithHost,
  }

  if (cType) {
    return db.container.create({
      data: {
        ...params,
        ...connect,
      },
    })
  } else {
    throw new Error('Not found container type')
  }
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
