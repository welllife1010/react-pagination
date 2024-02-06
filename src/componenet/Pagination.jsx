import { useState } from "react"

export function Pagination({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
}) {
  // dataLimit: The number of posts to be shown on each page. In our case, it will be 10.
  // pageLimit: The number of pages to be shown in the pagination. In our case, it will be 5 pages at a time.
  const [pages] = useState(Math.round(data.length / dataLimit)) // How many total pages
  const [currentPage, setCurrentPage] = useState(1)

  //console.log(currentPage)

  function goToNextPage() {
    setCurrentPage((page) => page + 1)
  }

  function goToPreviousePage() {
    setCurrentPage((page) => page - 1)
  }

  function changePage(e) {
    const pageNumberClicked = Number(e.target.textContent)
    setCurrentPage(pageNumberClicked)
  }

  // Return the number of posts equal to the dataLimit (10 posts in our case), which will then be displayed to the user.
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit
    return data.slice(startIndex, endIndex)
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, index) => start + index + 1)
  }

  return (
    <div>
      <h1>{title}</h1>

      {/* Show the posts, 10 posts at a time */}
      <div className="dataContainer">
        {getPaginatedData().map((d, index) => (
          <RenderComponent key={index} data={d} />
        ))}
      </div>

      {/* 
        Show the pagination 
        It consists of next and previous buttons
        along with page numbers, in our case, 5 page numbers at a time
    */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousePage}
          className={`prev ${currentPage === 1 ? "disable" : ""}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disable" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  )
}
