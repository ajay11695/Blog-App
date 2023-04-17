import Posts from "./Posts";
import { useState ,useEffect} from "react";
import { articlesURL, getProfileURL } from "../utils/constant";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Profile(props) {
    let [articles, setArticles] = useState([])
    let [activeTab, setActiveTab] = useState('author')
    let [profile, setProfile] = useState('')

    let username=useParams().username

    function fetchData(){
        fetch(articlesURL + `/?${activeTab}=${username}`,{
            method:"GET",
            headers:{
             "Authorization":props.user?`Token ${props.user.token}`:''
            }
        })
        .then(res => {
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
        fetch(getProfileURL + username,{
            method:"GET",
                headers:{
                 "Authorization":props.user?`Token ${props.user.token}`:''
                }
        }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json()
        })
            .then(data => {
                setProfile(data.profile)
            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(()=>{
        fetchData()
    },[activeTab,articles])

    useEffect(()=>{
        fetchprofile()
    },[username,articles])

    function handleTab(tab){
        setActiveTab(tab)
    }

    function handleFollow(following){
        console.log(following)
         if(following){
            fetch(getProfileURL + username+'/follow',{
                method:"DELETE",
                headers:{
                 "Authorization":props.user?`Token ${props.user.token}`:''
                }
            }).then(()=>fetchprofile())
         }else{
            fetch(getProfileURL + username+'/follow',{
                method:"POST",
                headers:{
                 "Authorization":props.user?`Token ${props.user.token}`:''
                }
            }).then(()=>fetchprofile())
         }
    }

    return (
        <div className="">
            <div className="flex column justify-center align-center profileHeader">
                <img src={profile.image} alt='user' />
                <h1 className="font-2 font-600 margin-t-1">{profile.username}</h1>
                {props.user && props.user.username===username?
                <Link to='/setting'><span className=" profileFollow margin-t-2 "><i className="fa-solid fa-gear"></i> Edit Profile Setting</span></Link>
                :
                <span onClick={()=>{handleFollow(profile.following)}} className=" profileFollow margin-t-2 curser"><strong className="font-1 font-600">{profile.following?'Unfollow':'Follow' } </strong> ({profile.username})</span>
            }
            </div>
            <div className="container">
                <nav className="profileNav">
                    <a href='#a' onClick={()=>{handleTab('author')}} className={activeTab === 'author' ? 'activeTab' : ''}>My Article</a>
                    <a href='#a' onClick={()=>{handleTab('favorited')}} className={activeTab === 'favorited' ? 'activeTab' : ''}>Favorite Article</a>
                    <hr />
                </nav>
                {articles.length === 0 ? <h1>No Article Found</h1> : <Posts articles={articles} currentUser={props.user} />}
            </div>
        </div>
    )
}

export default Profile