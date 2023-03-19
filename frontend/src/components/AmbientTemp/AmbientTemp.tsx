import GenericElement from '../GenericElement/GenericElement';
import React from 'react';

export default function AmbientTemp ({ temperature }: { temperature: number }) {
  return (
    <GenericElement
      title={"Thermal sensation"}
      isGridComp={true}
      component={
        <div className="h-24 flex flex-col justify-between p-2">
          <span className="text-4xl">{temperature}º</span>
          <span>Less due to breezes</span>
        </div>
      }
    />
  )
}