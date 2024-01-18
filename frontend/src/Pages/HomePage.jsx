import { useEffect, useReducer } from 'react'
import Title from '../Components/Shared/Title'
import homePageReducer from '../Reducers/homePageReducers.jsx'
import axios from 'axios'
import Loading from '../Components/Shared/Loading.jsx';
import MessageBox from '../Components/Shared/MessageBox.jsx';
import Products from '../Components/HomePage/Products.jsx';
import { GET_FAIL,GET_REQUEST,GET_SUCCESS } from '../Actions.jsx';

const initialState = { loading: true, error: '', data: [] };

const HomePage = () => {
  const [{ loading, error, data }, dispatch] = useReducer(homePageReducer, initialState);
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const { data } = await axios.get("/api/v1/product");
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: error.message });
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