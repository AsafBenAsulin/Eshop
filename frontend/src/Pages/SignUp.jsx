import { Button, Container, Form, React, useState, Link,toast ,axios} from '../imports'
import Title from '../Components/Shared/Title'
import { useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../store.jsx'
import { useContext, useEffect } from 'react';
import { USER_SIGNIN } from "../Actions.jsx";
import { getError } from '../utils';


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const {state:{userInfo},dispatch: ctxDispatch } = useContext(Store)
  const {search} = useLocation();
  const redirectURL=new URLSearchParams(search);
  const redirectValue=redirectURL.get("redirect");
  const redirect = redirectValue ?redirectValue:"/";

  useEffect(() => {
  if(userInfo){
      navigate(redirect)
  }
  }, [navigate,redirect,userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const { data } = await axios.post("/api/v1/users/signup", { name:name,email: email, password: password });
        ctxDispatch({ type: USER_SIGNIN, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate(redirect);
      } else {
        toast.error("Passwords do not match");
      }

    } catch (error) {
      toast.error(getError(error));
    }
  }
  return (
    <Container className='small-container'>
      <Title title='Sign up' />
      <h1 className='"my-3'>Sign up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control required onChange={(e) => setName(e.target.value)} placeholder="Enter name"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">
            Sign in
          </Button>
        </div>
        <div className="mb-3">
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Log in</Link>
        </div>
      </Form>
    </Container>
  )
}

export default SignUp