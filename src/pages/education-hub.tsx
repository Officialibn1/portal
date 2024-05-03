import Link from "@docusaurus/Link";
import DarkHeroStyles from "@site/src/components/Common/DarkHeroStyles";
import transitions from "@site/static/transitions.json";
import Layout from "@theme/Layout";
import Card from "@site/src/components/EducationHubPage/Card";
import FilterBar from "@site/src/components/EducationHubPage/FilterBar";
import PlusIcon from "@site/static/img/svgIcons/plus.svg";
import {
  CourseContentType,
  CourseItem,
  courseItems,
  CourseLanguage,
  CourseLevel,
} from "@site/src/components/Common/courseItems";
import communityProjects from "@site/community/communityProjects";
import {
  deserializeStringList,
  serializeStringList,
  useQueryParam,
} from "../utils/use-query-param";
import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";
import AnimateSpawn from "../components/Common/AnimateSpawn";
import LinkArrowRight from "../components/Common/Icons/LinkArrowRight";
import LinkArrowUpRight from "../components/Common/Icons/LinkArrowUpRight";
import LinkCardsSection from "../components/Common/LinkCardsSection";
import ShareMeta from "../components/Common/ShareMeta";
import { useFontsLoaded } from "@site/src/utils/use-fonts-loaded";
import VideoCard from "../components/Common/VideoCard/index";
// import youtubeData from "@site/.docusaurus/youtube/default/youtube.json";
import { NewsCard } from "../components/NewsPage/Cards";
import clsx from "clsx";
import CodeBlockString from "../theme/CodeBlock/Content/String";
import { useDarkHeaderInHero } from "../utils/use-dark-header-in-hero";
import PromoCard from "../components/GlobalEvents/PromoCard";

const MotionLink = motion(Link);

function filterCourses(
  courses: CourseItem[],
  selectedLanguages: CourseLanguage[],
  selectedLevels: CourseLevel[],
  selectedContentTypes: CourseContentType[],
  searchTerm: string
): CourseItem[] {
  if (selectedLanguages.length > 0) {
    courses = courses.filter(({ languages }) =>
      languages?.some((item) => selectedLanguages.includes(item))
    );
  }
  if (selectedLevels.length > 0) {
    courses = courses.filter(({ level }) =>
      level?.some((item) => selectedLevels.includes(item))
    );
  }
  if (selectedContentTypes.length > 0) {
    courses = courses.filter(({ contentType }) =>
      contentType?.some((item) => selectedContentTypes.includes(item))
    );
  }

  if (searchTerm.trim() !== "") {
    const term = searchTerm.trim().toLowerCase();
    courses = courses.filter(
      ({ body, title }) =>
        body.toLowerCase().includes(term) || title.toLowerCase().includes(term)
    );
  }
  return courses;
}

function EducationHubPage() {
  const fontLoaded = useFontsLoaded();
  const heroRef = useRef<HTMLDivElement>(null);
  const isDark = useDarkHeaderInHero(heroRef);
  const [searchTerm, setSearchTerm, queryParamInitialized] =
    useQueryParam<string>("term", "", {
      serialize: (a) => (a === "" ? undefined : a),
      deserialize: (s) => s,
    });
  const [selectedLanguages, setSelectedLanguages] = useQueryParam<
    CourseLanguage[]
  >("selectedLanguages", [], {
    serialize: serializeStringList,
    deserialize: deserializeStringList,
  });
  const [selectedLevels, setSelectedLevels] = useQueryParam<CourseLevel[]>(
    "selectedLevels",
    [],
    {
      serialize: serializeStringList,
      deserialize: deserializeStringList,
    }
  );
  const [selectedTopics, setSelectedTopics] = useQueryParam<CourseTopic[]>(
    "selectedTopics",
    [],
    {
      serialize: serializeStringList,
      deserialize: deserializeStringList,
    }
  );
  const [selectedContentTypes, setSelectedContentTypes] = useQueryParam<
    CourseContentType[]
  >("selectedContentTypes", [], {
    serialize: serializeStringList,
    deserialize: deserializeStringList,
  });

  const coursesStartRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (
      queryParamInitialized &&
      (selectedLanguages.length > 0 ||
        selectedLevels.length > 0 ||
        selectedContentTypes.length > 0 ||
        searchTerm.length > 0)
    ) {
      window.scrollTo({
        top:
          window.scrollY +
          coursesStartRef.current.getBoundingClientRect().top -
          50,
      });
    }
  }, [queryParamInitialized]);

  const [selectedSortBy, setSelectedSortBy] = React.useState("Relevance");
  const [filteredCourses, setFilteredCourses] = React.useState(courseItems);
  const [numberOfItems, setNumberOfItems] = React.useState(7);

  const sortCourses = (courses) => {
    if (selectedSortBy === "Relevance") {
      courses.sort((a, b) => a.index - b.index);
    } else if (selectedSortBy === "A to Z") {
      courses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSortBy === "Z to A") {
      courses.sort((a, b) => b.title.localeCompare(a.title));
    }
  };

  useEffect(() => {
    let tempFilteredCourses = filterCourses(
      courseItems,
      selectedLanguages,
      selectedLevels,
      selectedContentTypes,
      searchTerm
    );
    sortCourses(tempFilteredCourses);
    setFilteredCourses(tempFilteredCourses);
  }, [selectedLanguages, selectedLevels, selectedContentTypes, searchTerm]);

  return (
    <Layout title="Education Hub" description="Education page.">
      <ShareMeta image=""></ShareMeta>

      <main
        className="text-black relative overflow-hidden"
        style={{
          marginTop: `calc(var(--ifm-navbar-height) * -1)`,
        }}
      >
        {isDark && <DarkHeroStyles bgColor="transparent"></DarkHeroStyles>}
        <section
          className="text-white pt-20 mb-[10vw] lg:mb-3"
          style={{
            background:
              "var(--gradient-dark-purple, linear-gradient(54deg, #3B00B9 0%, #D38ED7 131.95%)",
          }}
          ref={heroRef}
        >
          <div className="container-10 pt-20 pb-12 sm:pb-40 md:pb-40 md:pt-36 relative z-10">
            <motion.h1
              className="tw-heading-3 md:tw-heading-2 mb-2 md:mb-6 md:w-8/10 "
              variants={transitions.item}
            >
              ICP Education Hub
            </motion.h1>
            <div className="relative  md:w-5/10">
              <motion.p
                className="tw-lead-sm md:tw-lead mb-8"
                variants={transitions.item}
              >
                Description of what this page is and all the education topics
                available
              </motion.p>
              {/* <MotionLink
                className="button-white"
                href="/ai"
                target="_blank"
                rel="noopener noreferrer"
                variants={transitions.item}
              >
                EXPLORE AI ON ICP
              </MotionLink> */}
            </div>
          </div>
          <div className="container-12 relative z-1 h-[200px] md:h-0 pointer-events-none">
            <div className="absolute w-10/12 sm:w-5/12 left-1/2 translate-y-1/2 -translate-x-[50%] bottom-1/2 md:left-0 md:absolute md:w-5/12 md:bottom-0 md:translate-x-[130%] md:translate-y-2/12">
              <img
                src="/img/education-hub/education-hero.svg"
                alt="Start building on Internet Identity"
                className="w-full max-w-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>
        <section className="container-10 mt-24 mb-24">
          <AnimateSpawn variants={transitions.container}>
            <section className="">
              <motion.div variants={transitions.item}>
                <FilterBar
                  numberOfItems={filteredCourses.length}
                  selectedLanguages={selectedLanguages}
                  setSelectedLanguages={setSelectedLanguages}
                  selectedLevels={selectedLevels}
                  setSelectedLevels={setSelectedLevels}
                  selectedContentTypes={selectedContentTypes}
                  setSelectedContentTypes={setSelectedContentTypes}
                  selectedSortBy={selectedSortBy}
                  setSelectedSortBy={setSelectedSortBy}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </motion.div>
              <motion.div
                variants={transitions.item}
                className="mt-12"
                ref={coursesStartRef}
              >
                <p className="tw-heading-6 md:tw-heading-5">
                  Azyle course topics
                </p>
                <p className="tw-paragraph text-black-60">
                  Donec sed odio dui. Maecenas faucibus mollis interdum.{" "}
                </p>
              </motion.div>
              <motion.div
                variants={transitions.item}
                className={clsx(
                  "relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 transition-opacity items-stretch",
                  filteredCourses.length === 0 ? "" : "mt-11 mb-20"
                )}
              >
                {filteredCourses.slice(0, numberOfItems).map((course) => (
                  <Card
                    key={course.index}
                    title={course.title}
                    body={course.body}
                    languages={course.languages}
                    tags={course.tags}
                    link={course.link}
                  />
                ))}
                <div
                  className="rounded-xl  text-white flex px-4 py-8 md:px-6 md:py-8  backdrop-blur-2xl"
                  style={{
                    background:
                      " var(--gradient-dark-purple, linear-gradient(54deg, #3B00B9 0%, #D38ED7 131.95%))",
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="tw-lead mb-0">Submit your course</h3>
                    <p className="tw-paragraph text-white/60">
                      Duis mollis, est non commodo luctus, nisi erat porttitor.
                    </p>
                    <div className="flex-1"></div>
                    <p className="mt-2 mb-0">
                      <Link
                        className={clsx("button-white text-center w-full")}
                        href={""}
                      >
                        Submit Now
                      </Link>
                    </p>
                  </div>
                </div>
              </motion.div>
              {filteredCourses.length > numberOfItems && (
                <div
                  className="flex mt-20 items-center justify-center tw-heading-6 text-infinite hover:text-black-60"
                  onClick={() => setNumberOfItems(numberOfItems + 8)}
                >
                  <div className="inline-block mr-2 h-6">
                    <PlusIcon />
                  </div>
                  <p className="mb-0 cursor-pointer select-none">Load more</p>
                </div>
              )}
            </section>
          </AnimateSpawn>
        </section>
      </main>
    </Layout>
  );
}

export default EducationHubPage;