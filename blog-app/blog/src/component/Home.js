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
        activeTab:''
    }

    componentDidMount() {
      this.fetchData()
    }

    fetchData=()=>{
        const limit=this.state.articlePerPage
        const offset=(this.state.activePageIndex-1)*limit
        const tag=this.state.activeTab

        fetch(articlesURL + `/?limit=${limit}&offset=${offset}` + (tag && `&tag=${tag}`)).then(res => {
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

    currentPageIndex=(index)=>{
        this.setState({activePageIndex:index},this.fetchData)
    }

    componentDidUpdate(_prevProps,preState){
        // console.log(_prevProps,preState)
        if(preState.activePageIndex !==this.state.activePageIndex || preState.activeTab !== this.state.activeTab){
            this.fetchData()
        }
    }

    removeTab=()=>{
        this.setState({activeTab:''})
    }

    addTab=(tag)=>{
        this.setState({activeTab:tag})
    }

    render() {
        let { articles, articlesCount, error,articlePerPage ,activePageIndex,activeTab} = this.state
        return (
            <>
                <Hero />
                <section className="container flex justify-between margin-t-2">
                    <div className="width-75">
                        <FeedNav activeTab={activeTab} removeTab={this.removeTab}/>
                        <Posts articles={articles} error={error} />
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