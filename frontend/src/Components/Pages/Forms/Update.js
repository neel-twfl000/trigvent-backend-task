import React, { useState, useEffect } from 'react'
import { API_URL, getMultyHeaders } from '../../../Common'
import axios from 'axios'
import { toast } from "react-toastify";

const Update = ({ data, loadDocumentData }) => {
    const [state, setState] = useState({
        formData: {
            title: "",
            description: "",
            file: null,
            file_url: null
        }
    })

    async function updateDocs(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", state.formData.title)
        formData.append("description", state.formData.description)
        if (state.formData.file){
            formData.append("file", state.formData.file)
        }
        
        let url = API_URL + 'document/' + data.id + '/'
        await axios.patch(url, formData, getMultyHeaders()).then(resp => {
            toast.success("Successfully Updated")
            loadDocumentData()
            const ev = {target:{name:"file_url", value:resp.data.file}}
            onChangeHandle(ev)
        })
            .catch(err => {
                if (err.response.data.detail) {
                    toast.error(err.response.data.detail)
                    
                }
                else {
                    toast.err(err.message)
                }

            })
    }

    function onChangeHandle(e) {
        let form = state.formData
        if (e.target.name == "file") {
            form[e.target.name] = e.target.files[0]
        }
        else {
            form[e.target.name] = e.target.value
        }
        setState({ formData: form })
    }

    useEffect(() => {
        let form = state.formData
        form.title = data.title
        form.description = data.description
        form.file_url = data.file
        setState({ formData: form })
    }, [data.id])

    return (
        <div className="card-body">
            <h4 className="card-title">Update Documents Id: {data.id}</h4>
            <form className="forms-sample"
                onSubmit={(e) => updateDocs(e)}
            >
                <div className="form-group">
                    <label for="exampleInputUsername1">Title</label>
                    <input type="text" className="form-control" placeholder="Title"
                        name="title"
                        value={state.formData.title}
                        required
                        onChange={(e) => onChangeHandle(e)}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputUsername1">File</label>
                    <input type="file" className="form-control" placeholder="File"
                        name="file"
                        onChange={(e) => onChangeHandle(e)}
                    />
                    <label for="exampleInputUsername1">
                        <a target="blank" href={state.formData.file_url}>{state.formData.file_url}</a>
                        </label>
                </div>

                <div className="form-group">
                    <label for="exampleInputUsername1">Desc.</label>
                    <textarea className="form-control" placeholder="Desc"
                        name="description"
                        required
                        value={state.formData.description}
                        onChange={(e) => onChangeHandle(e)}
                    />
                </div>
                <button className="btn btn-success mr-2">Submit</button>

            </form>
        </div>
    )
}

export default Update