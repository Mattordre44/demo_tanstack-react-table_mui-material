import { Box, Button, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material'
import './App.css'
import { useMemo, useState } from 'react'
import { makeDataUser } from './data/makeDataUser'
import { User } from './model/user';
import { ColumnDef } from '@tanstack/react-table';
import CustomTable from './components/customTable';

function App() {

  const [data, setData] = useState<User[]>(() => makeDataUser(100));

  console.log(data);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
      },
      {
        header: 'FirstName',
        accessorKey: 'firstname',
      },
      {
        header: 'LastName',
        accessorKey: 'lastname',
      },
      {
        header: 'Age',
        accessorKey: 'age',
      },
      {
        header: 'Username',
        accessorKey: 'username',
      },
      {
        header: 'Is Admin',
        accessorKey: 'isAdmin',
      },
      {
        header: 'Mail',
        accessorKey: 'mail'
      }
    ],
    []
  );

  return (
    <>
      <Button 
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setData(makeDataUser(100))}
      >
        Refresh Data
        </Button>
      <CustomTable {...{ data, columns }} />
    </>
  );
}

export default App
