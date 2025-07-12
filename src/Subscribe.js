// src/Subscribe.js
import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Container,
    useToast,
} from '@chakra-ui/react';
import db from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Subscribe() {
    const toast = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!name || !email) {
            toast({ title: 'Please fill all fields.', status: 'error' });
            return;
        }
        setLoading(true);
        try {
            await addDoc(collection(db, 'subscribers'), {
                name,
                email,
                subscribedAt: Timestamp.now(),
            });
            toast({ title: 'Subscribed successfully!', status: 'success' });
            setName('');
            setEmail('');
        } catch (err) {
            console.error(err);
            toast({ title: 'Subscription failed.', status: 'error' });
        }
        setLoading(false);
    };

    return (
        <Box bg="gray.900" color="white" minH="100vh" py={20}>
            <Container maxW="md">
                <Heading mb={6} textAlign="center">Subscribe to Intelligence</Heading>
                <Text mb={8} textAlign="center" color="gray.300">
                    Get notified when we release strategic reports, tools, or insights.
                </Text>
                <VStack spacing={5} as="form" onSubmit={handleSubscribe}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <Button type="submit" colorScheme="red" width="full" isLoading={loading}>
                        Subscribe
                    </Button>
                </VStack>
                <Text mt={10} textAlign="center" fontSize="sm" color="gray.400">
                    <Link to="/">← Back to Home</Link>
                </Text>
            </Container>
        </Box>
    );
}
