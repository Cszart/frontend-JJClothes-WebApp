export enum Images {
	collection_carousel = '/img/png/collection_carousel.png',
	firstSection = '/img/png/FirstSection.png',
	highligthBanner = '/img/png/highligthBanner.png',
	logo_circle = '/img/png/logo_circle.png',
	logo_letters = '/img/png/logo_letters.png',
	secondSection = '/img/png/SecondSection.png',
	thirdSection = '/img/png/ThirdSection.png',
}

export type Images_Types =
	| Images.collection_carousel
	| Images.firstSection
	| Images.highligthBanner
	| Images.logo_circle
	| Images.logo_letters
	| Images.secondSection
	| Images.thirdSection;

export enum Icons {
	magnifying = '/img/svg/magnifying.svg',
	person = '/img/svg/person.svg',
	shopping_bag = '/img/svg/shopping_bag.svg',
}

export type Icons_Type = Icons.magnifying | Icons.person | Icons.shopping_bag;
