import React from 'react'
import $ from 'jquery'

class Icons extends React.Component {
  componentDidMount () {
    var loadJS = {
      init: function () {
        this.add_element()
        this.process_add_prescription()
      },
      add_element: function () {
        $(document).on('click', '.add-element-button', function () {
          let row_to_copy = $(this)
            .parent('div')
            .parent('.row')
            .parent('.box-header')
            .find('.row')
            .html()
          row_to_copy = "<div class='row'>" + row_to_copy + '</div>'

          $(row_to_copy).insertBefore(this)
        })
      },
      process_add_prescription: function () {
        $('#add_prescription_form').submit(function (event) {
          event.preventDefault()
          let data = $(this).serializeArray()
          let token = {
            name: 'token',
            value: localStorage.getItem('presc_user_token')
          }
          data.push(token)

          $.ajax({
            url:
              'http://cse299.wp-expert.us:8001/api/add_prescription/ fdsfsdfsdf',
            type: 'POST',
            data: data,
            dataType: 'text json',
            success: function (data, textStatus, jqXHR) {
              console.log(data)
              alert('Prescription added, ID - ' + data)
              // localStorage.setItem("presc_user_token", data.token);
              // window.location.href = "/web-frontend/";
            },

            error: function (jqXHR, textStatus, errorThrown) {
              // localStorage.removeItem("presc_user_token");
              // window.location.href = "/web-frontend/pages/examples/login.html";

              console.log([jqXHR, textStatus, errorThrown])
            },

            complete: function (jqXHR, textStatus) {
              // DO SOMETHING HERE IF YOU WISH TO
            }
          })
        })
      }
    }
    loadJS.init()
  }
  render () {
    return (
      <div className='content'>
        <div class='container'>
          <section className='content prescription_section'>
            <div className='row'>
              <div className='col-sm'>
                <div className='box box-warning prescription_box'>
                  <div className='box-body'>
                    <form id='add_prescription_form'>
                      <div className='content'>
                        <div className='row patient_details_row'>
                          <div className='col-md-12'>
                            <div className='box-header with-border'>
                              <h3 className='box-title'>Patient Details</h3>
                            </div>

                            <div className='box-body'>
                              <div className='row'>
                                <div className='col-md-3'>
                                  <label>Patient Name:</label>
                                  <input
                                    required
                                    name='patient_name'
                                    type='text'
                                    placeholder='Write patient name...'
                                    className='form-control'
                                  />
                                </div>
                                <div className='col-md-3'>
                                  <label>Patient Mobile No:</label>
                                  <input
                                    required
                                    name='patient_mobile_no'
                                    type='number'
                                    placeholder='8801xxxxxxxxx'
                                    className='form-control'
                                  />
                                </div>
                                <div className='col-md-3'>
                                  <label>Date of Birth:</label>
                                  <input
                                    required
                                    name='patient_dob'
                                    type='date'
                                    className='form-control'
                                    placeholder='yyyy-mm-dd'
                                  />
                                </div>

                                <div className='col-md-3'>
                                  <label>Date:</label>
                                  <input
                                    required
                                    name='presc_date'
                                    type='date'
                                    placeholder='yyyy-mm-dd'
                                    className='form-control'
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row patient_data_row'>
                          <div className='col-md-12'>
                            <div className='box-header with-border'>
                              <h3 className='box-title'>
                                Prescription Details
                              </h3>
                            </div>
                          </div>
                          <div className='col-md-4 patient_case_row'>
                            <div className='box-header comments_box'>
                              <h3 className='box-title'> Present Case</h3>
                            </div>
                            <div className='box-body pad'>
                              <textarea
                                name='comments'
                                className='textarea'
                                placeholder='Add your comments'
                                style={{
                                  width: '100%',
                                  height: '200px',
                                  fontSize: '14px',
                                  lineHeight: '18px',
                                  border: '1px solid #dddddd',
                                  padding: '10px'
                                }}
                              />
                            </div>
                            <div className='box-header comments_box'>
                              <h3 className='box-title'> Past Case</h3>
                            </div>
                            <div className='box-body pad'>
                              <textarea
                                name='comments'
                                className='textarea'
                                placeholder='Add your comments'
                                style={{
                                  width: '100%',
                                  height: '200px',
                                  fontSize: '14px',
                                  lineHeight: '18px',
                                  border: '1px solid #dddddd',
                                  padding: '10px'
                                }}
                              />
                            </div>
                            <div className='box-header with-border test_box'>
                              <h3 className='box-title'>Tests</h3>

                              <div className='row'>
                                <div className='col-md-4'>
                                  <label>Name:</label>
                                  <input
                                    type='text'
                                    name='test_name[]'
                                    placeholder='Test name'
                                    className='form-control'
                                  />
                                </div>

                                <div className='col-md-8'>
                                  <label>Comments:</label>
                                  <input
                                    type='text'
                                    name='test_comment[]'
                                    placeholder='Your comment'
                                    className='form-control'
                                  />
                                </div>
                              </div>

                              <div className='row'>
                                <div className='col-md-4'>
                                  <label>Name:</label>
                                  <input
                                    type='text'
                                    name='test_name[]'
                                    placeholder='Test name'
                                    className='form-control'
                                  />
                                </div>

                                <div className='col-md-8'>
                                  <label>Comments:</label>
                                  <input
                                    type='text'
                                    name='test_comment[]'
                                    placeholder='Your comment'
                                    className='form-control'
                                  />
                                </div>
                              </div>

                              <div
                                className='row add_btn'
                                style={{ paddingTop: '10px' }}
                              >
                                <div className='col-md-12 text-center '>
                                  <a className='btn btn-info add-element-button'>
                                    <i className='fa fa-plus' /> Add
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-8 patient_drug_row'>
                            <div className='box-header with-border drug_box'>
                              <h3 className='box-title'>Rx</h3>

                              <div className='row'>
                                <div className='col-md-2'>
                                  <label>Drug Type:</label>
                                  <select className='form-control'>
                                    <option selected>Choose..</option>
                                    <option value='1'>Tab.</option>
                                    <option value='2'>Cap.</option>
                                    <option value='3'>Syp.</option>
                                    <option value='4'>Inj.</option>
                                  </select>
                                </div>
                                <div className='col-md-4'>
                                  <label>Drug:</label>
                                  <input
                                    type='text'
                                    name='drug_name[]'
                                    placeholder='Drug name'
                                    className='form-control'
                                  />
                                </div>

                                <div className='col-md-3'>
                                  <label>Concentration:</label>
                                  <input
                                    name='drug_conc[]'
                                    type='text'
                                    placeholder='xx mg'
                                    className='form-control'
                                  />
                                </div>

                                <div className='col-md-3'>
                                  <label>Time:</label>
                                  <input
                                    name='drug_time[]'
                                    type='text'
                                    placeholder='x-x-x (Time to take)'
                                    className='form-control'
                                  />
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col-md-2'>
                                  <label>Drug Type:</label>
                                  <select className='form-control'>
                                    <option selected>Choose..</option>
                                    <option value='1'>Tab.</option>
                                    <option value='2'>Cap.</option>
                                    <option value='3'>Syp.</option>
                                    <option value='4'>Inj.</option>
                                  </select>
                                </div>
                                <div className='col-md-4'>
                                  <label>Drug:</label>
                                  <input
                                    type='text'
                                    name='drug_name[]'
                                    placeholder='Drug name'
                                    className='form-control'
                                  />
                                </div>

                                <div className='col-md-3'>
                                  <label>Concentration:</label>
                                  <input
                                    name='drug_conc[]'
                                    type='text'
                                    placeholder='xx mg'
                                    className='form-control'
                                  />
                                </div>

                                <div className='col-md-3'>
                                  <label>Time:</label>
                                  <input
                                    name='drug_time[]'
                                    type='text'
                                    placeholder='x-x-x (Time to take)'
                                    className='form-control'
                                  />
                                </div>
                              </div>
                              <div
                                className='row add_btn'
                                style={{ paddingTop: '10px' }}
                              >
                                <div className='col-md-12 text-center '>
                                  <a className='btn btn-info add-element-button'>
                                    <i className='fa fa-plus' /> Add
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className='box-header comments_box'>
                              <h3 className='box-title'>Comments</h3>
                            </div>
                            <div className='box-body pad'>
                              <textarea
                                name='comments'
                                className='textarea'
                                placeholder='Add your comments'
                                style={{
                                  width: '100%',
                                  height: '200px',
                                  fontSize: '14px',
                                  lineHeight: '18px',
                                  border: '1px solid #dddddd',
                                  padding: '10px'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='box-footer'>
                        <button
                          type='submit'
                          className='btn btn-danger pull-left'
                        >
                          Reset
                        </button>
                        <button
                          type='submit'
                          className='btn btn-success pull-right'
                        >
                          Confirm Prescription
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Icons
