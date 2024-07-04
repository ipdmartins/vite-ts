import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Event from './pages/events';

function App() {
	const router = createBrowserRouter([{ path: '/event', element: <Event /> }]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
