// import { useReducer } from 'react';
import { useEffect } from 'react';
import {  useState } from 'react';
import { useRef } from 'react';
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
  const [page,setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [isloading, setIsloading] = useState(false)
  

  const totalHits = useRef(null)

  useEffect(() => {
    if (query === '') {
      return
    }

    async function fetchGalleryImages() {
      try {
        setIsloading(true)
        const imageData = await fetchImages(query, page);

        totalHits.current = imageData.total

        const imagesHits = imageData.hits;
        
        if (imagesHits.length === 0) {
          toast.warning("No results were found for your search, please try something else.",
           {transition: Zoom, position: "top-center"})
          return
        }

        setArticles(state => [...state, ...imagesHits ])

      } catch (error) {
        setError(new Error(`Sorry something went wrong. ${error.message}`))

        toast.error(`Sorry something went wrong. ${error.message}`,{position: "top-right"})
      } finally {
        setIsloading(false)
      }
    }

    fetchGalleryImages()

  },[query, page])

  const handleFormSubmit = (query) => {
    setQuery(query)
    setPage(1)
    setArticles([])
  };

  const handleLoadMore = e => {
    setPage(state => state + 1)
  };

  const countImages = articles.length
  const totalImages = totalHits.current

    return (
    <Box display="grid" gridAutoColumns="1fr" gridGap="16px" pb={6} >

      <Searchbar  onSearhFormSubmit={handleFormSubmit} page={page} />
      
      {isloading && <Loader />}

      {error && <h1 style={{color: 'orangered', textAlign: 'center'}}>{error.message}</h1>}
      
      {countImages > 0 && <ImageGallery articlesHits={articles}   />}

      {(countImages > 0 && countImages < totalImages) && <Button onLoadMore={handleLoadMore} />}

      {countImages === totalImages && <Notification /> }

      <ToastContainer autoClose={3000}   theme="colored" pauseOnHover  />
    </Box>
  );
}

export default App;

















// function galleryReducer(state, {type, payload}) {

//   switch (type) {
//     case 'loading':
//       return {
//         ...state,
//         isloading: !state.isloading
//       }
//     case 'articles':
//       return {
//         ...state,
//         articles: [...state.articles, ...payload]
//       } 
//      case 'error':
//       return {
//         ...state,
//         error: new Error(`Sorry something went wrong. ${payload.message}`) 
//       }  
//      case 'showModal':
//       return {
//         ...state,
//         showModal: !state.showModal
//       } 
//      case 'loadMore':
//       return {
//         ...state,
//         page: state.page + payload
//       } 
//      case 'activIndex':
//       return {
//         ...state,
//         activIndex: state.articles[payload]
//       }  
//      case 'serchQuery':
//       return {
//         ...state,
//         query: payload
//       } 
//      case 'resetPage':
//         return {
//           ...state,
//           page: payload
//         } 
//      case 'resetArticles':
//         return {
//           ...state,
//           articles: payload
//         } 
//     default:
//       return state;
//   }
// }



// let totalHits = null

// const App = () => {
//   const [galleryState, dispatch] = useReducer(galleryReducer, {
//     page: 1,
//     query: '',
//     articles: [],
//     showModal: false,
//     activIndex: null,
//     isloading: false,
//     error: null,
//   })

//   const { page, query, articles, showModal, activIndex, isloading, error } = galleryState

//   useEffect(() => {
//     if (query === '') {
//       return
//     }

//     async function fetchGalleryImages() {
//       try {
//         dispatch({type: "loading"})

//         const imageData = await fetchImages(query, page);

//         totalHits = imageData.total

//         const imagesHits = imageData.hits;
        
//         if (imagesHits.length === 0) {
//           toast.warning("No results were found for your search, please try something else.",
//            {transition: Zoom, position: "top-center"})
//           return
//         }

//         dispatch({type: 'articles', payload: imagesHits})

//       } catch (error) {
//         dispatch({type: 'error', payload: error})

//         toast.error(`Sorry something went wrong. ${error.message}`,{position: "top-right"})
//       } finally {
//         dispatch({type: 'loading'})
//       }
//     }

//     fetchGalleryImages()

//   },[query, page])

//   const handleFormSubmit = (query) => {
//     dispatch({type: 'serchQuery', payload: query})
//     dispatch({type: 'resetPage', payload: 1})
//     dispatch({type: 'resetArticles', payload: []})
//   };

//   const handleLoadMore = e => {
//     dispatch({type: 'loadMore', payload: 1})
//   };

//   const toggleModal = () => {
//     dispatch({type: 'showModal' })
//   };

//   const handleImageClick = index => {
//     toggleModal();
//     return dispatch({type: 'activIndex', payload: index})
//   };

  
//   const countImages = articles.length

//     return (
//     <Box display="grid" gridAutoColumns="1fr" gridGap="16px" pb={6} >

//       <Searchbar  onSearhFormSubmit={handleFormSubmit} page={page} />
      
//       {isloading && <Loader />}

//       {error && <h1 style={{color: 'orangered', textAlign: 'center'}}>{error.message}</h1>}
      
//       {countImages > 0 && <ImageGallery articlesHits={articles}  onImageClick={handleImageClick} />}

//       { (countImages > 0 && countImages < totalHits) && <Button onLoadMore={handleLoadMore} />}

//       {countImages === totalHits && <Notification /> }

//       {showModal && (
//         <Modal onCloseModal={toggleModal}>
//           <img src={activIndex.largeImageURL} alt={activIndex.tags} />
//         </Modal>
//       )}

//       <ToastContainer autoClose={3000}   theme="colored" pauseOnHover  />
//     </Box>
//   );
// }

// export default App;





