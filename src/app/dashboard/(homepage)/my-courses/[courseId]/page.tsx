import { Text } from "@chakra-ui/react";
import VideoPlayerComponent from "@/app/ui/dashboard/enrolledCoursesContainer/myCoursesCard/videoPlayer/VideoPlayerComponent";
import { TCourse } from "../../../../../../public/courses";
import axios from "axios";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth-session";

interface Props {
  params: { courseId: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VideoPlayer = async ({ params: { courseId }, searchParams }: Props) => {
  const user = await currentUser();

  if (!user || user.role !== "student") {
    redirect("/forbidden");
    return null;
  }

  const sectionNo = Number(searchParams.section) - 1;
  const lectureNo = Number(searchParams.lecture) - 1;

  const coursesList: TCourse[] = await axios
    .get(`http://localhost:3131/api/v1/students/courses/${user?.id}`)
    .then((res) => res.data.body)
    .catch((error) => {
      console.error("Error fetching courses:", error);
      return [];
    });

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

export default VideoPlayer;
