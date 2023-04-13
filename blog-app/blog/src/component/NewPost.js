
function NewPost() {
    return (
        <>
            <div className="container">
                <form className="forms">
                    <h1 className=" font-2 font-600 text-align margin-b-1">Add Post</h1>
                    <input className="formInput margin-b-1" name="title" placeholder="Article Title" type="text" />
                    <input className="formInput margin-b-1" name="about" placeholder="What's the article about" type="text" />
                    <textarea className="formInput margin-b-1" name="description" placeholder="Write your article" type="text" />
                    <input className="formInput margin-b-1" name="tags" placeholder="Enter tags" type="text" />
                    <div className="text-align-end margin-b-1">
                    <input className="formbtn" type="submit" value="Publish Article" />
                    </div>

                </form>
            </div>

        </>
    )
}
export default NewPost