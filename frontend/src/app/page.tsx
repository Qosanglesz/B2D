import Header from "@/components/Header";
import Campaign from "@/components/Campaign";
import React from "react";

export default function Home() {
  return(
      <>
          <Header/>
          <div>
              <h1 className="text-2xl font-bold ml-20 my-8">Fundraising Campaign</h1>
              <div className="grid grid-cols-4 mx-5 gap-4">
                  <Campaign picture={"https://picsum.photos/200/300"}
                            logo={"https://picsum.photos/200/300"}
                            companyName={"Tarhahawa"} description={"Company details"}
                            currentRaised={300000}
                            fundTarget={40000}
                            amountOfInvestors={20}
                            location={"Europe"}/>

                  <Campaign picture={"https://picsum.photos/200/300"}
                            logo={"https://picsum.photos/200/300"}
                            companyName={"Tarhahawa"} description={"Company details"}
                            currentRaised={300000}
                            fundTarget={40000}
                            amountOfInvestors={20}
                            location={"Europe"}/>

                  <Campaign picture={"https://picsum.photos/200/300"}
                            logo={"https://picsum.photos/200/300"}
                            companyName={"Tarhahawa"} description={"Company details"}
                            currentRaised={300000}
                            fundTarget={40000}
                            amountOfInvestors={20}
                            location={"Europe"}/>

                  <Campaign picture={"https://picsum.photos/200/300"}
                            logo={"https://picsum.photos/200/300"}
                            companyName={"Tarhahawa"} description={"Company details"}
                            currentRaised={300000}
                            fundTarget={40000}
                            amountOfInvestors={20}
                            location={"Europe"}/>
              </div>
              <div className="text-center py-10">
                  <a href="#" className="text-xl text-white bg-gray-800 hover:bg-gray-900 py-3 px-7 rounded-lg">View All</a>
              </div>
          </div>
      </>
  );
}
