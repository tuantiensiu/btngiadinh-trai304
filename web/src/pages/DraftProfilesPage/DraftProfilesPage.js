import DraftProfilesLayout from 'src/layouts/DraftProfilesLayout'
import DraftProfilesCell from 'src/components/DraftProfilesCell'
import SMSBalanceCell from 'src/components/SmsBalanceCell'

const DraftProfilesPage = () => {
  return (
    <DraftProfilesLayout>
      <div className="mt-8 flex flex-row justify-between">
        <SMSBalanceCell />
        <SMSBalanceCell />
      </div>
      <div className="mt-8">
        <DraftProfilesCell />
      </div>
    </DraftProfilesLayout>
  )
}

export default DraftProfilesPage
