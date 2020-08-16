import DraftProfilesLayout from 'src/layouts/DraftProfilesLayout'
import DraftProfileCell from 'src/components/DraftProfileCell'

const DraftProfilePage = ({ id }) => {
  return (
    <DraftProfilesLayout>
      <DraftProfileCell id={id} />
    </DraftProfilesLayout>
  )
}

export default DraftProfilePage
