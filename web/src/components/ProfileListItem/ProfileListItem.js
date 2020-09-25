import { Link, routes } from '@redwoodjs/router'
const ProfileListItem = ({ profile, index }) => {
  const meta = JSON.parse(profile.metaByKeys)
  return (
    <div className="flex flex-row justify-between p-4 hover:bg-yellow-500">
      <Link
        to={routes.draftProfile({ id: profile.id })}
        title={`Click để xem thông tin hồ sơ`}
        className="font-medium text-sm hover:text-blue-500"
      >
        {index + 1}. {profile.fullName}
      </Link>
      <span className="font-semibold text-sm">Nhóm {meta.group}</span>
    </div>
  )
}

export default ProfileListItem
