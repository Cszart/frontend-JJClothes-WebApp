import * as React from 'react';

interface Footer_Props {
	brands_logos?: string[];
	custom_footer_color?: string;
}

export const Footer: React.FC<Footer_Props> = ({
	brands_logos = [],
	custom_footer_color = '#DA5E42',
}) => {
	return (
		<div
			className="footer w-full flex flex-wrap justify-between mt-auto px-25 py-8"
			style={{ background: custom_footer_color }}
		>
			{/* Logos */}
			{brands_logos &&
				brands_logos.map((logo_item: string, key: number) => {
					return (
						<img key={key} src={logo_item} className="w-[100px] h-[100px]" />
					);
				})}
		</div>
	);
};

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const token = session?.accessToken as string;

	if (!session) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};
	}
	return {
		props: { session, equalizers, pageSectionsEquializers },
	};
};
*/

export default Footer;
