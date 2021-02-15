import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export interface HitCounterProps {
    // the function we want to count url hits
    downstream: lambda.IFunction;
    /**
     * The read capacity units for the table
     *
     * Must be greater than 5 and lower than 20
     *
     * @default 5
     */
    readCapacity?: number;
}

export class HitCounter extends cdk.Construct {

    public readonly handler: lambda.Function;

    public readonly table: dynamodb.Table;

    constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
        if(props.readCapacity !== undefined && (props.readCapacity < 5 || props.readCapacity > 20)) {
            throw new Error('readCapacity must be greater than 5 and lower than 20');
        }

        super(scope, id);

        const table = new dynamodb.Table(this, 'Hits', {
            partitionKey: {name: 'path', type: dynamodb.AttributeType.STRING},
            readCapacity: props.readCapacity ?? 5
        });
        this.table = table;

        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });

        table.grantReadWriteData(this.handler);

        props.downstream.grantInvoke(this.handler);

    }
}