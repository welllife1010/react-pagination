import { useEffect, useState } from "react"
import { Pagination } from "./componenet/Pagination"
import Post from "./pages/Post"

function App() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error("something went wrong while requesting posts")
      })
      .then((posts) => {
        console.log(posts)
        setPosts(posts)
      })
      .catch((error) => setError(error.message))
  }, [])

  if (error) return <div>{error}</div>

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <Pagination
            data={posts}
            RenderComponent={Post}
            title="Posts"
            pageLimit={5}
            dataLimit={10}
          />
        </>
      ) : (
        <h1>No Posts to display</h1>
      )}
    </div>
  )
}

export default App
