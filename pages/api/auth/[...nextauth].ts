import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const options: NextAuthOptions = {
	pages: {
		signIn: '/auth/signin',
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials, req) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
					{
						method: 'POST',
						body: JSON.stringify(credentials),
						headers: { 'Content-Type': 'application/json' },
					}
				);
				const user = await res.json();
				console.log(
					'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n User auth',
					user
				);

				// Return null if user data could not be retrieved
				if (user.statusCode >= 400) {
					return null;
				}

				// If no error and we have user data, return it
				if (user) {
					return user;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			session.userData = token.user;
			return session;
		},
	},
};

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
