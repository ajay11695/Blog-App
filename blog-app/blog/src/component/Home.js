import React from "react";
import { Hero } from "./Hero";
import Posts from "./Posts";
import { articlesURL } from "../utils/constant"
import Tags from "./Tags";
import Pagination from "./Pagination";
import FeedNav from "./FeedNav";
import Footer from "./Footer";

class Home extends React.Component {
    state = {
        articles: null,
        articlesCount: 0,
        error: null,
        articlePerPage:10,
        activePageIndex:1,
        activeTab:'',
        activeloginTab:'yourfeed'
    }

    fetchData=()=>{
        const limit=this.state.articlePerPage
        const offset=(this.state.activePageIndex-1)*limit
        const tag=this.state.activeTab

        fetch(articlesURL + `/?limit=${limit}&offset=${offset}` + (tag && `&tag=${tag}`),{
            method:"GET",
           headers:{
            "Authorization":this.props.currentUser?`Token ${this.props.currentUser.token}`:''
           }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
            .then(data => {
                this.setState({
                    articles: data.articles,
                    articlesCount: data.articlesCount
                })
            }).catch((error) => {
                this.setState({ error: '!Not able fetch the article' })
            })
    }

    fetchAuthordata=(username)=>{
        console.log(username)
        fetch(articlesURL + `/?author=${username}`,{
            method:"GET",
            headers:{
                "Authorization":this.props.currentUser?`Token ${this.props.currentUser.token}`:''
            }
        }).then(res=>res.json()).then((data)=>{
            console.log(data)
            this.setState({
                articles: data.articles,
                articlesCount: data.articlesCount
            })
        })

    }

    componentDidMount() {
        if(this.props.currentUser){
            if(this.state.activeloginTab==='yourfeed'){
                this.fetchAuthordata(this.props.currentUser.username)
            }else{
                this.fetchData()
            }
        }else{
            this.fetchData()
        }
       
      }

    currentPageIndex=(index)=>{
        this.setState({activePageIndex:index},this.fetchData)
    }

    componentDidUpdate(_prevProps,preState){
        // console.log(_prevProps,preState)
        if(preState.activePageIndex !==this.state.activePageIndex || preState.activeTab !== this.state.activeTab || preState.activeloginTab !== this.state.activeloginTab){
            if(this.state.activeloginTab==='yourfeed' && this.props.currentUser){
                return this.fetchAuthordata(this.props.currentUser.username)
            }
            this.fetchData()
        }
    }

    removeTab=(name)=>{
        if (this.props.currentUser) {
            this.setState({activeloginTab:name,activePageIndex:1})
        }
        this.setState({activeTab:''})
    }

    addTab=(tag)=>{
        if (this.props.currentUser) {
            this.setState({activeloginTab:''})
        }
        this.setState({activeTab:tag})
    }

    render() {
        let { articles, articlesCount, error,articlePerPage ,activePageIndex,activeTab,activeloginTab} = this.state
        console.log(activeloginTab)
        return (
            <>
                <Hero />
                <section className="container flex justify-between margin-t-2">
                    <div className="width-75">
                        <FeedNav activeTab={activeTab} activeloginTab={activeloginTab} removeTab={this.removeTab} currentUser={this.props.currentUser}/>
                        <Posts articles={articles} error={error} currentUser={this.props.currentUser}  fetchData={this.fetchData}/>
                        <Pagination articlePerPage={articlePerPage} articlesCount={articlesCount} activePageIndex={activePageIndex} currentPageIndex={this.currentPageIndex}/>
                    </div>
                    <Tags addTab={this.addTab}/>
                </section>
                <Footer/>
            </>
        )
    }
}

export default Home