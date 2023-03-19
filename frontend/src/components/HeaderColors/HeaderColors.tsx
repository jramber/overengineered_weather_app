export default function HeaderColors () {
  return (
    <div className="w-full h-32 fixed top-0 left-0 z-0">
      <div className="relative w-full h-128 overflow-hidden">
        <div className="bg-blue-50 w-128 h-128 border-2 border-blue-300 rounded-full absolute top-mainTop"></div>
        <div className="bg-blue-100 w-96 h-96 rounded-full absolute top-mainTop left-secondLeft"></div>
      </div>
    </div>
  )
}