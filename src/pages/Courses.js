// src/Courses.js
import React from 'react';
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Container,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const courses = [
    {
        title: 'Cybersecurity for Geopolitics',
        description: 'Understand how cyber tools influence modern warfare and foreign policy.',
        value: 'cyber',
    },
    {
        title: 'Introduction to AI & National Security',
        description: 'Learn how Artificial Intelligence is transforming national defense systems.',
        value: 'ai',
    },
    {
        title: 'Terrorism & Counterinsurgency Tactics',
        description: 'Deep dive into asymmetric warfare and countermeasures used worldwide.',
        value: 'terror',
    },
];

export default function Courses() {
    const cardBg = useColorModeValue('white', 'gray.800');

    return (
        <Box bg="gray.900" color="white" minH="100vh" py={20}>
            <Container maxW="6xl">
                <Heading mb={6} textAlign="center">Available Courses</Heading>
                <Text color="gray.300" mb={10} textAlign="center">
                    Learn strategic thinking, cyber warfare, intelligence analysis, and more — designed for patriots and tech leaders of Bharat.
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {courses.map((course, index) => (
                        <Box key={index} p={6} bg={cardBg} borderRadius="lg" shadow="xl">
                            <Heading fontSize="xl" mb={2}>{course.title}</Heading>
                            <Text color="gray.400" mb={4}>{course.description}</Text>
                            <Button
                                as={Link}
                                to={`/enroll?course=${course.value}`}
                                colorScheme="red"
                                variant="outline"
                                size="sm"
                            >
                                Enroll
                            </Button>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
