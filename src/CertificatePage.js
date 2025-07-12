import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import CertificateViewer from './CertificateViewer';

const CertificatePage = () => {
  return (
    <Box p={10}>
      <Heading mb={4}>🎓 Quiz Result</Heading>
      <Text mb={4}>✅ You passed the quiz!</Text>

      <CertificateViewer />
    </Box>
  );
};

export default CertificatePage;
