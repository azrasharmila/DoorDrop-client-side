import React from 'react';

const StatusCard = ({title,value}) => {
    return (
        <div className="bg-secondary/20 rounded-xl shadow-sm p-6 flex items-center justify-between mb-7">

            {/* Text Section */}
            <div>
                <h3 className="text-lg font-semibold text-primary inline-block bg-primary-5 rounded-xl p-2">{title}</h3>
                <h2 className="text-2xl font-bold mt-1 text-accent">{value}</h2>
            </div>



        </div>
    );
};

export default StatusCard;