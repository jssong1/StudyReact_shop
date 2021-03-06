// eslint-disable-next-line
import React,{useState} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import './App.css';
import { Navbar,Nav,NavDropdown,Button,Jumbotron } from 'react-bootstrap';
import Data from './data.js'
import Detail from './Detail.js';
import axios from 'axios';

function App() {
  let [shoes, setShoes] = useState(Data);
  let [count, setCount] = useState(1);
  let [stock, setStock] = useState([10,11,12]);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home </Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>   
        </Navbar.Collapse>
      </Navbar>
      

    <Switch>

      <Route exact path="/"> 
        <Jumbotron className="background">
          <h1>20% Seaon OFF</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        <div className="container">
          <div className="row">
          {shoes.map((a,i)=>{
            return  <Card shoes={shoes[i]} i={i}/>
          })}     
          </div>
        </div>
        <button className="btn btn-primary more"
        onClick={()=>{
    
          setCount(++count);
          console.log(count);
          count =2?          
          axios.get('https://codingapple1.github.io/shop/data'+count+'.json')
          .then((result)=>{
            //console.log(result.data);            
            setShoes([...shoes,...result.data]); //...????????? ?????? ????????? ???????????? ?????? ??????[]???????????? ????????? array ?????? 
            {shoes.map((a,i)=>{
              return  <Card shoes={shoes[i]} i={i}/>
            })}  
            document.querySelector('.more').style.display='none';
          }) // array/object ????????? ?????? JSON????????? ?????????!! axios??? ?????????????????? object??? ???????????? ????????????
          .catch(()=>{
            alert('error');
          })
          : null
        }}
        >?????????</button>
      </Route>
      <Route path="/detail/:id">
        <Detail shoes ={shoes} stock={stock} setStock={setStock}/>
      </Route>
      <Route path="/:id"> {/**URL ?????????????????? ??????; / ????????? ?????? ?????? ????????? ?????? ??? Route??? ?????????????????? */} 
        <div>???????????? route?????????</div>
      </Route>
      </Switch>
    </div>
  );
}
function Card(props){
 return (
 <div className="col-md-4">
    <img src={'https://codingapple1.github.io/shop/shoes'+(props.i+1)+'.jpg'} width="100%" />
    <h4>{props.shoes.title}</h4>
    <p>{props.shoes.content} & {props.shoes.price}</p>
  </div>)
}
export default App;
