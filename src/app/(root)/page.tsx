"use client";
import useTokenAndRoleCheck from "@/hooks/useTokenCheck";
import React from "react";

const Home: React.FC = () => {
  useTokenAndRoleCheck();

  return (
    <div>
      <div className="container h-screen mx-auto py-10">
        <div className="flex flex-col justify-center ">
          <h1 className="text-2xl font-semibold mb-4 font-poppins  mx-16">
            Apple SME Program
          </h1>

          <p className="p-8 mx-10 text-base font-normal ">
            Apple SME program is designed keeping in mind the needs of Small and
            medium enterprises in India . Apple SME program is designed keeping
            in mind the needs of Small and medium enterprises in India. Apple
            SME program is designed keeping in mind the needs of Small and
            medium enterprises in India.Apple SME program is designed keeping in
            mind the needs of Small and medium enterprises in India Apple SME
            program is designed keeping in mind the needs of Small and medium
            enterprises in India
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
