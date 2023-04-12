import { BrowserRouter as Router ,Routes, Route } from "react-router-dom";

import { Header } from "./component/Header";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import { NoMatch } from "./component/NoMatch";
import SingleArticle from "./component/SingleArticle";
import Footer from "./component/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/article/:slug' element={<SingleArticle />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
