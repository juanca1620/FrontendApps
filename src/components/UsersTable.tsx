import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { ClienteResponseDto } from '../dto/ClienteResponseDto';

const columns: GridColDef<ClienteResponseDto>[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombre', headerName: 'Nombre', width: 130 },
  { field: 'apellido', headerName: 'Apellido', width: 130 },
  { 
    field: 'fechaNacimiento', 
    headerName: 'Fecha Nacimiento',
    width: 150
  },
  { field: 'cedula', headerName: 'Cédula', width: 120 }
];

export default function ClientTable(info:{clientes: ClienteResponseDto[]}) {
  console.log(info.clientes)

  const {clientes} = info

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={clientes}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 25]} // Opciones de paginación
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 }, // Muestra 5 filas por defecto
          },
        }}
      />
    </div>
  );
}