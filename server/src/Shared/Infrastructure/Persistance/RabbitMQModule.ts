import {Module} from "@nestjs/common";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            useFactory: async (config: ConfigService): Promise<{ uri: string }> => {
                return {
                    uri: `${config.get<string>('RABBIT_MQ_URI')}`,
                };
            }, inject: [ConfigService],
        }),]
})
export class RabbitMqModule {
}