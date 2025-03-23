'use client'

import {fetchLoanApplications} from "@/api/api";
import {
    Container,
    Space,
    Table,
    Title,
    Text,
    Center,
    TableTr,
    TableTh,
    TableThead,
    TableTbody,
    TableTd, Box, Button
} from "@mantine/core";
import {LoanApplicationResponse} from "@/types/loanApplicationResponse";
import React from "react";
import Link from "next/link";


export default function LoanApplicationsTable() {
    const [loanApplications, setLoanApplications] = React.useState<LoanApplicationResponse[]>([]);

    React.useEffect(() => {
        (async () => {
            const response = await fetchLoanApplications();

            setLoanApplications(response);
        })();
    }, [])

    return (
        <Container size="xl">
            <Space h="xl"/>

            <Center>
                <Title order={3}>Solicitudes de préstamo anteriores</Title>
            </Center>

            <Box style={{display: "flex", justifyContent: "flex-end", marginTop: 25}}>
                <Link href="/">
                    <Button variant="outline">Atrás</Button>
                </Link>
            </Box>

            <Space h="lg"/>

            {!loanApplications.length ?
                (
                    <Text fz={20} fs={'italic'} c="dimmed" ta={'center'} style={{marginTop: 50}}>No hemos encontrado
                        solicitudes previas</Text>
                ) :
                (
                    <Center style={{marginTop: 30}}>
                        <Table highlightOnHover striped>
                            <TableThead>
                                <TableTr>
                                    <TableTh>
                                        <Text fw={500} ta={'center'}>
                                            Nombre
                                        </Text>
                                    </TableTh>
                                    <TableTh>
                                        <Text fw={500} ta={'center'}>
                                            Email
                                        </Text>
                                    </TableTh>
                                    <TableTh>
                                        <Text fw={500} ta={'center'}>
                                            Monto solicitado
                                        </Text>
                                    </TableTh>
                                    <TableTh>
                                        <Text fw={500} ta={'center'}>
                                            Periodo en meses
                                        </Text>
                                    </TableTh>
                                    <TableTh>
                                        <Text fw={500} ta={'center'}>
                                            Ingresos mensuales
                                        </Text>
                                    </TableTh>
                                </TableTr>
                            </TableThead>
                            <TableTbody>
                                {loanApplications.map((application: LoanApplicationResponse) => (
                                    <TableTr key={application.id}>
                                        <TableTd>
                                            <Text ta={'center'}>{application.name}</Text>

                                        </TableTd>
                                        <TableTd>
                                            <Text ta={'center'}>{application.email}</Text>

                                        </TableTd>
                                        <TableTd>
                                            <Text ta={'center'}>{application.amountRequested}€</Text>

                                        </TableTd>
                                        <TableTd>
                                            <Text ta={'center'}>{application.termInMonths} meses</Text>

                                        </TableTd>
                                        <TableTd>
                                            <Text ta={'center'}>{application.monthlyIncome}€</Text>

                                        </TableTd>
                                    </TableTr>
                                ))}
                            </TableTbody>
                        </Table>
                    </Center>
                )}
        </Container>
    )
}
