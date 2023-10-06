import React, { useEffect, useState } from 'react'
import { getMultyHeaders, API_URL } from '../../../Common'
import axios from 'axios'
import {toast } from "react-toastify";

const AddData = ({loadDocumentData}) => {

  const [state, setState] = useState({
    formData:{
      title:"",
      description:"",
      file:null
    }
  })

  function onChangeHandle(e){
    let form = state.formData
    if (e.target.name == "file"){
      form[e.target.name] = e.target.files[0]
    }
    else{
      form[e.target.name] = e.target.value
    }
     
    setState({formData:form})
  }

  async function addDocs(e){
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", state.formData.title)
    formData.append("description", state.formData.description)
    formData.append("file", state.formData.file)

    let url = API_URL+'document/'
    await axios.post(url, formData, getMultyHeaders()).then(resp=>{
      toast.success("Added")
      loadDocumentData()
    })
    .catch(err=>{
      if (err.response.data.detail){
        toast.error(err.response.data.detail)
      }
      else{
        toast.err(err.message)
      }
      
    })

  }



  return (
    <div className="card-body">
      <h4 className="card-title">Add Document</h4>

      <form className="forms-sample"
        onSubmit={(e)=>addDocs(e)}
      >
        <div className="form-group">
          <label for="exampleInputUsername1">Title</label>
          <input type="text" className="form-control" placeholder="Title"
          name="title"
          value={state.formData.title}
          required
          onChange={(e)=>onChangeHandle(e)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputUsername1">File</label>
          <input type="file" className="form-control" placeholder="File" 
          name="file"
          required
          onChange={(e)=>onChangeHandle(e)}
          />
        </div>

        <div className="form-group">
          <label for="exampleInputUsername1">Desc.</label>
          <textarea className="form-control" placeholder="Desc" 
          name="description"
          required
          value={state.formData.description}
          onChange={(e)=>onChangeHandle(e)}
          />
        </div>
        <button className="btn btn-success mr-2">Submit</button>

      </form>
    </div>
  )
}

export default AddData