export const schema = gql`
  type Container {
    id: String!
    name: String!
    note: String
    profiles: [DraftProfile]!
    host: ContainerHost
    type: ContainerType!
    capacity: Int
    updatedAt: DateTime!
    createdAt: DateTime!
    containerTypeId: String!
    containerHostId: String
  }

  type Query {
    containers: [Container]
    container(id: String!): Container
  }

  input CreateContainerInput {
    name: String!
    note: String
    capacity: Int
    containerTypeId: String!
    containerHostId: String
  }

  input UpdateContainerInput {
    name: String
    note: String
    capacity: Int
    containerTypeId: String
    containerHostId: String
  }

  type Mutation {
    createContainer(input: CreateContainerInput!): Container!
    updateContainer(id: String!, input: UpdateContainerInput!): Container!
    deleteContainer(id: String!): Container!
  }
`
