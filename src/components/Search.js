// import React from "react";
// import './Search.css';

// class Search extends React.Component {
//     state = {
//         search: "",
//         type: "all",
//         page: 1
//     }

//     handleKey = (event) => {
//         if (event.key === 'Enter') {
//             this.props.searchMovie(this.state.search, this.state.type, this.state.page)
//         }
//     }

//     handelFilter = (event) => {
//         this.setState(
//             () => ({ type: event.target.dataset.type }),
//             () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
//         );
//     }

//     prevPage = () => {
//         this.setState(
//             this.state.page > 1 ? { page: this.state.page - 1 } : { page: 1 },
//             () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
//         )
//     }

//     nextPage = () => {
//         this.setState(
//             { page: this.state.page + 1 },
//             () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
//         )
//     }

//     render() {
//         return (
//             <>
//                 <div className="search">
//                     <input
//                         type="search"
//                         placeholder="Search"
//                         value={this.state.search}
//                         onChange={(e) => this.setState({ search: e.target.value })}
//                         onKeyDown={this.handleKey}
//                     />
//                     <button
//                         className="btn"
//                         onClick={() => this.props.searchMovie(this.state.search, this.state.type, this.state.page)}
//                     >Search</button>
//                 </div>
//                 <div className="radio">
//                     <input type="radio" name="type" data-type="all" checked={this.state.type === 'all'} onChange={this.handelFilter} id="all" /> <label htmlFor="all">All</label>
//                     <input type="radio" name="type" data-type="movie" checked={this.state.type === 'movie'} onChange={this.handelFilter} id="movies" /> <label htmlFor="movies">Movies</label>
//                     <input type="radio" name="type" data-type="series" checked={this.state.type === 'series'} onChange={this.handelFilter} id="series" /> <label htmlFor="series">Series</label>
//                     <input type="radio" name="type" data-type="game" checked={this.state.type === 'game'} onChange={this.handelFilter} id="games" /> <label htmlFor="games">Games</label>
//                 </div>
//                 <div className="navigation">
//                     <button className="btn" onClick={this.prevPage}>Prev</button>
//                     <button className="btn" onClick={this.nextPage}>Next</button>
//                 </div>
//             </>
//         )
//     }
// }

// export default Search;










// import React from "react";
// import './Search.css';

// class Search extends React.Component {
//     state = {
//         search: "",
//         type: "all"
//     }

//     handleKey = (event) => {
//         if (event.key === 'Enter') {
//             this.handleSearch();
//         }
//     }

//     handleSearch = () => {
//         if (this.state.search.trim()) {
//             this.props.searchMovie(this.state.search, this.state.type);
//         }
//     }

//     handelFilter = (event) => {
//         const newType = event.target.dataset.type;
//         this.setState({ type: newType }, () => {
//             if (this.state.search.trim()) {
//                 this.props.searchMovie(this.state.search, newType);
//             }
//         });
//     }

//     render() {
//         return (
//             <>
//                 <div className="search">
//                     <input
//                         type="search"
//                         placeholder="Search"
//                         value={this.state.search}
//                         onChange={(e) => this.setState({ search: e.target.value })}
//                         onKeyDown={this.handleKey}
//                     />
//                     <button
//                         className="btn"
//                         onClick={this.handleSearch}
//                         disabled={!this.state.search.trim()}
//                     >
//                         Search
//                     </button>
//                 </div>
//                 <div className="radio">
//                     <input type="radio" name="type" data-type="all" checked={this.state.type === 'all'} onChange={this.handelFilter} id="all" /> 
//                     <label htmlFor="all">All</label>
                    
//                     <input type="radio" name="type" data-type="movie" checked={this.state.type === 'movie'} onChange={this.handelFilter} id="movies" /> 
//                     <label htmlFor="movies">Movies</label>
                    
//                     <input type="radio" name="type" data-type="series" checked={this.state.type === 'series'} onChange={this.handelFilter} id="series" /> 
//                     <label htmlFor="series">Series</label>
                    
//                     <input type="radio" name="type" data-type="game" checked={this.state.type === 'game'} onChange={this.handelFilter} id="games" /> 
//                     <label htmlFor="games">Games</label>
//                 </div>
//             </>
//         )
//     }
// }

// export default Search;





import React from "react";
import './Search.css';

class Search extends React.Component {
    state = {
        search: "",
        type: "all",
        page: 1
    }

    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.setState({ page: 1 }, () => {
                this.props.searchMovie(this.state.search, this.state.type, this.state.page);
            });
        }
    }

    handelFilter = (event) => {
        this.setState(
            () => ({ type: event.target.dataset.type, page: 1 }),
            () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
        );
    }

    handleSearchClick = () => {
        this.setState({ page: 1 }, () => {
            this.props.searchMovie(this.state.search, this.state.type, this.state.page);
        });
    }

    changePage = (newPage) => {
        this.setState(
            { page: newPage },
            () => { this.props.searchMovie(this.state.search, this.state.type, this.state.page) }
        );
    }

    renderPagination() {
        const { currentPage, totalPages } = this.props;
        const pages = [];

        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 1);

        
        if (currentPage <= 3) {
            endPage = Math.min(4, totalPages);
        }
        if (currentPage >= totalPages - 2) {
            startPage = Math.max(1, totalPages - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`btn ${currentPage === i ? 'active' : ''}`}
                    onClick={() => this.changePage(i)}
                >
                    {i}
                </button>
            );
        }

        return pages;
    }

    render() {
        const { currentPage, totalPages } = this.props;

        return (
            <>
                <div className="search">
                    <input
                        type="search"
                        placeholder="Search"
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onKeyDown={this.handleKey}
                    />
                    <button
                        className="btn"
                        onClick={this.handleSearchClick}
                    >Search</button>
                </div>
                <div className="radio">
                    <input type="radio" name="type" data-type="all" checked={this.state.type === 'all'} onChange={this.handelFilter} id="all" /> <label htmlFor="all">All</label>
                    <input type="radio" name="type" data-type="movie" checked={this.state.type === 'movie'} onChange={this.handelFilter} id="movies" /> <label htmlFor="movies">Movies</label>
                    <input type="radio" name="type" data-type="series" checked={this.state.type === 'series'} onChange={this.handelFilter} id="series" /> <label htmlFor="series">Series</label>
                    <input type="radio" name="type" data-type="game" checked={this.state.type === 'game'} onChange={this.handelFilter} id="games" /> <label htmlFor="games">Games</label>
                </div>
                
                {totalPages > 1 && (
                    <div className="navigation">
                        <button 
                            className="btn" 
                            onClick={() => this.changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        
                        {currentPage > 3 && totalPages > 5 && (
                            <>
                                <button 
                                    className="btn"
                                    onClick={() => this.changePage(1)}
                                >
                                    1
                                </button>
                                {currentPage > 4 && <span className="ellipsis">...</span>}
                            </>
                        )}
                        
                        {this.renderPagination()}
                        
                        {currentPage < totalPages - 2 && totalPages > 5 && (
                            <>
                                {currentPage < totalPages - 3 && <span className="ellipsis">...</span>}
                                <button 
                                    className="btn"
                                    onClick={() => this.changePage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}
                        
                        <button 
                            className="btn" 
                            onClick={() => this.changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </>
        )
    }
}

export default Search;