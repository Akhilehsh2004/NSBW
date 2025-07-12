// src/PaymentPage.js
import React from 'react';
import {
    Box,
    Heading,
    Text,
    Button,
    Image,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const handleAccess = () => {
        navigate('/course-access', { state: formData });
    };

    return (
        <Box p={10} bg="gray.900" color="white" minH="100vh">
            <Box maxW="lg" mx="auto" p={8} bg="whiteAlpha.100" borderRadius="lg" boxShadow="lg">
                <Heading mb={4}>Make Payment</Heading>
                <Text mb={2}>👤 Name: <strong>{formData.name}</strong></Text>
                <Text mb={2}>📧 Email: <strong>{formData.email}</strong></Text>
                <Text mb={4}>📚 Course: <strong>{formData.course}</strong></Text>

                <Text fontWeight="bold" fontSize="lg" mb={2}>Scan QR to Pay ₹499</Text>
                <Image src="/QR.jpg" alt="QR Code" my={4} borderRadius="md" />

                <Text fontSize="md" mt={4} color="gray.300">
                    After payment, you’ll receive access within 24 hours. Please make sure to enter your correct email & phone number in the form.
                </Text>

                <Text fontSize="md" mt={6} color="yellow.200">
                    📸 Please send payment screenshot to <strong>WhatsApp: +91 8477802902</strong> or email: <strong>akhileshpant2004@gmail.com</strong>
                </Text>

                <Button
                    mt={8}
                    colorScheme="green"
                    size="lg"
                    width="full"
                    onClick={handleAccess}
                    bgGradient="linear(to-r, green.400, green.600)"
                    _hover={{ boxShadow: '0 0 15px lime', transform: 'scale(1.05)' }}
                >
                    I’ve Paid — Access Course
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentPage;
