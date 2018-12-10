import React from 'react'
import joeGardner2 from 'assets/img/faces/joe-gardner-2.jpg'

class Dashboard extends React.Component {
  render () {
    return (
      <div classNameName='content'>
        <img
          className='rounded mx-auto d-block'
          src={joeGardner2}
          alt='joe'
          style={{ paddingTop: '100px' }}
        />
        <div className='card-body text-center'>
          <h5 className='card-title' style={{ paddingTop: '5px' }}>
            Dr Niloy
          </h5>
          <p className='card-text'>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <ul className='list-group text-center'>
          <li className='list-group-item'>
            <strong>Phone No.:</strong>
          </li>
          <li className='list-group-item'>
            <strong>Email:</strong>
          </li>
        </ul>
      </div>
    )
  }
}

export default Dashboard
