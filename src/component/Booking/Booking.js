import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useAuth from '../../hook/useAuth';
import './Booking.css';

const UserOrder = () => {
    const { id } = useParams();
    const {user} = useAuth();
    const [tourSpot, setTourSpot] = useState();
    const [spiner, setSpiner] = useState(true)

    useEffect(() => {
        fetch(`https://glacial-harbor-41487.herokuapp.com/tourService/${id}`)
            .then(res => res.json())
            .then(data => {
                setTourSpot(data);
                setSpiner(false)
            })
    }, [id]);


    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data =>{
        data.status = 'pending';
         console.log(data)
         setSpiner(true)
         fetch('https://glacial-harbor-41487.herokuapp.com/tourManage',{
             method: "POST",
             headers:{"content-type": "application/json"},
             body: JSON.stringify(data)
         })
         .then(res => res.json())
         .then(result => {
             console.log(result);
             if(result.acknowledged){
                 alert("Congratulations");
                 reset()
                 setSpiner(false);

             }

         })
        };

        if (spiner) {
            return <div className="text-center"><Spinner animation="border" className="mt-5 my-5 mx-auto text-center" variant="success"></Spinner></div>
        }


    return (
        <div>
            
            <Container>
                <Row>
                    <Col md={6} sm={12}>
                        <div className="card">
                            <div className="card-img"><img className="card-img-top" src={tourSpot?.img} alt="..." /></div>
                            <div className="card-name">{tourSpot?.name}</div>
                            <div className="card-dec">{tourSpot?.dec}</div>
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="tour-res-form">
                            <div className="tour-heading">Register Your Tour</div>
                            <form onSubmit={handleSubmit(onSubmit)} className="form-res">
                                <input required value= {user?.displayName} placeholder="Name" {...register("name")} />
                                <input required value= {user?.email} placeholder="Email" {...register("email")} />
                                <input required value= {tourSpot?.name} placeholder="Destination" {...register("destination")} />
                                <input required placeholder="Message" {...register("message")} />
                                <input className="btn btn-success" type="submit" />
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>


        </div>
    );
};

export default UserOrder;