import React, { Component } from "react";
import {
  ReactiveBase,
  ResultList,
  MultiList,
  RatingsFilter,
  SelectedFilters,
  MultiDataList,
  DataSearch,
  RangeSlider,
  ReactiveList
} from "@appbaseio/reactivesearch";

import { ReactiveGoogleMap } from "@appbaseio/reactivemaps";
import "./styles.css";

// Importing Images
//import americanFood from "./Images/americanFood.jpg";
//import barFood from "./Images/barFood.jpeg";
//import breakfast from "./Images/breakfast.jpeg";
//import desserts from "./Images/desserts.jpeg";
//import sandwich from "./Images/sandwich.jpeg";

class App extends Component {
  onData(resturant) {
 //   const image =
   //   resturant.cuisine === "Bar Food"
     //   ? barFood
       // : resturant.cuisine === "Desserts"
        //? desserts
        //: resturant.cuisine === "Breakfast"
        //? breakfast
       // : resturant.cuisine === "American"
        //? americanFood
        //: sandwich;

    const stars = [];
    const { rating, currency, address, cuisine } = resturant;
    for (let x = 0; x < rating; x++) {
      stars.push(
        <span key={x}>
          <i className="fa fa-star" />
        </span>
      );
    }

    return (
      <ReactiveList.ResultListWrapper>
        <ResultList key={resturant._id}>
          <ResultList.Image src={"#"} />
          <ResultList.Content>
            <ResultList.Title>{resturant.name}</ResultList.Title>
            <ResultList.Description>
              <div>
                <p>{address}</p>
                <span key="currency" className="tag">
                  {currency}
                </span>
                <span className="tag">{cuisine}</span>
                <div>Avg. Customer Reviews : {stars}</div>
              </div>
            </ResultList.Description>
          </ResultList.Content>
        </ResultList>
      </ReactiveList.ResultListWrapper>
    );
  }

  onPopoverClick(marker) {
    return (
      <div
        className="row"
        style={{ margin: "0", maxWidth: "300px", paddingTop: 10 }}
      >
        <div className="col s12">
          <div>
            <strong>{marker.name}</strong>
          </div>
          <p style={{ margin: "5px 0", lineHeight: "18px" }}>
            {marker.address}
          </p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <ReactiveBase
          app="yelp-app"
          ApiKey="AIzaSyBIhFfRBKKLqZ8FfYIy8I6evdEMjKbYihM"
          mapKey="eV00yV7ZrQpI8dS6IsdxXaKhDPOD20heneMLnQQEncRLHzdEeb2n7DeSsWWRUtRRG6EaxHhV1R8q6pGN2PEGO7Jf9Fi6IM995Fz5fSg8OBfoXA77t73V0DA4VgP_X3Yx"
          credentials="SwoURYn2vBBLV6xfmOxygA"
          type="yelp-app"
        >
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              Yelp Search
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="col-lg-7 dataSearch">
                <DataSearch
                  componentId="nameReactor"
                  placeholder="Search for Restaurants, Bars"
                  dataField="name"
                  searchInputId="NameSearch"
                  iconPosition="right"
                  renderError={error => (
                    <div>
                      Something went wrong with DataSearch
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />
              </div>
              <div className="links">
                <a
                  target="_blank"
                  href="https://github.com/appbaseio/reactivesearch"
                  className="btn link"
                >
                  <i className="fa fa-github" aria-hidden="true" /> Github
                </a>
                <a
                  target="_blank"
                  href="https://opensource.appbase.io/reactive-manual/"
                  className="btn link"
                >
                  <i className="fa fa-book" aria-hidden="true" /> Documentation
                </a>
              </div>
            </div>
          </nav>

          <div className="row">
            <div className="col-8 col-lg-3 col-md-3 col-sm-4 scroll">
              <div className="box">
                <MultiList
                  dataField="currency.keyword"
                  title="Currency Options"
                  componentId="currencyReactor"
                  placeholder="Filter Currency"
                  showFilter={true}
                  filterLabel="Currency Options"
                  react={{
                    and: [
                      "ratingsReactor",
                      "cuisineReactor",
                      "deliveringNowReactor",
                      "tableBookinReactor",
                      "deliveryReactor",
                      "bookingReactor",
                      "nameReactor",
                      "RangeSliderSensor"
                    ]
                  }}
                  renderError={error => (
                    <div>
                      Something went wrong with Currency MultiList
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />
              </div>

              <div className="box">
                <MultiList
                  dataField="cuisine.keyword"
                  title="Cuisine Options"
                  componentId="cuisineReactor"
                  placeholder="Filter Cuisine"
                  showFilter={true}
                  filterLabel="Cuisine Options"
                  react={{
                    and: [
                      "ratingsReactor",
                      "currencyReactor",
                      "deliveringNowReactor",
                      "tableBookinReactor",
                      "musicReactor",
                      "bookingReactor",
                      "nameReactor",
                      "RangeSliderSensor"
                    ]
                  }}
                  renderError={error => (
                    <div>
                      Something went wrong with Cuisine MultiList
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />
              </div>

              <div className="box">
                <RangeSlider
                  componentId="RangeSliderSensor"
                  dataField="average_cost_for_two"
                  title="Average Cost for Two"
                  range={{
                    start: 0,
                    end: 7000
                  }}
                  rangeLabels={{
                    start: "Low",
                    end: "High"
                  }}
                  react={{
                    and: ["cuisineReactor", "currencyReactor"]
                  }}
                  renderError={error => (
                    <div>
                      Something went wrong with RangeSlider
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />
              </div>

              <div className="box">
                <RatingsFilter
                  componentId="ratingsReactor"
                  dataField="rating"
                  title="Avg. Customer Reviews"
                  data={[
                    { start: 4, end: 5, label: ">= 4 stars" },
                    { start: 3, end: 5, label: ">= 3 stars" },
                    { start: 2, end: 5, label: ">= 2 stars" },
                    { start: 1, end: 5, label: "> 1 stars" }
                  ]}
                  showFilter={true}
                  filterLabel="Avg. Customer Reviews"
                  react={{
                    and: [""]
                  }}
                  renderError={error => (
                    <div>
                      Something went wrong with RatingsFilter
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />
              </div>

              <div className="box">
                <MultiDataList
                  dataField="delivering_now"
                  componentId="deliveringNowReactor"
                  title="Refine By"
                  showSearch={false}
                  data={[
                    {
                      label: "Delivering Now",
                      value: true
                    }
                  ]}
                  renderError={error => (
                    <div>
                      Something went wrong with Delivering Now MultiDataList!!
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />

                <MultiDataList
                  dataField="has_table_booking"
                  componentId="tableBookinReactor"
                  showSearch={false}
                  data={[
                    {
                      label: "Has Table Bookings",
                      value: true
                    }
                  ]}
                  renderError={error => (
                    <div>
                      Something went wrong with Table Booking MultiDataList!
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />
                <MultiDataList
                  dataField="online_delivery"
                  componentId="deliveryReactor"
                  showSearch={false}
                  data={[
                    {
                      label: "Online Delivery",
                      value: true
                    }
                  ]}
                  renderError={error => (
                    <div>
                      Something went wrong with Online Delivery MultiDataList!
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-6 col-sm-8 scroll marginBottom">
              <SelectedFilters />
              <ReactiveList
                componentId="queryResult"
                dataField="name"
                from={0}
                size={15}
                renderItem={this.onData}
                pagination={true}
                react={{
                  and: [
                    "currencyReactor",
                    "ratingsReactor",
                    "cuisineReactor",
                    "deliveringNowReactor",
                    "bookingReactor",
                    "deliveryReactor",
                    "tableBookinReactor",
                    "nameReactor",
                    "RangeSliderSensor"
                  ]
                }}
                renderError={error => (
                  <div>
                    Something went wrong with ResultList!
                    <br />
                    Error details
                    <br />
                    {error}
                  </div>
                )}
              />
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6">
              <ReactiveGoogleMap
                dataField="location"
                componentId="maps"
                defaultZoom={13}
                defaultCenter={{ lat: 14.55436, lng: -85.76 }}
                historicalData={true}
                setMarkerCluster={true}
                showMapStyles={false}
                showSearchAsMove={false}
                defaultMapStyle="Light Monochrome"
                onPopoverClick={this.onPopoverClick}
                autoCenter={true}
                size={100}
                react={{
                  and: [
                    "currencyReactor",
                    "ratingsReactor",
                    "cuisineReactor",
                    "deliveringNowReactor",
                    "bookingReactor",
                    "deliveryReactor",
                    "tableBookinReactor",
                    "nameReactor",
                    "RangeSliderSensor"
                  ]
                }}
              />
            </div>
          </div>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
