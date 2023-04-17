import { Link } from "react-router-dom"
import { Loader } from "./Loader"
import { articlesURL } from "../utils/constant"


function Posts(props) {
    let { articles, error } = props
    if (error) {
        return <>
            <p className=" font-1 margin-t-1">{error}</p>
        </>
    }

    if (!articles) {
        return <Loader />
    }

    if(articles.length===0){
        return <p>No Article now</p>
    }

    return (
        <>
            {articles && articles.map(article => <Article key={article.slug} {...article}  currentUser={props.currentUser} fetchData={props.fetchData}/>)}
        </>
    )

}

function Article(props) {
    let { author, createdAt, title, description, tagList, favoritesCount, slug,favorited } = props

     const handlefavorite=(favorite,slug)=>{
        if(favorite){
           fetch(articlesURL + `/${slug}/favorite`,{
               method:"DELETE",
              headers:{
               "Authorization":props.currentUser?`Token ${props.currentUser.token}`:''
              }
           }).then(()=>props.fetchData())
        }else{
           fetch(articlesURL + `/${slug}/favorite`,{
               method:"POST",
              headers:{
               "Authorization":props.currentUser?`Token ${props.currentUser.token}`:''
              }
           }).then(()=>props.fetchData())
        }
   }
 
    return (
        <div className="article">
            <div className="flex justify-between">
                {/* got to profile */}
                <Link to={`/profiles/${author.username}`}>
                    <div className="flex">
                        <img src={author.image} alt={author.username} style={{ width: '40px', height: '40px' }} />
                        <div className="curser">
                            <h1 className="font-1 green">{author.username}</h1>
                            <p className="gray">{createdAt}</p>
                        </div>
                    </div>
                </Link>
                {/* for favorite */}
                <div onClick={()=>{ handlefavorite(favorited,slug)}}>
                    <div className={favorited?'favorite heart curser':'heart curser'} >
                        <span className="gree">&hearts;</span>
                        <span className="gree">{favoritesCount}</span>
                    </div>
                </div>
            </div>
            {/* go to single article */}
            <Link to={`/article/${slug}`}>
                <h2 className="font-1 font-600 margin-t-1 black">{title}</h2>
                <p className="gray margin-b-1">{description}</p>
                <p className="gray">Read More...</p>
            </Link>
            <div className="text-align-end">
                {tagList.map(tag => <button key={tag} className="tagbtn">{tag}</button>)}
            </div>
            <hr />
        </div>
    )
}

export default Posts