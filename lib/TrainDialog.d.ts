import { ScoreInput, ScoredAction } from './Score';
export declare class LabeledEntity {
    startCharIndex: number;
    endCharIndex: number;
    entityId: string;
    entityName: string;
    entityText: string;
    constructor(init?: Partial<LabeledEntity>);
}
export declare class TextVariation {
    text: String;
    labelEntities: LabeledEntity[];
    constructor(init?: Partial<TextVariation>);
}
export declare class TrainExtractorStep {
    textVariations: TextVariation[];
    constructor(init?: Partial<TrainExtractorStep>);
}
export declare class TrainScorerStep {
    input: ScoreInput;
    scoredAction: ScoredAction;
    constructor(init?: Partial<TrainScorerStep>);
}
export declare class TrainRound {
    extractorStep: TrainExtractorStep;
    scorerSteps: TrainScorerStep[];
    constructor(init?: Partial<TrainRound>);
}
export declare class TrainDialog {
    trainDialogId: string;
    version: number;
    packageCreationId: number;
    packageDeletionId: number;
    rounds: TrainRound[];
    constructor(init?: Partial<TrainDialog>);
}
export declare class TrainResponse {
    packageId: number;
    trainingStatus: string;
    trainDialogId: string;
    constructor(init?: Partial<TrainResponse>);
}
export declare class TrainDialogList {
    trainDialogs: TrainDialog[];
    constructor(init?: Partial<TrainDialogList>);
}
export declare class TrainDialogIdList {
    trainDialogIds: string[];
    constructor(init?: Partial<TrainDialogIdList>);
}
