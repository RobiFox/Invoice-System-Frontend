import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";

const url = "http://localhost:8080";

function App() {
    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState();

    const onInvoiceGenerateClick = async () => {
        const selectedIds = products.filter(value => document.getElementById("checkbox-" + value.id).checked)
            .map(value => {
                return value.id;
            });
        if (selectedIds.length == 0) {
            alert("No elements selected");
            return;
        }
        const response = await fetch(url + '/api/invoice/pdf?id=' + selectedIds.toString())
            .then((data) => data.json())
            .then((data) => {
                window.open(data.redirectUrl)
            })
            .catch(reason => {
                alert("Failed to open PDF file of Invoice: \n" + reason);
            });
    };

    const getProducts = async () => {
        const response = await fetch(url + "/api/products")
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

    useEffect(() => {
        getProducts();
        setLoadingStatus("Loading...");
    }, []);
    
    return (
        <div className="App">
            <table>
                {products ? (
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Include in Invoice</th>
                    </tr>
                ) : (
                    <p>{loadingStatus}</p>
                )}
                {products && products.map((product) => (
                    <tr key={"row-" + product.id}>
                        <td>{product.name}</td>
                        <td>{product.amount}</td>
                        <td><input type="checkbox" id={"checkbox-" + product.id}/>
                        </td>
                    </tr>
                ))}
            </table>
            {products ? (
                <button onClick={onInvoiceGenerateClick}>Generate Invoice from Selected</button>
            ) : null}
        </div>
    );
}

export default App;
