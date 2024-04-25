import React from 'react'
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import OwlCarousel from 'react-owl-carousel';

const FaqSect = () => {

    // const CarouselItem = ({ image1 }) => {
    //     return (
    //         <div className='item'>
    //             <div className="herocardiv p-xl-5 p-lg-4 p-3" style={{
    //                 aspectRatio: 1 / 1,
    //                 backgroundImage: `url("${image1}")`,

    //             }}>

    //                 {/* <button className="btn btn-warning ms-auto fw-medium">Book Now</button> */}
    //             </div>
    //         </div>
    //     )
    // }

    // const options = {
    //     margin: 10,
    //     responsiveClass: true,
    //     autoplay: true,
    //     smartSpeed: 1000,
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         400: {
    //             items: 1,
    //         },
    //         500: {
    //             items: 2,
    //         },
    //         700: {
    //             items: 3,
    //         },

    //     },
    // };


    return (
        <>
          
            <section className="py-5 bg-success faq-main">
                <div className="container py-xl-5 py-lg-4 py-md-3 py-2">
                    <div className="row justify-content-center g-xl-5 g-lg-4 g-3">
                        <div className="col-xl-10 col-lg-11 col-12">
                            {/* <img src="Images/icnset_white.svg" alt="" className="w-100 opacity-50"/> */}
                        </div>
                        <div className="col-12">
                            <h1 className="text-white text-center mb-4 mt-5 fw-bold display-5">
                                Frequently Asked Questions
                            </h1>
                        </div>
                        <div className="col-xl-10 col-lg-11 col-12">
                            <div className="row g-xl-5 g-lg-4 g-md-3 g-3">
                                <div className="col-lg-6 col-12 d-flex flex-column gap-xl-5 gap-lg-4 gap-3">
                                    <div className="row g-xl-0 g-lg-1 g-2">
                                        <div className="col-2">
                                            <div className="w-75 bg-warning d-flex justify-content-center align-items-center rounded-circle" style={{ aspectRatio: 1/1 }}>
                                                <i className="bi bi-question fs-3 fw-500"></i>
                                            </div>
                                        </div>
                                        <div className="col-10">
                                            <h5 className="m-0 mb-3 text-white">
                                                How can I schedule a cleaning service with Safai Kart?
                                            </h5>
                                            <p className="m-0 text-light fw-light">
                                                To schedule a cleaning service, simply visit our website or give us a call. You can
                                                also use our user-friendly mobile app to book your service at your convenience.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row g-xl-0 g-lg-1 g-2">
                                        <div className="col-2">
                                            <div className="w-75 bg-warning d-flex justify-content-center align-items-center rounded-circle" style={{ aspectRatio: 1/1 }}>
                                                <i className="bi bi-question fs-3 fw-500"></i>
                                            </div>
                                        </div>
                                        <div className="col-10">
                                            <h5 className="m-0 mb-3 text-white">
                                                How do you ensure the safety of my belongings during cleaning?
                                            </h5>
                                            <p className="m-0 text-light fw-light">
                                                At Safai Kart, we prioritize the safety of your belongings. Our highly trained and
                                                trustworthy team members are committed to treating your property with the utmost
                                                care.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row g-xl-0 g-lg-1 g-2">
                                        <div className="col-2">
                                            <div className="w-75 bg-warning d-flex justify-content-center align-items-center rounded-circle" style={{ aspectRatio: 1/1 }}>
                                                <i className="bi bi-question fs-3 fw-500"></i>
                                            </div>
                                        </div>
                                        <div className="col-10">
                                            <h5 className="m-0 mb-3 text-white">
                                                How long does it take to clean sneakers?
                                            </h5>
                                            <p className="m-0 text-light fw-light">
                                                Our sneaker cleaning service typically takes 1-2 business days, depending on the
                                                extent of cleaning needed. We ensure your sneakers are thoroughly cleaned and
                                                refreshed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12 d-flex flex-column gap-xl-5 gap-lg-4 gap-3">
                                    <div className="row g-xl-0 g-lg-1 g-2">
                                        <div className="col-2">
                                            <div className="w-75 bg-warning d-flex justify-content-center align-items-center rounded-circle" style={{ aspectRatio: 1/1 }}>
                                                <i className="bi bi-question fs-3 fw-500"></i>
                                            </div>
                                        </div>
                                        <div className="col-10">
                                            <h5 className="m-0 mb-3 text-white">
                                                What areas do you serve?
                                            </h5>
                                            <p className="m-0 text-light fw-light">
                                                We currently offer our cleaning services in     `qlist of serviced in bhilai and raipur.
                                                If you're unsure if we cover your location, feel free to reach out to us for
                                                confirmation.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row g-xl-0 g-lg-1 g-2">
                                        <div className="col-2">
                                            <div className="w-75 bg-warning d-flex justify-content-center align-items-center rounded-circle" style={{ aspectRatio: 1/1 }}>
                                                <i className="bi bi-question fs-3 fw-500"></i>
                                            </div>
                                        </div>
                                        <div className="col-10">
                                            <h5 className="m-0 mb-3 text-white">
                                                What is the turnaround time for sofa cleaning?
                                            </h5>
                                            <p className="m-0 text-light fw-light">
                                                The turnaround time for sofa cleaning depends on the size and condition of your
                                                sofa. Typically, it takes 3-5 business days to complete the cleaning process.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row g-xl-0 g-lg-1 g-2">
                                        <div className="col-2">
                                            <div className="w-75 bg-warning d-flex justify-content-center align-items-center rounded-circle" style={{ aspectRatio: 1/1 }}>
                                                <i className="bi bi-question fs-3 fw-500"></i>
                                            </div>
                                        </div>
                                        <div className="col-10">
                                            <h5 className="m-0 mb-3 text-white">
                                                Do you offer pickup and delivery services?
                                            </h5>
                                            <p className="m-0 text-light fw-light">
                                                Yes, we offer convenient pickup and delivery services. You can schedule a pickup,
                                                and we'll return your clean items to your doorstep, saving you time and effort.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" py-5 bg-white">

                <div className="ps-xl-5 ps-lg-5  bg-white overflow-hidden px-xl-0 px-lg-2 px-3">
                    <div className="row justify-content-between g-xl-5 g-lg-4 g-3 py-xl-5 py-lg-4 py-md-3 py-2">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-12 offset-xl-1 offset-0">
                            <h2 className="m-0 mb-4 text-success">Why Are We Different?</h2>
                            <p className="m-0 text-success">
                                We stand out for our unwavering commitment to elevating your lifestyle while respecting your valuable time. Discover what sets us apart, from our personalized approach to our dedication to delivering exceptional cleaning services, all designed to enhance your daily living experience.
                            </p>
                        </div>
                        <div className="col-xl-7 col-lg-8 col-12">

                            {/* <OwlCarousel className='owl-theme' loop {...options} >
                                <CarouselItem
                                    image1="Images/offr.jpg"

                                />
                                <CarouselItem
                                    image1="Images/offr.jpg"

                                />
                                <CarouselItem
                                    image1="Images/offr.jpg"

                                />
                                <CarouselItem
                                    image1="Images/offr.jpg"

                                />


                            </OwlCarousel> */}


                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}

export default FaqSect