import { useAppContext } from '../context/appContext';
import StatItem from './StatItem';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = () => {
	const { stats } = useAppContext();

	const defaultStats = [
		{
			title: 'half way task',
			count: stats.halfWay || 0,
			icon: <FaSuitcaseRolling />,
			color: '#e9b949',
			bcg: '#fcefc7',
		},
		{
			title: 'completed tasks',
			count: stats.done || 0,
			icon: <FaCalendarCheck />,
			color: '#647acb',
			bcg: '#e0e8f9',
		},
		{
			title: 'pending tasks',
			count: stats.pending || 0,
			icon: <BsClockHistory />,
			color: '#ffa444',
			bcg: '#ffeeee',
		},
	];

	return (
		<Wrapper>
			{defaultStats.map((item, index) => {
				return <StatItem key={index} {...item} />;
			})}
		</Wrapper>
	);
};

export default StatsContainer;
