import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { useOpenForm } from './hooks/useOpenForm';
import { Text } from '../text';
import { Select } from '../select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

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

	const containerForm = useRef<HTMLInputElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const asideClassName = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});
	const handleClick = useOpenForm({ isOpen, setIsOpen, wrapperRef });

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
			<ArrowButton onClick={handleClick} isContainerOpen={isOpen} />
			<aside className={asideClassName} ref={containerForm}>
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
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={handleInputChanges}
						title={'Размер шрифта'}
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
