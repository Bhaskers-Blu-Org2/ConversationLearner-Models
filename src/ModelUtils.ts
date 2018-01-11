import { ExtractResponse, PredictedEntity } from './Extract'
import { Teach, TeachResponse } from './Teach'
import { TrainRound, TrainDialog, TrainExtractorStep, TrainScorerStep, TextVariation, LabeledEntity } from './TrainDialog'
import { LogDialog, LogRound, LogScorerStep } from './LogDialog'
import { EntityList } from './Entity'
import { ContextDialog } from './index';

export class ModelUtils  {
    /** Remove n words from start of string */
    public static RemoveWords(text : string, numWords : number) : string 
    {
        let firstSpace = text.indexOf(' ');
        let remaining = (firstSpace > 0) ? text.slice(firstSpace+1) : "";
        numWords--; 
        if (numWords == 0)
        {
            return remaining;
        }
        return this.RemoveWords(remaining, numWords); 
    }

    //====================================================================
    // CONVERSION: LabeledEntity == PredictedEntity
    //====================================================================
    public static ToLabeledEntity(predictedEntity : PredictedEntity) : LabeledEntity {

        let labelEntity = new LabeledEntity({
            startCharIndex: predictedEntity.startCharIndex,
            endCharIndex: predictedEntity.endCharIndex,
            entityId: predictedEntity.entityId,
            entityName: predictedEntity.entityName,
            entityText: predictedEntity.entityText,
            builtinType: predictedEntity.builtinType,
            resolution: predictedEntity.resolution
        });

        return labelEntity;
    }

    public static ToLabeledEntities(predictedEntities : PredictedEntity[]) : LabeledEntity[] {

        let labeledEntities : LabeledEntity[] = [];
        for (let predictedEntity of predictedEntities)
        {
            let labelEntity = ModelUtils.ToLabeledEntity(predictedEntity);
            labeledEntities.push(labelEntity);
        }
        return labeledEntities;
    }

    public static ToPredictedEntity(labeledEntity : LabeledEntity) : PredictedEntity {

        let predictedEntity = new PredictedEntity({
                startCharIndex: labeledEntity.startCharIndex,
                endCharIndex: labeledEntity.endCharIndex,
                entityId: labeledEntity.entityId,
                entityName: labeledEntity.entityName,
                entityText: labeledEntity.entityText,
                builtinType: labeledEntity.builtinType,
                resolution: labeledEntity.resolution
            });
        return predictedEntity;
    }

    public static ToPredictedEntities(labeledEntities : LabeledEntity[], entityList: EntityList = null) : PredictedEntity[] {
        
        let predictedEntities : PredictedEntity[] = [];
        for (let labeledEntity of labeledEntities)
        {
            let predictedEntity = ModelUtils.ToPredictedEntity(labeledEntity);
            if (!predictedEntity.entityName && entityList) {
                let entity = entityList.entities.filter((a) => a.entityId === predictedEntity.entityId)[0];
                if (entity) {
                    predictedEntity.entityName = entity.entityName; 
                    predictedEntity.metadata = entity.metadata;
                }
            }
            predictedEntities.push(predictedEntity);
        }
        return predictedEntities;
    }

    //====================================================================
    // CONVERSION: ExtractResponse == TextVariation 
    //====================================================================
    public static ToTextVariation(extractResponse: ExtractResponse) : TextVariation {
        let labeledEntities = this.ToLabeledEntities(extractResponse.predictedEntities);
        let textVariation = new TextVariation({
            text: extractResponse.text,
            labelEntities: labeledEntities
        });
        return textVariation;
    }

    public static ToExtractResponses(textVariations: TextVariation[]) : ExtractResponse[] {
        let extractResponses : ExtractResponse[] = [];
        for (let textVariation of textVariations)
        {
            let predictedEntities = this.ToPredictedEntities(textVariation.labelEntities);
            let extractResponse = new ExtractResponse({
                text: textVariation.text,
                predictedEntities: predictedEntities
            });
            extractResponses.push(extractResponse);
        }
        return extractResponses;
    }

    public static ToTextVariations(extractResponses: ExtractResponse[]) : TextVariation[] {
        let textVariations : TextVariation[] = [];
        for (let extractResponse of extractResponses)
        {
            let labelEntities = this.ToLabeledEntities(extractResponse.predictedEntities);
            let textVariation = new TextVariation({
                text: extractResponse.text,
                labelEntities: labelEntities
            });
            textVariations.push(textVariation);
        }
        return textVariations;
    }

    //====================================================================
    // CONVERSION: LogDialog == TrainDialog
    //====================================================================
    public static ToTrainDialog(logDialog: LogDialog): TrainDialog {

        let trainRounds : TrainRound[] = [];
        for (let logRound of logDialog.rounds)
        {
            let trainRound = ModelUtils.ToTrainRound(logRound);
            trainRounds.push(trainRound);
        }

        return new TrainDialog({
            rounds: trainRounds
        })
    }

    //====================================================================
    // CONVERSION: LogRoung == TrainRound
    //====================================================================
    public static ToTrainRound(logRound: LogRound): TrainRound {
        return new TrainRound({
            extractorStep: new TrainExtractorStep({
                textVariations: [new TextVariation({
                    labelEntities: ModelUtils.ToLabeledEntities(logRound.extractorStep.predictedEntities),
                    text: logRound.extractorStep.text
                })],
            }),
            scorerSteps: logRound.scorerSteps.map(scorerStep => new TrainScorerStep({
                input: scorerStep.input,
                labelAction: scorerStep.predictedAction,
            }))
        })
    }

    //====================================================================
    // CONVERSION: LogScorerStep == TrainScorerStep
    //====================================================================
    public static ToTrainScorerStep(logScorerStep: LogScorerStep): TrainScorerStep {
        return new TrainScorerStep({
            input: logScorerStep.input,
            labelAction: logScorerStep.predictedAction,
        })
    }

    //====================================================================
    // CONVERSION: TrainDialog == ContextDialog 
    //====================================================================
    public static ToContextDialog(trainDialog: TrainDialog) : ContextDialog {
        let contextDialog = new ContextDialog({
            contextDialog: trainDialog.rounds
        });
        return contextDialog;
    }

    //====================================================================
    // CONVERSION: TeachResponse == Teach 
    //====================================================================
    public static ToTeach(teachResponse: TeachResponse) : Teach {
        let teach = new Teach({
            teachId: teachResponse.teachId,
            trainDialogId: teachResponse.trainDialogId
        });
        return teach;
    }
}    