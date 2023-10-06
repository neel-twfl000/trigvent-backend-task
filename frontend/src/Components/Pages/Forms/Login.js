import React, { useState } from 'react'
// import {}
import {API_URL} from '../../../Common'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function login(e){
        e.preventDefault()
        let url = API_URL+'login/'
        let data = {email, password}
        await axios.post(url, data).then(resp=>{
            console.log(resp)
            localStorage.setItem("user", JSON.stringify(resp.data))
            window.location.reload()
        }).catch(err=>{
            alert("Login Failed")
        })
        
    }

    return (

        <div className="card-body">
            <h4 className="card-title">Login Your Account</h4>

            

            <form className="forms-sample"
                onSubmit={(e)=>login(e)}
            >
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    name="email"
                    required placeholder="Email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    name="password"
                    required placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
            </form>
            
        </div>

    )
}

export default Login