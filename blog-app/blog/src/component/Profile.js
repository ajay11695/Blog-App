import Posts from "./Posts";
import { useState ,useEffect} from "react";
import Pagination from './Pagination'
import { articlesURL, getProfileURL } from "../utils/constant";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

function Profile(props) {
    let [articles, setArticles] = useState([])
    let [activeTab, setActiveTab] = useState('author')
    let [profile, setProfile] = useState('')

    let username=useParams().username

    // console.log(useParams())

    function fetchData(){

        fetch(articlesURL + `/?${activeTab}=${username}`).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
            .then(data => {
                console.log(data)
               setArticles(data.articles)
            }).catch((error) => {
                console.log(error)
            })
    }

    

    const fetchprofile=()=>{
        fetch(getProfileURL + username).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
            .then(data => {
                // console.log(data)
                setProfile(data.profile)
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(()=>{
        fetchData()
        fetchprofile()
    },[])

    function handleTab(tab){
        setActiveTab(tab)
        fetchData()
    }

    // console.log(props.user)

    return (
        <div className="">
            <div className="flex column justify-center align-center profileHeader">
                <img src={profile.image} alt='user' />
                <h1 className="font-2 font-600 margin-t-1">{profile.username}</h1>
                {props.user && props.user.username===username?
                <Link to='/setting'><span className=" profileFollow margin-t-2 "><i className="fa-solid fa-gear"></i> Edit Profile Setting</span></Link>
                :
                <span className=" profileFollow margin-t-2 ">+ Follow {profile.username}</span>
            }
            </div>
            <div className="container">
                <nav className="profileNav">
                    <a href='#a' onClick={()=>{handleTab('author')}} className={activeTab === 'author' ? 'activeTab' : ''}>My Article</a>
                    <a href='#a' onClick={()=>{handleTab('favorited')}} className={activeTab === 'favorited' ? 'activeTab' : ''}>Favorite Article</a>
                    <hr />
                </nav>
                {articles.length === 0 ? <h1>No Article Found</h1> : <Posts articles={articles} />}
                <Pagination />
            </div>
        </div>
    )
}

export default Profile