import React from "react"
import validation from "../utils/validation"


class signIn extends React.Component{
    state={
        email:null,
        password:null,
        errors:{
            email:null,
            password:null
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
    }
    
    render(){
        let {email,password,errors}=this.state
        return(
            <>
               <form className="signin" onSubmit={this.handleSubmit}>
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

export default signIn