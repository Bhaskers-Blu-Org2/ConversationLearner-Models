export declare class Session {
    sessionId: string;
    createdDatetime: string;
    lastQueryDatetime: string;
    packageId: number;
    saveToLog: boolean;
    constructor(init?: Partial<Session>);
}
export declare class SessionList {
    sessions: Session[];
    constructor(init?: Partial<SessionList>);
}
export declare class SessionIdList {
    sessionIds: string[];
    constructor(init?: Partial<SessionIdList>);
}
