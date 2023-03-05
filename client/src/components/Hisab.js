import moment from 'moment';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Hisab';
import HisabInfo from './HisabInfo';

const Hisab = ({ _id, task, person, got, sent, taskType, createdAt, status }) => {
	const { setEditHisab, deleteHisab } = useAppContext();

	let date = moment(createdAt);
	date = date.format('MMM Do, YYYY');
	return (
		<Wrapper>
			<header>
				<div className='main-icon'>{person.charAt(0)}</div>
				<div className='info'>
					<h5>{task}</h5>
					<p>{person}</p>
				</div>
			</header>
			<div className='content'>
				<div className='content-center'>
					<HisabInfo icon={<FaCalendarAlt />} text={date} />
					<HisabInfo icon={<GoChevronUp />} text={sent + ' gm'} />
					<HisabInfo icon={<FaBriefcase />} text={taskType} />
					<HisabInfo icon={<GoChevronDown />} text={got + ' gm'} />
					<div className={`status ${status}`}>{status}</div>
				</div>
				<footer>
					<div className='actions'>
						<Link
							to='/add-hisab'
							className='btn edit-btn'
							onClick={() => setEditHisab(_id)}>
							Edit
						</Link>
						<button
							type='button'
							className='btn delete-btn'
							onClick={() => deleteHisab(_id)}>
							Delete
						</button>
					</div>
				</footer>
			</div>
		</Wrapper>
	);
};

export default Hisab;
