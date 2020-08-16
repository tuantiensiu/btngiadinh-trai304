import gql from 'graphql-tag'

export const schema = gql`
  type DraftProfile {
    id: String!
    fullName: String!
    nationalId: String
    phoneNumber: String
    birthday: DateTime
    meta: [Meta]!
  }

  type Query {
    draftProfiles: [DraftProfile!]!
    draftProfile(id: String!): DraftProfile!
  }

  input CreateDraftProfileInput {
    fullName: String!
    nationalId: String
    phoneNumber: String
    birthday: DateTime
  }

  input UpdateDraftProfileInput {
    fullName: String
    nationalId: String
    phoneNumber: String
    birthday: DateTime
  }

  type Mutation {
    createDraftProfile(input: CreateDraftProfileInput!): DraftProfile!
    updateDraftProfile(
      id: String!
      input: UpdateDraftProfileInput!
    ): DraftProfile!
    deleteDraftProfile(id: String!): DraftProfile!
  }
`
