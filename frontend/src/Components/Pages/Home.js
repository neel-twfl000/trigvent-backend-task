import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL , getUser, DATA_LIMIT} from '../../Common'
import Login from './Forms/Login'
import Delete from './Forms/Delete'
import Update from './Forms/Update'
import AddData from './Forms/AddData'
import { toast } from 'react-toastify'

const Home = () => {
  const q = new URLSearchParams(document.location.search)

  const [state, setState] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const [data, setData] = useState({})
  const [action, setAction] = useState("add")
  const [offset, setOffset] = useState(0)
  

  function setRender(action, obj){
    setAction(action)
    setData(obj)
  }

  async function load_data(url) {
    await axios.get(url).then(resp => {
      setState(resp.data)
      let x_offset = url.replace(`${API_URL}document/?limit=${DATA_LIMIT}&`, "").split('&')
      
      let offset_found = false

      for (let i of x_offset){
        if(i.startsWith("offset=")){
          offset_found = true
          let count = parseInt(i.replace("offset=",''))
          setOffset(count)
          break
        }
        else{
          setOffset(0)
        }
      }

    })
      .catch(err => {
        toast.error(err.message)
      })
  }


  function loadDocumentData(){
    let url = `${API_URL}document/?limit=${DATA_LIMIT}&q=`
    if (q.get('q')) {
      url = url + q.get('q')
    }
    load_data(url)
  }

  useEffect(() => {
    loadDocumentData()
  }, [])



  return (

    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12">
          <div className="d-sm-flex justify-content-between align-items-center transaparent-tab-border {">
            <ul className="nav nav-tabs tab-transparent" role="tablist">

              <li className="nav-item">
                <a className="nav-link active" id="business-tab" data-toggle="tab" href="#business-1" role="tab"
                  aria-selected="false">Documents</a>
              </li>

            </ul>
            <div className="d-md-block d-none">
              <a href="#" className="text-light p-1"
              onClick={()=>setAction("add")}
              ><i className="mdi mdi-view-dashboard"></i>
              </a>
              
            </div>
          </div>

          <div className="tab-content tab-transparent-content">
            <div className="tab-pane fade show active" id="business-1" role="tabpanel" aria-labelledby="business-tab">
              <div className="row">
                <div className="col-sm-7 grid-margin stretch-card">
                  <div className="card card-danger-gradient">
                    <div className="col-lg-12 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Document List ({state.count})</h4>
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th> ID </th>
                                <th> Uploader </th>
                                <th> Title </th>
                                <th> Description </th>
                                <th> File </th>
                                <th> Action </th>
                              </tr>
                            </thead>
                            <tbody>
                              {state.results.map((i, id) => (
                                <tr key={id}>
                                  <td>
                                    {i.id}
                                  </td>
                                  <td>
                                    {i.user}
                                  </td>
                                  <td>
                                    {i.title}
                                  </td>
                                  <td>
                                    {i.description}
                                  </td>
                                  <td className="py-1">
                                    <a href={i.file}>Download</a>
                                  </td>

                                  <td>
                                    <button className='btn btn-success sm mr-2'
                                    onClick={()=>setRender("view", i)}
                                    >View</button>
                                    <button className='btn btn-danger sm'
                                    onClick={()=>setRender("delete", i)}
                                    >Delete</button>
                                  </td>

                                </tr>
                              ))}

                              {state.results.length === 0 && (
                                <tr>
                                  <td> No data found! </td>
                                </tr>
                              )}
                            </tbody>

                          </table>



                          <div className="d-flex mt-4 flex-wrap">
                            <p className="text-muted">
                              Showing {offset+1} to {offset+DATA_LIMIT>state.count?
                              state.count
                              :
                              offset+DATA_LIMIT} data in Total {state.count} data
                              </p>

                            <nav aria-label="Page navigation example" className="ml-auto">
                              <ul className="pagination">

                                <li className="page-item">
                                  <button className="page-link text-danger"
                                    disabled={!state.previous}
                                    onClick={() => load_data(state.previous)}
                                    aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                  </button>
                                </li>

                                <li className="page-item">
                                  <a className="page-link text-success" href="#">
                                    {parseInt(offset/DATA_LIMIT)+1}
                                  </a>
                                </li>

                                <li className="page-item">
                                  <button className="page-link text-danger" aria-label="Next"
                                    disabled={!state.next}
                                    onClick={() => load_data(state.next)}
                                  >
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only" >Next</span>
                                  </button>
                                </li>

                              </ul>
                            </nav>


                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 grid-margin stretch-card">
                  <div className="card">
                    
                    

                    {getUser()?
                    <>
                    {action === "add"&&(
                      <AddData loadDocumentData={loadDocumentData}/>
                    )}
                    {action === "delete"&&(
                      <Delete data={data}
                      loadDocumentData={loadDocumentData}/>
                    )}
                    </>
                    :
                    action !== "view"&&(<Login/>)
                    }
                    

                    {action == "view"&&<Update data={data}
                    loadDocumentData={loadDocumentData}/>
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Home

