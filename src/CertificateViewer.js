import React from 'react';
import { Box, Image, Button, Text } from '@chakra-ui/react';

const CertificateViewer = () => {
  const certFile = '/certificates/ap.jpg';

  return (
    <Box mt={10} textAlign="center">
      <Text fontSize="xl" mb={4}>🎓 Your Certificate</Text>

      <Image
        src={certFile}
        alt="Certificate"
        maxW="90%"
        border="2px solid #ccc"
        borderRadius="md"
        mb={4}
      />

      <a href={certFile} download>
        <Button colorScheme="teal" size="lg">
          📥 Download Certificate
        </Button>
      </a>
    </Box>
  );
};

export default CertificateViewer;
