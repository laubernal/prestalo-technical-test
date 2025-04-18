'use client'

import {Button, Container, Flex, NumberInput, Space, TextInput} from "@mantine/core";
import React from "react";
import {LoanApplication} from "@/types/loanApplication";
import {useForm} from "@mantine/form";
import {v4 as uuidv4} from 'uuid';
import {createLoanApplication} from "@/api/api";
import {Offer} from "@/types/offer";
import {OfferCard} from "@/components/offer-card";

export const LoanApplicationForm = () => {
    const form = useForm<Partial<LoanApplication>>({
        initialValues: {
            name: '',
            email: '',
            amountRequested: 0,
            termInMonths: 0,
            monthlyIncome: 0,
        },
    });
    const [offers, setOffers] = React.useState<Offer[]>([]);

    const handleSubmit = async (data: LoanApplication): Promise<void> => {
        const id = uuidv4();

        const loanApplication: LoanApplication = {
            id,
            name: data.name,
            email: data.email,
            amountRequested: data.amountRequested,
            termInMonths: data.termInMonths,
            monthlyIncome: data.monthlyIncome,
        }

        const response = await createLoanApplication(loanApplication);

        setOffers(response);
    }

    return (
        <div>
            {offers && offers.length ?
                <Container size={'md'} style={{marginTop: 30}}>
                    <Flex direction="row">
                        {offers.map((offer: Offer) => {
                            return (
                                <OfferCard offer={offer}/>
                            )
                        })}
                    </Flex>
                </Container>
                :
                <Container size={'md'}>
                    <form onSubmit={form.onSubmit(async (values: any) => {
                        await handleSubmit(values);
                    })}>
                        <TextInput
                            label="Nombre"
                            placeholder="Nombre"
                            {...form.getInputProps('name')}
                        />

                        <Space h="sm"/>

                        <TextInput
                            label="Email"
                            placeholder="Email"
                            {...form.getInputProps('email')}
                        />

                        <Space h="sm"/>

                        <NumberInput
                            label="Monto a solicitar"
                            min={1}
                            allowNegative={false}
                            {...form.getInputProps('amountRequested')}
                        />

                        <Space h="sm"/>

                        <NumberInput
                            label="Plazo"
                            min={1}
                            allowNegative={false}
                            {...form.getInputProps('termInMonths')}
                        />

                        <Space h="sm"/>

                        <NumberInput
                            label="Ingresos mensuales"
                            min={1}
                            allowNegative={false}
                            {...form.getInputProps('monthlyIncome')}
                        />

                        <Space h="lg"/>

                        <Flex justify="center">
                            <Button variant="filled" fullWidth type="submit">Solicitar</Button>
                        </Flex>

                    </form>
                </Container>
            }
        </div>

    )
}