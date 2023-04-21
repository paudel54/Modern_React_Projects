import React from "react";
import Image3 from "../../assets/img/feature-3-img.png";

const FeatureSection3 = () => {
  return (
    <section className="py-[30px] lg:py-[120px]">
      <div className="flex flex-col lg:flex-row">
        {/* text */}
        <div>
          <h3 className="h3 mb-6">
            Grow your profit and track your investments
          </h3>
          <p className="text-slate-700 mb-10 max-w-[408px]">
            Use advance analytical tools. Clearr TradingView charts let you
            track current and historical profit investments.
          </p>
          <button className="btn px-8 mb-4">Learn More</button>
        </div>
        {/* Image */}
        <div
          className="flex-1 flex justify-end"
          data-aos="fade-left"
          data-aos-offset="450"
        >
          <img src={Image3} alt="layouts" />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection3;
