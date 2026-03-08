
import { useEffect, useState } from 'react';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('/services.json')
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((err) => console.error('Failed to load services:', err));
    }, []);
   // console.log(services);

    return (
        <section className="bg-[#efecec] rounded-2xl max-w-screen-2xl mx-auto py-20 px-6 md:px-12 flex items-center">
            <div className="mx-10 my-9">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-secondary text-3xl md:text-5xl font-bold mb-6">
                        Our Solutions
                    </h2>
                    <p className="text-black text-lg max-w-2xl mx-auto leading-relaxed">
                        Experience seamless, dependable shipping with live tracking and zero stress.
                        From individual parcels to large-scale commercial freight, we deliver on schedule.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className='p-12 rounded-2xl bg-[#d0d6c4] flex flex-col items-center text-center transition-all duration-300 hover:bg-[#d9cfb0] hover:-translate-y-2 hover:scale-[1.02]'

                        >
                            {/* Title - Bold and prominent to replace the visual weight of an icon */}
                            <h3 className="text-xl font-bold mb-6 tracking-tight uppercase border-b border-current pb-2 inline-block">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className={`text-base leading-relaxed font-medium text-gray-500
                                }`}>
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;