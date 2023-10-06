import React, { useState } from 'react'
import { API_URL } from '../../../Common'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const [form, setForm] = useState({
    //     data:{
    //         first_name:"",
    //         email:"",
    //         phone:"+91",
    //         password:""
    //     }
    // })

    // function onChangeHandle(e){
    //     let newForm = form.data
    //     newForm[e.target.name] = e.target.value
    //     setForm({data:newForm})
    // }

    // async function register(e){
    //     e.preventDefault()
        
    //     console.log(form.data)
        
    // }

    async function login(e) {
        e.preventDefault()
        let url = API_URL + 'login/'
        let data = { email, password }
        await axios.post(url, data).then(resp => {
            console.log(resp)
            localStorage.setItem("user", JSON.stringify(resp.data))
            window.location.reload()
        }).catch(err => {
            console.log(err)
            toast.error(err.response.data.message)
        })

    }



    return (
        <>
            <div className="card-body">
                <h4 className="card-title">Login Your Account</h4>

                <form className="forms-sample"
                    onSubmit={(e) => login(e)}
                >
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            required placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                            required placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-success mr-2">Submit</button>
                </form>

            </div>


            {/* <div className="card-body">
                <h4 className="card-title">Register Your Account</h4>

                <form className="forms-sample"
                    onSubmit={(e) => register(e)}
                >
                    <div className="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control"
                            onChange={(e) => onChangeHandle(e)}
                            value={form.data.first_name}
                            name="first_name"
                            required placeholder="Enter your name." />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control"
                            onChange={(e) => onChangeHandle(e)}
                            value={form.data.email}
                            name="email"
                            required placeholder="Email" />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control"
                            onChange={(e) => onChangeHandle(e)}
                            value={password}
                            name="password"
                            required placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-success mr-2">Submit</button>
                </form>

            </div> */}
        </>

    )
}

export default Login