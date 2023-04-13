import React from "react"
import validation from "../utils/validation"
import { loginURL } from "../utils/constant"
import withRouter from "../utils/withRouter"



class signIn extends React.Component{
    state={
        email:'',
        password:'',
        errors:{
            email:'',
            password:''
        }
    }

    handleChange=(event)=>{
        let {name,value}=event.target
        let errors={...this.state.errors}

        validation(errors,name,value)

        this.setState({[name]:value,errors})
    }

    handleSubmit=(event)=>{
        event.preventDefault()
        let {email,password}=this.state
        fetch(loginURL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
           body:JSON.stringify({user:{email,password}})
        })
        .then(res=>{
            if(!res.ok){
             return   res.json().then(({errors})=>{
                    return Promise.reject(errors)
                })
            }
            return res.json()
        })
        .then(({user})=>{
            console.log(user)
            this.props.updateUser(user)
            this.setState({email:'',password:''})
            this.props.navigate('/')
        }).catch((errors)=>this.setState((prevState)=>{
            return {
                ...prevState,
                errors:{
                    ...prevState.errors,
                    email:'Email or Password inCorrect'
                }
            }
        }))
    }
    
    render(){
        let {email,password,errors}=this.state
        return(
            <>
               <form className="forms" onSubmit={this.handleSubmit}>
                <h1 className="text-align font-2 margin-b-1 font-600">Sign in</h1>
                <p className="green text-align margin-b-1">Need an account?</p>
                <input
                 className="formInput" 
                 type="email" 
                 name='email' 
                 placeholder=" Email" 
                 value={email} required 
                 onChange={this.handleChange}
                 />
                <p className="red margin-b-1">{errors.email}</p>
                <input 
                className="formInput" 
                type="password" 
                name="password"
                 placeholder=" Password" 
                 value={password} required 
                 onChange={this.handleChange}
                 />
                <p className="red margin-b-1">{errors.password}</p>
                <div className="text-align-end">
                    <input 
                    disabled={errors.email || errors.password} 
                    className="formbtn" 
                    type="submit" 
                    value='Sign in'/>
                </div>
               </form>
            </>
        )
    }
        
}

export default  withRouter(signIn)