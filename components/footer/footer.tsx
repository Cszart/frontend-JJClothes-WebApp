import clsx from 'clsx';
import { Images } from 'interfaces';
import * as React from 'react';

interface Footer_Props {
	className?: string;
	brands_logos?: string[];
	custom_footer_color?: string;
	show_banks_logos?: boolean;
}

export const Footer: React.FC<Footer_Props> = ({
	className,
	brands_logos = [],
	custom_footer_color = '#E2A9FD',
	show_banks_logos,
}) => {
	return (
		<div
			className={clsx(
				'footer w-full flex flex-wrap justify-center gap-10 mt-auto px-25 py-8',
				className
			)}
			style={{ background: custom_footer_color }}
		>
			{/* Logos */}
			{brands_logos &&
				brands_logos.map((logo_item: string, key: number) => {
					return (
						<img key={key} src={logo_item} className="w-[100px] h-[100px]" />
					);
				})}

			{show_banks_logos && <img src={Images.degvaBank_logo} />}
		</div>
	);
};

export default Footer;
