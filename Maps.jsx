import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'

class FullScreenMap extends React.Component {
  state = {
    posts: []
  }

  // clickHandler = e => {
  //   console.log(e.currentTarget.dataset.id)
  //   let data = []
  //   let docid = {
  //     name: 'doctor_id',
  //     value: 44
  //   }
  //   data.push(docid)
  //   console.log(data)

  //   $.ajax({
  //     url: 'http://cse299.wp-expert.us:8001/api/get_presc_doctor',
  //     type: 'POST',
  //     data: data,
  //     dataType: 'text json',
  //     success: function (data, textStatus, jqXHR) {
  //       console.log(data)
  //     },

  //     error: function (jqXHR, textStatus, errorThrown) {
  //       // localStorage.removeItem("presc_user_token");
  //       // window.location.href = "/web-frontend/pages/examples/login.html";

  //       console.log([jqXHR, textStatus, errorThrown])
  //     },

  //     complete: function (jqXHR, textStatus) {
  //       // DO SOMETHING HERE IF YOU WISH TO
  //     }
  //   })
  // }
  componentDidMount () {
    let { doctor_id } = this.props.match.params
    console.log(doctor_id)

    axios
      .post(`http://cse299.wp-expert.us:8001/api/get_presc_doctor/`, {
        doctor_id: `${doctor_id}`
      })
      .then(response => {
        this.setState({
          posts: response.data
        })
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render () {
    // console.log(this.state)

    return (
      <div className='content'>
        <table className='table table-striped table-dark'>
          <thead>
            <tr>
              <th scope='col'>Prescription Id</th>
              <th scope='col'>Patient Name</th>
              <th scope='col'>Mobile No.</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => {
              return (
                <tr>
                  <th scope='row'>{post.prescription_id}</th>
                  <td>{post.name}</td>
                  <td>{post.phone_no}</td>
                  <td
                    className='btn btn-danger'
                    onClick={() => console.log(post.prescription_id)}
                  >
                    Print
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default FullScreenMap
