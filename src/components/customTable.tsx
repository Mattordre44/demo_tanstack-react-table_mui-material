import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

export default function CustomTable<Type>({
    data,
    columns,
}: {
    data: Type[],
    columns: ColumnDef<Type>[]
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true
    })

    const { pageSize, pageIndex } = table.getState().pagination;

    console.log(table.getHeaderGroups())

    return (
        <Box>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            { table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    { headerGroup.headers.map(header => (
                                        <TableCell key={header.id} colSpan={header.colSpan}>
                                            { header.isPlaceholder ? null : (
                                                <div>
                                                    {
                                                        flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                    }
                                                </div>
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            { table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}>
                                    { row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))

                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
                    count={table.getFilteredRowModel().rows.length}
                    rowsPerPage={pageSize}
                    page={pageIndex}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onPageChange={(_, page) => {
                        table.setPageIndex(page)
                    }}
                    onRowsPerPageChange={e => {
                        const size = e.target.value ? Number(e.target.value) : 10
                        table.setPageSize(size)
                    }}
                    ActionsComponent={TablePaginationActions}
                />
            </Paper>
        </Box>
    )
}