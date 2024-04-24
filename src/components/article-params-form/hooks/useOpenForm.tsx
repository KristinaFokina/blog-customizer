import { useEffect } from 'react';

type UseOpenFormProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	wrapperRef: React.RefObject<HTMLDivElement>;
};

export const useOpenForm = ({
	isOpen,
	setIsOpen,
	wrapperRef,
}: UseOpenFormProps) => {
	function handleArrowButtonClick() {
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			const { target } = event;
			if (target instanceof Node && !wrapperRef.current?.contains(target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, setIsOpen, wrapperRef]);

	return handleArrowButtonClick;
};
