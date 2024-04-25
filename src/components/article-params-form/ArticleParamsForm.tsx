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
	const [options, setOptions] = useState(params);

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
		setOptions((prevOptions) => {
			const newOptions = { ...prevOptions };
			if (fontFamilyOptions.includes(value)) {
				newOptions.fontFamilyOption = value;
			} else if (fontColors.includes(value)) {
				newOptions.fontColor = value;
			} else if (backgroundColors.includes(value)) {
				newOptions.backgroundColor = value;
			} else if (contentWidthArr.includes(value)) {
				newOptions.contentWidth = value;
			} else if (fontSizeOptions.includes(value)) {
				newOptions.fontSizeOption = value;
			}
			return newOptions;
		});
	}

	const handleReset = () => {
		setOptions(defaultArticleState);
		setParams(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setParams(options);
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
						selected={options.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={handleInputChanges}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={options.fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						onChange={handleInputChanges}
					/>
					<Select
						selected={options.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={handleInputChanges}
					/>
					<Separator />
					<Select
						selected={options.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={handleInputChanges}
					/>
					<Select
						selected={options.contentWidth}
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
