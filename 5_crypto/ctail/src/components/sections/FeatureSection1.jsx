import React from "react";
//image
import Image1 from "../../assets/img/feature-1-img.png";

const FeatureSection1 = () => {
  return (
    <section className="pb-[30px] lg:pb-[120px] pt-0">
      <div className="flex flex-col lg:flex-row">
        {/*text section  */}
        <div
          className="max-w-[454px] mb-6 lg:mb-10"
          data-aos="fade-right"
          data-aos-offset="400"
        >
          <h3 className="h3 mb-6">Invest Smart</h3>
          <p className="text-slate-700 mb-8">
            Get full statistic information about the behaviour of buyer and
            seller will help you to make the decision.
          </p>
          <button className="btn px-8 mx-auto lg:mx-0">Learn More</button>
        </div>
        {/* image sections */}
        <div
          className="flex-1 flex justify-end"
          data-aos="fade-left"
          data-aos-offset="400"
        >
          <img src={Image1} alt="banner" draggable="false" />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection1;
