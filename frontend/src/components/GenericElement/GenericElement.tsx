import { useEffect, useRef, useState } from 'react';

export default function GenericElement ({ title, component}: { title: string, component: JSX.Element}) {
  // const [elementHeight, setElementHeight] = useState(0);
  // const [titleHeight, setTitleHeight] = useState(0);

  const elementRef = useRef<HTMLDivElement>(null);
  const parentElementRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /*
  useEffect(() => {
    if(parentElementRef.current == null) return;
    if(titleRef.current == null) return;
    setElementHeight(parentElementRef.current.clientHeight);
    setTitleHeight(titleRef.current.clientHeight);

    function handleScroll() {
      if(parentElementRef.current == null) return;
      if(elementRef.current == null) return;
      if(titleRef.current == null) return;
      if(contentRef.current == null) return;

      const boundingsParent = parentElementRef.current.getBoundingClientRect()

      if(boundingsParent.y <= 50) {
        const diff = 50  - boundingsParent.y;
        const expected_height = elementHeight - diff;
        if(expected_height <= titleHeight)
          elementRef.current.style.height = `${titleRef.current.clientHeight}px`;
        else
          elementRef.current.style.height = `${expected_height}px`;
        parentElementRef.current.style.height = `${elementHeight}px`;
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    }

  }, [elementHeight]);

  */

  return (
    <div ref={parentElementRef} className="rounded-md relative flex flex-col justify-end">
      <div ref={elementRef} className="relative rounded-md overflow-y-hidden flex flex-col justify-end">
        {/* title */}
        <div ref={titleRef} className="w-full absolute top-0 z-50 p-2">
          <span className="text-gray-500">{title}</span>
        </div>
        {/* content */}
        <div ref={contentRef} className="w-full z-10 mt-8">
          {component}
        </div>
      </div>
    </div>
  )
}