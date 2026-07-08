import { RouterProvider } from 'react-router-dom';
import { RoleProvider } from './providers/RoleProvider';
import { MockDataProvider } from './providers/MockDataProvider';
import { AuditProvider } from './providers/AuditProvider';
import { router } from './router';

// Provider order: RoleProvider first (audit and mock data read role)
export function App() {
  return (
    <RoleProvider>
      <MockDataProvider>
        <AuditProvider>
          <RouterProvider router={router} />
        </AuditProvider>
      </MockDataProvider>
    </RoleProvider>
  );
}
