// import React from "react";
// import './Main.css';
// import MovieList from "../components/MovieList";
// import Preloader from "../components/Preloader";
// import Search from "../components/Search";

// class Main extends React.Component{
//     state = {
//         movies: [],
//         loading: true
//     }

//     componentDidMount(){
//         fetch('http://www.omdbapi.com/?i=tt3896198&apikey=714040eb&s=matrix')
//             .then(response => response.json())
//             .then(data => this.setState({movies: data.Search, loading: false}))
//     }

//     searchMovie = (str, type='all', page) => {
//         this.setState({loading: true})
//         fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=714040eb&s=${str}${type !== 'all' ? `&type=${type}` : ''}${`&page=${page}`}`)
//             .then(response => response.json())
//             .then(data => this.setState({movies: data.Search, loading: false}))
//     }

//     render(){
//         const {movies, loading} = this.state;
        
//         return(
//             <div className="main">
//                 <div className="wrap">
//                     <Search searchMovie={this.searchMovie} />
//                     {
//                         loading ? <Preloader /> : <MovieList movies={movies} />  
//                     }
                   
//                 </div>
//             </div>
//         )
//     }
// }

// export default Main;

// import React from "react";
// import './Main.css';
// import MovieList from "../components/MovieList";
// import Preloader from "../components/Preloader";
// import Search from "../components/Search";

// class Main extends React.Component{
//     state = {
//         movies: [],
//         loading: true
//     }

//     componentDidMount(){
//         this.searchMovie('matrix');
//     }

//     searchMovie = (str, type = 'all') => {
//         this.setState({ loading: true });
//         fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=714040eb&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
//             .then(response => response.json())
//             .then(data => this.setState({ 
//                 movies: data.Search || [], 
//                 loading: false 
//             }))
//             .catch(error => {
//                 console.error('Error:', error);
//                 this.setState({ movies: [], loading: false });
//             });
//     }

//     render(){
//         const { movies, loading } = this.state;
        
//         return(
//             <div className="main">
//                 <div className="wrap">
//                     <Search searchMovie={this.searchMovie} />
//                     {loading ? <Preloader /> : <MovieList movies={movies} />}
//                 </div>
//             </div>
//         )
//     }
// }

// export default Main;

import React from "react";
import './Main.css';
import MovieList from "../components/MovieList";
import Preloader from "../components/Preloader";
import Search from "../components/Search";

class Main extends React.Component{
    state = {
        movies: [],
        loading: true,
        totalResults: 0,
        currentPage: 1,
        totalPages: 0
    }

    componentDidMount(){
        fetch('http://www.omdbapi.com/?i=tt3896198&apikey=714040eb&s=matrix')
            .then(response => response.json())
            .then(data => {
                const totalPages = Math.ceil(data.totalResults / 10);
                this.setState({
                    movies: data.Search, 
                    loading: false,
                    totalResults: data.totalResults,
                    totalPages: totalPages
                })
            })
    }

    searchMovie = (str, type = 'all', page = 1) => {
        this.setState({loading: true})
        fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=714040eb&s=${str}${type !== 'all' ? `&type=${type}` : ''}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    const totalPages = Math.ceil(data.totalResults / 10);
                    this.setState({
                        movies: data.Search, 
                        loading: false,
                        totalResults: data.totalResults,
                        currentPage: page,
                        totalPages: totalPages
                    })
                } else {
                    this.setState({
                        movies: [],
                        loading: false,
                        totalResults: 0,
                        currentPage: 1,
                        totalPages: 0
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({loading: false});
            })
    }

    render(){
        const {movies, loading, currentPage, totalPages} = this.state;
        
        return(
            <div className="main">
                <div className="wrap">
                    <Search 
                        searchMovie={this.searchMovie} 
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                    {
                        loading ? <Preloader /> : <MovieList movies={movies} />  
                    }
                </div>
            </div>
        )
    }
}

export default Main;