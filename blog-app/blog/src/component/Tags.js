import React from "react";
import { tagsURL } from "../utils/constant";
import { Loader } from "./Loader";

class Tags extends React.Component {
    state = {
        tags: null,
        error: null
    }

    componentDidMount() {
        fetch(tagsURL).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
            .then(data => {
                this.setState({
                    tags: data.tags
                })
            }).catch((error) => {
                this.setState({ error: '!Not able fetch the tags' })
            })
    }

    render() {
        let { tags, error } = this.state
        return (
            <div className="tags">
                <h1 className="margin-b-1 font-600">Popular Tags</h1>
                {error && <p>{error}</p>}
                {
                    !tags ?
                        <Loader /> :
                        tags.map(tag=>
                            <button className="tagbtn btn2" key={tag} onClick={()=>{this.props.addTab(tag)}}>{tag}</button>
                            )
                }
            </div>
        )
    }

}

export default Tags