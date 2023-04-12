import { Link } from "react-router-dom"

function FeedNav(props){
    let {activeTab}=props
  return(
    <nav className="feedNav">
        <ul className="flex">
            <li onClick={props.removeTab}>
               <Link to='/' className={activeTab===''?'activeTab':''}>Global Feed</Link>
            </li>
            {activeTab && 
              <li>
                <Link className={activeTab && 'activeTab'}># {activeTab}</Link>
              </li>
            }
        </ul>
        <hr></hr>
    </nav>
  )
}

export default FeedNav