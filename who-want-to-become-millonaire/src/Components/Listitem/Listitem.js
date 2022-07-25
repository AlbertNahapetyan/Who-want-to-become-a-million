import React from 'react'

const Listitem = (props) => {
  return (
    <li className={props.className}>{props.children}</li>
  )
}

export default Listitem