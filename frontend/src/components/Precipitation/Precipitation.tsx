import GenericElement from '../GenericElement/GenericElement';
import React from 'react';

export default function Precipitation ({ precipitation }: { precipitation: number }) {
  return (
    <GenericElement
      title={"Precipitation"}
      isGridComp={true}
      component={
        <div className="flex flex-col gap-4 p-2">
          <div className="flex flex-row flex-nowrap gap-2 items-end">
            <span className="text-4xl">{precipitation}</span>
            <span className="text-2xl">mm</span>
          </div>
          <span>In the last 24h</span>
        </div>
      }
    />
  )
}
