// src/CertificateGenerator.js
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Box, Button } from '@chakra-ui/react';

const CertificateGenerator = ({ name, course, email }) => {
    const certRef = useRef();
    const today = new Date().toLocaleDateString();

    const handleDownload = async () => {
        const canvas = await html2canvas(certRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'pt', [canvas.width, canvas.height]);
        const filename = `${email}_${course}.pdf`.replace(/\s/g, '');
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(filename);
    };

    return (
        <Box textAlign="center">
            {/* Hidden certificate layout */}
            <div
                ref={certRef}
                style={{
                    width: '1000px',
                    height: '700px',
                    position: 'relative',
                    backgroundImage: 'url(/cert-template.jpg)', // Place in public/cert-template.jpg
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    fontFamily: 'Georgia, serif',
                }}
            >
                {/* Student Name */}
                <div style={{
                    position: 'absolute',
                    top: '320px',
                    left: '150px',
                    fontSize: '28px',
                    fontWeight: 'bold'
                }}>
                    {name}
                </div>

                {/* Completion Text */}
                <div style={{
                    position: 'absolute',
                    top: '370px',
                    left: '150px',
                    fontSize: '22px'
                }}>
                    has successfully completed the course
                </div>

                {/* Course Name */}
                <div style={{
                    position: 'absolute',
                    top: '410px',
                    left: '150px',
                    fontSize: '26px',
                    fontWeight: 'bold'
                }}>
                    {course}
                </div>

                {/* Date */}
                <div style={{
                    position: 'absolute',
                    top: '500px',
                    left: '150px',
                    fontSize: '18px'
                }}>
                    Date: {today}
                </div>

                {/* Signature Image */}
                <img
                    src="/signature-akhi.png" // Make sure this image is inside /public
                    alt="signature"
                    style={{
                        position: 'absolute',
                        top: '520px',
                        right: '150px',
                        width: '200px',
                    }}
                />

                {/* Founder Text */}
                <div style={{
                    position: 'absolute',
                    top: '600px',
                    right: '150px',
                    fontWeight: 'bold',
                    fontSize: '16px'
                }}>
                    Founder, National Security Blackwing
                </div>
            </div>

            {/* Download Button */}
            <Button
                onClick={handleDownload}
                mt={6}
                colorScheme="teal"
                size="lg"
            >
                🎓 Download Your Certificate
            </Button>
        </Box>
    );
};

export default CertificateGenerator;
