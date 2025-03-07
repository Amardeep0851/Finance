import React, { useMemo } from 'react';
import CreatableSelect from "react-select/creatable";
import {SingleValue} from "react-select"
type SelectProps = {
placeHolder?:string;
options:{label:string, value:string}[]
onCreate:(name:string) => void
value:string | null | undefined;
onChangeValue:(value?:SingleValue<{label:string, value:string}>) => void;
disabled:boolean;

}

function Select({placeHolder, options = [], onCreate, onChangeValue, value, disabled}:SelectProps) {

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value)
  },[options, value])
  
  const onSelect = (option:SingleValue<{label:string, value:string}>) => {
    onChangeValue(option?.value);
  }
  return (
    <CreatableSelect 
    placeholder={placeHolder}
    onCreateOption={onCreate}
    options={options}
    onChange={onSelect}
    value={formattedValue}
    className="text-sm"
    styles={{
      control: (base) => ({
        ...base,
        borderColor: '#e2e8f0',
        ':hover': {
          borderColor: '#e2e8f0',
        },
      }),
    }}
    />
  )
}

export default Select