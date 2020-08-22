import gql from 'graphql-tag'

export const schema = gql`
  input CreateCampRegisterInput {
    fullName: String!
    nationalId: String
    phoneNumber: String
    birthday: DateTime
  }

  type Mutation {
    campRegister(input: CreateCampRegisterInput!): DraftProfile
  }
`
