export enum DialogType {
  TEACH = 'teach',
  TRAINDIALOG = 'traindialog',
  LOGDIALOG = 'logdialog'
}

export interface Session {
  sessionId: string
  createdDatetime: string
  lastQueryDatetime: string
  packageId: number
  saveToLog: boolean
}

export interface SessionList {
  sessions: Session[]
}

export interface SessionIdList {
  sessionIds: string[]
}
