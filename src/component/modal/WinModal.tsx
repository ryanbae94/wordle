import React from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	answer: string;
	dict: {
		type: string;
		trans: string;
		example: string;
	};
};

export default function WinModal({
	isOpen,
	onClose,
	answer,
	dict,
}: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
			<div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
				<div className='absolute top-4 right-4'></div>
				<div>
					<div className='text-center'>
						<h1 className='font-bold text-2xl leading-6'>정답입니다!</h1>
						<div className='mt-2'>
							<p className='text-sm text-gray-500'>당신의 재능이 부럽네요.</p>
							<div className='flex justify-center mb-1 mt-4'>
								{Array.from({ length: answer.length }, (_, answerIndex) => {
									return (
										<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-green-200  border-black cell-animation uppercase'>
											{answer[answerIndex]}
										</div>
									);
								})}
							</div>
							<div className='flex flex-col'>
								<div className='flex justify-start'>
									<p className='text-lg font-bold'>
										{dict.trans}{' '}
										<span className='text-sm text-gray-500'>{dict.type}</span>
									</p>
								</div>
								<p className='text-sm text-gray-500 flex justify-start'>
									{dict.example}
								</p>
							</div>
						</div>
					</div>
				</div>
				<button
					className='mt-5 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
					onClick={onClose}
				>
					한 판 더!
				</button>
			</div>
		</div>
	);
}
