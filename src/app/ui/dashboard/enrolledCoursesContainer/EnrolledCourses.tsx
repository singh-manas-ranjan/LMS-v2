import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import MyCoursesCard from "./myCoursesCard/MyCoursesCard";
import { getEnrolledCourses } from "@/actions/enrolledCourses/action";
import { TCourse } from "../../../../../public/courses";
import { getUserInfoFromLocalStorage } from "../../navbar/Navbar";
import { auth } from "@/auth";
import axios from "axios";

const EnrolledCourses = async () => {
  const session = await auth();

  const eCourses: TCourse[] = await axios
    .get(`http://localhost:3131/api/v1/students/courses/${session?.user.id}`)
    .then((res) => res.data.body);

  return (
    <Box w={"100%"} h={"100%"}>
      {Array.isArray(eCourses) && eCourses.length !== 0 ? (
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
          {eCourses.map((course, idx) => (
            <MyCoursesCard key={idx} course={course} />
          ))}
        </SimpleGrid>
      ) : (
        eCourses.length === 0 && (
          <Box w={"100%"} h={"100%"} display={"grid"} placeItems={"center"}>
            <Heading>No courses found</Heading>
          </Box>
        )
      )}
    </Box>
  );
};

export default EnrolledCourses;
