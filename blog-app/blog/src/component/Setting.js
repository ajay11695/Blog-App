function Setting() {
    return (
        <>
            <div className="container">
                <form className="forms">
                    <h1 className=" font-2 font-600 text-align margin-b-1">Your Setting</h1>
                    <input className="formInput margin-b-1" name="username" placeholder="username" type="text" />
                    <input className="formInput margin-b-1" name="email" placeholder="email" type="email" />
                    <textarea className="formInput margin-b-1" name="bio" placeholder="Short bio about you" type="text" />
                    <input className="formInput margin-b-1" name="new password" placeholder="new password" type="password" />
                    <div className="text-align-end margin-b-1">
                    <input className="formbtn" type="submit" value="update Setting" />
                    </div>

                </form>
            </div>

        </>
    )
}
export default Setting