import {Center, Container, Space, Title} from "@mantine/core";
import {LoanApplicationForm} from "@/components/loan-application-form";

export default function Home() {
  return (
      <Container size="xl">
          <Space h="xl"/>

          <Center>
              <Title order={3}>Nueva solicitud de préstamo</Title>
          </Center>

          <Space h="lg"/>

          <LoanApplicationForm />
      </Container>
  );
}
