import DraftProfilesLayout from 'src/layouts/DraftProfilesLayout'
import DraftProfilesCell from 'src/components/DraftProfilesCell'
import SMSBalanceCell from 'src/components/SmsBalanceCell'

const DraftProfilesPage = () => {
  return (
    <DraftProfilesLayout>
      <SMSBalanceCell />
      <DraftProfilesCell />
    </DraftProfilesLayout>
  )
}

export default DraftProfilesPage
