import { useEffect, useReducer } from 'react'
import Title from '../Components/Shared/Title'
import homePageReducer from '../Reducers/homePageReducers.jsx'
import axios from 'axios'
import Loading from '../Components/Shared/Loading.jsx';
import MessageBox from '../Components/Shared/MessageBox.jsx';
import Products from '../Components/HomePage/Products.jsx';


const initialState = { loading: true, error: '', data: [] };

const HomePage = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState)
  const { loading, error, data } = state;
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: 'GET_REQUEST' });
      try {
        const { data } = await axios.get("http://localhost:8080/api/v1/product");
        dispatch({ type: 'GET_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'GET_FAIL', payload: error.message });
      }
    }
    getProducts();
  }, [])

  return (
    <div>
      <Title title='Home Page' />
      <div className='backgroundHomePage'>
        <img src="https://m.media-amazon.com/images/I/81d5OrWJAkL.SX3000.jpg" style={{ width: '100%' }} alt='backgroundHomePage' />
      </div>
      <div className='products'>
        {loading ? <Loading /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
          <Products products={data}></Products>
        )}
      </div>
    </div>
  )
}

export default HomePage