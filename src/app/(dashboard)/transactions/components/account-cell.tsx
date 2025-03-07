import React from 'react'

type AccountCell = {
  id:string;
  name:any;
}

function AccountCell({id, name}:AccountCell) {
  return (
    <div>{name}</div>
  )
}

export default AccountCell