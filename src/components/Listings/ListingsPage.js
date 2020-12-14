import React, { Component } from "react";
import MyModal from "./Mymodal";
import WithScrollbar from "./product_slider/WithScrollbar";
import { Modal } from "react-bootstrap";

class ListingsPage extends Component {
  // Mongo
  entries;

  constructor(props) {
    super(props);

    window.addEventListener("resize", this.update);
    this.state = {
      property: [],
      width: 0,
      firstPart_ind: 12,
      slider_flag: false,
      selectedCard_propertyData: null,
      selected_index: 0,
      selectedCardID: "",
      mealSlider_Flag: false,
      currentMealCount: 12,
      mealList:null,
      col_count:1
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    var url = "/homes.json";
    fetch(url)
      .then(res => res.text())
      .then(body => {
        var propertyList = JSON.parse(body);
        console.log(propertyList);
        if(propertyList && propertyList.length !== 0){
          console.log(propertyList.length);
          let property = [];
          for (var i = 0; i < propertyList.length; i++) {
            property.push(propertyList[i]);
          }
          this.setState({ property: property})
          // console.log(this.state.property);
          // this.entries = Object.entries(this.property);
          // console.log(entries);
          // this.setState({product_fetched:true});
        }
        else{
          console.log("shows property do not return");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  onClickMealCard = ( i, col_count )=>{
    if(i === this.state.selected_index) this.setState({slider_flag: !this.state.slider_flag})
    else this.setState({slider_flag: true})

    this.setState({ selected_index: i});
    this.setState({ selectedCard_propertyData: this.state.property[i]});
    this.setState({ modalIsOpen: true });  
    this.setState({ firstPart_ind: (parseInt((i )/ col_count)+1)*col_count});   
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  setMealSliderModal=()=>{
    this.setState({mealSlider_Flag: true});
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  removeMealSliderModal=()=>{
    this.setState({mealSlider_Flag: false});
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  onhandleLoadMore = () => {
    let count = this.state.currentMealCount;
    if(count>= this.state.property.length)   this.setState({currentMealCount: this.state.property.length});
    else this.setState({currentMealCount: count + 10 });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  update = () => {
    // this.setState({  width: window.innerWidth });

    let col_count = 1;
    if (window.innerWidth > 1200) col_count = 4;
    else if(window.innerWidth > 1000 && window.innerWidth < 1200) col_count = 3;
    else if(window.innerWidth > 800 && window.innerWidth < 1000) col_count = 2;

    if(this.state.property === null && window.innerWidth > 800 && window.innerHeight > 500) col_count = 4;
    else if(this.state.property.length < 4 && window.innerWidth > 800 && window.innerHeight > 500) col_count = 4; //Math.min(count, this.props.property.length);

    this.setState({col_count: col_count});
  };


  //////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const {selectedCard_propertyData} = this.state;
    const items = [];
    let count = Math.min(this.state.property.length, this.state.currentMealCount);

    if(this.state.property.length>0){
      //--------------------- first part -----------------------------------------
      for (let i = 0; i< Math.min(count, this.state.firstPart_ind); i++) {
        const value = this.state.property[i];       

        items.push(
          <div key={i} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mealContainer" style={{justifyContent: "center"}}>
            <div className="meal-card" onClick={()=>this.onClickMealCard(i, this.state.col_count)}>
              <div style={containerStyle}>
                <div style={{ textAlign:"center" }}>
                  <img
                    src={this.state.property[i].property.primaryImageUrl}
                    className="images"
                    style={{ width: "200px", height: "200px" }}
                    alt="/"
                  ></img>
                  <br></br>
                  {this.state.property[i].property.address.addressLine1}&nbsp;
                  {this.state.property[i].property.address.addressLine2}&nbsp;
                  {this.state.property[i].property.address.city}&nbsp;
                  {this.state.property[i].property.address.state}&nbsp;
                  {this.state.property[i].property.address.zip}<br></br>
                  {this.state.property[i].state}&nbsp;
                  ${this.state.property[i].price}&nbsp;

                </div>
                <div>
                  <span style={{ color: "grey" }}>{this.state.property[i].property.description} | View Details</span><br></br><br></br>
                  <span style={{ color: "black" }}></span>
                </div>              
              </div>

            </div>
          </div>
        );
      }

      if(selectedCard_propertyData && this.state.slider_flag){
        console.log(selectedCard_propertyData.property.address);

        items.push(
          <div className="col-sm-12" style={{background:"#ffffff"}} key="1000001">
            <div style={{width: "95%", margin:"auto"}}>
              <div className ="detail-card-explain" id={selectedCard_propertyData._id} >
                  <div style={{fontSize:"18px", paddingTop:"20px", paddingBottom:"20px"}}>{selectedCard_propertyData.intro}</div>
                </div>
                {selectedCard_propertyData.property.numberBedrooms}&nbsp;B/

                {selectedCard_propertyData.property.numberBaths}&nbsp;Ba &nbsp;
                {selectedCard_propertyData.property.propertyType}&nbsp;
                <div id={selectedCard_propertyData._id + "property"}>               
                  {/* <WithScrollbar products={selectedCard_propertyData.product_slider} col_count={this.state.col_count}/> */}
                </div>

                <MyModal 
                  value={selectedCard_propertyData}
                  mealPrep={selectedCard_propertyData.instructions}
                  ingredientsList={selectedCard_propertyData.newer_ingredient_format }
                  func_setMealFlag = {this.setMealSliderModal}
                  func_removeMealFlag = {this.removeMealSliderModal}
                />
              </div>
          </div>
        )
      }
     
      //--------------------- second part -----------------------------------------
      for (let i = Math.min(count, this.state.firstPart_ind); i< count; i++) {
        const value = this.state.property[i];       

        items.push(
          <div key={i} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mealContainer" style={{justifyContent: "center"}}>
            <div className="meal-card" onClick={()=>this.onClickMealCard(i, this.state.col_count)}>
              <div style={containerStyle}>
                <div style={{ textAlign:"center" }}>
                  <img
                    src={this.state.property[i].property.primaryImageUrl}
                    className="images"
                    style={{ width: "200px", height: "200px" }}
                    alt="/"
                  ></img>
                </div>
                <div>
                <div>
                  <span style={{ color: "grey" }}>{this.state.property[i].property.description} | View Details</span><br></br><br></br>
                  <span style={{ color: "black" }}></span>
                </div>  
                </div>              
              </div>

            </div>
          </div>
        );
      }
    }
    
    return (
      <div className="meals-Page">
        <div id="title" className="meal-title"> <b>Listings</b> </div>
        <div className="mealPage-container">
            {items}        
        </div>
        <section className="loadmore-section">
          <button className="btn-loadmore" onClick={()=>this.onhandleLoadMore()}>Load More</button>
        </section>
      </div>
    )
  };
}

export default ListingsPage;

const containerStyle = {
  display: "inline-block",
  width: "100%",
  height: "100%"
};
