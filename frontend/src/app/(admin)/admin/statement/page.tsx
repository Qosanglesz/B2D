// app/statement/page.tsx

import { StatementController } from '@/components/apiComponents/statementAPI/statementController';
import { StatementData } from '@/components/apiComponents/statementAPI/statementRepository';
import { UserController } from '@/components/apiComponents/userAPI/userController';
import StatementsTable from '@/components/adminComponents/adminStatement/StatementsTable';

interface UserData {
  email: string;
  name: string;
}

interface StatementWithUser extends StatementData {
  user: UserData | null;
}

async function getStatements(): Promise<StatementData[]> {
  const controller = new StatementController();
  const response = await controller.getStatements();
  
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Failed to fetch statements');
  }
}

async function getUserData(userId: string): Promise<UserData | null> {
  const userController = new UserController();
  const response = await userController.getUsers(userId);

  if (response.status === 200) {
    const userData = await response.json();
    return {
      email: userData.email,
      name: userData.name
    };
  } else {
    console.error(`Failed to fetch user data for userId: ${userId}`);
    return null;
  }
}

export default async function StatementsPage() {
    const statements = await getStatements();
    const statementsWithUser: StatementWithUser[] = await Promise.all(
      statements.map(async (statement) => {
        const userData = await getUserData(statement.user_id);
        return { ...statement, user: userData };
      })
    );
  
    return (
      <div className="container mx-auto p-4">
        <StatementsTable initialStatements={statementsWithUser} />
      </div>
    );
  }