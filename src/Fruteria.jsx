import { useState, useEffect } from 'react';
import productes from './productes.json';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function Timer() {
    const [date, setDate] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {
            const ahora = new Date()
        setDate(`${ahora.getHours()}h ${ahora.getMinutes()}m ${ahora.getSeconds()}s`)
        }, 1000);

        return () => clearInterval(interval);
        
    }, []); 

    return <h4>{date}</h4>;
}

function Fruteria() {
    const [cart, setCart] = useState([]);
    const fecha = new Date()

    function deleteItem(productId) {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }

    function addItem(product) {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    }

    return (
        <Container className="mt-4">
            <Row>
                {/* Left column: Products Grid */}
                <Col md={8}>
                    <h3>Productos</h3>
                    <Row className="g-3">
                        {productes.map(product => (
                            <Col md={4} sm={6} xs={6} key={product.id}>
                                <Card style={{ backgroundColor: 'lightgrey', height: '100%' }}>
                                    <Card.Img style={{ height: '6rem', objectFit: 'cover' }} variant="top" src="/R.jpeg"/>
                                    <Card.Body>
                                        <Card.Title>{product.nom}</Card.Title>
                                        <Card.Text>Preu: {product.preu}</Card.Text>
                                        <Button variant="primary" onClick={() => addItem(product)}>Comprar</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

                {/* Right column: Cart */}
                <Col md={4} >
                    <h3>Tu cesta</h3>
                    {cart.length === 0 ? (
                        <p>Aún no has añadido productos.</p>
                    ) : (
                        <>
                            <div className="d-flex flex-column gap-2" style={{padding: "1.5rem 1rem", borderRadius: "25px", backgroundColor:"rgb(111, 148, 111, 0.5)" }}>
                                {cart.map(item => (
                                    <Card key={item.id} style={{ backgroundColor: 'lightblue' }}>
                                        <Card.Body>
                                            <Card.Title>{item.nom} x {item.quantity}</Card.Title>
                                            <Card.Text>
                                                Total: {(item.preu * item.quantity).toFixed(2)} €
                                            </Card.Text>
                                            <Button variant="danger" onClick={() => deleteItem(item.id)}>Eliminar</Button>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                            <hr />
                            <p>
                                <strong>
                                    Total: {cart.reduce((sum, item) => sum + item.preu * item.quantity, 0).toFixed(2)} €
                                </strong>
                            </p>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export {Fruteria, Timer};