import React from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';

export default function Tools() {
    return (
        <Box bg="gray.900" color="white" minH="100vh" py={20}>
            <Container maxW="4xl">
                <Heading mb={4}>AI Tools Marketplace</Heading>
                <Text>Coming soon: Powerful AI tools for security, analysis, and strategy.</Text>
            </Container>
        </Box>
    );
}