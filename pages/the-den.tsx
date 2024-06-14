"use client";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {MenuIcon} from "../icons/menu-icon";
import {leaderBoardSelect, leaderBoardTable, theDenTopContent} from "../json/the-den";
import {Button, Divider, Select, SelectItem, Tab, Tabs} from "@nextui-org/react";
import {motion} from "framer-motion";
import {usePathname, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import Attributes from "./container/the-den/attributes";
import LeaderBoardTable from "./container/the-den/leaderboard-table";
import Overview from "./container/the-den/overview";
import OverviewSidebar from "./container/the-den/overview-sidebar";
import TopContent from "./container/the-den/top-content";
import { CollectionName } from "components/CollectionBox/CollectionBox.styled";
import LeaderBoardTablenew from "./container/the-den/leaderboard-table copy";


const TheDen = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [savedPath, setSavedPath] = useState("");
  const [selected, setSelected] = useLocalStorage("tabs", savedPath ?? "");
  const [isFixed, setIsFixed] = useState(false);
  const [menubar, setMenubar] = useState<boolean>(false);

  useEffect(() => {
    setSavedPath(pathname + "?" + searchParams);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = currentScrollPos > 124;

      setIsFixed(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section>
      <section>
        <div className="grid grid-cols-3 place-content-center max-w-[44rem] mx-auto">
          {theDenTopContent.map(({name, value}, index) => (
            <div key={index} className="flex justify-center items-center w-full">
              {index > 0 && index < theDenTopContent.length - 1 && (
                <Divider className="w-0.5 h-16 bg-dark my-auto" orientation="vertical" />
              )}
              <TopContent name={name} value={value} />
              {index > 0 && index < theDenTopContent.length - 1 && (
                <Divider className="w-0.5 h-16 bg-dark my-auto" orientation="vertical" />
              )}
            </div>
          ))}
        </div>
        <Divider />
      </section>
      <section className="max-w-screen-2xl mx-auto md:w-full my-10">
        <section className="w-11/12 mx-auto relative">
          <Tabs
            selectedKey={selected ?? "leaderboard"}
            onSelectionChange={(key) => setSelected(key as string)}
            aria-label="Options"
            variant="light"
            color="secondary"
            size="lg"
            className={`w-full flex lg:flex-none justify-center lg:justify-normal transition-all ease-in-out ${
              isFixed ? "bg-white fixed top-20 z-40 lg:py-10 pt-10 pb-20 w-full" : "relative"
            }`}
          >
            <Tab key={"/the-den?tab=leaderboard"} title="Leaderboard">
              <div className=" my-14">
                <LeaderBoardTablenew />
              </div>
            </Tab>
            <Tab key={"/the-den?tab=overview"} title="Overview">
              <div className="flex lg:flex-nowrap flex-wrap gap-4 my-14">
                <div
                  className={`lg:block hidden ${
                    isFixed
                      ? "fixed xl:w-60 lg:w-52 top-[210px] w-full pt-3 bg-[#fffdf7] min-h-screen z-30"
                      : ""
                  }`}
                >
                  <OverviewSidebar />
                </div>
                <div className="lg:hidden block">
                  {menubar && (
                    <motion.section
                      initial={{opacity: 0, x: "100%"}}
                      animate={{opacity: 1, x: 0}}
                      exit={{opacity: 0, x: "100%"}}
                      transition={{duration: 0.3}}
                      className="backdrop-blur bg-black/20 w-full h-screen lg:hidden block fixed top-0 right-0 z-50"
                    >
                      <motion.section
                        initial={{opacity: 0, x: "100%"}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: "100%"}}
                        transition={{duration: 0.3}}
                        className="bg-white md:min-w-96 sm:min-w-80 min-w-60 h-screen lg:hidden block fixed top-0 right-0"
                      >
                        <Button
                          isIconOnly
                          variant="light"
                          className="font-bold my-3 ml-5"
                          onClick={() => setMenubar(!menubar)}
                        >
                          X
                        </Button>
                        <Divider />
                        <div className="mt-3 h-[40rem] no-scrollbar overflow-auto lg-auto p-3">
                          <h1 className="font-bold my-3">Filters</h1>
                          <OverviewSidebar />
                        </div>
                      </motion.section>
                    </motion.section>
                  )}
                </div>
                <div
                  className={`${isFixed ? "lg:ml-[14rem] xl:ml-[16rem] flex-1" : "flex-1"} w-full`}
                >
                  <Overview />
                </div>
              </div>
            </Tab>
            <Tab key={"/the-den?tab=attributes"} title="Attributes">
              <div className="my-14">
                <Attributes />
              </div>
            </Tab>
          </Tabs>
          <div
            className={`flex gap-3 items-center justify-center w-full ${
              isFixed
                ? "fixed lg:top-[120px] top-[174px] z-40 2xl:ml-[78rem] xl:ml-[65rem] lg:ml-[48rem]"
                : "absolute lg:top-0 top-14 left-0 lg:right-0 lg:left-auto lg:w-fit w-full"
            } `}
          >
            <div className={`lg:w-full sm:w-96 w-72`}>
              <Select
                className={`lg:w-40 min-w-32 font-bold`}
                color="secondary"
                defaultSelectedKeys={["all"]}
                variant="bordered"
              >
                {leaderBoardSelect.map((item) => (
                  <SelectItem key={item.key} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Button
              className="w-fit flex justify-center lg:hidden"
              isIconOnly
              variant="light"
              onClick={() => setMenubar(!menubar)}
            >
              <MenuIcon />
            </Button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default TheDen;
