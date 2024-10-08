import{ useEffect, useState } from 'react';

const Carousel = () => {
    const images = [
       
        {
            src: "https://ik.imagekit.io/a2gpaui9b/cake%20shop/cake1.jpg?updatedAt=1728194041797",
            alt: "Birthday cake",
            title: "Birthday Cakes",
            text: "Make every birthday unforgettable with our stunning custom-made birthday cakes! From vibrant colors to creative themes, each cake is crafted with love and precision to bring joy and excitement to your special day.",
        },
        {
            src: "https://ik.imagekit.io/a2gpaui9b/cake%20shop/cake2.jpg?updatedAt=1728194458909",
            alt: "Cupcakes",
            title: "Cupcakes",
            text: "Delight in our charming cupcakes, each a miniature masterpiece of flavor and design! Perfect for any occasion or as a sweet treat, our cupcakes come in a variety of flavors, from classic vanilla to rich chocolate and beyond.",
        },
        {
            src: "https://ik.imagekit.io/a2gpaui9b/cake%20shop/cake4.png?updatedAt=1728195248087",
            alt: "Carousel Cakes",
            title: "Carousel Cakes",
            text: "Bring a touch of whimsy to your celebration with our enchanting carousel cakes. Adorned with charming details and delightful colors, these cakes are perfect for birthdays or any festive occasion that calls for a unique centerpiece.",
        },
        {
            src: "https://ik.imagekit.io/a2gpaui9b/cake%20shop/cake5.png?updatedAt=1728195248440",
            alt: "Dark Chocolate Cakes",
            title: "Dark Chocolate Cakes",
            text: "Indulge in the rich, luxurious taste of our dark chocolate cakes. Perfectly moist and intensely flavored, these cakes are a chocoholic’s dream come true. Treat yourself or gift it to someone special!",
        },
        {
            src: "https://ik.imagekit.io/os5tqthul/Cakes/Tier_cakes/WhatsApp%20Image%202024-09-17%20at%2009.50.47_38be17b8.jpg?updatedAt=1726718730744",
            alt: "Tier Cakes",
            title: "Tier Cakes",
            text: "For those grand celebrations, our multi-tiered cakes make an impressive statement. From lavish weddings to milestone events, each tier is crafted to perfection, with flavors that delight in every bite.",
        },
        {
            src: "https://ik.imagekit.io/os5tqthul/Cakes/foundant%20cakes/Screenshot_2024-09-17-09-41-48-06_6012fa4d4ddec268fc5c7112cbb265e7.jpg?updatedAt=1726718034632",
            alt: "Foundant cake",
            title: "Foundant Cakes",
            text: "Our fondant cakes are crafted to perfection, offering a smooth, velvety texture that is perfect for detailed decorations.These cakes are versatile and visually stunning. Each cake is a work of art, designed to bring your special moments to life with exquisite details and vibrant colors.",
        },
        {
            src:"https://ik.imagekit.io/os5tqthul/Cakes/Fresh_cream_cakes/Screenshot_2024-09-17-09-52-13-16_6012fa4d4ddec268fc5c7112cbb265e7.jpg?updatedAt=1726719176857",
            alt:"Fresh cream cakes",
            title:"Fresh cream cakes",
            text:"Indulge in the light and fluffy goodness of our fresh cream cakes, made with layers of moist sponge and luscious cream. These cakes are perfect for those who love a delicate, airy sweetness with every bite. Our fresh cream cakes are decorated with fresh fruits, chocolates, or custom designs to suit any occasion."
        },
        {
            src: "https://ik.imagekit.io/a2gpaui9b/cake%20shop/cake6.png?updatedAt=1728195248335",
            alt: "Anniversary & Love Cakes",
            title: "Anniversary & Love Cakes",
            text: "Celebrate love with our romantic anniversary cakes, designed to express your deepest emotions. Whether it’s a heart-shaped cake or a multi-tiered creation, we make sure each cake speaks the language of love.",
        },
    ];

    const interval = 3000;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer); // Clean up the timer on unmount
    }, [images.length, interval]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-4xl max-w-6xl mx-auto p-4 gap-4 shadow-lg rounded-3xl">
            <div className="overflow-hidden">
                <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.src}
                            alt={image.alt}
                            className="w-full object-cover h- md:h-auto rounded-xl" // Adjust height for responsiveness
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-center p-4 space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold">{images[currentIndex].title}</h1>
                <p className="mt-2 text-gray-500 font-semibold text-lg md:text-xl">{images[currentIndex].text}</p>
            </div>
        </div>
    );
};

const CarouselComponent = () => {
    return (
        <div className="p-4">
            <Carousel />
        </div>
    );
};

export default CarouselComponent;
