// frontend/utils/withAuth.tsx
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import apiClient from '../lib/axios'; // You'll use this now

export function withAuth(gssp: GetServerSideProps): GetServerSideProps {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const token = req.cookies.access_token;

    if (!token) {
      // No token found, definitely redirect.
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    try {
      // ✅ This is the new, secure part.
      // We are making a request from the Next.js server to the backend server.
      // We must forward the token in the headers for the backend to validate.
      await apiClient.get('/auth/profile', {
        headers: {
          Cookie: `access_token=${token}`,
        },
      });

      // If the request above succeeds, the token is valid.
      // Now, we can proceed with the original page's logic.
      return await gssp(context);

    } catch (error) {
      // If apiClient throws an error (e.g., 401 Unauthorized), the token is invalid.
      // Redirect the user to the login page.
      console.error("Authentication failed:", error);
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  };
}