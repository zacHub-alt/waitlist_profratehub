'use client';

// Import necessary modules and components from MUI and React
import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Image from 'next/image';

// ThankYouPage Component
const ThankYouPage = () => {
	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',
				textAlign: 'center',
				padding: '20px',
				overflow: 'hidden',
				flexDirection: 'column',
				gap: '20px',
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: -1,
				}}
			>
				<Image
					src="/bg.jpg"
					alt="Background"
					fill
					style={{
						objectFit: 'cover',
						filter: 'blur(15px)',
						transform: 'scale(2.05)',
					}}
					quality={100}
					priority
				/>
			</Box>

			<Box
				sx={{
					bgcolor: 'rgba(255,255,255,0.4)',

					borderRadius: 2,
					p: { xs: 3, sm: 5, md: 7 },
					maxWidth: '600px',
					width: '100%',
					mx: 'auto',
					boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
				}}
			>
				<Container maxWidth="md">
					<Typography
						variant="h4"
						gutterBottom
						sx={{ color: 'black', mb: 2 }}
					>
						Thank You for Joining the Waitlist!
					</Typography>
					<Typography
						variant="body1"
						sx={{
							color: 'black'
						}}
					>
						We appreciate your interest in our platform. You will be notified as soon as we are ready to launch. Stay tuned for updates!
					</Typography>
				</Container>
			</Box>
		</Box>
	);
};

export default ThankYouPage;
