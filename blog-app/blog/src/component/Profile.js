export function Profile(props){
    // console.log(props)
    return(
        <h1 className="font-2 font-600 margin-t-1 text-align">{props.user.username}</h1>
    )
}