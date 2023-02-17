import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";

function App() {
    const [products, setProducts] = useState();

    const getElements = async () => {
        const response = await fetch("http://localhost:8080/api/products")
            .then((data) => data.json())
            .then((data) => {
                setProducts(data);
                console.log("Successful GET");
            });
    };

    console.log(products);

    useEffect(() => {
        getElements();
    }, []);
    return (
        <div className="App">
            <table>
                {products ? (
                    <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Include in Invoice</td>
                    </tr>
                ) : (
                    <p>Loading...</p>
                )}
                {products && products.map((product) => (
                    <tr key={product.id}>
                        <td style={{border: '1px solid black'}}>{product.name}</td>
                        <td style={{border: '1px solid black'}}>{product.amount}</td>
                        <td style={{border: '1px solid black'}}><input type="checkbox"/></td>
                    </tr>
                ))}
            </table>
            {products ? (
                <button>Generate Invoice from Selected</button>
            ) : (<div/>)}
        </div>
    );
}

export default App;
