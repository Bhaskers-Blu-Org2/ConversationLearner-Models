import { Memory } from './Memory';
import { ScoreInput, ScoreResponse } from './Score';
import { ExtractResponse } from './Extract';
import { TrainExtractorStep, TrainScorerStep } from './TrainDialog';
import { EntityBase } from './Entity';
export declare enum ScoreReason {
    NotAvailable = "notAvailable",
    NotScorable = "notScorable",
    NotCalculated = "notCalculated",
}
export declare class UIScoreInput {
    trainExtractorStep: TrainExtractorStep;
    extractResponse: ExtractResponse;
    constructor(init?: Partial<UIScoreInput>);
}
export declare class UIExtractResponse {
    extractResponse: ExtractResponse;
    memories: Memory[];
    constructor(init?: Partial<UIExtractResponse>);
}
export declare class UIScoreResponse {
    scoreResponse: ScoreResponse;
    scoreInput: ScoreInput;
    memories: Memory[];
    constructor(init?: Partial<UIScoreResponse>);
}
export declare class UITrainScorerStep {
    trainScorerStep: TrainScorerStep;
    entities: EntityBase[];
    constructor(init?: Partial<UITrainScorerStep>);
}
