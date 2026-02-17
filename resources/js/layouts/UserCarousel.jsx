import Slider from "react-slick";
import { Link } from '@inertiajs/react';

export default function UserCarousel({ slides }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };


    // contoh data carousel
    // const slides = [
    //     {
    //     id: 1,
    //     image: "images/carousel/carousel1.JPG",
    //     alt: "Slide 1",
    //     link: "/halaman-satu" // URL tujuan
    //     },
    //     {
    //     id: 2,
    //     image: "images/carousel/carousel2.JPG",
    //     alt: "Slide 2",
    //     link: "/halaman-dua"
    //     },
    //     {
    //     id: 3,
    //     image: "images/carousel/carousel3.JPG",
    //     alt: "Slide 3",
    //     link: "/halaman-tiga"
    //     },
    //     {
    //     id: 2,
    //     image: "images/carousel/carousel2.JPG",
    //     alt: "Slide 2",
    //     link: "/halaman-dua"
    //     },
    //     {
    //     id: 3,
    //     image: "images/carousel/carousel3.JPG",
    //     alt: "Slide 3",
    //     link: "/halaman-tiga"
    //     },
    // ];

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="relative w-[1200px] mx-auto"> {/* Tambahkan relative di sini */}
                    <Slider {...settings}>
                        {slides.map(slide => (
                            <div key={slide.id}>
                                {slide.link && (slide.link.startsWith('http') || slide.link.startsWith('//')) ? (
                                    <a href={slide.link} target="_blank" rel="noopener noreferrer">
                                        <div className="relative mx-auto overflow-hidden w-[1200px] h-[300px] rounded-lg">
                                            <img
                                                src={`images/carousel/${slide.foto}`}
                                                alt={`ini carousel-${slide.id}`}
                                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    </a>
                                ) : (
                                    <Link href={slide.link}>
                                        <div className="relative mx-auto overflow-hidden w-[1200px] h-[300px] rounded-lg">
                                            <img
                                                src={`images/carousel/${slide.foto}`}
                                                alt={`ini carousel-${slide.id}`}
                                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    )
}