import { useState } from 'react'
import Select from 'react-select'

export const QUERY = gql`
  query CONTAINER_TYPES {
    containerTypes {
      value: id
      label: name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ containerTypes, onChange }) => {
  const [selected, setSelected] = useState(containerTypes[0])
  const changeOption = (opt) => {
    setSelected(opt)
    onChange(opt.value)
  }
  return (
    <Select onChange={changeOption} options={containerTypes} value={selected} />
  )
}
