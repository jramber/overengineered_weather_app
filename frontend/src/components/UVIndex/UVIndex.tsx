import GenericElement from '../GenericElement/GenericElement';
import React, { useEffect, useState } from 'react';

export default function UVIndex ({ uvindex }: { uvindex: number }) {
  const [message, setMessage] = useState('Moderate');

  const getMessage = (uvindex: number): string => {
    if(uvindex < 2) return 'Low';
    if(uvindex < 5) return 'Moderate';
    if(uvindex < 10) return 'High';
    if(uvindex >= 11) return 'Extreme';
    return 'Moderate'
  }

  useEffect(() => {
    setMessage(getMessage(uvindex));
  }, [])

  return (
    <GenericElement
      title={"UV index"}
      isGridComp={true}
      component={
        <div className="flex flex-col gap-4 p-2">
          <span className="text-4xl">{uvindex}</span>
          <span>{message}</span>
        </div>
      }
    />
  )
}
