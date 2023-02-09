import logo from './logo.svg';
import React, { useState } from 'react';
import Icon from './components/Icon';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap'; 
import 'bootstrap/dist/css/bootstrap.css';
import "../src/App.css"
import { type } from '@testing-library/user-event/dist/type';

const itemArray = new Array(9).fill('empty');
const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  const reloadGame = () => {
      setIsCross(false)
      setWinMessage('')
      itemArray.fill("empty",0,9)
  }
  const checkWinner = () => {
    //ROW
    if(itemArray[0]===itemArray[1] && itemArray[0]===itemArray[2] && itemArray[0]!=="empty"){
      setWinMessage(`${itemArray[0]} won`)
    }
    if(itemArray[3]===itemArray[4] && itemArray[3]===itemArray[5] && itemArray[3]!=="empty"){
      setWinMessage(`${itemArray[3]} won`)
    }
    if(itemArray[6]===itemArray[7] && itemArray[6]===itemArray[8] && itemArray[6]!=="empty"){
      setWinMessage(`${itemArray[6]} won`)
    }

    //COLUMN
    if(itemArray[0]===itemArray[3] && itemArray[0]===itemArray[6] && itemArray[0]!=="empty"){
      setWinMessage(`${itemArray[0]} won`)
    }
    if(itemArray[1]===itemArray[4] && itemArray[1]===itemArray[7] && itemArray[1]!=="empty"){
      setWinMessage(`${itemArray[1]} won`)
    }
    if(itemArray[2]===itemArray[5] && itemArray[2]===itemArray[8] && itemArray[2]!=="empty"){
      setWinMessage(`${itemArray[2]} won`)
    }
    //Cross
    if(itemArray[0]===itemArray[4] && itemArray[0]===itemArray[8] && itemArray[0]!=="empty"){
      setWinMessage(`${itemArray[0]} won`)
    }
    if(itemArray[2]===itemArray[4] && itemArray[2]===itemArray[6] && itemArray[2]!=="empty"){
      setWinMessage(`${itemArray[2]} won`)
    }
   
  }
  const changeItem = index => {
    if(winMessage){
      return toast(winMessage,{type:"success"}); 
    }
    if(itemArray[index]=="empty"){
      itemArray[index]= isCross?"cross":"circle"
      setIsCross(!isCross)
    }else{
      toast("Already filled",{type:"error"})
    }
    checkWinner();

  }

  return (
    <Container className="p-5">
      <ToastContainer position='bottom-center' />
      
      <Row>
       
        <Col md={6} className="offset-md-3">
          {winMessage?(<div>
            <h1 className='text-success text-uppercase text-center'>{winMessage}</h1>
            <Button className='mb-3' onClick={reloadGame} block color='success'>Reload the Game</Button>
          </div>):(
            <h1 className='text-center turnhead mb-4'>{isCross?(<h1 className='crossCol'>Cross turns</h1>):(<h1 className='circleCol'>Circle turns</h1>)} </h1>
          )}
          <div className='grid'>
            {itemArray.map((item, index) => (
              <Card onClick={()=>{changeItem(index)}}>
                <CardBody className='box'>
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>

  );
}

export default App;
