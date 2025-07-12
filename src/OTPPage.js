import React, { useState } from 'react';
import {
    Box, Heading, Input, Button, useToast, VStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function OTPPage() {
    const [otpInput, setOtpInput] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleVerify = () => {
        const realOTP = localStorage.getItem('otp');
        const email = localStorage.getItem('email');

        if (otpInput === realOTP) {
            toast({
                title: 'OTP Verified!',
                status: 'success',
                duration: 2000,
                isClosable: true
            });

            navigate('/course-access', { state: { email } });
        } else {
            toast({
                title: 'Incorrect OTP',
                status: 'error',
                duration: 2000,
                isClosable: true
            });
        }

    };

    return (
        <Box p={10} maxW="lg" mx="auto">
            <Heading mb={6}>Enter OTP</Heading>
            <VStack spacing={4}>
                <Input
                    placeholder="Enter OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                />
                <Button onClick={handleVerify} colorScheme="blue">Verify</Button>
            </VStack>
        </Box>
    );
}