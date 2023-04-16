// import { useState } from "react"
import { articlesURL } from "../utils/constant"
import withRouter from "../utils/withRouter"
import React from "react"

// function NewPost(props) {
//     let [article, setArticle] = useState({
//         title: '',
//         description: '',
//         body: '',
//         tagList: '',
//         errors:''
//     })

//     function handleChange(event) {
//         let { name, value } = event.target
//         setArticle((prevState=>{
//           return  {
//                 ...prevState,
//                 [name]:value,
//             }
//         }))
//     }

//     function handleSubmit(event){
//         event.preventDefault()
//         let {title,description,body,tagList}=article
//         fetch(articlesURL,{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json",
//                 authorization:`Token ${props.user.token}`
//             },
//            body:JSON.stringify({article:{title,description,body,tagList:tagList.split(',').map(tag=>tag.trim())}})
//         })
//         .then(res=>{
//             if(!res.ok){
//                 return   res.json().then(({errors})=>{
//                     return Promise.reject(errors)
//                 })
//             }
//             return res.json()
//         })
//         .then(({article})=>{
//             console.log(article)
            
//             setArticle({title:'',description:'',body:'',tagList:''})
//             props.navigate('/')
//         }).catch((errors)=>setArticle((prevState=>{
//             return {...prevState,errors}
//         })))
//     }

//     return (
//         <>
//             <div className="container">
//                 <form className="forms">
//                     <h1 className=" font-2 font-600 text-align margin-b-1">Add Post</h1>
//                     <p>{article.errors.title}</p>
//                     <input className="formInput margin-b-1" name="title" placeholder="Article Title" type="text" onChange={handleChange} />
//                     <p>{article.errors.description}</p>
//                     <input className="formInput margin-b-1" name="description" placeholder="What's the article about" type="text" onChange={handleChange} />
//                     <p>{article.errors.body}</p>
//                     <textarea className="formInput margin-b-1" name="body" placeholder="Write your article" type="text" onChange={handleChange} />
//                     <p>{article.errors.tagList}</p>
//                     <input className="formInput margin-b-1" name="tagList" placeholder="Enter tags" type="text" onChange={handleChange} />
//                     <div className="text-align-end margin-b-1">
//                         <input className="formbtn" type="submit" value="Publish Article" onClick={handleSubmit}/>
//                     </div>

//                 </form>
//             </div>

//         </>
//     )
// }

class NewPost extends React.Component{
    state={
        title: '',
        description: '',
        body: '',
        tagList: '',
        errors:''
    }

     handleChange=(event)=> {
        let { name, value } = event.target
        this.setState({
            [name]:value,
            errors:''
        })
    }

     handleSubmit=(event)=>{
        event.preventDefault()
        let {title,description,body,tagList}=this.state
        fetch(articlesURL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                authorization:`Token ${this.props.user.token}`
            },
           body:JSON.stringify({article:{title:title,description:description,body:body,tagList:tagList.split(',').map(tag=>tag.trim())}})
        })
        .then(res=>{
            if(!res.ok){
                return   res.json().then(({errors})=>{
                    return Promise.reject(errors)
                })
            }
            return res.json()
        })
        .then(({article})=>{
            console.log(article)
            
            this.setState({title:'',description:'',body:'',tagList:''})
           this.props.navigate(`/`)
        }).catch((errors)=>this.setState((prevState=>{
            return {...prevState,errors}
        })))
    }

   render(){
    return (
        <>
            <div className="container">
                <form className="forms">
                    <h1 className=" font-2 font-600 text-align margin-b-1">Add Post</h1>
                    <p className="red">{this.state.errors.title}</p>
                    <input className="formInput margin-b-1" name="title" placeholder="Article Title" type="text" onChange={this.handleChange} />
                    <p className="red">{this.state.errors.description}</p>
                    <input className="formInput margin-b-1" name="description" placeholder="What's the article about" type="text" onChange={this.handleChange} />
                    <p className="red">{this.state.errors.body}</p>
                    <textarea className="formInput margin-b-1" name="body" placeholder="Write your article" type="text" onChange={this.handleChange} />
                    <p className="red">{this.state.errors.tagList}</p>
                    <input className="formInput margin-b-1" name="tagList" placeholder="Enter tags" type="text" onChange={this.handleChange} />
                    <div className="text-align-end margin-b-1">
                        <input className="formbtn" type="submit" value="Publish Article" onClick={this.handleSubmit}/>
                    </div>

                </form>
            </div>

        </>
    )
   }
}
export default withRouter(NewPost)