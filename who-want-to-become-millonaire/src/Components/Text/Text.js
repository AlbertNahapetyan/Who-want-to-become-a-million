import React from 'react'

const Text = (props) => {
  return (
    <span className={props.className}>{props.children}</span>
  )
}

export default Text