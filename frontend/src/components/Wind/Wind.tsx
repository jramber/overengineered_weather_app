import GenericElement from '../GenericElement/GenericElement';
import React from 'react';
import ArrowIcon from '../Icons/ArrowIcon';

export default function Wind ({ windSpeed, windDirection}: { windSpeed: number, windDirection: number }) {

  function Direction ({ wind_direction }: { wind_direction: number }) {
    let rotateClass = 'rotate-0';

    if (wind_direction <= 22.5  || wind_direction > 337.5) rotateClass = 'rotate-90';
    else if (wind_direction <= 67.5)  rotateClass = 'rotate-45';
    else if (wind_direction <= 112.5) rotateClass = 'rotate-0';
    else if (wind_direction <= 157.5) rotateClass = 'rotate-minus-45';
    else if (wind_direction <= 202.5) rotateClass = 'rotate-minus-90';
    else if (wind_direction <= 247.5) rotateClass = 'rotate-minus-135';
    else if (wind_direction <= 292.5) rotateClass = 'rotate-180';
    else if (wind_direction <= 337.5) rotateClass = 'rotate-minus-225';

    return (
      <div className={`${rotateClass} justify-self-end self-end`} >
        <ArrowIcon size={30} color={"black"} />
      </div>
    )
  }

  return (
    <GenericElement
      title={"Wind"}
      isGridComp={true}
      component={
        <div className="h-24 flex flex-col justify-between p-2">
          <div className="flex flex-row flex-nowrap gap-2">
            <span className="text-4xl">{windSpeed}</span>
            <span className="text-xl self-end">km/h</span>
          </div>
          <div className="flex flex-row flex-nowrap justify-content-between gap-2">
            <span>Direction:</span>
            <Direction wind_direction={windDirection} />
          </div>
        </div>
      }
    />
  )
}
