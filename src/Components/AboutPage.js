import React ,{useEffect} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SetTheme.css';
import SetThemes from './SetThemes';
import { useDispatch, useSelector } from 'react-redux';
import {themeReducerAction} from '../store/Theme'


const AboutPage = () => {

  const isDark = useSelector(state => state.theme.darkTheme)
  const expenses = useSelector(state=> state.expenses.expenses)
  const dispatch = useDispatch();
     
    useEffect(()=>{
      
      const totalSpent = expenses.reduce((cumulative,curr)=> cumulative = cumulative + curr.amount,0);
      
    if(totalSpent > 999){
      dispatch(themeReducerAction.setDark(true))
     
      localStorage.setItem('theme','dark')
    }else if (totalSpent < 1000){
      dispatch(themeReducerAction.setDark(false))

      localStorage.setItem('theme','light')
    }
  
    },[expenses])

  return (
    <SetThemes>
    <Container className="mt-5 text-center">
  
      <Row>
        <Col>
          <img src='https://media.licdn.com/dms/image/D5612AQGplp7JKG6Iiw/article-cover_image-shrink_720_1280/0/1673950361361?e=2147483647&v=beta&t=NxzErCoXqQ-xwkHJZZkKGKYNA21hJh3oNMUJzNKQr9M' alt="Expense Tracker Logo" className="img-fluid mb-4" style={{ maxWidth: '200px' }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card  bg={isDark ? "dark" : "light" } className="shadow-lg p-4">
            <Card.Body style={{color: isDark ? 'white' : 'black'}} >
              <Card.Title  className="mb-4">About Expense Tracker</Card.Title>
              <Card.Text>
                Welcome to our Expense Tracker application! We understand that managing personal finances can be
                overwhelming at times, but with our simple, intuitive tool, you can easily track your expenses, set
                budgets, and gain insights into your spending habits.
              </Card.Text>
              <Card.Text>
                Our mission is to help you take control of your financial journey by providing a user-friendly
                platform to organize your daily expenses. Whether you're tracking groceries, entertainment, or
                transportation costs, the Expense Tracker keeps you informed and on track.
              </Card.Text>
              <Card.Text>
                Features:
                <ul style={{listStyleType:'none'}}>
                  <li>Easy-to-use expense tracker</li>
                  <li>Track expenses by categories</li>
                  <li>See detailed history of your spending</li>
                  <li>Simple and clean interface</li>
                </ul>
              </Card.Text>
              <Button variant="primary" href="/" className="mt-3">
                Start Tracking Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </SetThemes>
  );
};

export default AboutPage;
