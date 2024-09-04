'use client';

import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { firestore } from '@/firebase';
import { useRouter } from 'next/navigation';

const Submit = ({ onClick, isSubmitting }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#800000',
          color: '#ffffff',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#800000',
          },
        }}
        onClick={onClick}
      >
        {isSubmitting ? 'Submitting...' : 'Submit and Join Waitlist'}
      </Button>
    </Box>
  );
};

const WaitlistPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const validateForm = () => {
    if (!email) {
      setError('Please provide a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const documentRef = doc(firestore, 'waitlist', 'general');
      await setDoc(documentRef, { emails: arrayUnion(email) }, { merge: true });
      console.log('Email submitted successfully!');
      router.push('/post-submission');
    } catch (error) {
      console.error('Error submitting email:', error);
      setError('Failed to submit email. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        padding: '20px',
        backgroundImage: `url('/blured-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ marginTop: '20px' }}>
        <Card
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#1e1e1e',
              }}
            >
              Join Our Waitlist
            </Typography>
            <TextField
              label="Enter your Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginBottom: 2,
                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'maroon',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'maroon',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'maroon',
                },
              }}
            />
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {error}
              </Typography>
            )}
            <Submit onClick={handleSubmit} isSubmitting={isSubmitting} />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default WaitlistPage;
