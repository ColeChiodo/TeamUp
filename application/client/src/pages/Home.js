import '../Stylesheets/Home.css';

function Home() {
    return (
        <div className="search-bar">
            <label htmlFor="search">Search</label>
            <input type="text" id="search" name="search" placeholder="Search for games"></input>
        </div>
    )
}

export default Home