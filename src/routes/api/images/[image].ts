import fs from 'fs';

export async function get({ params }) {
	const imgPath = params.image;

	const img = fs.readFileSync(`data/images/${imgPath}`);

	const status = 200;
	const body = img;

	return {
		status,
		body,
		headers: {
			'Content-Type': 'image/*',
			'Cache-Control': 'max-age=31536000, immutable'
		}
	};
}
