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
  selectedSkip: SkipOption | null;
  onSkipSelect: (skip: SkipOption) => void;
};

export default function SkipGrid({ skips, selectedSkip, onSkipSelect }: Props) {
  return (
    <div className="w-full max-w-[calc(100%-20%)] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {skips.map((skip, index) => {
          const row = Math.floor(index / 2); // 2 items per row on md screens
          const isEvenRow = row % 2 === 0;
          const isFirstInRow = index % 2 === 0;
          const isSelected = selectedSkip?.id === skip.id;

          let colSpanClass = "sm:col-span-1";

          // Only apply special column spanning on lg screens and up
          if (skips.length > 2) {
            if (isEvenRow) {
              // Even row: first item spans 1, second spans 2
              colSpanClass = isFirstInRow ? "lg:col-span-1" : "lg:col-span-2";
            } else {
              // Odd row: first item spans 2, second spans 1
              colSpanClass = isFirstInRow ? "lg:col-span-2" : "lg:col-span-1";
            }
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
                ${
                  isSelected
                    ? "border-4 border-blue-500 ring-4 ring-blue-500/20"
                    : "border-4 border-gray-700 hover:border-blue-500"
                }
                p-4 sm:p-6 group flex flex-col justify-between
                transform hover:-translate-y-1 min-h-[480px] sm:min-h-[520px] lg:min-h-[550px]
                ${isSelected ? "scale-[1.02]" : ""}
              `}
            >
              {/* Header with size and truck icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div
                    className={`p-2 sm:p-3 rounded-xl transition-colors ${
                      isSelected
                        ? "bg-blue-500"
                        : "bg-blue-600/50 group-hover:bg-blue-500/50"
                    }`}
                  >
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {skip.size} m³
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Skip Size
                    </p>
                  </div>
                </div>

                {/* Selected badge or Popular badge */}
                {isSelected ? (
                  <span className="px-2 sm:px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    Selected
                  </span>
                ) : skip.size >= 12 ? (
                  <span className="px-2 sm:px-3 py-1 bg-blue-600/50 text-white text-xs font-semibold rounded-full">
                    Popular
                  </span>
                ) : null}
              </div>

              {/* Visual representation - Responsive height */}
              <div className="relative mb-4 sm:mb-6">
                <div
                  className={`w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-[#121212] to-[#1C1C1C] rounded-xl flex items-center justify-center border-2 border-dashed transition-colors overflow-hidden ${
                    isSelected
                      ? "border-blue-400"
                      : "border-gray-500 group-hover:border-blue-400"
                  }`}
                >
                  {/* Added one of the img's sources for better visualization of the design */}
                  <img
                    src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg`}
                    alt={`${skip.size}m³ Skip`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-300 font-medium">
                    Road Placement
                  </span>
                  {skip.allowed_on_road ? (
                    <div className="flex items-center space-x-1 text-green-400">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        Allowed
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-red-400">
                      <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        Not Allowed
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-300 font-medium">
                    Heavy Waste
                  </span>
                  {skip.allows_heavy_waste ? (
                    <div className="flex items-center space-x-1 text-green-400">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        Accepted
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        Limited
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t-2 border-gray-700 pt-3 sm:pt-4 mt-auto">
                <div className="flex items-end justify-between mb-3 sm:mb-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400 mb-1">
                      Total Price (inc. VAT)
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      £{totalPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      Base: £{skip.price_before_vat}
                    </p>
                    <p className="text-xs text-gray-500">VAT: {skip.vat}%</p>
                  </div>
                </div>

                <button
                  onClick={() => onSkipSelect(skip)}
                  className={`w-full font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#0137C1] focus:ring-opacity-50 text-sm sm:text-base ${
                    isSelected
                      ? "bg-[#0137C1] hover:bg-[#0150DC] text-white"
                      : "bg-[#0137C1] hover:bg-[#0150DC] text-white"
                  }`}
                >
                  {isSelected ? "Selected" : "Select This Skip"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
