'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { firestore } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';

const themeColors = {
  background: '#121212',       // Dark background
  foreground: '#FFFFFF',       // Light text
  primary: '#FF5722',          // Vibrant orange for primary actions
  secondary: '#FF9800',        // Secondary color for accents
  muted: '#757575',            // Muted gray for secondary text
};

const LandingPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useMediaQuery('(max-width:600px)');
  const router = useRouter();

  const handleWaitlist = () => {
    router.push('/waitlist');
  };

  const handleAbout = () => {
    router.push('/about');
  };

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const waitlists = collection(firestore, 'waitlist');
        const querySnapshot = await getDocs(waitlists);

        let userCount = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.emails) {
            userCount += data.emails.length;
          }
        });

        setTotalUsers(userCount);
      } catch (error) {
        console.error('Error fetching review count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: themeColors.background,
        overflow: 'hidden',
        position: 'relative',
        padding: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: themeColors.foreground,
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 900,
            fontSize: { xs: '2.5rem', sm: '3rem', lg: '4rem' },
            letterSpacing: '2px',
            mb: 2,
          }}
        >
          Welcome to Prof-rate Hub
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: themeColors.muted,
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.25rem' },
            mb: 4,
          }}
        >
          Discover top educators with AI-driven insights. Join our community now!
        </Typography>
        <Button
          variant="contained"
          onClick={handleWaitlist}
          sx={{
            backgroundColor: themeColors.primary,
            color: themeColors.foreground,
            fontSize: { xs: '1rem', sm: '1.25rem' },
            padding: '12px 24px',
            borderRadius: '50px',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: themeColors.secondary,
            },
          }}
        >
          Join the Waitlist
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Typography
          variant='h6'
          sx={{
            color: themeColors.muted,
            marginTop: '15px',
            textAlign: 'center',
          }}
        >
          {isLoading ? 'Calculating...' : `${totalUsers} members and counting!`}
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <Image
          src={isMobile ? "/iba-mobile.jpg" : "/iba.jpg"}  // Using the original images
          alt="Background"
          fill
          quality={100}
          priority
          style={{
            objectFit: 'cover',
            filter: 'blur(10px) brightness(50%)', // Blur the image and darken it for contrast
          }}
        />
      </Box>
    </Box>
  );
}

export default LandingPage;
