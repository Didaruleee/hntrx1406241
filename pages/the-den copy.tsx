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
      <section className="max-w-screen-xl mx-auto my-10 md:w-full">
        <div className="flex relative">
          <div className={`md:mt-0 w-full`}>
            <Tabs
              selectedKey={selected ?? "leaderboard"}
              onSelectionChange={(key) => setSelected(key as string)}
              aria-label="Options"
              variant="light"
              color="secondary"
              size="lg"
              className={`${
                isFixed ? "fixed top-[89px] z-40 w-full bg-[#fffdf7] md:py-5 pb-16 pt-5" : "mb-16"
              } !z-40`}
            >
              <Tab key={"/the-den?tab=leaderboard"} title="Leaderboard" className="w-fit mx-auto">
                <div className={`w-fit mx-auto ${isFixed ? "mt-[104px]" : ""}`}>
                  <LeaderBoardTablenew />
                </div>
              </Tab>
              <Tab key={"/the-den?tab=overview"} title="Overview">
                <div className="flex sm:flex-nowrap flex-wrap gap-5 items-start justify-between w-full mx-auto">
                  <div
                    className={`${
                      isFixed
                        ? "fixed top-[166px] z-40 bg-[#fffdf7] transition-all duration-75 ease-in-out"
                        : ""
                    } lg:w-52 lg:block hidden max-h-[24rem] overflow-auto no-scrollbar`}
                  >
                    <OverviewSidebar />
                  </div>
                  <div
                    className={`w-fit mx-auto ${
                      isFixed ? "lg:ml-[228px] mt-[104px]" : "ml-0 lg:mt-0 mt-16"
                    }`}
                  >
                    <Overview />
                  </div>
                </div>
              </Tab>
              <Tab key={"/the-den?tab=attributes"} title="Attributes" className="w-full">
                <div className={`w-fit mx-auto ${isFixed ? "mt-[104px]" : ""}`}>
                  <Attributes />
                </div>
              </Tab>
            </Tabs>
          </div>
          <div
            className={`md:w-fit w-full ${
              isFixed
                ? "md:top-28 top-40 z-40 fixed px-7 lg:ml-[52.5rem] md:ml-[46.3rem] ml-0"
                : "md:mt-0 mt-14 absolute right-0"
            }`}
          >
            <div className="flex gap-3 items-center w-full">
              <div className="w-full">
                <Select
                  className="md:w-40 w-full !font-bold"
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
              <div className="w-fit lg:hidden block">
                <Button isIconOnly variant="light" onClick={() => setMenubar(!menubar)}>
                  <MenuIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
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
              <div className="mt-3 h-[28rem] no-scrollbar overflow-auto lg-auto p-3">
                <h1 className="font-bold my-3">Filters</h1>
                <OverviewSidebar />
              </div>
            </motion.section>
          </motion.section>
        )}
      </div>
    </section>
  );
};

export default TheDen;
