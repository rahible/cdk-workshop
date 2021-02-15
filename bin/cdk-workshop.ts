#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { WorkshopPipelineStack } from '../lib/pipline-stack';

const app = new cdk.App();
new WorkshopPipelineStack(app, 'CdkWorkshopPipelineStack');
