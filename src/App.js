import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";

function App() {
    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState();

    function onInvoiceGenerateClick() {
        console.log("Hi");
        const selectedIds = products.filter(value => document.getElementById("checkbox-" + value.id).checked)
            .map(value => {
                return value.id;
            });
        console.log(selectedIds);
    }

    const getElements = async () => {
        const response = await fetch("http://localhost:8080/api/products")
            .then((data) => data.json())
            .then((data) => {
                setProducts(data);
                console.log("Successful GET");
            })
            .catch(reason => {
                setLoadingStatus(reason.toString());
                console.log("Fetch error: " + reason);
            });
    };

    console.log(products);

    useEffect(() => {
        getElements();
        setLoadingStatus("Loading...");
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
                    <p>{loadingStatus}</p>
                )}
                {products && products.map((product) => (
                    <tr key={"row-" + product.id}>
                        <td style={{border: '1px solid black'}}>{product.name}</td>
                        <td style={{border: '1px solid black'}}>{product.amount}</td>
                        <td style={{border: '1px solid black'}}><input type="checkbox" id={"checkbox-" + product.id}/>
                        </td>
                    </tr>
                ))}
            </table>
            {products ? (
                <button onClick={onInvoiceGenerateClick}>Generate Invoice from Selected</button>
            ) : (<div/>)}
        </div>
    );
}

export default App;
