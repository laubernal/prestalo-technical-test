'use client'

import {Box, Button, Center, Container, Space, Title} from "@mantine/core";
import {LoanApplicationForm} from "@/components/loan-application-form";
import {redirect} from "next/navigation";

export default function Home() {
    const redirectToLoanApplications = () => {
        redirect("/loan-applications");
    };

    return (
        <Container size="md">
            <Space h="xl"/>

            <Center>
                <Title order={3}>Nueva solicitud de préstamo</Title>
            </Center>

            <Box style={{display: "flex", justifyContent: "flex-end", marginTop: 25}}>
                <Button variant="outline" onClick={redirectToLoanApplications}>
                    Ver solicitudes anteriores
                </Button>
            </Box>

            <Space h="lg"/>

            <LoanApplicationForm/>
        </Container>
    );
}
