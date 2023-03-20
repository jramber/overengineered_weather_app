export default function GenericElement ({ title, component, isGridComp }: { title: string, component: JSX.Element, isGridComp?: boolean }) {
  function Title ({ isGridComp }: { isGridComp: boolean | undefined } ) {
    if(isGridComp)
      return (<div className="bg-light-grey w-full absolute top-0 z-50 p-2">
        <span className="text-gray-500">{title}</span>
      </div>)
    // default
    return (<div className="w-full absolute top-0 z-50 p-2">
      <span className="text-gray-500">{title}</span>
    </div>)
  }

  return (
    <div className="rounded-md relative flex flex-col justify-end">
      <div  className="relative rounded-md overflow-y-hidden flex flex-col justify-end">
        {/* title */}
        <Title isGridComp={isGridComp} />
        {/* content */}
        <div className={`w-full z-10 mt-8 ${isGridComp?'bg-light-grey':''}`}>
          {component}
        </div>
      </div>
    </div>
  )
}