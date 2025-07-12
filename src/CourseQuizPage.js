// src/CourseQuizPage.js
import React, { useState } from 'react';
import {
  Box, Heading, Text, Button, Radio, RadioGroup, Stack, useToast
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const quizData = {
  cyber: [
    {
      question: 'What is a firewall used for?',
      options: ['Cooking', 'Network Security', 'Hacking', 'Printing'],
      answer: 'Network Security',
    },
    {
      question: 'Which is a strong password?',
      options: ['123456', 'password', 'Q@8#zLs1', 'abc123'],
      answer: 'Q@8#zLs1',
    },
  ],
};

export default function CourseQuizPage() {
  const location = useLocation();
  const formData = location.state;
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');

  const questions = quizData[formData.course];
  const currentQ = questions[step];

  const handleNext = () => {
    if (!selected) return;

    if (selected === currentQ.answer) setScore(score + 1);
    setSelected('');

    if (step + 1 === questions.length) {
      const total = questions.length;
      const percentage = (score + (selected === currentQ.answer ? 1 : 0)) / total * 100;
      const passed = percentage >= 70;

      navigate('/certificate', {
        state: {
          email: formData.email,
          course: formData.course,
          score: score + (selected === currentQ.answer ? 1 : 0),
          total,
          percentage,
          passed,
        }
      });
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Box p={8} maxW="lg" mx="auto">
      <Heading mb={4}>Quiz: {formData.course.toUpperCase()}</Heading>
      <Text fontWeight="bold">Q{step + 1}: {currentQ.question}</Text>
      <RadioGroup onChange={setSelected} value={selected} my={4}>
        <Stack direction="column">
          {currentQ.options.map((opt, i) => (
            <Radio key={i} value={opt}>{opt}</Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Button colorScheme="teal" onClick={handleNext}>Next</Button>
    </Box>
  );
}
