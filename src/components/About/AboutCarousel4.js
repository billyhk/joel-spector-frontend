import React from 'react';
import {
	MDBCarousel,
	MDBCarouselInner,
	MDBCarouselItem,
	MDBView,
} from 'mdbreact';

const CarouselPage = () => {
	const bioSection4Photos = [
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-7.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-5.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-1.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-3.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel%2Bwallach.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-4.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-2.jpg',
			alt: '',
		},
		{
			src: 'https://jspect.s3.amazonaws.com/artwork-hi-res/joel-munsel-6.jpg',
			alt: '',
		},
	];

	const carouselItems = bioSection4Photos.map((item, i) => {
		return (
			<MDBCarouselItem itemId={i + 1}>
				<MDBView>
					<img className='d-block w-100' src={item.src} alt={item.alt} />
				</MDBView>
			</MDBCarouselItem>
		);
	});

	return (
		<MDBCarousel
			activeItem={1}
			length={bioSection4Photos.length}
			showControls={true}
			showIndicators={true}
			className='z-depth-1'
			slide>
			<MDBCarouselInner>{carouselItems}</MDBCarouselInner>
		</MDBCarousel>
	);
};

export default CarouselPage;
