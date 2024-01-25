import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Description = () => {
    const params = useParams();
    const {token} = params;
    const navigate = useNavigate();
  return (
    <div>{token}</div>
  )
}

export default Description