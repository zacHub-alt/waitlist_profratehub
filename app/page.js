'use client';

import LandingPage from './landing/page';
import Waitlist from './waitlist/page';
import ThankYouPage from './post-submission/page';
import { usePathname } from 'next/navigation';
import FeedbackForm from './feedback/page';
import SignIn from './signin/page';

const Page = () => {
    const pathname = usePathname();

    if (pathname === '/waitlist') {
        return <Waitlist />;
    }

    if (pathname === '/post-submission') {
        return <ThankYouPage />;
    }

    if (pathname === '/feedback') {
        return <FeedbackForm />;
    }

    if (pathname === '/signin') {
        return <SignIn />;
    }

    return <LandingPage />;
};

export default Page;
