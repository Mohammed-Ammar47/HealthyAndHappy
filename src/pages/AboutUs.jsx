import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs() {
  const members = [
    {
      name: "Name",
      role: "manager",
      info: "Information: Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fman%20(1).png?alt=media&token=53f18010-9e98-4757-92ce-7525c823926d",
    },
    {
      name: "Name",
      role: "developer",
      info: "Information: Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fman%20(2).png?alt=media&token=bc742ae8-0608-4bf7-a126-f6cbbaa1e44b",
    },
    {
      name: "Name",
      role: "writer",
      info: "Information: Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fman.png?alt=media&token=888c75f3-a27f-4fab-933b-82c0297cdae3",
    },
  ];
  return (
    <div className={`w-screen bg-[#e9ffea76] `}>
      {/* Header  */}
      <Header />
      {/* Section 1  */}
      <div className="flex flex-col justify-center items-center space-y-5 py-6">
        <p className="text-[44px]/[44px] font-bold font-Playfair-Display text-center ">
          About Us
        </p>
        <p className="text-base font-medium font-Roboto-Slab w-96 text-center ">
          Our mission is to interduce you to the world of cooking and
          intricacies, allowing you to become a better cook enjoying what our
          world have to offer.
        </p>
      </div>
      {/* Section 2  */}
      <div className="py-8 px-48 ">
        <div className="bg-white p-10 rounded-[34px] boxShadow">
          <ul className="flex flex-col space-y-10">
            {members.map((member) => (
              <li className="flex flex-row space-x-3">
                <img src={member.img} className="h-[100px]" />
                <div className="font-Roboto-Slab font-normal space-y-2">
                  <p className="text-2xl">{member.name}</p>
                  <p>{member.role}</p>
                  <p>{member.info}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Footer  */}
      <Footer />
    </div>
  );
}
