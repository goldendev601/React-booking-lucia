import React, {useEffect} from "react";
import Row from "./Row";
import Typography from "@material-ui/core/Typography";
import Checkbox from '@material-ui/core/Checkbox';
import styled from "styled-components";
import { dateToMyDate, dateToMyTimeAMPM } from "utils";
import { markItineraryTaskCompleted } from "redux/features/itineraries/itinerariesSlice";
import {useDispatch, useSelector} from "react-redux";


const TravelersWrapper = styled.div`
  display: flex;
`;

const TravelersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  & > div:not(:first-child) {
    margin-top: 10px;
  }
`;

const Container = styled.div`
  & > div:not(:first-child) {
    margin-top: 20px;
  }
`;

const Tasks = ({ itineraryTasks, itineraryId }) => {
  const dispatch = useDispatch();

  const option = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }

  const [checked, setChecked] = React.useState([]);

  // const handleChange = (task) => {
  //   if (checked.indexOf(task.id) >= 0) {
  //     setChecked([...checked.filter(checkedItem => checkedItem != task.id)])
  //   } else {
  //     setChecked([...checked, task.id]);
  //   }
  // };

  const handleChange = (task) => {
    const apiPayload = {
      itineraryId: itineraryId,
      taskId: task.id
    }
    dispatch(markItineraryTaskCompleted(apiPayload));
    if (checked.indexOf(task.id) >= 0) {
      setChecked([...checked.filter(checkedItem => checkedItem != task.id)])
    } else {
      setChecked([...checked, task.id]);
    }
  };

  return (
    <Container>
      {
        itineraryTasks.length > 0 ? (
          <>
            {itineraryTasks.map((task, index) =>
              !task.isCompleted && (
                <TravelersWrapper key={index}>
                
                  
                    {
                      checked.indexOf(task.id) >= 0 ? (
                        <>
                          <Checkbox
                            checked={checked.indexOf(task.id) >= 0}
                            onChange={(e) => handleChange(task)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            disabled
                          />
                          <TravelersContainer>
                            <Row>
                                <Typography style={{textDecoration: 'line-through',  fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                  {task.title}
                                </Typography>
                            </Row>
                            {
                              task.deadline && (
                                <Row>
                                  <Typography style={{textDecoration: 'line-through',  fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '10px', lineHeight: '15px', opacity: '0.5'}}>
                                    Due on {dateToMyDate(task.deadline).toLocaleDateString('en-US', option)} {dateToMyTimeAMPM(task.deadline)}
                                  </Typography>
                                </Row>
                              )
                            }
                            
                            <Row>
                                <Typography style={{textDecoration: 'line-through',  fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '10px', lineHeight: '15px'}}>
                                  {task.notes}
                                </Typography>
                            </Row>
                          </TravelersContainer>
                        </>
                      ) : (
                        <>
                          <Checkbox
                            checked={checked.indexOf(task.id) >= 0}
                            onChange={(e) => handleChange(task)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                          <TravelersContainer>
                            <Row>
                                <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                  {task.title}
                                </Typography>
                            </Row>
                            {
                              task.deadline && (
                                <Row>
                                  <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '10px', lineHeight: '15px', opacity: '0.5'}}>
                                    Due on {dateToMyDate(task.deadline).toLocaleDateString('en-US', option)} {dateToMyTimeAMPM(task.deadline)}
                                  </Typography>
                                </Row>
                              )
                            }
                            
                            <Row>
                                <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '10px', lineHeight: '15px'}}>
                                  {task.notes}
                                </Typography>
                            </Row>
                          </TravelersContainer>
                        </>
                      )
                    }
                </TravelersWrapper>
              )
            )}
          </>
        ) : (
          <Typography component="span" style={{fontFamily: 'Montserrat', fontWeight: '400', fontSize: '14px', lineHeight: '20px', color: '#242424', opacity: '0.4'}}>
              No task added
          </Typography>
        )
      }
      
    </Container>
  );
}

export default Tasks;