import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddHisab = () => {
	const {
		isLoading,
		isEditing,
		showAlert,
		displayAlert,
		task,
		got,
		sent,
		person,
		taskType,
		taskTypeOptions,
		status,
		statusOptions,
		handleChange,
		clearValues,
		createHisab,
		editHisab,
	} = useAppContext();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!task || !person || !got) {
			displayAlert();
			return;
		}
		if (isEditing) {
			editHisab();
			return;
		}
		createHisab();
	};

	const handleClear = (e) => {
		e.preventDefault();
		clearValues();
	};
	const handleHisabInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		handleChange({ name, value });
	};

	return (
		<Wrapper>
			<form className='form'>
				<h3>{isEditing ? 'edit hisab' : 'add hisab'}</h3>
				{showAlert && <Alert />}
				<div className='form-center'>
					{/* task */}
					<FormRow
						type='text'
						name='task'
						value={task}
						handleChange={handleHisabInput}
					/>
					{/* person */}
					<FormRow
						type='text'
						name='person'
						value={person}
						handleChange={handleHisabInput}
					/>
					{/* sent */}
					<FormRow
						type='text'
						name='sent'
						labelText='sent (-)'
						value={sent}
						handleChange={handleHisabInput}
					/>
					{/* got */}
					<FormRow
						type='text'
						name='got'
						labelText='got (+)'
						value={got}
						handleChange={handleHisabInput}
					/>
					{/* hisab status */}
					<FormRowSelect
						name='status'
						value={status}
						handleChange={handleHisabInput}
						list={statusOptions}
					/>
					{/* hisab type */}
					<FormRowSelect
						name='taskType'
						labelText='task type'
						value={taskType}
						handleChange={handleHisabInput}
						list={taskTypeOptions}
					/>
					{/* btn container */}
					<div className='btn-container'>
						<button
							type='submit'
							className='btn btn-block submit-btn'
							onClick={handleSubmit}
							disabled={isLoading}>
							submit
						</button>
						<button className='btn btn-block clear-btn' onClick={handleClear}>
							clear
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};

export default AddHisab;
