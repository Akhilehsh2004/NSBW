import {
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    VStack,
    Container,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import db from './firebase'; // ✅ correct import for default export

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function JoinTheMission() {
    const toast = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            toast({ title: 'All fields required.', status: 'error' });
            return;
        }
        setLoading(true);
        try {
            await addDoc(collection(db, 'joinApplications'), {
                name,
                email,
                message,
                createdAt: Timestamp.now()
            });
            toast({ title: 'Application submitted!', status: 'success' });
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error(error);
            toast({ title: 'Failed to submit.', status: 'error' });
        }
        setLoading(false);
    };

    return (
        <Box bg="gray.900" color="white" minH="100vh" py={20}>
            <Container maxW="xl">
                <Heading mb={6} textAlign="center">
                    Join the Mission
                </Heading>
                <Text mb={8} textAlign="center" color="gray.300">
                    If you are passionate about national security, technology, intelligence, or geopolitics — we want to hear from you.
                </Text>
                <VStack spacing={5} as="form" onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Why do you want to join?</FormLabel>
                        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                    </FormControl>
                    <Button colorScheme="red" type="submit" width="full" isLoading={loading}>
                        Submit Application
                    </Button>
                </VStack>
                <Text mt={10} textAlign="center" fontSize="sm" color="gray.400">
                    <Link to="/">← Back to Home</Link>
                </Text>
            </Container>
        </Box>
    );
}
