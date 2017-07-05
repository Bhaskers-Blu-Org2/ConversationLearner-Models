export declare class ActionMetaData {
    actionType: string;
    constructor(init?: Partial<ActionMetaData>);
    Equal(metaData: ActionMetaData): boolean;
}
export declare class ActionBase {
    actionId: string;
    payload: string;
    isTerminal: boolean;
    requiredEntities: string[];
    negativeEntities: string[];
    version: number;
    packageCreationId: number;
    packageDeletionId: number;
    metadata: ActionMetaData;
    constructor(init?: Partial<ActionBase>);
}
export declare class ActionList {
    actions: ActionBase[];
    constructor(init?: Partial<ActionList>);
}
export declare class ActionIdList {
    actionIds: string[];
    constructor(init?: Partial<ActionIdList>);
}
