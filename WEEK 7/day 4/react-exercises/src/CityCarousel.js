import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './CityCarousel.css'

const destinations = [
  {
    name: 'Hong Kong',
    country: 'China',
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg',
    description: 'Harbour lights, hillside trails, and a city that never sits still.',
  },
  {
    name: 'Macao',
    country: 'China',
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp',
    description: 'A vivid mix of Portuguese heritage and modern energy.',
  },
  {
    name: 'Japan',
    country: 'Japan',
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp',
    description: 'Find quiet temples, lively streets, and unforgettable food.',
  },
  {
    name: 'Las Vegas',
    country: 'United States',
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp',
    description: 'Neon nights and desert horizons in one bold getaway.',
  },
]

function CityCarousel() {
  return (
    <section className="city-carousel-section" aria-labelledby="city-carousel-title">
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-12">
            <div className="carousel-heading">
              <p className="eyebrow">Daily challenge</p>
              <h2 id="city-carousel-title">Places in motion</h2>
              <p>Four city escapes, from Hong Kong to Las Vegas.</p>
            </div>
            <Carousel
              className="destination-carousel"
              autoPlay
              infiniteLoop
              interval={5000}
              showStatus={false}
              showThumbs={false}
              stopOnHover
              swipeable
              emulateTouch
            >
              {destinations.map((destination) => (
                <div className="city-slide" key={destination.name}>
                  <img src={destination.image} alt={`${destination.name} city view`} />
                  <div className="city-caption">
                    <span className="badge text-bg-light">{destination.country}</span>
                    <h3>{destination.name}</h3>
                    <p>{destination.description}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CityCarousel