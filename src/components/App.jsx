// import { useReducer } from 'react';
import { useEffect } from 'react';
import {  useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from './Box/Box';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from 'service/pixabay-api';
import Notification from './Notification/Notification';


const App = () => {
  const [page,setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [totalHits, setTotalHits] = useState(false);
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const CARD_HEIGHT = 260;
  
  useEffect(() => {
    if (query === '') {
      return
    }

    async function fetchGalleryImages() {
      try {
        setIsloading(true)
        const imageData = await fetchImages(query, page);

        setTotalHits(imageData.total);

        const imagesHits = imageData.hits;
        
        if (imagesHits.length === 0) {
          toast.warning("No results were found for your search, please try something else.",
           {transition: Zoom, position: "top-center"})
          return
        }

        setArticles(state => [...state, ...imagesHits ]);

      } catch (error) {
        setError(new Error(`Sorry something went wrong. ${error.message}`));

        toast.error(`Sorry something went wrong. ${error.message}`,{position: "top-right"});
      } finally {
        setIsloading(false)

      }
    }

    fetchGalleryImages()

  },[query, page])


  useEffect(() => {
    if (page > 1) {
      window.scrollBy({
        top: CARD_HEIGHT * 2,
        behavior: 'smooth'
      })
    }

  })

  const handleFormSubmit = (query) => {
    setQuery(query)
    setPage(1)
    setArticles([])
  };

  const handleLoadMore = e => {
    setPage(state => state + 1)
  };

  const countImages = articles.length

    return (
    <Box display="grid" gridAutoColumns="1fr" gridGap="16px" pb={6} >

      <Searchbar  onSearhFormSubmit={handleFormSubmit} page={page} />

      {isloading && <Loader />}

      {error && <h1 style={{color: 'orangered', textAlign: 'center'}}>{error.message}</h1>}
      
      {countImages > 0 && <ImageGallery articlesHits={articles}   />}

      {(countImages > 0 && countImages < totalHits) && <Button onLoadMore={handleLoadMore} />}

      {countImages === totalHits && countImages > 0 && <Notification /> }

      <ToastContainer autoClose={3000}   theme="colored" pauseOnHover  />
    </Box>
  );
}

export default App;

















// function galleryReducer(state, {type, payload}) {

//   switch (type) {
//     case 'setLoading':
//       return {
//         ...state,
//         isloading: !state.isloading
//       }
//        case 'setTotalHits':
//       return {
//         ...state,
//         totalHits: payload
//       }
//     case 'addArticles':
//       return {
//         ...state,
//         articles: [...state.articles, ...payload]
//       } 
//      case 'setError':
//       return {
//         ...state,
//         error: new Error(`Sorry something went wrong. ${payload.message}`) 
//       }  
//      case 'addNextPage':
//       return {
//         ...state,
//         page: state.page + payload
//       } 
//      case 'serchQuery':
//       return {
//         ...state,
//         query: payload
//       } 
//      case 'resetPage':
//         return {
//           ...state,
//           page: 1
//         } 
//      case 'resetArticles':
//         return {
//           ...state,
//           articles: []
//         } 
//     default:
//       return state;
//   }
// }


// const useGalleryArticles = () => {

//   const [galleryState, dispatch] = useReducer(galleryReducer, {
//     page: 1,
//     query: '',
//     articles: [],
//     totalHits: null,
//     isloading: false,
//     error: null,
//   })

//   return {
//     galleryState,
//     setLoading: () => dispatch({type: "setLoading"}),
//     setTotalHits: (data) => dispatch({type: 'setTotalHits', payload: data}),
//     addArticles: (imagesHits) => dispatch({type: 'addArticles', payload: imagesHits}),
//     setError: (error) => dispatch({type: 'setError', payload: error}),
//     serchQueryes: (query) => dispatch({type: 'serchQuery', payload: query}),
//     resetPage: () => dispatch({type: 'resetPage'}),
//     resetArticles: () => dispatch({type: 'resetArticles'}),
//     addNextPage: () => dispatch({type: 'addNextPage', payload: 1})
//   }


// }

// const App = () => {
  
//   const {
//     galleryState,
//     setLoading,
//     setTotalHits,
//     addArticles,
//     setError,
//     serchQueryes,
//     resetPage,
//     resetArticles,
//     addNextPage} = useGalleryArticles()

//   const { page, query, articles,  isloading, error, totalHits } = galleryState 

  
//   useEffect(() => {
//     if (query === '') {
//       return
//     }

//     async function fetchGalleryImages() {
//       try {
//         setLoading()

//         const imageData = await fetchImages(query, page);

//         setTotalHits(imageData.total)

//         const imagesHits = imageData.hits;
        
//         if (imagesHits.length === 0) {
//           toast.warning("No results were found for your search, please try something else.",
//            {transition: Zoom, position: "top-center"})
//           return
//         }
//         addArticles(imagesHits)

//       } catch (error) {
//         setError(error)

//         toast.error(`Sorry something went wrong. ${error.message}`,{position: "top-right"})
//       } finally {
//         setLoading()
//       }
//     }

//     fetchGalleryImages()

//   },[query, page, ])
//   // [query, page, setLoading, setTotalHits,addArticles, setError]

//   const handleFormSubmit = (query) => {
//     serchQueryes(query)
//     resetPage()
//     resetArticles()
//   };

//   const handleLoadMore = e => {
//     addNextPage()
//   };

//   const countImages = articles.length

//     return (
//     <Box display="grid" gridAutoColumns="1fr" gridGap="16px" pb={6} >

//       <Searchbar  onSearhFormSubmit={handleFormSubmit} page={page} />
      
//       {isloading && <Loader />}

//       {error && <h1 style={{color: 'orangered', textAlign: 'center'}}>{error.message}</h1>}
      
//       {countImages > 0 && <ImageGallery articlesHits={articles}   />}

//       { (countImages > 0 && countImages < totalHits) && <Button onLoadMore={handleLoadMore} />}

//       {countImages === totalHits && countImages > 0 && <Notification /> }

//       <ToastContainer autoClose={3000}   theme="colored" pauseOnHover  />
//     </Box>
//   );
// }

// export default App;




























































//  =====================================================================================
// const [galleryState, dispatch] = useReducer(galleryReducer, {
  //   page: 1,
  //   query: '',
  //   articles: [],
  //   totalHits: null,
  //   isloading: false,
  //   error: null,
  // })

   // dispatch({type: "setLoading"})

   // dispatch({type: 'setTotalHits', payload: imageData.total})

   // dispatch({type: 'addArticles', payload: imagesHits})

   // dispatch({type: 'setError', payload: error})

    // dispatch({type: 'setLoading'})

    // dispatch({type: 'serchQuery', payload: query})
    // dispatch({type: 'resetPage', payload: 1})
    // dispatch({type: 'resetArticles', payload: []})

      // dispatch({type: 'addNextPage', payload: 1})