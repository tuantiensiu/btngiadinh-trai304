import DraftProfileCell from 'src/components/DraftProfileCell'

const DraftProfilePage = ({ id }) => {
  return (
    <div className="gap-4 h-auto p-4 md:p-8 min-w-full max-w-md mx-auto">
      <DraftProfileCell id={id} />
    </div>
  )
}

export default DraftProfilePage

// const CampPostSubmitPage = ({ id }) => {
//   return (
//     <div className="gap-4 h-auto p-4 md:p-8 min-w-full max-w-md mx-auto">
//       <div>
//         <h1>Đăng Ký Thành Công</h1>
//         <ul>
//           <li>Chuyển khoản: Bạn đã đăng ký TKMT 2020.</li>
//           <li>
//             Vui lòng nộp lệ phí tại 0531002575122-Vietcombank-Trương Thanh Như
//             Ngọc
//           </li>
//           <li>- Nội dung:xxxx trước 13/09/2020. Chi tiết gọi 0902457367.</li>
//           <li>
//             Tiền mặt: Bạn đã đăng ký TKMT 2020. Vui lòng nộp lệ phí cho nhóm
//             trưởng trước 13/09/2020. Chi tiết gọi 0902457367.
//           </li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default CampPostSubmitPage
