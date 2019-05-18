import React, { Component, Fragment } from 'react';
import Swipe from 'react-easy-swipe';
import Link from "next/link";

const carousel = [
  {
    src: '../../static/images/homepage-white.jpg',
    alt: ''
  },
  {
    src: '../../static/images/homepage-lou.jpg',
    alt: ''
  }
];

class HomePage extends Component {
  state = {
    visible: 0,
    interval: null,
    firstSlide: null,
    mouseMoving: 0
  };

  componentDidMount() {
    const firstSlide = setTimeout(() => this.handleMouseMoving(), 3500);
    const interval = setInterval(this.handleMouseMoving, 3500);
    this.setState({interval, firstSlide});
  };

  componentWillUnmount() { clearInterval(this.state.interval); clearInterval(this.state.firstSlide); };

  incrementFunction = () => {
    this.setState({ firstSlide: null });

    const { visible } = this.state;
    if (visible >= carousel.length - 1) {
      this.setState( { visible: 0 } );
      return;
    }
    this.setState( { visible: visible + 1 } );
  };

  onSwipeEnd = () => this.incrementFunction();

  handleMouseMoving = () => {
    const { mouseMoving } = this.state;

    this.setState({ mouseMoving: mouseMoving + 1, visible: mouseMoving });
    mouseMoving >= carousel.length - 1 && this.setState({ mouseMoving: 0 });
  };

  clearMouseMoving = () => this.setState({ mouseMoving: 0});

  render() {
    const { visible, mouseMoving } = this.state;

    return (
      <Fragment>

        <div className="home-image-wrapper">

          <div
            className="image-wrapper"
          >
            <Swipe
              onSwipeEnd={ this.onSwipeEnd }
            >
              { carousel.map( ( img, i ) => (
                <div
                  onMouseMove={this.clearMouseMoving}
                  className={ `swipe-wrapper ${ visible === i && 'visible' }` }
                  key={ i }
                >
                  <Link href={ '/about' }>
                    <a>
                      <img
                        src={ img.src }
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
              ) ) }
            </Swipe>
          </div>

        </div>

      </Fragment>
    );
  }
}

export default HomePage;


// import React, { Component, Fragment } from 'react';
// import Slider from "react-slick";
//
// const carousel = [
//   {
//     src: '../../static/images/homepage-white.jpg',
//     alt: ''
//   },
//   {
//     src: '../../static/images/homepage-lou.jpg',
//     alt: ''
//   }
// ];
//
// class HomePage extends Component {
//   state = {
//     visible: 0
//   };
//
//   incrementFunction = () => {
//     const { visible } = this.state;
//     if (visible >= carousel.length - 1) {
//       this.setState( { visible: 0 } );
//       return;
//     }
//     this.setState( { visible: visible + 1 } );
//   };
//
//   decrementFunction = () => {
//     const { visible } = this.state;
//     if (visible <= 0) {
//       this.setState( { visible: carousel.length - 1 } );
//       return;
//     }
//     this.setState( { visible: visible - 1 } );
//   };
//
//   render() {
// // https://github.com/akiran/react-slick/issues/1160
//     const settings = {
//       dots: false,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       arrows: true,
//       fade: true,
//       swipe: false,
//       responsive: [
//         {
//           breakpoint: 700,
//           settings: {
//             arrows: false,
//             autoplay: true,
//             autoplaySpeed: 2500,
//             swipe: true,
//           }
//         }
//       ]
//     };
//
//     return (
//       <Fragment>
//
//         <div className="home-image-wrapper">
//
//           <div className="image-wrapper">
//             <Slider { ...settings }>
//             { carousel.map( ( img, i ) => (
//               <div
//                 key={ i }
//                 style={{ position: 'relative' }}
//               >
//                 <div>
//                   <img
//                     src={ img.src }
//                     alt=""
//                   />
//                 </div>
//               </div>
//             ) ) }
//             </Slider>
//           </div>
//
//         </div>
//
//       </Fragment>
//     );
//   }
// }
//
// export default HomePage;
