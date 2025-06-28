// "use client";
// import React from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { useState } from "react";
// import { IoLocationSharp } from "react-icons/io5";
// import City from "../../../public/assets/mock-data/list-station";
// import BikeMap from "@/components/bike-map";
// const ListStation = () => {
//   const [rotatedItems, setRotatedItems] = useState({});

//   const toggleItem = (index) => {
//     setRotatedItems((prev) => ({
//       ...prev,
//       [index]: !prev[index], // Đảo trạng thái của item được bấm
//     }));
//     setOpen(open === index ? null : index); // Mở nếu chưa mở, đóng nếu đang mở
//   };
//   const [open, setOpen] = useState(null);

//   const citys = City;

//   return (
//     <>
//       <div className="flex">
//         {" "}
//         <div className="w-[400px]">
//           <div className="bg-blue-600 p-4 text-center">
//             <h2 className="uppercase text-xl text-white">danh sách trạm</h2>
//           </div>
//           <div className="px-4 pb-2 border-r">
//             <div className="my-2">
//               <label
//                 htmlFor="city"
//                 className="block text-gray-700 font-medium mb-1"
//               >
//                 Thành phố
//               </label>
//               <select
//                 id="city"
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               >
//                 <option>Tất cả</option>
//                 <option>Hà Nội</option>
//                 <option>Hồ Chí Minh</option>
//                 <option>Đà Nẵng</option>
//                 <option>Vũng Tàu</option>
//                 <option>Hải Phòng</option>
//               </select>
//             </div>

//             <div className="mb-2">
//               <label
//                 htmlFor="keyword"
//                 className="block text-gray-700 font-medium mt-4 mb-1"
//               >
//                 Từ khóa
//               </label>
//               <input
//                 id="keyword"
//                 type="text"
//                 placeholder="Tên quận, đường, trạm xe..."
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>

//             <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200">
//               Tìm kiếm
//             </button>
//           </div>

//           <div className="     ">
//             <div className="flex flex-col max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ">
//               {citys.map((item, index) => {
//                 return (
//                   <React.Fragment key={index + "vinh"}>
//                     <button
//                       className="py-4 px-5 flex items-center justify-between border-r  border-b focus:bg-blue-200 "
//                       onClick={() => {
//                         toggleItem(index);
//                         setOpen(!open);
//                       }}
//                     >
//                       <strong>{item.city}</strong>
//                       <IoIosArrowDown
//                         className={`text-2xl transition-transform duration-300 ${
//                           rotatedItems[index] ? "rotate-180" : "rotate-0"
//                         }`}
//                       />
//                     </button>
//                     {rotatedItems[index] && (
//                       <div className="p-4 bg-gray-100 ">
//                         {citys[index].stations.length > 0 &&
//                           citys[index].stations.map((item, index) => {
//                             return (
//                               <div
//                                 className="flex items-center border-b mb-0.5 "
//                                 key={index + "vinh"}
//                               >
//                                 <div className="py-2 px-4 w-[80%]">
//                                   <b>{item.name}</b>
//                                   <div className="text-sm">{item.address}</div>
//                                 </div>
//                                 <div className="py-2 px-4">
//                                   <IoLocationSharp className="text-red-500 text-3xl" />
//                                 </div>
//                               </div>
//                             );
//                           })}
//                       </div>
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           </div>
//           <div className="min-h-[30px] h-auto "></div>
//         </div>
//         <div className="w-[calc(100vw-400px)]">
//           <BikeMap className="-z-50" />
//         </div>
//       </div>

//       <div></div>
//     </>
//   );
// };

// export default ListStation;
// "use client";
// import React, { useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { IoLocationSharp } from "react-icons/io5";
// import City from "../../../public/assets/mock-data/list-station";
// import BikeMap from "@/components/bike-map";

// const ListStation = () => {
//   const [rotatedItems, setRotatedItems] = useState({});
//   const [open, setOpen] = useState(null);
//   const [selectedCity, setSelectedCity] = useState("Tất cả");
//   const [keyword, setKeyword] = useState("");
//   const [filteredStations, setFilteredStations] = useState(City);

//   const toggleItem = (index) => {
//     setRotatedItems((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//     setOpen(open === index ? null : index);
//   };

//   const handleSearch = () => {
//     let filtered = City.filter(
//       (city) =>
//         selectedCity === "Tất cả" ||
//         city.city.toLowerCase() === selectedCity.toLowerCase()
//     );

//     filtered = filtered.map((city) => ({
//       ...city,
//       stations: city.stations.filter(
//         (station) =>
//           station.name.toLowerCase().includes(keyword.toLowerCase()) ||
//           station.address.toLowerCase().includes(keyword.toLowerCase())
//       ),
//     }));

//     setFilteredStations(filtered);

//     // Mở danh sách trạm của tất cả thành phố phù hợp
//     const newRotatedItems = {};
//     filtered.forEach((city, index) => {
//       if (city.stations.length > 0) {
//         newRotatedItems[index] = true;
//       }
//     });
//     setRotatedItems(newRotatedItems);
//   };

//   return (
//     <>
//       <div className="flex">
//         <div className="w-[400px]">
//           <div className="bg-blue-600 p-4 text-center">
//             <h2 className="uppercase text-xl text-white">danh sách trạm</h2>
//           </div>
//           <div className="px-4 pb-2 border-r">
//             <div className="my-2">
//               <label
//                 htmlFor="city"
//                 className="block text-gray-700 font-medium mb-1"
//               >
//                 Thành phố
//               </label>
//               <select
//                 id="city"
//                 value={selectedCity}
//                 onChange={(e) => setSelectedCity(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               >
//                 <option>Tất cả</option>
//                 {City.map((city, index) => (
//                   <option key={index} value={city.city}>
//                     {city.city}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-2">
//               <label
//                 htmlFor="keyword"
//                 className="block text-gray-700 font-medium mt-4 mb-1"
//               >
//                 Từ khóa
//               </label>
//               <input
//                 id="keyword"
//                 type="text"
//                 value={keyword}
//                 onChange={(e) => setKeyword(e.target.value)}
//                 placeholder="Tên quận, đường, trạm xe..."
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>

//             <button
//               onClick={handleSearch}
//               className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
//             >
//               Tìm kiếm
//             </button>
//           </div>

//           <div className="flex flex-col max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//             {filteredStations.map((item, index) => (
//               <React.Fragment key={index}>
//                 <button
//                   className="py-4 px-5 flex items-center justify-between border-r border-b focus:bg-blue-200"
//                   onClick={() => toggleItem(index)}
//                 >
//                   <strong>{item.city}</strong>
//                   <IoIosArrowDown
//                     className={`text-2xl transition-transform duration-300 ${
//                       rotatedItems[index] ? "rotate-180" : "rotate-0"
//                     }`}
//                   />
//                 </button>
//                 {rotatedItems[index] && (
//                   <div className="p-4 bg-gray-100">
//                     {item.stations.map((station, i) => (
//                       <div
//                         className="flex items-center border-b mb-0.5"
//                         key={i}
//                       >
//                         <div className="py-2 px-4 w-[80%]">
//                           <b>{station.name}</b>
//                           <div className="text-sm">{station.address}</div>
//                         </div>
//                         <div className="py-2 px-4">
//                           <IoLocationSharp className="text-red-500 text-3xl" />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//         <div className="w-[calc(100vw-400px)]">
//           <BikeMap className="-z-50" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ListStation;

"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import City from "../../../../public/assets/mock-data/list-station";
import BikeMap from "@/components/bike-map";

const ListStation = () => {
  const [rotatedItems, setRotatedItems] = useState({});
  const [open, setOpen] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Tất cả");
  const [keyword, setKeyword] = useState("");
  const [filteredStations, setFilteredStations] = useState(City);
  const [mapCenter, setMapCenter] = useState(null);

  const toggleItem = (index) => {
    setRotatedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setOpen(open === index ? null : index);
  };

  const handleSearch = () => {
    let filtered = City.filter(
      (city) =>
        selectedCity === "Tất cả" ||
        city.city.toLowerCase() === selectedCity.toLowerCase()
    );

    filtered = filtered.map((city) => ({
      ...city,
      stations: city.stations.filter(
        (station) =>
          station.name.toLowerCase().includes(keyword.toLowerCase()) ||
          station.address.toLowerCase().includes(keyword.toLowerCase())
      ),
    }));

    setFilteredStations(filtered);

    // Mở danh sách trạm của tất cả thành phố phù hợp
    const newRotatedItems = {};
    filtered.forEach((city, index) => {
      if (city.stations.length > 0) {
        newRotatedItems[index] = true;
      }
    });
    setRotatedItems(newRotatedItems);
  };

  const handleLocationClick = (lat, lng) => {
    setMapCenter({ lat, lng });
  };

  return (
    <>
      <div className="flex">
        <div className="w-[400px]">
          <div className="bg-blue-600 p-4 text-center">
            <h2 className="uppercase text-xl text-white">danh sách trạm</h2>
          </div>
          <div className="px-4 pb-2 border-r">
            <div className="my-2">
              <label
                htmlFor="city"
                className="block text-gray-700 font-medium mb-1"
              >
                Thành phố
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option>Tất cả</option>
                {City.map((city, index) => (
                  <option key={index} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label
                htmlFor="keyword"
                className="block text-gray-700 font-medium mt-4 mb-1"
              >
                Từ khóa
              </label>
              <input
                id="keyword"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tên quận, đường, trạm xe..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSearch}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Tìm kiếm
            </button>
          </div>

          <div className="flex flex-col max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {filteredStations.map((item, index) => (
              <React.Fragment key={index}>
                <button
                  className="py-4 px-5 flex items-center justify-between border-r border-b focus:bg-blue-200"
                  onClick={() => toggleItem(index)}
                >
                  <strong>{item.city}</strong>
                  <IoIosArrowDown
                    className={`text-2xl transition-transform duration-300 ${
                      rotatedItems[index] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {rotatedItems[index] && (
                  <div className="p-4 bg-gray-100">
                    {item.stations.map((station, i) => (
                      <div
                        className="flex items-center border-b mb-0.5"
                        key={i}
                      >
                        <div className="py-2 px-4 w-[80%]">
                          <b>{station.name}</b>
                          <div className="text-sm">{station.address}</div>
                        </div>
                        <div className="py-2 px-4">
                          <IoLocationSharp
                            className="text-red-500 text-3xl cursor-pointer"
                            onClick={() =>
                              handleLocationClick(
                                parseFloat(station.lat),
                                parseFloat(station.lng)
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="w-[calc(100vw-400px)]">
          <BikeMap className="-z-50" center={mapCenter} />
        </div>
      </div>
    </>
  );
};

export default ListStation;
