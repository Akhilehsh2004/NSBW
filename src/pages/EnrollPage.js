// src/EnrollPage.js
import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Input,
    Button,
    FormControl,
    FormLabel,
    useToast,
    Select,
    VStack,
    useColorModeValue
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

const EnrollPage = () => {
    const [step, setStep] = useState('form');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
    });

    const [searchParams] = useSearchParams();
    const prefillCourse = searchParams.get('course');
    const toast = useToast();
    const bg = useColorModeValue('gray.100', 'gray.800');

    useEffect(() => {
        if (prefillCourse) {
            setFormData((prev) => ({ ...prev, course: prefillCourse }));
        }
    }, [prefillCourse]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone, course } = formData;
        if (!name || !email || !phone || !course) {
            toast({
                title: 'All fields are required.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        setStep('payment');
    };

    return (
        <Box p={10} bg={bg} minH="100vh">
            {step === 'form' && (
                <Box maxW="lg" mx="auto" p={8} bg="whiteAlpha.100" borderRadius="xl" boxShadow="lg">
                    <Heading mb={6}>Enroll in a Course</Heading>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Full Name</FormLabel>
                                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Email ID</FormLabel>
                                <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Phone Number</FormLabel>
                                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Course Applying For</FormLabel>
                                <Select name="course" value={formData.course} onChange={handleChange} placeholder="Select course">
                                    <option value="cyber">Cybersecurity for Geopolitics</option>
                                    <option value="ai">Introduction to AI & National Security</option>
                                    <option value="terror">Terrorism & Counterinsurgency Tactics</option>
                                </Select>
                            </FormControl>
                            <Button type="submit" colorScheme="red" size="lg" width="full">
                                Proceed to Payment
                            </Button>
                        </VStack>
                    </form>
                </Box>
            )}

            {step === 'payment' && (
                <Box maxW="lg" mx="auto" p={8} bg="whiteAlpha.100" borderRadius="xl" boxShadow="lg">
                    <Heading mb={6}>Pay for Your Enrollment</Heading>
                    <Text mb={4}>Name: <strong>{formData.name}</strong></Text>
                    <Text mb={4}>Email: <strong>{formData.email}</strong></Text>
                    <Text mb={4}>Phone: <strong>{formData.phone}</strong></Text>
                    <Text mb={4}>Course: <strong>{formData.course}</strong></Text>
                    <Text fontSize="lg" fontWeight="bold" mb={4}>Total Amount: ₹499</Text>

                    <Button
                        size="lg"
                        colorScheme="green"
                        bgGradient="linear(to-r, green.400, green.600)"
                        _hover={{ boxShadow: '0 0 15px lime', transform: 'scale(1.05)' }}
                        width="full"
                    >
                        Pay with UPI / Card
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default EnrollPage;
