import React from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function InfoModal({ isOpen, onClose }: ModalProps) {
	if (!isOpen) return null;
	const handleModalClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation();
	};
	return (
		<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
			<div
				className='inline-block align-bottom w-10/12 bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'
				onClick={handleModalClick}
			>
				<div className='absolute top-4 right-4'>
					<button className='text-2xl' onClick={onClose}>
						X
					</button>
				</div>
				<div>
					<div className='text-center'>
						<h1 className='font-bold text-xl leading-6'>How To Play</h1>
						<div className='mt-2'>
							<p className='text-sm text-gray-500'>
								다섯 개의 알파벳으로 이루어진 영어 단어를 여섯 번의 도전 안에
								맞혀봅시다. 단어를 작성한 후 'ENTER'를 누르면 칸 색깔이
								변합니다!
							</p>
							<div className='flex justify-center mb-1 mt-4'>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-green-200  border-black cell-animation'>
									P
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-black cell-animation'>
									O
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-black cell-animation'>
									W
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-black cell-animation'>
									E
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-black cell-animation'>
									R
								</div>
							</div>
							<p className='text-sm text-gray-500'>
								'P'는 <span className='font-bold text-black'>올바른 자리</span>
								에 있습니다.
							</p>
							<div className='flex justify-center mb-1 mt-4'>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white  border-black cell-animation'>
									C
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-black cell-animation'>
									L
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-yellow-200 border-black cell-animation'>
									I
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-black cell-animation'>
									F
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-black cell-animation'>
									F
								</div>
							</div>
							<p className='text-sm text-gray-500'>
								'I'는 <span className='font-bold text-black'>잘못된 자리</span>
								에 있습니다.
							</p>
							<div className='flex justify-center mb-1 mt-4'>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white  border-black cell-animation'>
									R
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-black cell-animation'>
									E
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-black cell-animation'>
									A
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-gray-400 border-black cell-animation'>
									C
								</div>
								<div className='w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-2xl font-bold rounded bg-white border-black cell-animation'>
									T
								</div>
							</div>
							<p className='text-sm text-gray-500'>
								'C'는 어느 곳에도 맞지 않습니다.
							</p>
							<div className='flex gap-6 mt-4 justify-center'>
								<div className='flex justify-center items-center gap-2'>
									<span className='text-m font-bold'>Mode: </span>
									<button
										className='text-xs text-indigo-700 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-100 font-medium lg:text-sm uppercase'
										disabled
									>
										Easy
									</button>
								</div>
								<div className='flex justify-center items-center gap-2'>
									<span className='text-m font-bold'>AI: </span>
									<button
										className='text-xs text-indigo-700 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-100 font-medium lg:text-sm uppercase'
										disabled
									>
										OFF
									</button>
								</div>
							</div>
							<p className='mt-2 text-sm text-gray-500'>
								하단의 버튼을 눌러 난이도와 AI 모드를 변경할 수 있습니다.
								<span className='text-red-500'> AI는 무자비 </span> 합니다.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
