import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import "./DatabaseDemo.css";
import Particle from "../Particle";
export default function DatabaseDemo() {
  const [transactions, setTransactions] = useState([]);
  const [textAmt, setTextAmt] = useState("");
  const [textDesc, setTextDesc] = useState("");
  useEffect(() => {
    fetchData();// sau khi render 

  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/transaction'); // Thay thế URL bằng URL API thực tế
      setTransactions(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleButtonClick = async () => {
    try {
       await axios.post('/api/transaction', {
        amount: textAmt,
        desc: textDesc,
      }); 
      fetchData();
      setTextAmt("");
      setTextDesc("");
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/transaction/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete('/api/transaction');
      fetchData();
    } catch (error) {
      console.error('Error deleting all data:', error);
    }
  };
  return (
    <section className=" vh-100">
      <Particle />
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol md="12" xl="10">
            <h1 className="demo-heading p-4" >Demo DataBase</h1>
          </MDBCol>
          <MDBCol md="12"   >
            <MDBCard className="gradient-custom-2 text-white">
              <MDBCardBody className="p-4 text-white">

                <MDBTable className=" text-white mb-0" >
                  <MDBTableHead  >
                    <tr className="table-warning ">
                      <th scope="col">Amount<input className="form-control" id='textAmont' value={textAmt} type='text' onChange={(e) => setTextAmt(e.target.value)} placeholder="fill the amount" />
                      </th>
                      <th scope="col">Description <input className="form-control" id='textDescription' type='text' value={textDesc}
                        onChange={(e) => setTextDesc(e.target.value)} placeholder="fill the description" />
                      </th>
                      <th scope="col">
                        <div className="d-flex flex-column">
                          Id
                          <button className="btn" style={{ backgroundColor: "#4EA8DE", color: "#F2F2F2" }} onClick={handleButtonClick}>
                            Add
                          </button>
                        </div>
                      </th>
                      <th scope="col">
                        <div className="d-flex flex-column">
                          Action
                          <button className="btn" style={{ backgroundColor: "#4EA8DE", color: "#F2F2F2" }} onClick={handleDeleteAll}>
                            DeleteAll
                          </button>
                        </div>
                      </th>

                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {transactions.map((transaction, index) => (
                      <tr className="table-warning fw-normal">
                        <th>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="avatar 1"
                            style={{ width: "45px", height: "auto" }}
                          />
                          <span className="ms-2">{transaction.amount}</span>
                        </th>
                        <td className="align-middle">
                          <span>{transaction.description}</span>
                        </td>
                        <td className="align-middle">
                          <h6 className="mb-0">
                            <MDBBadge className="mx-2 text-center" color="danger">
                              priority   {transaction.id}
                            </MDBBadge>

                          </h6>
                        </td>
                        <td className="align-middle">
                          <button onClick={() => handleDelete(transaction.id)} >
                            <span> <MDBIcon fas icon="trash-alt" /></span>
                          </button>
                        </td>
                      </tr>
                    ))}

                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}