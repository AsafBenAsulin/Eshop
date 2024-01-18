import React, { useEffect, useReducer } from 'react'
import Title from '../Components/Shared/Title'
import homePageReducer from '../../Reducers/homePageReducers.jsx'
import axios from 'axios'

const initialState = { loading: true, error: '', data: [] };

const HomePage = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState)
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: 'GET_REQUEST' });
      try {
        const { data } = await axios.get("http://localhost:8080/api/v1/product");
        dispatch({ type: 'GET_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'GET_FAIL', payload: error })
      }
    }
    getProducts()
  }, [])

  return (
    <div>
      <Title title='Home Page' />
      HomePage
    </div>
  )
}

export default HomePage