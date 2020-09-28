import { Link, routes } from '@redwoodjs/router'

const BulkSMSPage = () => {
  return (
    <>
      <h1>BulkSMSPage</h1>
      <p>Find me in "./web/src/pages/BulkSmsPage/BulkSmsPage.js"</p>
      <p>
        My default route is named "bulkSms", link to me with `
        <Link to={routes.bulkSms()}>BulkSMS</Link>`
      </p>
    </>
  )
}

export default BulkSMSPage
