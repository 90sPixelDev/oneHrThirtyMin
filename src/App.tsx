import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	solid,
	regular,
	brands,
	icon,
} from '@fortawesome/fontawesome-svg-core/import.macro';

function App() {
	const styles = {
		body: 'absolute bg-blue-100 h-[100vh] w-[100vw]',
		picCollection: 'flex flex-row',
		form: 'bg-blue-300',
		icon: 'text-blue-200 h-10 w-10',
		picUploadInput: 'absolute z-[-1] opacity-0 w-0 h-0',
		picUploadLabel:
			'text-blue-500 hover:bg-blue-300/40 hover:text-white flex flex-row place-items-center justify-center gap-2 w-fit pr-1 mx-auto mt-4 rounded-lg py-2',
		collectionTitle:
			'text-center text-blue-600 font-bold text-[36px] flow-root mx-auto my-4',
		picsContainer: 'flex flex-row',
	};

	const [picInfo, setPicInfo] = useState('Add a picture to collection!');

	const updatePicInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Get the selected file
		const file = e.currentTarget.files![0];
		// Get the file name and size
		const { name: fileName, size } = file;
		let fileNameShortened = fileName;
		if (fileName.length > 20) {
			fileNameShortened = fileName.substring(0, 20);
			fileNameShortened = fileNameShortened.concat('...');
			console.log(fileNameShortened);
		}
		// Convert size in bytes to kilo bytes
		const fileSize = (size / 1000).toFixed(2);
		// Set the text content
		const fileNameAndSize = `${fileNameShortened} - ${fileSize}KB`;
		setPicInfo(fileNameAndSize);
	};

	return (
		<div className={styles.body}>
			<form className={styles.form}>
				<label
					htmlFor='image-file'
					className={styles.picUploadLabel}
				>
					<FontAwesomeIcon
						className={styles.icon}
						icon={solid('image')}
					/>
					{picInfo}
				</label>
				<input
					className={styles.picUploadInput}
					type='file'
					name='avatar'
					id='image-file'
					accept='image/png,image/jpeg,image/gif'
					onChange={(e) => {
						updatePicInfo(e);
					}}
					required
				/>
			</form>
			<div className={styles.picCollection}>
				<p className={styles.collectionTitle}>Collection</p>
				<div className={styles.picsContainer}></div>
			</div>
		</div>
	);
}

export default App;
