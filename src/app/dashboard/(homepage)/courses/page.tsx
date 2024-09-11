import { Box, SimpleGrid } from "@chakra-ui/react";
import CourseCard from "@/app/ui/dashboard/courseCard/CourseCard";
import OrderByBtn from "@/app/ui/dashboard/orderByBtn/OrderByBtn";
import orderByBtns from "../../../../../public/orderByBtns";
import { sxScrollbar } from "../../../../../public/scrollbarStyle";
import { fetchAllCourses } from "@/actions/courses/actions";
import { TCourse } from "../../../../../public/courses";
import withRoleCheck from "@/app/hoc/WithRoleCheck";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learnopia | Courses",
  description: "Learnopia | Courses",
};

const Courses = async ({
  searchParams,
}: {
  searchParams: { filter?: string; sort?: string };
}) => {
  const coursesList: TCourse[] = await fetchAllCourses();

  const filterBy = searchParams.filter || "all";
  const sortBy = searchParams.sort || "default";

  const sortedFilteredCourses = coursesList
    .sort((a, b) => {
      if (sortBy === "default") {
        return 0;
      } else if (sortBy === "rating") {
        return Number(b.courseRating) - Number(a.courseRating);
      } else {
        return sortBy === "ascending"
          ? a.courseName.localeCompare(b.courseName)
          : b.courseName.localeCompare(a.courseName);
      }
    })
    .filter((course) => {
      return filterBy === "all"
        ? course
        : filterBy === "paid"
        ? course.isPaidCourse === true
        : course.isPaidCourse === false;
    });

  return (
    <Box
      as="main"
      sx={{
        width: "100%",
        height: "100%",
        bg: "#fff",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        overflow: "hidden",
      }}
      rowGap={5}
    >
      <Box
        alignSelf={"flex-end"}
        marginRight={1}
        display={"flex"}
        columnGap={5}
      >
        {orderByBtns.map((orderBy, idx) => (
          <OrderByBtn
            key={idx}
            button={orderBy}
            selectedOptn={orderBy.btnName === "Filter" ? filterBy : sortBy}
          />
        ))}
      </Box>
      <Box overflowY={"scroll"} w={"100%"} h={"100%"} sx={sxScrollbar}>
        <SimpleGrid
          spacing={5}
          templateColumns={{
            base: "repeat(auto-fill, minmax(200px, 1fr))",
            sm: "repeat(auto-fill, minmax(220px, 1fr))",
            xl: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
          justifyContent={"center"}
          padding={".5rem"}
        >
          {sortedFilteredCourses.map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default withRoleCheck(Courses, "student");
