import { CdkWorkshopStack } from "./cdk-workshop-stack";
import { Stage, Construct, StackProps } from '@aws-cdk/core';
import * as cdk from "@aws-cdk/core";

export class WorkshopPipelineStage extends Stage {
    public readonly hcViewerUrl: cdk.CfnOutput;
    public readonly hcEndpoint: cdk.CfnOutput;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const service = new CdkWorkshopStack(this, 'WebService');
        this.hcEndpoint = service.hcEndpoint;
        this.hcViewerUrl = service.hcViewerUrl;
    }
}