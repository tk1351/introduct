import React, { FC, Fragment } from 'react'
import spinner from '../../../static/Spinner-1s-200px.gif'

const Spinner: FC = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </Fragment>
  )
}

export default Spinner
