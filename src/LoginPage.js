import React, { useState } from 'react';
import {
Box, Heading, Input, Button, useToast, VStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
const [email, setEmail] = useState('');
const toast = useToast();
const navigate = useNavigate();

const handleSendOTP = () => {
if (!email) {
toast({
title: 'Please enter your email.',
status: 'error',
duration: 3000,
isClosable: true
});
return;
}

// Simulate sending OTP (later use real backend/email API)
const generatedOTP = "123456"; // In real, generate random 6-digit
localStorage.setItem('email', email);
localStorage.setItem('otp', generatedOTP);

toast({
  title: 'OTP sent to your email!',
  description: `Check your inbox for the OTP: ${generatedOTP}`, // dev only
  status: 'success',
  duration: 3000,
  isClosable: true
});

navigate('/verify-otp');


};

return (
<Box p={10} maxW="lg" mx="auto">
<Heading mb={6}>Login to Access Course</Heading>
<VStack spacing={4}>
<Input
placeholder="Enter your email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<Button onClick={handleSendOTP} colorScheme="teal">Send OTP</Button>
</VStack>
</Box>
);
}