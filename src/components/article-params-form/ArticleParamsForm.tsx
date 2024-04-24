import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import {
	OptionType,
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOpenCloseForm } from './hooks/useOpenCloseForm';
import { useState, useRef, FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	params: ArticleStateType;
	setParams: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	params,
	setParams,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [state, setState] = useState(params);

	const asideClassName = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const handleArrowButtonClick = useOpenCloseForm({
		isOpen,
		setIsOpen,
		wrapperRef,
	});

	function handleInputChanges(value: OptionType) {
		if (fontFamilyOptions.includes(value)) {
			setState({ ...state, fontFamilyOption: value });
		}
		if (fontColors.includes(value)) {
			setState({ ...state, fontColor: value });
		}
		if (backgroundColors.includes(value)) {
			setState({ ...state, backgroundColor: value });
		}
		if (contentWidthArr.includes(value)) {
			setState({ ...state, contentWidth: value });
		}
		if (fontSizeOptions.includes(value)) {
			setState({ ...state, fontSizeOption: value });
		}
	}

	const handleReset = () => {
		setState(defaultArticleState);
		setParams(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setParams(state);
	};

	return (
		<div ref={wrapperRef}>
			<ArrowButton onClick={handleArrowButtonClick} isContainerOpen={isOpen} />
			<aside className={asideClassName}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true}>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={handleInputChanges}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={state.fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						onChange={handleInputChanges}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={handleInputChanges}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={handleInputChanges}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={handleInputChanges}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
