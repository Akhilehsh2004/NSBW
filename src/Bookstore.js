import React from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';

export default function Bookstore() {
    return (
        <Box bg="gray.900" color="white" minH="100vh" py={20}>
            <Container maxW="4xl">
                <Heading mb={4}>NSB Digital Bookstore</Heading>
                <Text>Purchase upcoming strategy handbooks, intelligence journals, and more.</Text>
            </Container>
        </Box>
    );
}