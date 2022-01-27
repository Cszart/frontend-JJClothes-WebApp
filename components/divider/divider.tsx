import clsx from 'clsx';
import * as React from 'react';

interface Divider_Props {
	className?: string;
	custom_divider_color?: string;
}

export const Divider: React.FC<Divider_Props> = ({
	className,
	custom_divider_color = '#0EBEA6',
}) => {
	return (
		<div
			className={clsx(
				'divider h-[1px]',
				'border-b-[1px] border-b-teal-501',
				className
			)}
			style={{ borderBottomColor: custom_divider_color }}
		/>
	);
};

export default Divider;
