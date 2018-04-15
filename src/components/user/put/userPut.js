import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import * as userActions from '../../../actions/userActions';
import FieldGroup from './fieldGroup';
import moment from 'moment';

import validator from 'validator';


class UserPutPage extends React.Component {
	constructor(props, context) {
		super(props, context);


		// this.create = this.create.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
		this.state = {
			nome: {
				valid: true,
				value: '',
				message: ''
			},
			sobrenome: {
				valid: true,
				value: '',
				message: ''
			},
			cpf: {
				valid: true,
				value: '',
				message: ''
			},
			email: {
				valid: true,
				value: '',
				message: ''
			},
			nascimento: {
				valid: true,
				value: '',
				message: ''
			}

		}
	}
	handleChange(event) {
		const state = this.state;
		state[event.target.name].value = event.target.value;
		this.setState(state);
	}
	resetValidations() {
		const state = this.state;

		Object.keys(state)
			.map(key => {
				if (state[key].hasOwnProperty('valid')) {
					state[key].valid = true;
					state[key].message = '';
				}
			});
	}
	isValid() {
		const state = this.state;
		let isValid = true;
		if (!validator.isEmail(state.email.value)) {
			state.email.valid = false;
			state.email.message = `O email ${state.email.value} não é válido`;
			isValid = false;
		}

		if (!validator.isLength(state.nome.value.concat(state.sobrenome.value), { min: 0, max: 150 })) {
			state.sobrenome.valid = state.nome.valid = false;
			state.sobrenome.message = state.nome.message = 'Nome e sobrenome excedem o limite de 150 caracteres';
			isValid = false;
		}

		if (!state.nome.value.length) {
			state.nome.valid = false;
			state.nome.message = 'Nome é obrigatório';
			isValid = false;
		}

		if (!state.sobrenome.value.length) {
			state.sobrenome.valid = false;
			state.sobrenome.message = 'Sobrenome é obrigatório';
			isValid = false;
		}

		if (!state.cpf.value.length) {
			state.cpf.valid = false;
			state.cpf.message = 'CPF é obrigatório';
			isValid = false;
		}
		if (!state.nascimento.value.length) {
			state.nascimento.valid = false;
			state.nascimento.message = 'Nascimento é obrigatório';
			isValid = false;
		}

		if (!isValid) {
			this.setState(state);
		}

		return isValid;

	}
	submit(e) {
		e.preventDefault();
		this.resetValidations();

		if (!this.isValid()) return toast.error('O formulário contém dados inválidos.');
		var state = this.state;
		const user = {
			id: this.props.match.id,
			isCreation: !this.props.match.id
		};

		Object.keys(state)
			.map(key => {
				if (state[key].hasOwnProperty('value')) {
					user[key] = state[key].value;
				}
			});
		return this.props.put(user);
	}
	render() {
		const { nome, sobrenome, email, nascimento, cpf } = this.state;
		const groupClasses = {};
		['nome', 'sobrenome', 'email', 'nascimento'].forEach(item => {
			groupClasses[item] = classNames('form-group', { 'has-error': !this.state[item].valid });
		});
		return (
			<form className="form" onSubmit={this.submit}>
				<h2 className="header">Novo usuário</h2>

				<div className={groupClasses.nome}>
					<input type="text" name="nome" className="form-control"
						placeholder="Nome" value={this.props.nome.value} onChange={this.handleChange} autoFocus />
					<span className="help-block">{nome.message}</span>
				</div>
				<div className={groupClasses.sobrenome}>
					<input type="text" name="sobrenome" className="form-control"
						placeholder="Sobrenome" value={this.props.sobrenome.value} onChange={this.handleChange} />
					<span className="help-block">{sobrenome.message}</span>
				</div>
				<div className={groupClasses.cpf}>
					<input type="text" name="cpf" className="form-control"
						placeholder="CPF" value={this.props.cpf.value} onChange={this.handleChange} />
					<span className="help-block">{cpf.message}</span>
				</div>
				<div className={groupClasses.email}>
					<input type="text" name="email" className="form-control"
						placeholder="Email address" value={this.props.email.value} onChange={this.handleChange} />
					<span className="help-block">{email.message}</span>
				</div>
				<div className={groupClasses.nascimento}>
					<input type="text" name="nascimento" className="form-control"
						placeholder="Data de Nascimento" value={this.props.nascimento.value} onChange={this.handleChange} />
					<span className="help-block">{nascimento.message}</span>
				</div>
				<button type='submit' className='btn btn-primary'>Salvar</button>&nbsp;
					<Link className='btn btn-default' type='button' to='/users/'> Cancelar</Link>
			</form>

		);
	}
}

UserPutPage.propTypes = {
	user: PropTypes.object
};

UserPutPage.defaultProps = {
	user: { isCreation: true }
};

const mapStateToProps = state => {
	const user = Object.assign({}, state.users.user);
	return {
		nome: {
		},
		nascimento: {},
		sobrenome: {},
		email: {},
		cpf: {}
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserPutPage);