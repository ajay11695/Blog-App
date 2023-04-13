import { Routes, Route } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Header } from "./component/Header";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import { NoMatch } from "./component/NoMatch";
import SingleArticle from "./component/SingleArticle";
// import Footer from "./component/Footer";
import { useEffect, useState } from "react";
import { localStorageKey } from "./utils/constant";
import { userVerifyURL } from "./utils/constant";
import { FullPageSpinner } from "./component/FullPageSpinner";
import { Profile } from "./component/Profile";
import NewPost from "./component/NewPost";
import Setting from "./component/Setting";
// import { dataContext } from "./component/BlogContext";

function App() {
  let [isLogged, setIsLogged] = useState(false)
  let [user, setUser] = useState(null)
  let [isVerifying, setIsVerifying] = useState(true)


  useEffect(() => {
    let key = localStorage[localStorageKey]
    if (key) {
      fetch(userVerifyURL, {
        method: "GET",
        headers: {
          authorization: `Token ${key}`
        }
      }).then(res => {
        if (!res.ok) {
          return res.json().then(({ error }) => {
            return Promise.reject(error)
          })
        }
        return res.json()
      }).then(({ user }) => updateUser(user)).catch(error => console.log(error))

    } else {
      setTimeout(() => setIsVerifying(false), 1000)
    }
  }, [])

  function updateUser(userDetail) {
    setIsLogged(true)
    setUser(userDetail)
    setIsVerifying(false)
    localStorage.setItem(localStorageKey, userDetail.token)
  }


  if (isVerifying) {
    return <FullPageSpinner />
  }

  return (
    <>
      <Header user={user} isLogged={isLogged} />
      {isLogged ? <AuthenticateApp user={user} />: <NotAuthenticateApp updateUser={updateUser} />
      }
    </>
  );
}

function AuthenticateApp(props) {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/new-post' element={<NewPost />} />
      <Route path='/setting' element={<Setting />} />
      <Route path='/profile' element={<Profile user={props.user} />} />
      <Route path='/article/:slug' element={<SingleArticle />} />
      <Route path='*' element={<NoMatch />} />
    </Routes>
  )
}

function NotAuthenticateApp(props) {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<SignIn updateUser={props.updateUser} />} />
      <Route path='/signup' element={<SignUp updateUser={props.updateUser} />} />
      <Route path='/article/:slug' element={<SingleArticle />} />
      <Route path='*' element={<NoMatch />} />
    </Routes>
  )
}

export default App;
