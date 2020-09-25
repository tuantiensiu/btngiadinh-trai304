import { db } from 'src/lib/db'

export const containers = ({ containerTypeId }) => {
  // return db.container.findMany({ select: { type: true, host: true } })
  return db.container.findMany({
    where: {
      containerTypeId,
    },
  })
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
  const cHost = containerHostId
    ? await db.containerHost.findOne({
        where: { id: containerHostId },
      })
    : null

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

export const attachProfileToContainer = async ({ containerId, profileId }) => {
  try {
    const profileOnContainer = await db.profilesOnContainers.create({
      data: {
        profile: {
          connect: { id: profileId },
        },
        container: {
          connect: { id: containerId },
        },
      },
    })
    if (profileOnContainer) {
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

export const detachProfileFromContainer = async ({
  containerId,
  profileId,
}) => {
  try {
    await db.profilesOnContainers.delete({
      where: {
        containerId_profileId: {
          containerId,
          profileId,
        },
      },
    })
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export const Container = {
  profiles: async (_obj, { root }) => {
    const temp = await db.container
      .findOne({ where: { id: root.id } })
      .profiles({ select: { profile: true, container: true } })
    console.log(temp, null, 2)
    return temp
  },
  host: (_obj, { root }) =>
    db.container.findOne({ where: { id: root.id } }).host(),
  type: (_obj, { root }) =>
    db.container.findOne({ where: { id: root.id } }).type(),
}
