import React from 'react';
import applegadgets from '../../../assets/Brands/applegadgets.png'
import carnesia from '../../../assets/Brands/carnesia.png'
import deshal from '../../../assets/Brands/deshal.png'
import siodil from '../../../assets/Brands/siodil.png'
import skybuy from '../../../assets/Brands/skybuy.png'
import sundorabd from '../../../assets/Brands/sundorabd.png'
import themall from '../../../assets/Brands/themall.png'
import circle from '../../../assets/Brands/circle.png'
import kk from '../../../assets/Brands/kk.png'
import fabrilife from '../../../assets/Brands/fabrilife.png'
import step from '../../../assets/Brands/step.png'
import adlib from '../../../assets/Brands/adlib.png'
import custommac from '../../../assets/Brands/custommac.png'
import aarong from '../../../assets/Brands/aarong.png'
import startech from '../../../assets/Brands/startech.png'


const brands = [
  custommac,
  kk,
  startech,
  aarong,
  applegadgets,
  circle,
  deshal,
  sundorabd,
  carnesia,
  step,
  siodil,
  fabrilife,
  adlib,
  skybuy,
  themall
  
];

const Companies = () => {
  return (
    <div className="py-16 ">

      <h2 className="text-center text-2xl md:text-2xl text-accent font-semibold mb-15 ">
        We've worked with hundreds of sales teams across various industries.
      </h2>

      {/* ONE marquee only */}
      <marquee
        direction="left"
        scrollamount="6"
        onMouseOver={(e) => e.currentTarget.stop()}
        onMouseOut={(e) => e.currentTarget.start()}
        loop="infinite"
      >
        <div className="flex items-center gap-16 px-10">
          {[...brands,...brands,...brands,...brands].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="brand"
              className="h-16 w-auto object-contain"
            />
          ))}
        </div>
      </marquee>

    </div>
  );
};

export default Companies;