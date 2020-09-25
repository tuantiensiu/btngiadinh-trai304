import { Link, routes } from '@redwoodjs/router'
import ProfileListItem from 'src/components/ProfileListItem'

const ContainerCard = ({ data }) => {
  const { id, name, type, note, capacity, profiles } = data
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4 bg-green-500 text-white">
        <div className="flex flex-row justify-between">
          <div className="font-bold text-xl mb-2">{name}</div>
          <span>
            {profiles.length}/{capacity}
          </span>
        </div>
        <p className="text-gray-400 text-base">{note}</p>
      </div>
      <ul>
        {profiles.map(({ profile }, index) => (
          <ProfileListItem key={profile.id} profile={profile} index={index} />
        ))}
      </ul>
      <div className="px-6 pt-4 pb-2">
        <Link
          to={routes.containers({ id })}
          className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          Xem
        </Link>
        <Link
          to={routes.editContainer({ id })}
          className="inline-block bg-yellow-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          Sửa
        </Link>
      </div>
    </div>
  )
}

export default ContainerCard
