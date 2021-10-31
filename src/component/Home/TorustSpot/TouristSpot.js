import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './TouristSpot.css';

const TouristSpot = () => {

    const [spiner, setSpiner] = useState(true);
    const history = useHistory();

    const [touristSpots, setTouristSpots] = useState([]);

    useEffect(() => {
        fetch('https://glacial-harbor-41487.herokuapp.com/tourService')
            .then(res => res.json())
            .then(data => {
                setTouristSpots(data);
                setSpiner(false);
            })
    }, [])



    const handleBookNow = (id)=>{
        history.push(`/booking/${id}`)

    }

    // if (spiner) {
    //     return <Spinner className="text-center" style={{textAlign:"center"}} animation="border" variant="primary"></Spinner>
    // }


    return (
        <div>
            <h1 className="text-center py-5 title">Our Tourist Spot</h1>
            <Container>
            {
                spiner&&<div className="text-center"><Spinner className="mx-auto" animation="border" variant="primary"></Spinner></div>
            }
                <Row className="g-1">
                    {
                        touristSpots.map(touristSpot => <Col md={4} sm={12} key={touristSpot._id}>
                            <div className="tour-card">
                                <div className="tour-card-img "><img src={touristSpot.img} alt="" /></div>
                                <div className="tour-card-info">
                                    <div className="tour-card-name">{touristSpot?.name}</div>
                                    <div className="tour-card-dec mt-2">{touristSpot.dec}</div>
                                    <div className="tour-card-btn mt-2 button text-center" onClick={()=>handleBookNow(touristSpot._id)}>Book Now</div>
                                </div>
                            </div>
                        </Col>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default TouristSpot;