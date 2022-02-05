import { Layout } from 'components/layout';
import { Images } from 'interfaces';
import * as React from 'react';

const Landing = () => {
	return (
		<Layout withHeader className="flex flex-col items-center gap-8">
			<img src={Images.firstSection} />
			<img src={Images.secondSection} />
			<img src={Images.thirdSection} />
		</Layout>
	);
};

export default Landing;
