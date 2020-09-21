import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_CONTAINER_MUTATION = gql`
  mutation DeleteContainerMutation($id: String!) {
    deleteContainer(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const ContainersList = ({ containers }) => {
  const { addMessage } = useFlash()
  const [deleteContainer] = useMutation(DELETE_CONTAINER_MUTATION, {
    onCompleted: () => {
      addMessage('Container deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete container ' + id + '?')) {
      deleteContainer({ variables: { id }, refetchQueries: ['CONTAINERS'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Tên không gian</th>
            <th>Loại</th>
            <th>Ghi chú</th>
            <th>Sức chứa</th>
            <th>Cập nhật lúc</th>
            <th>Chủ không gian</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {containers.map((container) => (
            <tr key={container.id}>
              <td>{truncate(container.name)}</td>
              <td>{truncate(container.type.name)}</td>
              <td>{truncate(container.note)}</td>
              <td>{truncate(container.capacity)}</td>
              <td>{timeTag(container.updatedAt)}</td>
              <td>{truncate(container.host?.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.container({ id: container.id })}
                    title={'Show container ' + container.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editContainer({ id: container.id })}
                    title={'Edit container ' + container.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete container ' + container.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(container.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContainersList
