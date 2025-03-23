import {Card, Center, Title, Text, Button, Flex} from "@mantine/core";
import React from "react";
import {Offer} from "@/types/offer";

interface Props {
    offer: Offer;
}

export const OfferCard = ({offer}: Props) => {
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={offer.id}
            style={{maxWidth: 800, minWidth: 280, margin: 'auto'}}>
            <Center>
                <Title order={3}>
                    {offer.bankName}
                </Title>
            </Center>

            <Flex direction='column' justify="center" align="center" style={{marginTop: 10}}>
                <Text fw={700} size="lg" c={'blue'}>{offer.approvedAmount}€</Text>
                <Text size="sm" c={'gray'}>Plazo: {offer.monthsPeriod} meses</Text>
                <Text size="sm" c={'gray'}>TAE: {offer.interestTae}%</Text>
                <Text size="sm" c={'gray'}>Cuota mensual: {offer.monthlyCost}€</Text>
            </Flex>

            <Button
                fullWidth
                variant="outline"
                color="blue"
                style={{marginTop: 15}}
                onClick={() => window.open(offer.offerMockUrl, "_blank")}
            >
                Ver oferta
            </Button>
        </Card>
    );
}