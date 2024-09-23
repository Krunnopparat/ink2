"use client";
import { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function DimentionCal() {
  const [bmc, setBMC] = useState(0);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [coverage, setCoverage] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [waste, setWaste] = useState(0);
  const [transfer, setTransfer] = useState(0);

  const areaCal = () => {
    const areaAmout = (width * length) / 1000000;
    return isNaN(areaAmout) ? 0 : areaAmout;
  };

  const calculateInk = () => {
    const areaAmout = areaCal();
    const inkAmount = (((areaAmout * quantity * (coverage / 100) * (100 + waste)) / 100) * bmc * (transfer / 100)) / 1000;
    return isNaN(inkAmount) ? 0 : inkAmount.toFixed(2);
  };

  return (
    <>
      <form>
        <div className=" px-2 md:px-20 mt-6">
          <h1 className="text-lg mt-4 text-gray-900">Label Dimention</h1>
          <div className="border-b border-gray-900/10">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-6 mb-4">
              <div className="sm:col-span-2 sm:col-start-1">
                <div className="mt-2">
                  <label
                    htmlFor="BCM"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    BCM
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      id="bmc"
                      onChange={(e) => setBMC(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-2">
                  <label
                    htmlFor="BCM"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Width
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      id="width"
                      onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <div
                        className="h-full pt-2 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                      >
                        <p>mm.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-2">
                  <label
                    htmlFor="BCM"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Length
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      id="length"
                      onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <div
                        className="h-full pt-2 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                      >
                        <p>mm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-2">
                  <label
                    htmlFor="BCM"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Area
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      placeholder={areaCal()}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      disabled readonly
                      />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <div
                        className="h-full pt-2 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 sm:text-sm"
                      >
                        <p>m²</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-6 mb-4">
              <div className="sm:col-span-2 sm:col-start-1">
                <div className="mt-2">
                  <label
                    htmlFor="BCM"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ink Coverage
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      id="coverage"
                      onChange={(e) => setCoverage(parseFloat(e.target.value) || 0)}
                      placeholder="0.00%"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <div
                        className="h-full pt-2 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 sm:text-sm"
                      >
                        <p>%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-2">
                  <label
                    htmlFor="BCM"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      id="quantity"
                      onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <div
                        className="h-full pt-2 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                      >
                        <p>Psc</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-2">
                  <label
                    htmlFor="BCM"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Waste
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      id="waste"
                      onChange={(e) => setWaste(parseFloat(e.target.value) || 0)}
                      placeholder="0.00%"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <div
                        className="h-full pt-2 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                      >
                        <p>%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <div className="mt-2">
                  <label
                    htmlFor="BCM"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ink Transfer
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      id="transfer"
                      onChange={(e) => setTransfer(parseFloat(e.target.value) || 0)}
                      placeholder="0.00%"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <div
                        className="h-full pt-2 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                      >
                        <p>%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <div className="mt-2">
                  <label
                    htmlFor="BCM"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ink to be prepared
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      placeholder={calculateInk()}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 placeholder:text-gray-950 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      disabled readonly
                      />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <div
                        className="h-full pt-2 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 sm:text-sm"
                      >
                        <p>kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <div className="mx-10 mt-6">
        <h1 className="text-3xl mb-2 font-extrabold">from BCM</h1>
        <h1 className="text-xl">Label Dimention</h1>
        BMC
        <div className="flex flex-row mb-3">
          <input
            className="border"
            id="bmc"
            onChange={(e) => setBMC(parseFloat(e.target.value) || 0)}
          />
        </div>
        Width
        <div className="flex flex-row mb-3">
          <input
            className="border"
            id="width"
            onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
          />
          <p className="px-3">mm.</p>
        </div>
        Length
        <div className="flex flex-row mb-3">
          <input
            className="border"
            id="length"
            onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
          />
          <p className="px-3">mm.</p>
        </div>
        Area
        <div className="flex flex-row mb-3">
          <p>{areaCal()}</p>
          <p className="px-3">m²</p>
        </div>
        Ink coverage
        <div className="flex flex-row mb-3">
          <input
            className="border"
            id="coverage"
            onChange={(e) => setCoverage(parseFloat(e.target.value) || 0)}
          />
          <p className="px-3">percent</p>
        </div>
        Quantity
        <div className="flex flex-row mb-3">
          <input
            className="border"
            id="quantity"
            onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
          />
          <p className="px-3">Pcs</p>
        </div>
        Waste
        <div className="flex flex-row mb-3">
          <input
            className="border"
            id="waste"
            onChange={(e) => setWaste(parseFloat(e.target.value) || 0)}
          />
          <p className="px-3">percent</p>
        </div>
        Ink transfer*
        <div className="flex flex-row mb-5">
          <input
            className="border"
            id="transfer"
            onChange={(e) => setTransfer(parseFloat(e.target.value) || 0)}
          />
          <p className="px-3">percent</p>
        </div>
        Ink to be prepared
        <div className="flex flex-row mb-5">
          <p>{calculateInk()}</p>
          <p className="px-3">kg.</p>
        </div>
      </div> */}
    </>
  );
}
