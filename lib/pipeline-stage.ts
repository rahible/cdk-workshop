import { CdkWorkshopStack } from "./cdk-workshop-stack";
import { Stage, Construct, StackProps } from '@aws-cdk/core';

export class WorkshopPipelineStage extends Stage {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new CdkWorkshopStack(this, 'WebService');
    }
}