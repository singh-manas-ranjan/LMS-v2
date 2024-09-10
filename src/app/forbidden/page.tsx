import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { currentUser } from "@/lib/auth-session";

const routes = {
  student: "/dashboard",
  instructor: "/instructor-dashboard",
  admin: "/admin-dashboard",
};

const ForbiddenPage = async () => {
  const user = await currentUser();
  const route = user?.role as keyof typeof routes;

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-br, gray.200, gray.500)"
      fontFamily="'Lato', sans-serif"
    >
      {/* Text */}
      <Box textAlign="center" mt={8}>
        <Heading as="h2" fontSize={"100px"} mb={4}>
          🔒
        </Heading>

        <Heading as="h1" size="lg" mb={4}>
          Access to this page is restricted
        </Heading>
        <Text fontSize="md" mb={5}>
          You do not have permission to access this page.
        </Text>
        <Text fontSize="md" mb={5}>
          Please check with the site admin if you believe this is a mistake.
        </Text>
        <Button colorScheme="blue" variant="link" size="sm">
          <Link href={routes[route]}>Go to Dashboard</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default ForbiddenPage;
