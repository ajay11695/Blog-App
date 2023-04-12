import { Link } from "react-router-dom"
import { Loader } from "./Loader"

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

    return (
        <>
            {articles && articles.map(article => <Article key={article.slug} {...article} />)}
        </>
    )

}

function Article(props) {
    let { author, createdAt, title, description, tagList, favoritesCount,slug } = props
    return (
        <div className="article">
            <div className="flex justify-between">
                <div className="flex">
                    <img src={author.image} alt={author.username} />
                    <div>
                        <h1 className="font-1 green">{author.username}</h1>
                        <p className="gray">{createdAt}</p>
                    </div>
                </div>
                <div className="heart flex justify-center align-center">
                    <span className="green">&hearts;</span>
                    <span className="green">{favoritesCount}</span>
                </div>
            </div>
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