import React from 'react'
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import OwlCarousel from 'react-owl-carousel';

const TstnSect = () => {

    // const CarouselItem2 = ({ title, desc }) => {
    //     return (
    //         <div className='item'>
    //             <div className="m-0 fs-6 text-start  text-white">
    //                 {desc}
    //             </div>
    //             <h3 className="mt-3 float-right text-white fs-4">{title}</h3>
    //         </div>
    //     )
    // }

  return (
    <section className="py-5 catediv2">

    <div className="container pt-5">
        <div className="row g-xl-5 g-lg-4 g-3 align-items-center">
            <div className="col-xl-5 col-lg-6 col-12">
                <img src="Images/test.png" alt="" className='w-100' />
            </div>
            <div className="col-xl-7 col-lg-6 col-12">
                <h1 className='text-white m-0 fw-bold display-6'>What Our Customers Has To Say..</h1>
                <h1 className='m-0 mb-4 display-1 text-warning'>
                    <i className="bi bi-quote"></i>
                </h1>

                <OwlCarousel className='owl-theme' loop autoplay dots={false} nav navClass items={1}>
                    <CarouselItem2
                        title="Akash Agrawal"
                        desc="
                        “I've been a loyal Safai Kart customer for over a year now,
                        and I can't imagine life without their services. They've
                        truly elevated my lifestyle by giving me back precious
                        time I used to spend on laundry and cleaning. With their
                        professionalism and attention to detail, I can trust that
                        my clothes, sneakers, and home furnishings are always in
                        excellent hands. Safai Kart has made a significant
                        difference in my life, allowing me to focus on what truly
                        matters. Thank you for your outstanding service!
                    ."

                    />
                    <CarouselItem2
                        title="Hitesh Verma"
                        desc="
                        “I've been a loyal Safai Kart customer for over a year now,
                        and I can't imagine life without their services. They've
                        truly elevated my lifestyle by giving me back precious
                        time I used to spend on laundry and cleaning. With their
                        professionalism and attention to detail, I can trust that
                        my clothes, sneakers, and home furnishings are always in
                        excellent hands. Safai Kart has made a significant
                        difference in my life, allowing me to focus on what truly
                        matters. Thank you for your outstanding service!
                    "

                    />
                    <CarouselItem2
                        title="Kavita Sahu"
                        desc="
                        “I've been a loyal Safai Kart customer for over a year now,
                        and I can't imagine life without their services. They've
                        truly elevated my lifestyle by giving me back precious
                        time I used to spend on laundry and cleaning. With their
                        professionalism and attention to detail, I can trust that
                        my clothes, sneakers, and home furnishings are always in
                        excellent hands. Safai Kart has made a significant
                        difference in my life, allowing me to focus on what truly
                        matters. Thank you for your outstanding service!
                    "

                    />


                </OwlCarousel>


            </div>
        </div>
    </div>
</section >
  )
}

export default TstnSect