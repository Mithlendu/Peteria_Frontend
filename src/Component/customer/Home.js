import React, { useState } from "react";
import "./home.css";
import { Component } from "react";
import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import HomeCarousal from "./HomeCarousal";
import Swal from "sweetalert2";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      message: "",
      role: "",
    };
  }

  componentDidMount() {
    ApiService.fetchProducts().then((resp) => {
      this.setState({ products: resp.data });
      console.log(this.state.products);
    });
    let loginData = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;
    if (loginData) {
      loginData = JSON.parse(loginData);
      this.setState({ role: loginData.role });
    }

    setTimeout(() => {
      const reloadCount = sessionStorage.getItem("reloadCount");
      if (reloadCount < 1) {
        sessionStorage.setItem("reloadCount", String(reloadCount + 1));
        window.location.reload();
      } else {
        sessionStorage.removeItem("reloadCount");
      }
    }, 800);
  }

  addtocart = (p1) => {
    let loginData = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;

    if (loginData) {
      loginData = JSON.parse(loginData);
      if (loginData.id) {
        let cartData = { customerId: loginData.id, productId: p1.id };
        ApiService.addtoCardAPI(cartData)
          .then((resp) => {
            this.setState({ message: "Item Added to Cart !!!" });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "product added to your cart successfully...",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.resp.data.message,
              footer: '<a href="">Why do I have this issue?</a>',
            });
          });
      }
    } else {
      alert("please login");
      window.location.href = "/login";
    }
  };

  render() {
    return (
      <>
        <HomeCarousal></HomeCarousal>
        <div className="d-flex flex-wrap  justify-content-center align-items-center mt-4">
          {this.state.products.map((p1) => (
            <div
              className="container m-2"
              key={p1.id}
              style={{ width: "16rem" }}
            >
              <div
                className="card mb-3 p-2 "
                style={{
                  height: "26rem",
                  boxShadow:
                    " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
                }}
              >
                <div>
                  <img
                    className="card-img-top "
                    src={p1.imgUrl}
                    style={{ width: "200px", height: "250px" }}
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{p1.name}</h5>
                  <p className="card-text"> Price: Rs.{p1.price}/-</p>
                  <div className="col-6"></div>
                  <hr />

                  <div className="row d-flex justify-content-around ">
                    {this.state.role == "admin" ? (
                      <></>
                    ) : (
                      <div className="col-5" style={{ width: "50%" }}>
                        <button
                          className="  btn btn-primary w-100"
                          onClick={() => this.addtocart(p1)}
                        >
                          Add
                        </button>
                      </div>
                    )}
                    <div className="col-5" style={{ width: "50%" }}>
                      <Link
                        className="btn  btn-primary w-100"
                        to={{
                          pathname: "/ProductDetail",
                          state: { proId: p1.id },
                        }}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr color="red" size="5"></hr>
        <div className="d-flex flex-wrap  justify-content-center align-items-center mt-4">
        <div className="card  w-25 col-4 mx-4 border-5">
            <div className="row g-0">
              <div className="col-md-4">
                <img src="https://media.istockphoto.com/id/177302630/photo/a-dog-holds-a-comb-in-its-mouth.jpg?s=612x612&w=0&k=20&c=uambZDpUTUq2UcWTawYhkS-JLMl35YjxKCnZr_VXlTE="
                  style={{ width: "200px", height: "150px" }}
                  alt="Card image cap" />
              </div>
              <div className="col-md-8">
                <div className="card-body ">
                  <h5 className="card-title">Grooming</h5>
                  <p className="card-text">Get your pet groommed by experts </p>
                  <a href="#" className="btn btn-primary ">Book an Appointment</a>
                </div>
              </div>
            </div>
          </div>
          <div className="card  w-25 col-4 mx-4 border-5">
            <div className="row g-0">
              <div className="col-md-4">
                <img src="https://www.shutterstock.com/image-photo/chihuahua-dog-male-female-brown-260nw-729889414.jpg"
                  style={{ width: "150px", height: "150px" }}
                  alt="Card image cap" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Find Mate</h5>
                  <p className="card-text">Find perfect partner for your pet </p>
                  <a href="#" className="btn btn-primary">Book an Appointment</a>
                </div>
              </div>
            </div>
          </div>
          <div className="card  w-25  col-4 mx-4 border-5">
            <div className="row g-0">
              <div className="col-md-4">
                <img src="https://media.istockphoto.com/id/173656433/photo/border-collie-in-a-kennel.jpg?s=612x612&w=0&k=20&c=UX_8cz8SrU50WvYR1Q2EVkuR4Vx4hMASy7EZi4YKljs="
                  style={{ width: "150px", height: "150px" }}
                  alt="Card image cap" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Pet Hostels</h5>
                  <p className="card-text">Home away from home for pets</p>
                  <a href="#" className="btn btn-primary">Book an Appointment</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Home;

{
  /* <h3 className="m-4">New Arrivals</h3>
        <div className="d-flex flex-wrap ">
          <div className="d-flex flex-row flex-wrap bd-highlight mb-3 container bg-gray" >
            
            {list1}
          </div>
        </div> */
}
