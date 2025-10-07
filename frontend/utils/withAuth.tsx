// frontend/utils/withAuth.tsx
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios from 'axios'; // Import axios directly

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
      // Use axios directly and explicitly set the baseURL
      // This is more robust for server-side execution.
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
        headers: {
          Cookie: `access_token=${token}`,
        },
      });

      // If the request above succeeds, the token is valid.
      // Now, we can proceed with the original page's logic.
      return await gssp(context);

    } catch (error) {
      // If axios throws an error (e.g., 401 Unauthorized), the token is invalid.
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
