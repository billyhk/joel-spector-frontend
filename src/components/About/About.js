import React from 'react';

const About = () => {
	const bioSection1 = `Joel Spector was born in Havana, Cuba on January 10, 1949. His mother and father, Issac and Matilde Spector, owned a successful shoe factory in the city. When Fidel Castro took power in Cuba, Joel and his sister, Dorana, left for the United States and lived for a brief time with family in Florida.`;
	const bioSection2 = `His mother came to the United States, and soon after, she took her children with her to start a new life in Queens, NY. It would be a long time before her husband would rejoin the family. Matilde devoted herself to work, trying to give her children a good life. Almost as quickly as she found employment in the fashion industry, Matilde learned the intricacies of her job, and began what would become a very successful career. Times were tough, yet she was a cunning woman, and always able to find a way to stretch a dollar. When Isaac came to the United States without a penny in his pocket and the family was reunited, Joel’s parents worked to create a business of their own.`;
	const bioSection3 = `Joel graduated from the Fashion Institute of Technology and attended the Art Students League. He started his career by doing fashion illustrations and advertisements, later on his work would appear in children’s books, magazines, and newspapers. In 1990, Joel Spector moved to New Milford, Connecticut with his wife, Rowena, where they would raise their four children. He received his MFA at Western Connecticut State University in 2005.`;
	const bioSection4 = `As his artistic ability grew, he focused his career in portraiture and oil painting, and taught his craft at the Art League of Long Island and the Pastel Society of America. He was a member of the Painting Group of Manhattan, studied under Aaron Shikler and David Levine. Joel died on October 13, 2016. His art was a constant search for love, humanity, and compassion.`;

	const bioSection1Photos = [
		<img
			src='https://jspect.s3.amazonaws.com/artwork-hi-res/joel-young-gun.JPG'
			alt='Joel with gun'
		/>,
		<img
			src='https://jspect.s3.amazonaws.com/artwork-hi-res/joel-dorana.JPG'
			alt='Joel with Sister'
		/>,
	];
	const bioSection2Photos = [
		<img
			src='https://jspect.s3.amazonaws.com/artwork-hi-res/joel-profile.JPG'
			alt='Joel Older Profile View'
		/>,
		<img
			src='https://jspect.s3.amazonaws.com/artwork-hi-res/joel-father.JPG'
			alt='Joel with baby'
		/>,
	];

	return (
		<div className='home-wrapper'>
			<div className='about-title'>About the Artist</div>
			<section className='about-bio-section'>
				<p className='about-bio-section-text'>{bioSection1}</p>
				<div className='bio-section-gallery'>
					{bioSection1Photos.map((item) => {
						return item;
					})}
				</div>
			</section>
			<section className='about-bio-section'>
				<p className='about-bio-section-text'>{bioSection2}</p>{' '}
				<div className='bio-section-gallery'>
					{bioSection2Photos.map((item) => {
						return item;
					})}
				</div>
			</section>
			<section className='about-bio-section'>
				<p className='about-bio-section-text'>{bioSection3}</p>
			</section>
			<section className='about-bio-section'>
				<p className='about-bio-section-text'>{bioSection4}</p>
			</section>
		</div>
	);
};
export default About;
