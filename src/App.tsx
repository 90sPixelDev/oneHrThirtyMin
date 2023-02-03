import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	solid,
	regular,
	brands,
	icon,
} from '@fortawesome/fontawesome-svg-core/import.macro';
import { storage } from './firebase.config';
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	listAll,
} from 'firebase/storage';

function App() {
	const styles = {
		body: 'absolute flex flex-col bg-blue-200 h-[100vh] w-[100vw] overflow-hidden',
		picCollection: 'flex flex-col min-h-0',
		form: 'bg-blue-300 py-3',
		icon: 'text-blue-200 h-10 w-10',
		picUploadInput: 'absolute z-[-1] opacity-0 w-0 h-0',
		picUploadLabel:
			'text-blue-500 hover:bg-blue-300/40 hover:text-white flex flex-row place-items-center justify-center gap-2 w-fit pr-1 mx-auto mt-4 rounded-lg py-2',
		collectionTitle:
			'text-center text-blue-600 font-bold text-[36px] flow-root mx-auto my-4',
		picsContainer:
			'w-[70%] h-full flex flex-col overflow-y-scroll overflow-x-hidden mx-auto bg-blue-100 mb-6',
		sendBtn: 'bg-blue-500 text-blue-200 px-2 py-1 rounded-lg mx-auto flow-root',
		pic: 'max-w-[90%] mx-auto p-1 bg-blue-300 mb-4',
	};

	const [picInfo, setPicInfo] = useState('Add a picture to collection!');
	const [currentFile, setCurrentFile] = useState<File>();
	const [picsList, setPicsList] = useState<string[]>([]);
	const [update, setUpdate] = useState(false);

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
		setCurrentFile(file);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (currentFile === undefined || currentFile == null) return;

		const storageRef = ref(storage, `${currentFile.name}`);

		console.log(currentFile);

		const uploadTask = uploadBytesResumable(storageRef, currentFile);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) *
					100;
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						break;
					case 'running':
						console.log('Upload is running');
						break;
				}
				setUpdate((prevState) => !prevState);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	const getFilesList = async () => {
		const listRef = ref(storage);

		const res = await listAll(listRef);
		const picListT: string[] = [];
		const picListP: string[] = [];

		res.items.forEach((itemRef: any) => {
			picListT.push(itemRef);
		});

		picListT.forEach(async (item) => {
			const itemURL = await getURL(item);
			picListP.push(itemURL);
		});

		setTimeout(() => {
			setPicsList(picListP.map((p) => p));
		}, 1000);
	};

	useEffect(() => {
		getFilesList();

		return () => {
			getFilesList();
		};
	}, [update]);

	const getURL = async (itemRef: any) => {
		const pic = await getDownloadURL(itemRef);
		return pic;
	};

	return (
		<div className={styles.body}>
			<form className={styles.form} onSubmit={handleSubmit}>
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
				<button className={styles.sendBtn} type='submit'>
					Send
				</button>
			</form>
			<div className={styles.picCollection}>
				<p className={styles.collectionTitle}>Collection</p>
				<div className={styles.picsContainer}>
					{picsList?.map((p) => (
						<img src={p} key={p} className={styles.pic} />
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
