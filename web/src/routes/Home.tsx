import React from 'react';
import { useAllUsersQuery } from '../generated/graphql';

export const Home: React.FC = () => {
	const { data } = useAllUsersQuery({ fetchPolicy: 'network-only' });

	if (!data) {
		return <div>Lading.....</div>;
	}
	return (
		<div>
			<div>Users:</div>
			<ul>{data.users.map((u) => <li key={u.id}>{`id: ${u.id} email: ${u.email}`}</li>)}</ul>
		</div>
	);
};
