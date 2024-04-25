type UseOpenCloseFormProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	wrapperRef: React.RefObject<HTMLDivElement>;
};

export const useOpenCloseForm = ({
	isOpen,
	setIsOpen,
	wrapperRef,
}: UseOpenCloseFormProps) => {
	function handleArrowButtonClick() {
		if (isOpen) {
			setIsOpen(!isOpen);
			document.removeEventListener('mousedown', handleOutsideClick);
		} else {
			setIsOpen(!isOpen);
			document.addEventListener('mousedown', handleOutsideClick);
		}
	}
	function handleOutsideClick(event: MouseEvent) {
		const { target } = event;
		if (target instanceof Node && !wrapperRef.current?.contains(target)) {
			setIsOpen(false);
		}
	}

	return handleArrowButtonClick;
};
