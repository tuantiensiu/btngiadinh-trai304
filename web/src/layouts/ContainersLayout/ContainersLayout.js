import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

const ContainersLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Flash timeout={1000} />
      <header className="rw-header">
        <div className="flex flex-row justify-between max-w-full rw-heading rw-heading-primary">
          <Link to={routes.draftProfiles()} className="rw-button">
            Danh sách trại viên
          </Link>
          <Link
            to={routes.containers({ filterType: 'ROOM' })}
            className="rw-button"
          >
            Danh sách phòng
          </Link>
          <Link
            to={routes.containers({ filterType: 'BUS' })}
            className="rw-button"
          >
            Danh sách xe
          </Link>
        </div>
        <Link to={routes.newContainer()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> Thêm
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default ContainersLayout
