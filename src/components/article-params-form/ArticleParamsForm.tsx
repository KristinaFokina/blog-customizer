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
//дерево комитов
type ArticleParamsFormProps = {
	articleStyles: ArticleStateType;
	setArticleStyles: (articleStyles: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleStyles,
	setArticleStyles,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState(articleStyles);

	const asideClassName = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const wrapperRef = useRef<HTMLDivElement | null>(null);
	useOpenCloseForm({
		isOpen,
		setIsOpen,
		wrapperRef,
	});

	const handleInputChanges = (key: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setOptions((prevState) => ({ ...prevState, [key]: value }));
		};
	};

	const handleReset = () => {
		setOptions(defaultArticleState);
		setArticleStyles(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleStyles(options);
	};
	return (
		<div ref={wrapperRef}>
			<ArrowButton
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				isContainerOpen={isOpen}
			/>
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
						onChange={handleInputChanges('fontFamilyOption')}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={options.fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						onChange={handleInputChanges('fontSizeOption')}
					/>
					<Select
						selected={options.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={handleInputChanges('fontColor')}
					/>
					<Separator />
					<Select
						selected={options.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={handleInputChanges('backgroundColor')}
					/>
					<Select
						selected={options.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={handleInputChanges('contentWidth')}
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
