import React, { useRef } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue,
  Container,
  Image,
  Flex,
  useBreakpointValue
} from '@chakra-ui/react';
import { Routes, Route, Link } from 'react-router-dom';

import JoinTheMission from './JoinTheMission';
import Subscribe from './Subscribe';

function HomePage() {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const reportRef = useRef(null);

  const scrollToReports = () => {
    reportRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const btnSize = useBreakpointValue({ base: 'md', md: 'lg' });

  const vibrantBtn = {
    fontWeight: 'bold',
    px: 6,
    py: 4,
    transition: 'all 0.3s ease-in-out',
    color: 'white',
    bgGradient: 'linear(to-r, #ff416c, #ff4b2b)',
    _hover: {
      transform: 'scale(1.08)',
      boxShadow: '0 0 25px rgba(255, 65, 108, 0.6)',
    },
  };

  const redBtn = {
    fontWeight: 'bold',
    px: 6,
    py: 4,
    transition: 'all 0.3s ease-in-out',
    color: 'white',
    bgGradient: 'linear(to-r, red.500, red.800)',
    _hover: {
      transform: 'scale(1.08)',
      boxShadow: '0 0 25px rgba(255, 0, 0, 0.6)',
    },
  };

  return (
    <Box bg={bg} color="white" minH="100vh" fontFamily="sans-serif">
      {/* Hero Section */}
      <Box bgGradient="linear(to-br, black, gray.800)" py={16} px={6}>
        <Flex justify="center" align="center" mb={6}>
          <Image
            src="/logo-removebg-preview.png"
            alt="NSB Logo"
            boxSize="60px"
            mr={4}
          />
          <Heading fontSize={{ base: '2xl', md: '4xl' }}>
            National Security Blackwing
          </Heading>
        </Flex>
        <Text fontSize="lg" maxW="600px" mx="auto" textAlign="center" color="gray.300" mb={6}>
          Forging India’s Blade for the Future — through AI, Cybersecurity, and Strategic Intelligence.
        </Text>
        <Flex justify="center" gap={4} flexWrap="wrap">
          <Button onClick={scrollToReports} {...redBtn} size={btnSize}>
            Read Reports
          </Button>
          <Button as={Link} to="/join" {...vibrantBtn} size={btnSize}>
            Join the Mission
          </Button>
          {/* Removed other buttons for now */}
        </Flex>
      </Box>

      {/* About Section */}
      <Container maxW="4xl" py={20} textAlign="center">
        <Heading fontSize="2xl" mb={4}>Our Vision</Heading>
        <Text color="gray.300">
          National Security Blackwing (NSB) is a private strategic force led by civilians to secure India's future in the 21st century. Founded by Akhilesh Pant, NSB empowers Bharat with technological intelligence — from AI warfare to strategic policy making.
        </Text>
      </Container>

      {/* Reports Section */}
      <Box ref={reportRef} py={20} bg="gray.900">
        <Heading textAlign="center" mb={10}>Latest Reports</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="6xl" mx="auto" px={6}>
          {[{
            title: "China-Pakistan Threat Axis",
            desc: "A report on coordinated destabilization in South Asia. Strategic review by NSB.",
            file: "National Security Blackwing Report.pdf"
          }, {
            title: "Cyber Defense Strategy 2040",
            desc: "Framework to defend India’s digital borders with AI-powered solutions.",
            file: "NSB_Report2.pdf"
          }, {
            title: "Kashmir Intelligence Brief",
            desc: "Assessment of terror infiltration networks and communication blackouts.",
            file: "NSB_Report3.pdf"
          }].map((report, index) => (
            <Box key={index} p={6} bg={cardBg} borderRadius="lg" shadow="xl">
              <Heading fontSize="xl" mb={2}>{report.title}</Heading>
              <Text color="gray.400" mb={4}>{report.desc}</Text>
              <Button
                as="a"
                href={`/reports/${report.file}`}
                download
                {...redBtn}
                size="sm"
              >
                Download
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Subscribe CTA */}
      <Box bg="red.800" textAlign="center" py={20}>
        <Heading mb={4}>Subscribe to Intelligence</Heading>
        <Text mb={6} color="gray.200">
          Get access to premium reports, AI tools, and insider intelligence.
        </Text>
        <Button
          size="lg"
          {...vibrantBtn}
          as={Link}
          to="/subscribe"
        >
          Subscribe Now
        </Button>
      </Box>

      {/* Footer */}
      <Box bg="black" py={6} textAlign="center" fontSize="sm" color="gray.500">
        &copy; {new Date().getFullYear()} National Security Blackwing | contact@nsblackwing.in
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/join" element={<JoinTheMission />} />
      <Route path="/subscribe" element={<Subscribe />} />
    </Routes>
  );
}
