import { Module, forwardRef } from '@nestjs/common';
import { BehaviourModule } from '../behaviour/behaviour.module';
import { CandlesModule } from 'src/candles/candles.module';
import { InputModule } from 'src/input/input.module';
import { LogModule } from 'src/log/log.module';
import { OrdersModule } from 'src/orders/orders.module';
import { TestDataService } from './testdata.service';
import { TesterService } from './tester.service';
import { IndicatorsModule } from 'src/indicators/indicators.module';

@Module({
    imports: [BehaviourModule, CandlesModule, forwardRef(() => OrdersModule), InputModule, LogModule, IndicatorsModule],
    controllers: [],
    providers: [TesterService, TestDataService],
    exports: [TesterService, TestDataService],

})
export class BacktestModule {}
