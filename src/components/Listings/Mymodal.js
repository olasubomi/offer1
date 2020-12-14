import React, { Component } from "react";
// import Modal from "react-modal";
// import HeartCheckbox from 'react-heart-checkbox';
// import Slider from "react-animated-slider";
// import "react-animated-slider/build/horizontal.css";
// import { Carousel } from 'react-responsive-carousel';
// import ImagePopup from "./ImagePopup";
import { Modal } from "react-bootstrap";
// import {Button} from 'react-bootstrap/Button';
// import TextSlider from "../../text_slide";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import "./Mymodal.scoped.scss";
import "../../App.css";

const content = [1, 2];
class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      checked: false,
      index: 0
    };
    this.openModal = this.openModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onClick = (evnet, props) => {
    this.setState({ checked: !this.state.checked });
  };

  openModal() {
    this.props.func_setMealFlag();
    this.setState({ modalIsOpen: true });
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = "#f00";
  // }

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.props.func_removeMealFlag();
  }

  handleSelect(selectedIndex, e) {
    this.setState({ index: selectedIndex });
  }
  render() {
    // const { checked } = this.state;
    const { value } = this.props;

    return (
      <>
        <Modal
          show = {this.state.modalIsOpen}
          onHide = { this.closeModal }
          dialogClassName="modal-90w"
          centered
        >
          <Modal.Header closeButton style={{'borderBottom': '30px', 'padding': '0px'}}/> 
          <Modal.Body style={{ padding: "0px" }}> 
            <div className="container">
              <div className="row" style={{ width: "100%"}}>
                {/* <div className="col-md-5 col-xs-12" style={{background: "white", paddingLeft: "0px",paddingRight: "0px"  }} >
                 */}
                <div className="detail-firstCol col-md-5 col-sm-12" >
                  <Carousel showThumbs={false} infiniteLoop={false} style={{width:"96%" }}>
                    {content.map(index => (
                      <img style={{ height: "300px" }} alt="pp" key={index} src={value.property.primaryImageUrl} />
                    ))}                    
                  </Carousel>
                  <br />
                  <div className="col-md-12 col-xs-12">
                    <h3> {value.label}</h3>
                    <div className="row col-md-6 col-sm-12"><b> Listing Details</b>
                    Property Size: {value.property.squareFeet} sq ft. {value.property.propertyType} <br></br>
                    Primary Owner: {value.property.primaryOwner.user.firstName} {value.property.primaryOwner.user.lastName} <br></br>
                  </div>   <br></br> 
                    
                    <div> 
                      <button  style={{ backgroundColor: "grey",color: "white"}} >
                        Compare items
                      </button>
                    </div>
                    <br />
                  </div>
                </div>
                
                <div className="col-md-6 col-xs-12">
                  <br />
                  <div>
                      Title Company: {value.titleCompany.name} , {value.titleCompany.officerName}<br></br> 
                      Escrow Company: {value.escrowCompany.name} , {value.escrowCompany.officerName}<br></br> 
                      Listing Agent:  {value.listingAgent.licenseState } #{value.listingAgent.licenseNumber}, {value.listingAgent.status }
                    </div><br></br>

                  <button className="btn-addToCard" style={{ marginBottom: "20px"}}>Contact Lease Owner</button>
                  {/* <TextSlider instructionData={mealPrep} value={value} /> */}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div id ={value.name}>
          <button
            className = "detail-step-btn"
            style={{ backgroundColor: "orange"}}
            key={value.id+value.label} onClick={this.openModal}>
              See Property Details
          </button>
        </div>
      </>
    );
  }
}
export default MyModal;
