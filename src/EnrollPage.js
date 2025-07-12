// src/EnrollPage.js
import React, { useState, useEffect } from 'react';
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
  useColorModeValue,
} from '@chakra-ui/react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const EnrollPage = () => {
  const [searchParams] = useSearchParams();
  const prefillCourse = searchParams.get('course');
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });

  useEffect(() => {
    if (prefillCourse) {
      setFormData((prev) => ({ ...prev, course: prefillCourse }));
    }
  }, [prefillCourse]);

  const bg = useColorModeValue('gray.100', 'gray.800');
  const formBg = useColorModeValue('white', 'gray.700');

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
    navigate('/payment', { state: formData });
  };

  return (
    <Box minH="100vh" bg={bg} py={10} px={4}>
      <Box
        maxW="lg"
        mx="auto"
        p={8}
        bg={formBg}
        borderRadius="xl"
        boxShadow="lg"
        color={useColorModeValue('black', 'white')}
      >
        <Heading mb={6} textAlign="center">Enroll in a Course</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email ID</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Course Applying For</FormLabel>
              <Select
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Select a course"
              >
                <option value="cyber">Cybersecurity for Geopolitics</option>
                <option value="ai">Introduction to AI & National Security</option>
                <option value="terror">Terrorism & Counterinsurgency Tactics</option>
              </Select>
            </FormControl>
            <Button
              type="submit"
              colorScheme="red"
              size="lg"
              width="full"
            >
              Proceed to Payment
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default EnrollPage;
