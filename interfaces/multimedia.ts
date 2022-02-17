export enum Images {
	bag_logo = '/img/png/bag_logo.png',
	firstSection = '/img/png/FirstSection.png',
	forgot_password_picture = '/img/png/forgot_password_picture.png',
	lines_banner = '/img/png/lines_banner.png',
	login_collage = '/img/png/login_collage.png',
	logo_circle = '/img/png/logo_circle.png',
	logo_letters = '/img/png/logo_letters.png',
	register_picture = '/img/png/register_picture.png',
	secondSection = '/img/png/SecondSection.png',
	thirdSection = '/img/png/ThirdSection.png',
	order_confirmed_picture = '/img/png/order_confirmed_picture.png',
}

export type Images_Types =
	| Images.bag_logo
	| Images.firstSection
	| Images.forgot_password_picture
	| Images.lines_banner
	| Images.login_collage
	| Images.logo_circle
	| Images.logo_letters
	| Images.register_picture
	| Images.secondSection
	| Images.thirdSection
	| Images.order_confirmed_picture;

export enum Icons {
	magnifying = '/img/svg/magnifying.svg',
	person = '/img/svg/person.svg',
	shopping_bag = '/img/svg/shopping_bag.svg',
}

export type Icons_Type = Icons.magnifying | Icons.person | Icons.shopping_bag;
