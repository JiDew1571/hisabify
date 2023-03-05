import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Hisab from './Hisab';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/HisabsContainer';
import PageBtnContainer from './PageBtnContainer';

const HisabsContainer = () => {
	const {
		getHisabs,
		hisabs,
		isLoading,
		page,
		totalHisabs,
		search,
		searchStatus,
		searchType,
		sort,
		numOfPages,
		showAlert,
	} = useAppContext();
	useEffect(() => {
		getHisabs();
		// eslint-disable-next-line
	}, [page, search, searchStatus, searchType, sort]);
	if (isLoading) {
		return <Loading center />;
	}

	if (hisabs.length === 0) {
		return (
			<Wrapper>
				<h2>No hisabs to display...</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			{showAlert && <Alert />}
			<h5>
				{totalHisabs} hisab{hisabs.length > 1 && 's'} found
			</h5>
			<div className='hisabs'>
				{hisabs.map((hisab) => {
					return <Hisab key={hisab._id} {...hisab} />;
				})}
			</div>
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};

export default HisabsContainer;
