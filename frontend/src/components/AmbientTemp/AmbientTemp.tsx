import GenericElement from '../GenericElement/GenericElement';
import React from 'react';

export default function AmbientTemp ({ temperature }: { temperature: number }) {
  return (
    <GenericElement
      title={"Thermal sensation"}
      isGridComp={true}
      component={
        <div className="flex flex-col gap-4 p-2">
          <span className="text-4xl">{temperature}º</span>
          <span>Less due to breezes</span>
        </div>
      }
    />
  )
}