import { Recycle, CheckCircle, XCircle, Truck } from "lucide-react";
import React from "react";

type SkipOption = {
  id: number;
  size: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  price_before_vat: number;
  vat: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
};

type Props = {
  skips: SkipOption[];
};

export default function SkipGrid({ skips }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mx-60 ">
      {skips.map((skip, index) => {
        const row = Math.floor(index / 2); // 2 items per row
        const isEvenRow = row % 2 === 0;
        const isFirstInRow = index % 2 === 0;

        let colSpanClass = "md:col-span-1";

        if (isEvenRow) {
          // Even row: first item spans 1, second spans 2
          colSpanClass = isFirstInRow ? "md:col-span-1" : "md:col-span-2";
        } else {
          // Odd row: first item spans 2, second spans 1
          colSpanClass = isFirstInRow ? "md:col-span-2" : "md:col-span-1";
        }

        const totalPrice = (
          skip.price_before_vat *
          (1 + skip.vat / 100)
        ).toFixed(2);

        return (
          <div
            key={skip.id}
            className={`
              ${colSpanClass}
              bg-[#1C1C1C] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300
              border-4 border-gray-700 hover:border-blue-500 p-6 group flex flex-col justify-between
              transform hover:-translate-y-1 lg:h-[550px]
            `}
          >
            {/* Header with size and truck icon */}
            <div className="flex items-center justify-between mb-4 ">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-600/50 rounded-xl group-hover:bg-blue-500/50 transition-colors">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {skip.size} m³
                  </h3>
                  <p className="text-sm text-gray-400">Skip Size</p>
                </div>
              </div>

              {/* Featured badge for larger skips */}
              {skip.size >= 12 && (
                <span className="px-3 py-1 bg-blue-600/50 text-white text-xs font-semibold rounded-full">
                  Popular
                </span>
              )}
            </div>

            {/* Visual representation - Fixed height */}
            <div className="relative mb-6">
              <div className="w-fill h-48 bg-gradient-to-br from-[#121212] to-[#1C1C1C] rounded-xl flex items-center justify-center border-2 border-dashed border-gray-500 group-hover:border-blue-400 transition-colors">
                {/* <div className="text-center"> */}
                  {/* <Recycle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <span className="text-gray-300 font-medium">
                    {skip.size}m³ Capacity
                  </span> */}
                  <img
                    src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg`}
                    alt={`${skip.size}m³ Skip`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                {/* </div> */}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">
                  Road Placement
                </span>
                {skip.allowed_on_road ? (
                  <div className="flex items-center space-x-1 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Allowed</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-red-400">
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Not Allowed</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">Heavy Waste</span>
                {skip.allows_heavy_waste ? (
                  <div className="flex items-center space-x-1 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Accepted</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Limited</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="border-t-2 border-gray-700 pt-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    Total Price (inc. VAT)
                  </p>
                  <p className="text-3xl font-bold text-white">£{totalPrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    Base: £{skip.price_before_vat}
                  </p>
                  <p className="text-xs text-gray-500">VAT: {skip.vat}%</p>
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-600/50 hover:bg-blue-500/50 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50">
                Select This Skip
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
