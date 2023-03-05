import main from '../assets/images/main-alternative.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import React from 'react';

const Landing = () => {
	const { user } = useAppContext();
	return (
		<React.Fragment>
			{user && <Navigate to='/' />}
			<Wrapper>
				<nav>
					<Logo />
				</nav>
				<div className='container page'>
					{/* info */}
					<div className='info'>
						<h1>
							hisab <span>tracking</span> app
						</h1>
						<p>
							Keep track of your <strong>Povai Hisab</strong> with sent and get
							amount in grams, easy to use, fully secured with auth.
						</p>
						<Link to='/register' className='btn btn-hero'>
							Login/Register
						</Link>
					</div>
					<img src={main} alt='hisab hunt' className='img main-img' />
				</div>
			</Wrapper>
		</React.Fragment>
	);
};

export default Landing;
