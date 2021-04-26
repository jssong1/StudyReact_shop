import {React,useEffect,useState} from 'react';
import { useHistory,useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

let Box = styled.div`
    padding : 20px`;
let Title= styled.h4`
    font-size : 25px;
    color : ${ props => props.색상 };
`;

function Detail(props){
    let history = useHistory();
    let { id } = useParams();
    let [alertModal, setAlertModal] = useState(true);
    let [inputData, inputData변경] = useState('');
    let shoes = props.shoes.find(function(data){
        return data.id==id;
    });
    useEffect(()=>{
        let Timer = setTimeout( ()=>{ setAlertModal(false) }, 2000);
        return ()=>{ clearTimeout(Timer) } //컴포넌트사라질때 타이머 없애주는 코드
    },[alertModal]); //1.Detail컴포턴트로드가 될때, 2.alertModal의 state가 변경될때만 실행


    return (
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6 mt-4">
                <h4 className="pt-5">{shoes.title}</h4>
                <p>{shoes.content}</p>
                <p>{shoes.price}</p>
                <button className="btn btn-danger"
                onClick={()=>{
                    props.setStock([9,10,11]) 
                }}>주문하기</button> 
                <button onClick={()=>{ history.goBack() }} className="btn btn-danger">뒤로가기</button> 
            </div>
            <Info stock={props.stock}></Info>
        </div>
        {/* <Box>
            <Title 색상="blue">안녕하세요1</Title>
            <Title 색상={'red'}>안녕하세요2</Title>
        </Box> */}
        { inputData }
    <input onChange={ (e)=>{ inputData변경(e.target.value) }}/>
        {
            alertModal===true
        ?(<div className="my-alert">
                <p>재고가 얼마 남지 않았습니다</p>
            </div>)
         :null
        }
        

    </div>  
    )
};
function Info(props){
    return (
      <p>재고 : {props.stock[0]}</p>
    )
  }
export default Detail 