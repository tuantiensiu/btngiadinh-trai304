import Lottie from 'lottie-react-web'

import DraftProfileCell from 'src/components/DraftProfileCell'
import animation from './payment-pending.json'

const DraftProfilePage = ({ id }) => {
  return (
    <div className="gap-4 h-auto p-4 md:p-8 min-w-full max-w-md mx-auto">
      <Lottie
        style={{
          // position: 'absolute',
          width: '150px',
        }}
        options={{
          loop: true,
          animationData: animation,
        }}
      />
      <DraftProfileCell id={id} />
    </div>
  )
}

export default DraftProfilePage
