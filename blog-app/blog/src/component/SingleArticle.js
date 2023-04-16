import React from "react"
import { articlesURL } from "../utils/constant"
import { Loader } from "./Loader"
import { Link } from "react-router-dom"

class SingleArticle extends React.Component {
    state = {
        article: null,
        error: null
    }

    componentDidMount() {
        // console.log('loca', window.location.pathname.split('/article')[1].toString());
        const slug = window.location.pathname.split('/article')[1].toString()
        fetch(articlesURL + '/' + slug).then((data) => data.json()).then((data) => {
            this.setState({ article: data.article })
        }).catch(err => {
            this.setState({ error: 'Not able fetch article' })
        })
    }

    render() {
        let { article, error } = this.state
        let { author, createdAt, title, description, tagList } = { ...article }
        if (error) {
            return <p className="text-align font-1 margin-t-1">{error}</p>
        }

        if (!this.state.article) {
            return <Loader />
        }
        return (
            <div className="container">
                <div className="singleArticle">
                    <h2 className="font-2 font-600 margin-t-1 margin-b-1">{title}</h2>
                    <Link to={`/profiles/${author.username}`}>
                        <div className="flex article margin-b-1">
                            <img src={author.image} alt={author.username} />
                            <div>
                                <h1 className="font-1 green">{author.username}</h1>
                                <p className="gray">{createdAt}</p>
                            </div>
                        </div>
                    </Link>

                </div>
                <p className="gray margin-b-1">{description}</p>
                <div className="text-align-end">
                    {tagList.map(tag => <button key={tag} className="tagbtn">{tag}</button>)}
                </div>
                <div>
                    {this.props.user === null ?
                        <p className="text-align font-1 margin-t-2">
                            <Link to='signin'>SignIn</Link> or
                            <Link to='signup'> SignUp</Link> to add comments on this Article
                        </p>
                        : ''
                    }
                </div>
            </div>
        )
    }
}

export default SingleArticle