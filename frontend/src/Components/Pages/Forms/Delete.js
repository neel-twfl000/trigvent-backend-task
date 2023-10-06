import React, { useState, useEffect } from 'react'
import { API_URL , getHeader} from '../../../Common'
import axios from 'axios'
import {toast } from "react-toastify";

const Delete = ({data, loadDocumentData}) => {

    const [isDelete, setIsDelete] = useState(false)

    async function delete_document(){
        let url = API_URL+'document/'+data.id+'/'
        
        await axios.delete(url, getHeader()).then(resp=>{
            loadDocumentData()
            setIsDelete(true)
            toast.success("Successfully Deleted!")
        })
        .catch(err=>{
            toast.error(err.response.data.detail)
        })
    }

    useEffect(()=>{
        setIsDelete(false)
    }, [data.id])
    return (
        <div>
            <div className="card-body">
                <h4 className="card-title">Delete Document Id: {data.id}</h4>
                <p className="card-description"> {data.title.slice(0,20)} </p>

                {isDelete?
                <h2 className='text-success'>Successfully Deleted!</h2>
                :
                <h2 className='text-danger'>Are you sure want to delete!</h2>
                }
                
                    
                    <button type="submit" className="btn btn-danger mr-2"
                    onClick={delete_document}
                    disabled={isDelete}
                    >Delete</button>
                
            </div>
        </div>
    )
}

export default Delete