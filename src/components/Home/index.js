import {Component} from 'react'
import Slider from 'react-slick'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {MdOutlineSort} from 'react-icons/md'
import {BsFilterLeft, BsCaretDownFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import Popup from 'reactjs-popup'
import {Pagination} from '@mui/material'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantItem from '../RestaurantItem'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const limit = 9

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    offersList: [],
    restaurantApiStatus: restaurantsApiStatusConstants.initial,
    restaurantsList: [],
    currPg: 1,
    sortType: 'Lowest',
    isLoading: false,
    activeOptionId: sortByOptions[0].id,
  }

  componentDidMount() {
    const page = localStorage.getItem('curr_page')
    const currPg = page === null ? 1 : parseInt(page)
    this.getOffersList()
    this.getAllRestaurantsList(this.state.sortType, currPg)
  }

  getAllRestaurantsList = async (sortType = 'Lowest', currPg = '1') => {
    this.setState({
      restaurantApiStatus: restaurantsApiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const LIMIT = 9
    const offset = (currPg - 1) * LIMIT
    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortType}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedList = data.restaurants.map(each => ({
        id: each.id,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: {
          rating: each.user_rating.rating,
          ratingColor: each.user_rating.rating_color,
          totalReviews: each.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsList: updatedList,
        restaurantApiStatus: restaurantsApiStatusConstants.success,
      })
    } else {
      this.setState({
        restaurantApiStatus: restaurantsApiStatusConstants.failure,
      })
    }
  }

  // updateActiveOptionId = activeOptionId => {
  //   this.setState({activeOptionId}, this.getAllRestaurantsList)
  // }

  // onChangeSortby = event => {
  //   updateActiveOptionId(event.target.value)
  // }

  onHighestSort = () => {
    this.setState({sortType: 'Highest'})
    this.getAllRestaurantsList('Highest')
  }

  onLowestSort = () => {
    this.setState({sortType: 'Lowest'})
    this.getAllRestaurantsList('Lowest')
  }

  onChangePage = (e, value) => {
    value === undefined
      ? localStorage.setItem('curr_page', 1)
      : localStorage.setItem('curr_page', value)
    this.setState({currPg: value})
    this.getAllRestaurantsList(this.state.sortType, value)
  }

  getOffersList = async () => {
    this.setState({
      isLoading: true,
    })
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        offersList: updatedData,
        isLoading: false,
      })
    }
  }

  renderCarouselsView = () => {
    const {offersList} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    return (
      <div className="carousel-box">
        <Slider {...settings}>
          {offersList.map(each => (
            <img
              src={each.imageUrl}
              alt="offer"
              key={each.id}
              className="slide-imgs"
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderLoader = () => (
    <div testid="restaurants-offers-loader" className="loader-container">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantsList = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="res-list-items" testid="restaurant-item">
        {restaurantsList.map(eachResItem => (
          <RestaurantItem itemDetails={eachResItem} key={eachResItem.id} />
        ))}
      </ul>
    )
  }

  renderRestaurantsView = () => {
    const {restaurantApiStatus} = this.state
    switch (restaurantApiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.renderRestaurantsList()
      case restaurantsApiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const page = localStorage.getItem('curr_page')
    const currPg = page === null ? 1 : parseInt(page)
    const {sortType, isLoading, activeOptionId} = this.state
    const lowestSortClass =
      sortType === 'Lowest' ? 'sort-option selected' : 'sort-option'
    const highestSortClass =
      sortType === 'Highest' ? 'sort-option selected' : 'sort-option'
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="container">
            {isLoading ? this.renderLoader() : this.renderCarouselsView()}
          </div>
          <div className="text-center">
            <h1 className="home-heading">Popular Restaurants</h1>
            <div className="sorting-cont">
              <p className="home-para">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
              <div className="drop-down-box">
                <Popup
                  trigger={
                    <div className="fliter-box">
                      <BsFilterLeft className="filter-icon" />
                      <p className="filter-text">Sort by {sortType}</p>
                      <BsCaretDownFill
                        className="filter-icon"
                        style={{fontSize: '15px', marginTop: '5px'}}
                      />
                    </div>
                  }
                >
                  <div className="filter-popup">
                    <h3 onClick={this.onLowestSort} className={lowestSortClass}>
                      Lowest
                    </h3>
                    <h3
                      onClick={this.onHighestSort}
                      className={highestSortClass}
                    >
                      Highest
                    </h3>
                  </div>
                </Popup>
              </div>
            </div>
          </div>
          <hr className="hr-line" />
          <div testid="restaurant-item" className="restaurants-box">
            {this.renderRestaurantsView()}
          </div>
        </div>
        <div className="pagination" testid="pagination-right-button">
          <Pagination
            count={4}
            page={currPg}
            onChange={this.onChangePage}
            variant="outlined"
            shape="rounded"
            color="secondary"
          />
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
