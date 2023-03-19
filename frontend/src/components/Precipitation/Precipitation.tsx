import GenericElement from '../GenericElement/GenericElement';
import React from 'react';

export default function Precipitation ({ precipitation }: { precipitation: number }) {
  return (
    <GenericElement
      title={"Precipitation"}
      isGridComp={true}
      component={
        <div className="h-24 flex flex-col justify-between p-2">
          <div className="flex flex-row flex-nowrap gap-2 items-end">
            <span className="text-4xl">{precipitation}</span>
            <span className="text-2xl self-end">mm</span>
          </div>
          <span>In the last 24h</span>
        </div>
      }
    />
  )
}
