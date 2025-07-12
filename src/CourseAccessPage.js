// src/CourseAccessPage.js
import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    Button,
    useToast
} from '@chakra-ui/react';
import { LockIcon, UnlockIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifiedEmails } from './whitelist';

const videoList = [
    { title: 'Lecture 1: Introduction', file: '/videos/Lecture1.mp4' },
    { title: 'Lecture 2: Fundamentals', file: '/videos/Lecture1.mp4' },
    { title: 'Lecture 3: Case Study', file: '/videos/Lecture1.mp4' },
    { title: '📝 Quiz', type: 'quiz' },
    { title: '🎓 Certificate', type: 'certificate' }
];

const CourseAccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const email = location.state?.email;
    const course = location.state?.course;
    const isVerified = verifiedEmails.includes(email);
    const [current, setCurrent] = useState(0);
    const [watched, setWatched] = useState([]);

    const handleVideoEnd = () => {
        setWatched((prev) => Array.from(new Set([...prev, current])));
        if (current + 1 < videoList.length) {
            setCurrent(current + 1);
        }
    };

    const handleSpecialClick = () => {
        const currentItem = videoList[current];
        if (currentItem.type === 'quiz') {
            navigate('/quiz', { state: { email, course } });
        } else if (currentItem.type === 'certificate') {
            navigate('/certificate', { state: { email, course } });
        }
    };

    if (!isVerified) {
        return (
            <Box p={10}>
                <Text fontWeight="bold" color="red.500">
                    Access Denied: Payment not verified for this email.
                </Text>
                <Text>
                    If you’ve paid, please send a screenshot to WhatsApp or email to get verified.
                </Text>
            </Box>
        );
    }

    const currentItem = videoList[current];

    return (
        <Box display={{ base: 'block', md: 'flex' }} minH="100vh">
            <VStack bg="gray.800" color="white" p={4} minW="250px" spacing={4} align="stretch">
                <Heading size="md">Course Videos</Heading>
                {videoList.map((video, index) => (
                    <HStack
                        key={index}
                        p={3}
                        borderRadius="md"
                        bg={index === current ? 'gray.700' : 'gray.600'}
                        opacity={index > watched.length ? 0.5 : 1}
                        cursor={index <= watched.length ? 'pointer' : 'not-allowed'}
                        onClick={() => index <= watched.length && setCurrent(index)}
                    >
                        <Icon as={index <= watched.length ? UnlockIcon : LockIcon} />
                        <Text>{video.title}</Text>
                    </HStack>
                ))}
            </VStack>

            <Box flex={1} p={10}>
                <Heading mb={4}>Welcome to Your Course, {email}</Heading>
                <Text mb={4}>Start learning:</Text>

                {currentItem.type === 'quiz' || currentItem.type === 'certificate' ? (
                    <Box>
                        <Button colorScheme="teal" size="lg" onClick={handleSpecialClick}>
                            {currentItem.type === 'quiz' ? 'Start Quiz' : 'View Certificate'}
                        </Button>
                    </Box>
                ) : (
                    <>
                        <video
                            width="100%"
                            height="400px"
                            controls
                            style={{ borderRadius: '8px' }}
                            key={current} // force reload
                            onEnded={handleVideoEnd}
                        >
                            <source src={currentItem.file} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <Text mt={2} fontSize="sm" color="gray.500">
                            ⚠️ Next section will unlock after this video finishes.
                        </Text>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default CourseAccessPage;
