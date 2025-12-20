import React from "react";
import { ArrowUpRight } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-primary bg-gradient-to-br from-green-200 via-white to-yellow-100 backdrop-blur-lg
                  borderz-10 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className=" mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-400 mb-2">
            <span className="stroke-text1">Smart</span> Farming{" "}
            <span className="stroke-text2">Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl">
            Comprehensive AI-powered tools to revolutionize your farming
            operations
          </p>
        </div>

        {/* Bento Box Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-fr">
          {/* Feature 1 - Large Card (spans 2 columns, 2 rows) */}
          <div className="md:col-span-3 md:row-span-2 p-8 bg-gradient-to-br from-green-200 to-yellow-100 backdrop-blur-lg border border-white/30 rounded-3xl hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex flex-col h-full">
              <div className="mb-6 flex items-center justify-between">
                <div className="text-6xl transform group-hover:scale-110 group-hover:-translate-2 transition-transform duration-300">
                  🛸
                </div>
                <div className="bg-gray-400/60 p-4 rounded-full group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight />
                </div>
              </div>
              <div className="">
                <h3 className="text-3xl font-bold text-gray-400 mb-1">
                  Drone + NPK Intelligence
                </h3>
                <p className="text-gray-500 leading-normal text-lg flex-grow">
                  Zone-wise soil nutrients and aerial crop-health insights using
                  YOLOv8 for early disease detection and precise interventions.
                </p>
              </div>
              <div className="bg-cover overflow-hidden rounded-2xl mt-6 h-full w-full border border-white/30">
                <img
                  className="W-full h-full"
                  src="/Soil-img2.jpg"
                  alt="NPK Sensor Soil Sensing Image"
                />
              </div>
            </div>
          </div>

          {/* Feature 2 - Medium Card (spans 2 columns) */}
          <div className="md:col-span-3 p-8 flex justify-between items-end gap-6 bg-gradient-to-br from-green-200 to-yellow-100 backdrop-blur-lg border border-white/30 rounded-3xl hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex flex-col h-full">
              <div className="mb-6 flex items-center justify-between">
                <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                  🤖
                </div>
                <div className="bg-gray-400/60 p-4 rounded-full group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                AI-Powered Advisories
              </h3>
              <p className="text-gray-500 leading-normal text-lg">
                ML-driven crop recommendations based on farm signals, weather
                data, and real-time diagnostics with one-tap treatment plans.
              </p>
            </div>
            <div className="bg-cover overflow-hidden rounded-2xl mt-6 h-full w-full border border-white/30">
              <img className="h-full w-auto" src="/Advisories.jpg" alt="" />
            </div>
          </div>

          {/* Feature 3 - Small Card */}
          <div className="md:col-span-2 p-8 bg-gradient-to-br from-green-200 to-yellow-100 backdrop-blur-lg border border-white/30 rounded-3xl hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex flex-col h-full">
              <div className="mb-6 flex items-center justify-between">
                <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                  💰
                </div>
                <div className="bg-gray-400/60 p-4 rounded-full group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                Smart Mini-Loans
              </h3>
              <p className="text-gray-500 leading-normal text-lg">
                Instant micro-credit scoring using land records and farm
                telemetry for quick finance access.
              </p>
            </div>
          </div>

          {/* Feature 4 - Small Card */}
          <div className="md:col-span-1 p-8 bg-gradient-to-br from-green-200 to-yellow-100 backdrop-blur-lg border border-white/30 rounded-3xl hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-1 group flex flex-col items-end justify-start text-center">
            <div className="w-full mb-4 flex flex-col items-end justify-center gap-4">
              <div className="bg-gray-400/60 p-4 rounded-full group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight />
              </div>
              <div className="text-6xl mt-2 transform group-hover:scale-110 transition-transform duration-300 flex justify-center w-full">
                🌾
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-400">e-Mandi Linkage</h3>
          </div>
        </div>

        {/* Feature 5 - Long Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="md:col-span-1 p-8 bg-gradient-to-br from-green-200 to-yellow-100 backdrop-blur-lg border border-white/30 rounded-3xl hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-start gap-6">
              <div className="flex items-start space-x-6">
                <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                  🏛️
                </div>
                <div className="w-full">
                  <div className="w-full flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-400 mb-1">
                      PM Schemes for Kisans/Farmers
                    </h3>
                    <div className="bg-gray-400/60 p-4 rounded-full group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight />
                    </div>
                  </div>
                  <p className="text-gray-500 leading-normal text-lg pr-2">
                    Explore central government schemes like PM-KISAN, PMFBY
                    (crop insurance), KCC, Soil Health Card and more — with
                    clear eligibility, benefits, required documents, and
                    step-by-step application guidance in your language.
                  </p>
                </div>
              </div>
              <div className="bg-cover overflow-hidden rounded-2xl h-44 w-full border border-white/30">
                <img
                  className="w-full h-full"
                  src="/heroImage.jpg"
                  alt="Central Government Kisan Schemes Image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;