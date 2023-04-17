import React from "react"
import { articlesURL } from "../utils/constant"
import { Loader } from "./Loader"
import { Link } from "react-router-dom"
import withRouter from "../utils/withRouter"

class SingleArticle extends React.Component {
    state = {
        article: null,
        error: null,
        commentErr: null,
        comments: []
    }

    slug = window.location.pathname.split('/article')[1].toString()

    fetchArticle = () => {
        fetch(articlesURL + '/' + this.slug)
            .then((data) => data.json()).then((data) => {
                this.setState({ article: data.article })
            }).catch(err => {
                this.setState({ error: 'Not able fetch article' })
            })
    }

    fetchcomment = () => {
        fetch(articlesURL + `/${this.slug}/comments`, {
            method: "GET",
            headers: {
                "Authorization": this.props.user ? `Token ${this.props.user.token}` : ''
            }
        })
            .then((data) => data.json()).then((data) => {
                this.setState({ comments: data.comments })
            }).catch(err => {
                this.setState({ commentErr: 'Not able fetch comment' })
            })
    }

    componentDidMount() {
        this.fetchArticle()
        this.fetchcomment()
    }

    handleComment = (e) => {
        e.preventDefault()
        const comment = e.target[0].value
        fetch(articlesURL + `/${this.slug}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${this.props.user.token}`
            },
            body: JSON.stringify({
                "comment": {
                    "body": comment
                }
            })
        }).then(res => res.json()).then(data => {
            this.fetchcomment()
            e.target[0].value = ''
        })
    }

    deleteComment = (id) => {
        fetch(articlesURL + `/${this.slug}/comments/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${this.props.user.token}`
            },
        }).then(res => res.json()).then(data => this.fetchcomment()).catch(err => console.log(err))
    }

    deletePost=()=>{
        fetch(articlesURL + `/${this.slug}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Token ${this.props.user.token}`
            },
        }).then(res => res.json()).then(this.props.navigate('/')).catch(err => console.log(err))
    }

    render() {
        let { article, error, comments } = this.state
        console.log(comments)
        let { author, createdAt, title, description, tagList,slug } = { ...article }
        if (error) {
            return <p className="text-align font-1 margin-t-1">{error}</p>
        }

        if (!this.state.article) {
            return <Loader />
        }
        return (
            <div className="container">
                {/*single article detail  */}

                <div className="singleArticle">
                    <h2 className="font-2 font-600 margin-t-1 margin-b-1">{title}</h2>
                    <Link to={`/profiles/${author.username}`}>
                        <div className="flex align-center article margin-b-1">
                            <img src={author.image} alt={author.username} style={{ width: '50px', height: '50px' }} />
                            <div>
                                <h1 className="font-1 green">{author.username}</h1>
                                <p className="gray">{createdAt}</p>
                            </div>
                        </div>
                    </Link>
                    {this.props.user && this.props.user.username === author.username &&
                        <div style={{margin:'10px 5rem'}}>
                            <Link to={`/article/${slug}/edit`}><button className="btn2" style={{marginRight:'1rem'}}>Edit Post</button></Link>
                            <button onClick={this.deletePost} className="btn2">Delete Post</button>
                        </div>
                    }

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
                <hr />
                {/* comment form */}
                <div className="container2">
                    {this.props.user &&
                        <form style={{ border: '1px solid gray' }} onSubmit={this.handleComment}>
                            <textarea name='comment' type='text' placeholder="write comment" style={{ border: 'none', height: "4rem", width: '98%' }}></textarea>
                            <div className="flex align-center justify-between" style={{ padding: '10px', background: 'rgb(218, 220, 221)' }}>
                                <div className="flex align-center" >
                                    <img src={this.props.user.image} alt={this.props.user.username} style={{ width: '30px', height: '30px' }} />
                                    <span>{this.props.user.username}</span>
                                </div>
                                <input className="formbtn" style={{ padding: "5px 10px" }} type="submit" value='post comment' />
                            </div>
                        </form>
                    }

                    {/* comment detail */}
                    {comments.length > 0 &&
                        <ul className="flex column">
                            {comments.map(comment =>
                                <div key={comment.id} style={{ border: '1px solid gray', marginTop: '1rem' }}>
                                    <p className="font-1" style={{ margin: '10px 5px' }}>{comment.body}</p>
                                    <div className="flex align-center justify-between" style={{ padding: '10px', background: 'rgb(218, 220, 221)' }}>
                                        <div className="flex align-center" >
                                            <img src={comment.author.image} alt={comment.author.username} style={{ width: '30px', height: '30px' }} />
                                            <span>{comment.author.username}</span>
                                        </div>
                                        <i onClick={() => { this.deleteComment(comment.id) }} className="fa-solid fa-trash-can curser"></i>
                                    </div>
                                </div>
                            )}
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(SingleArticle)