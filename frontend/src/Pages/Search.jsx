import React, { useEffect, useReducer, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import searchPageReducer from '../Reducers/searchPageReducer';
import axios from 'axios';
import { toast } from '../imports';
import { getError } from '../utils';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from '../Actions';


const prices = [
    { name: "$1-$50", value: "1-50" },
    { name: "$51-$200", value: "51-200" },
    { name: "$201-$1000", value: "201-1000" }];

const ratings = [
    { name: "4 stars and up", rating: 4 },
    { name: "3 stars and up", rating: 3 },
    { name: "2 stars and up", rating: 2 },
    { name: "1 stars and up", rating: 1 }]
const Search = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { search } = useLocation();

    const searchParams = new URLSearchParams(search);
    const category = searchParams.get('category') || 'all';
    const query = searchParams.get('query') || 'all';
    const price = searchParams.get('price') || 'all';
    const rating = searchParams.get('rating') || 'all';
    const order = searchParams.get('order') || 'newest';
    const page = searchParams.get('page') || 1;

    const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(searchPageReducer, { loading: true, error: "" });

    useEffect(() => {
        const getCategories = async () => {
            try {
                console.log("Hi");
                const { data } = await axios.get('/api/v1/product/categories');
                setCategories(data);
            } catch (error) {
                toast.error(getError(error))
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            try {
                dispatch({ type: GET_REQUEST });
                const { data } = await axios.get(
                    `/api/v1/product/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`
                );
                dispatch({ type: GET_SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: GET_FAIL, payload: getError(error) });
            }
        };
        getProducts();
    }, [category, order, page, price, query, rating]);

    return (
        <div>
            Hi
        </div>
    )
}

export default Search