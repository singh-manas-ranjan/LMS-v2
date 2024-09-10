"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Text } from "@chakra-ui/react";
import VideoPlayerComponent from "@/app/ui/dashboard/enrolledCoursesContainer/myCoursesCard/videoPlayer/VideoPlayerComponent";
import { TCourse } from "../../../../../../public/courses";
import axios from "axios";
import { useCurrentUser } from "@/hooks/use-current-user";
import WithRoleCheck from "@/app/hoc/WithRoleCheck";
interface Props {
  params: { courseId: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VideoPlayer = ({ params, searchParams }: Props) => {
  const user = useCurrentUser();
  const courseId = params.courseId;
  const sectionNo = Number(searchParams.section) - 1;
  const lectureNo = Number(searchParams.lecture) - 1;
  const [coursesList, setCoursesList] = useState<TCourse[]>([]);

  useEffect(() => {
    async function getCoursesList() {
      if (typeof window === "undefined") return {} as TCourse[];

      const eCourses: TCourse[] = await axios
        .get(`http://localhost:3131/api/v1/students/courses/${user?.id}`)
        .then((res) => res.data.body);

      setCoursesList(eCourses);
    }
    getCoursesList();
  }, [user?.id]);

  const course: TCourse | undefined = coursesList.find(
    (course) => course._id === courseId
  );

  const lectureVideos: string[] = course?.courseIndex
    ? course.courseIndex[sectionNo]?.videoLinks
    : [];
  const selectedLecture =
    course && lectureVideos ? lectureVideos[lectureNo] : course?.courseLink;

  if (!selectedLecture) {
    return <Text>No video available.</Text>;
  }
  return <VideoPlayerComponent url={selectedLecture} />;
};

export default WithRoleCheck(VideoPlayer, "student");
