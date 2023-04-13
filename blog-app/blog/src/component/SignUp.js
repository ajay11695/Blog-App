import React from "react"
import validation from "../utils/validation"
import { signUpURL } from "../utils/constant"
import withRouter from "../utils/withRouter"

class signUp extends React.Component{
    state={
        username:'',
        email:'',
        password:'',
        errors:{
            username:'',
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
        let {username,email,password}=this.state
        fetch(signUpURL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
           body:JSON.stringify({user:{username,email,password}})
        })
        .then(res=>{
            if(!res.ok){
              return  res.json().then(({errors})=>{
                return Promise.reject(errors)
              })
            }
            return res.json()
        })
        .then(({user})=>{
            console.log(user)
            this.props.updateUser(user)
            this.setState({username:'',email:'',password:''})
            this.props.navigate('/')
        }).catch((errors)=>this.setState({errors}))
    }
    
    render(){
        let {username,email,password,errors}=this.state
        return(
            <>
               <form className="forms" onSubmit={this.handleSubmit}>
                <h1 className="text-align font-2 margin-b-1 font-600">Sign up</h1>
                <p className="green text-align margin-b-1">Have an account?</p>
                <input
                 className="formInput" 
                 type="text" 
                 name='username' 
                 placeholder=" username" 
                 value={username} 
                 onChange={this.handleChange}
                 />
                  <p className="red margin-b-1">{errors.username}</p>
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
                    disabled={errors.email || errors.password || errors.username} 
                    className="formbtn" 
                    type="submit" 
                    value='Sign up'/>
                </div>
               </form>
            </>
        )
    }
        
}

export default withRouter(signUp)